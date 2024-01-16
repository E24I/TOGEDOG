import React, { useState } from "react";
import {
  SideFeedList,
  SideImage,
  SideImageBox,
  SideImageCover,
  SideListCategory,
  SideListContent,
  SideListContents,
  SideListHeader,
  SideListTitle,
  SideMedia,
  SideNoneImage,
} from "./PetMap.Style";
import FeedDetail from "../petFeed/FeedDetail";
import { Profile, ProfileBox, Unknown, UserName } from "../petFeed/Feed.Style";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useNavigate } from "react-router-dom";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import styled from "styled-components";
import { useFeedBookmark, useFeedLike } from "../../hooks/FeedHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";

interface OwnProps {
  el: any;
}

const MapFeedItem: React.FC<OwnProps> = ({ el }) => {
  const navigate = useNavigate();
  const accesstoken = useRecoilValue(tokenAtom);
  const [moreImg, setMoreImg] = useState(false);
  const [isDetail, setDetail] = useState(false);
  const handleMoreReview = (): void => setDetail(!isDetail);

  const { mutate: feedLike } = useFeedLike(el.feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(el.feedId, accesstoken);

  return (
    <>
      <SideFeedList>
        <SideListHeader>
          <Profile>
            {el.member.imageUrl ? (
              <UserImgForm
                width={50}
                height={50}
                radius={50}
                URL={el.member.imageUrl}
                onClick={() => {
                  navigate(`/user/${el.member.memberId}`);
                }}
              />
            ) : (
              <ProfileBox>
                <Unknown />
              </ProfileBox>
            )}
            <UserName>
              {el.member.nickname}
              <SideListCategory>댓글 {el.repliesCount}</SideListCategory>
            </UserName>
          </Profile>
        </SideListHeader>
        <SideListContents>
          <SideListTitle>{el.title}</SideListTitle>
          <SideListContent dangerouslySetInnerHTML={{ __html: el.content }} />
        </SideListContents>
        {el.images[0] && (
          <SideMedia>
            <SideImage src={el.images[0]} alt="" />
            <SideImageBox>
              {moreImg && el.images[2] && (
                <SideImageCover onMouseOut={() => setMoreImg(false)} />
              )}
              <SideNoneImage
                onMouseOver={() => setMoreImg(true)}
                src={el.images[0]}
                alt=""
              />
            </SideImageBox>
          </SideMedia>
        )}
        <SideStatus>
          <SideHeart>
            <Heart
              width="20px"
              height="20px"
              isLike={el.likeYn}
              handleFunc={feedLike}
            />
            <span>{el.likeCount}</span>
          </SideHeart>
          <Bookmark
            width="20px"
            height="20px"
            isBookmark={el.bookmarkYn}
            handleFunc={feedBookmark}
          />
        </SideStatus>
        <SideMoreDetail onClick={() => setDetail(true)}>
          [상세보기]
        </SideMoreDetail>
      </SideFeedList>
      {isDetail && (
        <FeedDetail feedId={el.feedId} handleMoreReview={handleMoreReview} />
      )}
    </>
  );
};

export default MapFeedItem;

export const SideStatus = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: start;
`;
export const SideHeart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const SideMoreDetail = styled.button`
  position: absolute;
  bottom: 15px;
  right: 4%;
  color: rgb(173, 173, 173);
  font-weight: 600;
`;
