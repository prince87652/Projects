import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser, setUser } from "./Authentication/authSlice";
import { auth } from "./Authentication/Firebase";
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./Features/Dashboard";
import Medicine from "./AddMedicine/AddMedicine";
import AddPrescription from "./AddMedicine/AddPrescription";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            name: user.displayName||'',
            uid: user.uid,
          })
        );
      } else {
        dispatch(logoutUser());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <p>⌛ Loading...</p>;

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<NavbarLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/AddPrescription" element={<AddPrescription />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );

  function NavbarLayout() {
    return (
      <>
        <Navbar />
        <Outlet/>
        
      </>
    );
  }
}

export default App;
