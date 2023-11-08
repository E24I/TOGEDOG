import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Login />
      <Routes>
        <Route path="/" element="" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
