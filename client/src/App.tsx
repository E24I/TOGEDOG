import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateFeed from "./pages/FeedCRUD/CreateFeed";
import PetFeed from "./pages/PetFeed";
import UpdateFeed from "./pages/FeedCRUD/UpdateFeed";
import Chatting from "./pages/Chatting";
import MyPage from "./pages/MyPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/create" element={<CreateFeed />} />
        <Route path="/edit" element={<UpdateFeed />} />
        <Route path="/feeds" element={<PetFeed />} />
        <Route path="/chat" element={<Chatting />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
