//  this component is for google oAuth

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { authservice } from "../features/auth/authService";

const GoogleCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const query = new URLSearchParams(search);
      const token = query.get("token");

      if (token) {
        localStorage.setItem("token", token);
        try {
          const user = await authservice.getCurrentUser();
          dispatch(setUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } catch (err) {
          console.error("Error fetching user after Google login:", err);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [search, navigate, dispatch]);

  return <div className="flex items-center justify-center"><p className="my-10">Logging you in...</p></div>;
};

export default GoogleCallback;