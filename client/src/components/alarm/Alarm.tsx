import React from "react";
import {
  AlarmBackground,
  AlarmContainer,
  AlarmLists,
  AlarmList,
} from "./Alarm.Style";

//임시 알람 정보
const alarms = [
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
  "알림이 도착해씁니다",
];

interface AlarmProps {
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alarm: React.FC<AlarmProps> = ({ setRead }) => {
  const closeAlarm = () => {
    setRead(false);
  };

  return (
    <AlarmContainer>
      <AlarmBackground onClick={closeAlarm} />
      <AlarmLists>
        {alarms.map((alarm, idx) => {
          return <AlarmList key={idx}>{alarm}</AlarmList>;
        })}
      </AlarmLists>
    </AlarmContainer>
  );
};

export default Alarm;
