import React, { useState } from "react";
import {
  Description,
  List,
  MiddleContainer,
  SaveBtn,
  SetAlarmBackground,
  SetAlarmContainer,
  SettingBox,
  Title,
  TopContainer,
} from "./SetAlarm.Style";
import { BackspaceButton } from "../petFeed/writingSpace/WritingSpaces.Style";

interface SetAlarmProps {
  setAlarmSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAlarm: React.FC<SetAlarmProps> = ({ setAlarmSetting }) => {
  const [isToggled, setToggled] = useState<boolean>(false);
  const lists = [
    {
      title: "게시글 좋아요 알림",
      description: "누군가 내 게시글에 좋아요를 눌렀을 때 알림을 보냅니다.",
    },
    {
      title: "게시글 댓글 알림",
      description: "누군가 내 게시글에 댓글을 등록했을 때 알림을 보냅니다.",
    },
    {
      title: "댓글 좋아요 알림",
      description: "누군가 내 댓글에 좋아요를 눌렀을 때 알림을 보냅니다.",
    },
    {
      title: "대댓글 알림",
      description: "누군가 내 댓글에 대댓글을 달았을 때 알림을 보냅니다.",
    },
    {
      title: "멘션 알림",
      description: "누군가 나를 언급했을 때 알림을 보냅니다.",
    },
    {
      title: "메시지 알림",
      description: "누군가 나에게 메시지를 보냈을 때 알림을 보냅니다.",
    },
  ];

  const toggleHandler = () => {
    if (isToggled !== false) {
      setToggled(false);
    } else {
      setToggled(true);
    }
  };

  return (
    <SetAlarmContainer>
      <SetAlarmBackground
        onClick={() => {
          setAlarmSetting(false);
        }}
      />
      <SettingBox>
        <TopContainer>
          <BackspaceButton />
          <div>알림 설정</div>
          <SaveBtn
            onClick={() => {
              setAlarmSetting(false);
            }}
          >
            완료
          </SaveBtn>
        </TopContainer>

        {lists.map((list, idx) => {
          return (
            <MiddleContainer key={idx}>
              <List>
                <Title>{list.title}</Title>
                <Description>{list.description}</Description>
              </List>
            </MiddleContainer>
          );
        })}
      </SettingBox>
    </SetAlarmContainer>
  );
};

export default SetAlarm;
