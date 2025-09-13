import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"


const ProtectedRoute = () => {
 const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router("/");
    }
  }, [router]);
  return <Outlet />
}

export default ProtectedRoute
