import axios from "axios";
import { API } from "../constants";
import { router } from "../routes";

const httpClient = axios.create({
  baseURL: API,
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (
    config.headers.Authorization === undefined ||
    config.headers.Authorization === ""
  )
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function createAxiosResponseInterceptor() {
  const interceptor = httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      //console.log(error);
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response.
       *
       * Must be re-attached later on or the token refresh will only happen once
       */
      axios.interceptors.response.eject(interceptor);

      return axios
        .post(`${API}/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((response) => {
          localStorage.getItem("refreshToken");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return axios(error.response.config);
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("token");
          router.navigate("/login").then(() => {
            //console.log("redirected to Login");
          });
          return Promise.reject(error2);
        })
        .finally(createAxiosResponseInterceptor); // Re-attach the interceptor by running the method
    },
  );
}
createAxiosResponseInterceptor();
export default httpClient;
