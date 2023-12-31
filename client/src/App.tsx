import React, { useState } from "react";
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
import UserInfo from "./pages/UserInfo";
import PetProfile from "./pages/PetProfile";
import PetAdd from "./pages/PetAdd";
import ReportModal from "./atoms/modal/ReportModal";
import { useRecoilValue } from "recoil";
import { alertAtom, confirmAtom, reportAtom } from "./atoms";
import AlertModal from "./atoms/modal/AlertModal";
import ConfirmModal from "./atoms/modal/ConfirmModal";
import SearchUsers from "./pages/SearchUsers";

const App: React.FC = () => {
  const alertModal = useRecoilValue(alertAtom);
  const confirmModal = useRecoilValue(confirmAtom);
  const reportModal = useRecoilValue(reportAtom);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/create" element={<CreateFeed />} />
        <Route path="/update/:feedId" element={<UpdateFeed />} />
        <Route path="/feeds" element={<PetFeed />} />
        <Route path="/chat" element={<Chatting />} />
        <Route path="/petmap" element={<PetMap />} />
        <Route path="/petmap/1" element={<MapDetail />} />
        <Route path="/member/:memberId/mymap" element={<MyMap />} />
        <Route path="/user/:pageMemberId" element={<UserInfo />} />
        <Route path="/petProfile/:petId" element={<PetProfile />} />
        <Route path="/user/:id/petAdd" element={<PetAdd />} />
        <Route path="/search" element={<SearchUsers />} />
      </Routes>
      <Footer />
      {alertModal !== "" && <AlertModal />}
      {confirmModal.sort !== "" && <ConfirmModal />}
      {reportModal.sort !== "" && <ReportModal />}
    </BrowserRouter>
  );
};

export default App;
