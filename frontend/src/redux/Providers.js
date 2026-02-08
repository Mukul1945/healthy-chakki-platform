"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import AuthCartRestorer from "@/components/common/AuthCartRestorer";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthCartRestorer />
      {children}
    </Provider>
  );
}