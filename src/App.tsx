
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CommentsPage from "./pages/commentsPage";
import LoginPage from "./pages/loginPage";
import UsersPage from "./pages/usersPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
