import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import BifrostRouter from "./routes";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <StoreProvider store={store}>
      <BifrostRouter />
      <Toaster />
    </StoreProvider>
  );
}

export default App;
