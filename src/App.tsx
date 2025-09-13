import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CommentsPage from "./pages/commentsPage";
import LoginPage from "./pages/loginPage";
import UsersPage from "./pages/usersPage";
import SignUpPage from "./pages/signUpPage";
import ProtectedRoute from "./routes/protectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
