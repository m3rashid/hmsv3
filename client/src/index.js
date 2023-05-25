import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from "recoilize";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "App";
import { StrictMode } from "react";

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RecoilizeDebugger />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById("root")
);
