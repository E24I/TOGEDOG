import React from "react";
import * as U from "./UpdatingSpace.Style";

const UpdatingSpace: React.FC = () => {
  return (
    <U.UpdateSpace>
      <U.FeedOwner>
        <U.FeedOwnerImg />
        <U.IdAndAddress>
          <U.Id>세계 최강 귀요미 몽자</U.Id>
          <U.Address>멍멍 애견 카페</U.Address>
        </U.IdAndAddress>
      </U.FeedOwner>
      <U.FeedItems>
        <U.FeedTitle>애카 가서 신난 몽자</U.FeedTitle>
        <U.FeedContent>
          저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히 기여운
          몽자 보고 가세요
        </U.FeedContent>
        <U.FeedImages>
          <U.LeftButton />
          <U.Images>
            {/* 피드 이미지 매핑 구간 */}
            <U.Img />
            <U.Img />
            <U.Img />
          </U.Images>
          <U.RightButton />
        </U.FeedImages>
      </U.FeedItems>
    </U.UpdateSpace>
  );
};

export default UpdatingSpace;
