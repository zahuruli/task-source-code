import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterUser from "./components/RegisterUser";
import { Toaster } from "react-hot-toast";
import UpdateUser from "./components/UpdateUser";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/update-user/:slug" element={<UpdateUser />} />
      </Routes>
    </>
  );
};

export default App;
