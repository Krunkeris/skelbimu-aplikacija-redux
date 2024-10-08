import { RegisterPage } from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRouteToHome } from "./protectedRoutes/ProtectedRouteToHome";
import { UserHomePage } from "./pages/UserHomePage";
import { ProtectedRouteToUserHome } from "./protectedRoutes/ProtectedRouteToUserHome";
import { AdminHomePage } from "./pages/AdminHomePage";
import { ProtectedRouteToAdminHome } from "./protectedRoutes/ProtectedRouteToAdminHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protected route to home*/}
        <Route
          path="/"
          element={
            <ProtectedRouteToHome>
              <HomePage />
            </ProtectedRouteToHome>
          }
        />

        {/* protected route to userHome*/}
        <Route
          path="/userHome"
          element={
            <ProtectedRouteToUserHome>
              <UserHomePage />
            </ProtectedRouteToUserHome>
          }
        />

        {/* protected route to adminHome*/}
        <Route
          path="/adminHome"
          element={
            <ProtectedRouteToAdminHome>
              <AdminHomePage />
            </ProtectedRouteToAdminHome>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
