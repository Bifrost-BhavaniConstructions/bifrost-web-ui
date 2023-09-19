import ServerErrorMessage from "../types/ServerErrorMessage";

export const parseServerError: (errorString: string) => ServerErrorMessage = (errorString: string) => {
    return JSON.parse(errorString);
}