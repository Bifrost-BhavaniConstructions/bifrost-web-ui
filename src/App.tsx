import React from 'react';
import {StoreProvider} from "easy-peasy";
import store from "./store";
import BifrostRouter from "./routes";

function App() {
  return (
      <StoreProvider store={store}>
          <BifrostRouter/>
      </StoreProvider>
  );
}

export default App;
