import React, { useEffect } from "react";
import {
  AlarmBackground,
  AlarmContainer,
  AlarmLists,
  AlarmList,
} from "./Alarm.Style";
import { subscribeAlarm } from "../../services/memberService";

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
  setAlarm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alarm: React.FC<AlarmProps> = ({ setAlarm }) => {
  const closeAlarm = () => {
    setAlarm(false);
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
