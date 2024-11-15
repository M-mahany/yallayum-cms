import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.authorized) {
      navigate("/");
    }
  }, [user, navigate]);

  return user.authorized ? children : null;
};

export default ProtectedRoutes;
