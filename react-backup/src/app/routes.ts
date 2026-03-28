import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Hiring } from "./components/Hiring";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "hiring", Component: Hiring },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfService },
    ],
  },
]);