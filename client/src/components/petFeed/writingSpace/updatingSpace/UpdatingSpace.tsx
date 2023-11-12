import React from "react";
import {
  UpdateSpace,
  FeedOwner,
  FeedContent,
  FeedOwnerImg,
  IdAndAddress,
  Id,
  Address,
  FeedItems,
  FeedTitle,
  FeedImages,
  LeftButton,
  RightButton,
  Images,
  Img,
} from "./UpdatingSpace.Style";

const UpdatingSpace: React.FC = () => {
  return (
    <UpdateSpace>
      <FeedOwner>
        <FeedOwnerImg />
        <IdAndAddress>
          <Id>세계 최강 귀요미 몽자</Id>
          <Address>멍멍 애견 카페</Address>
        </IdAndAddress>
      </FeedOwner>
      <FeedItems>
        <FeedTitle>애카 가서 신난 몽자</FeedTitle>
        <FeedContent>
          저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히 기여운
          몽자 보고 가세요
        </FeedContent>
        <FeedImages>
          <LeftButton />
          <Images>
            {/* 피드 이미지 매핑 구간 */}
            <Img />
            <Img />
            <Img />
          </Images>
          <RightButton />
        </FeedImages>
      </FeedItems>
    </UpdateSpace>
  );
};

export default UpdatingSpace;
