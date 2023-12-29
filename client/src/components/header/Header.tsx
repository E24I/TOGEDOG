import React, { useState } from "react";
import {
  MiddleButtonContainer,
  HeaderContainer,
  NotificationsContainer,
  Logo,
  MainButtonStyle,
  MapButtonStyle,
  CreateFeedButtonStyle,
  RedPointStyle,
  NotificationsStyle,
  HeaderBox,
} from "./Header.Style";

import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import Alarm from "../alarm/Alarm";
import SetAlarm from "../alarm/SetAlarm";
import { useRecoilValue } from "recoil";
import { isLoginAtom, memberIdAtom, tokenAtom } from "../../atoms";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/userInfoService";

const Header: React.FC = () => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const loginState = useRecoilValue(isLoginAtom);
  const [isRead, setRead] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAlarmSetting, setAlarmSetting] = useState<boolean>(false);

  const openModal = () => {
    if (isModalOpen !== false) {
      setModalOpen(false);
    } else {
      setRead(false);
      setModalOpen(true);
    }
  };

  const convertToRead = () => {
    if (isRead !== true) {
      setModalOpen(false);
      setRead(true);
    } else {
      setRead(false);
    }
  };
  const { data } = useQuery<any>({
    queryKey: ["userInfo", memberId, token],
    queryFn: () => getUserInfo(Number(memberId), token),
  });

  return (
    <HeaderContainer>
      <HeaderBox>
        <Link to={loginState ? "/feeds" : "/"}>
          <Logo />
        </Link>

        <MiddleButtonContainer>
          <Link to="/feeds">
            <MainButtonStyle />
          </Link>
          <Link to="/petmap">
            <MapButtonStyle />
          </Link>
          <Link to="/create">
            <CreateFeedButtonStyle />
          </Link>

          <NotificationsContainer onClick={convertToRead}>
            {isRead === false ? <RedPointStyle /> : <NotificationsStyle />}
          </NotificationsContainer>
        </MiddleButtonContainer>
        <UserImgForm
          width={50}
          height={50}
          radius={50}
          URL={data?.data.image ? data?.data.image : null}
          onClick={openModal}
        />
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
