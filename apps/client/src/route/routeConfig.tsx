import { SignUp } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "@/page/sign-up";

const landingPage = lazy(() => import("@/page/landingpage"));
const chagPage = lazy(() => import("@/features/chatpage"));

const withSuspense = (Component: React.FC) => (
  <Suspense
    fallback={
      <div className="text-center h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    }
  >
    <Component />
  </Suspense>
);

export const routes = [
  {
    path: "/",
    element: withSuspense(landingPage),
    errorElement: <div>error</div>,
  },
  {
    path: "/sign-in",
    element: <SignUpPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp afterSignUpUrl="/chat" />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/chat",
        element: withSuspense(chagPage),
        children: [
          {
            index: true,
            element: <div>Select a chat to begin.</div>,
          },
          {
            path: ":id",
            element: <div>chat room</div>,
          },
        ],
      },
    ],
  },
];
