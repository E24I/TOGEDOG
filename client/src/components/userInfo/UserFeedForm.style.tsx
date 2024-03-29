import { styled } from "styled-components";
import { ReactComponent as Feeds } from "../../assets/images/icons/Feeds.svg";
import { ReactComponent as Heart } from "../../assets/images/icons/HeartFalse.svg";
import { ReactComponent as BookMark } from "../../assets/images/icons/BookmarkFalse.svg";
import { ReactComponent as Logo } from "../../assets/images/logos/Logo.svg";

export const MyFeedContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  float: left;
`;
export const TapContainer = styled.div`
  width: 708px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
export const TapMenuOff = styled.div`
  width: 236px;
  height: 70px;
  path {
    fill: #d7d7d7;
  }
  button {
    margin: 0 auto;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const TapMenuOn = styled.div`
  width: 236px;
  height: 70px;
  border-bottom: 3px solid black;
  path {
    fill: black;
  }
  button {
    margin: 0 auto;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FeedContainer = styled.div`
  border-top: 1px solid #d7d7d7;
  & > div {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5px;
  }
`;
export const NoneFeedBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 20px 0;
`;
export const MyFeeds = styled(Feeds)``;
export const Hearts = styled(Heart)`
  width: 36px;
  height: 36px;
`;
export const BookMarks = styled(BookMark)`
  width: 36px;
  height: 36px;
`;
export const LogoImg = styled(Logo)`
  margin-top: 20px;
`;

import React, { useEffect, useState } from "react";

const Page = () => {
  const [nowTime, setNowTime] = useState(Math.floor(new Date().getTime()));
  const src = `http://grafana.app.vanager.ai/d-solo/c7647705-774b-4b5a-b653-bb007713f532/7JuM7LmY66eI7J28IOuqqOuLiO2EsOungQ?orgId=1&from=1708214977314&to=${nowTime}&panelId=30`;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNowTime(Math.floor(new Date().getTime()));
      console.log(nowTime);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [nowTime]);

  return (
    <div>
      <iframe src={src} width="450" height="350" title="test" frameBorder="0" />
    </div>
  );
};

export default Page;
