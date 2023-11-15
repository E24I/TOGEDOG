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
import PetMap from "./pages/PetMap";
import MapDetail from "./pages/MapDetail";
import MyMap from "./pages/MyMap";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/create" element={<CreateFeed />} />
        <Route path="/edit" element={<UpdateFeed />} />
        <Route path="/feeds" element={<PetFeed />} />
        <Route path="/chat" element={<Chatting />} />
        <Route path="/petmap" element={<PetMap />} />
        <Route path="/petmap/feed" element={<MapDetail />} />
        <Route path="/member/:memberId/mymap" element={<MyMap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
