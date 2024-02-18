import React, { useEffect, useState } from "react";
import {
  MiddleButtonContainer,
  HeaderContainer,
  MainButtonStyle,
  MapButtonStyle,
  CreateFeedButtonStyle,
  HeaderBox,
  UserProfile,
  LogoDark,
  LogoUnDark,
  MoreButton,
  Dot,
} from "./Header.Style";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import Alarm from "../alarm/Alarm";
import SetAlarm from "../alarm/SetAlarm";
import { useRecoilValue } from "recoil";
import { darkAtom, isLoginAtom, memberIdAtom, tokenAtom } from "../../atoms";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/userInfoService";

const Header: React.FC = () => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const loginState = useRecoilValue(isLoginAtom);
  const isDark = useRecoilValue(darkAtom);
  const [isRead, setRead] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAlarmSetting, setAlarmSetting] = useState<boolean>(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/SignUp";
  const navigator = useNavigate();

  const handleToLogin = () => {
    if (loginState) {
      navigator(`/user/${memberId}`);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  const openModal = () => {
    if (isModalOpen !== false) {
      setModalOpen(false);
    } else {
      setRead(false);
      setModalOpen(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data } = useQuery({
    queryKey: ["userInfo", memberId, token],
    queryFn: () => getUserInfo(Number(memberId), token),
  });
  if (isLoginPage || isSignUpPage) {
    return null;
  }
  return (
    <HeaderContainer scrolled={scrolled} isDark={isDark}>
      <HeaderBox>
        <Link to={loginState ? "/feeds" : "/"}>
          {isDark ? <LogoDark /> : <LogoUnDark />}
        </Link>
        <MiddleButtonContainer>
          <Link to="/feeds">
            <MainButtonStyle isDark={isDark} />
          </Link>
          <Link to="/petmap">
            <MapButtonStyle isDark={isDark} />
          </Link>
          <Link to={loginState ? "/create" : ""}>
            <CreateFeedButtonStyle
              isDark={isDark}
              onClick={() =>
                loginState ? undefined : alert("로그인이 필요합니다.")
              }
            />
          </Link>
          <UserProfile onClick={handleToLogin}>
            <UserImgForm
              width={45}
              height={45}
              radius={50}
              URL={loginState ? data?.data.image : null}
            />
          </UserProfile>
        </MiddleButtonContainer>
        <MoreButton isDark={isDark} onClick={openModal}>
          <Dot isDark={isDark} />
        </MoreButton>
        {isModalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setAlarmSetting={setAlarmSetting}
          />
        )}
        {isRead && <Alarm setRead={setRead} />}
        {isAlarmSetting && <SetAlarm setAlarmSetting={setAlarmSetting} />}
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
