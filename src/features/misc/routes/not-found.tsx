import { useAppStore } from "@/stores";
import { Navigate } from "react-router-dom";

export const NotFound = () => {
  const auth = useAppStore.use.auth();

  if (auth.role === "user") {
    return <Navigate to={`/jobs?page=1`} replace />;
  } else if (auth.role === null) {
    return <Navigate to="/sign-in" replace />;
  } else {
    return <Navigate to={`${auth.role}/dashboard`} replace />;
  }
};
