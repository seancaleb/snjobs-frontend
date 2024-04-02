import { AppRoutes } from "@/routes";
import { AppProvider } from "@/providers/app";
import { AuthorizeClient } from "./features/auth";

const App = () => {
  return (
    <AppProvider>
      <AuthorizeClient>
        <AppRoutes />
      </AuthorizeClient>
    </AppProvider>
  );
};

export default App;
