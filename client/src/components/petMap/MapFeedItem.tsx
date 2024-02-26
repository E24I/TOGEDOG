import React, { useState } from "react";
import {
  MapFeed,
  MapFeedContent,
  MapFeedProfile,
  MapFeedUserName,
  MapFeedAdress,
  MapFeedContents,
  MapFeedTitle,
  MapFeedMedia,
  MapFeedStatus,
  MapFeedCover,
  MapFeedLike,
  MapFeedReply,
  Message,
} from "./MapFeed.style";
import FeedDetail from "../petFeed/FeedDetail";
import { Unknown } from "../petFeed/Feed.Style";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useNavigate } from "react-router-dom";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import { useFeedBookmark, useFeedLike } from "../../hooks/FeedHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";

interface OwnProps {
  el: any;
  handleGetFeedId: (id: number) => void;
}

const MapFeedItem: React.FC<OwnProps> = ({ el, handleGetFeedId }) => {
  const navigate = useNavigate();
  const accesstoken = useRecoilValue(tokenAtom);
  // const [isDetail, setDetail] = useState(false);
  // const handleOpenDetail = (): void => setDetail(!isDetail);

  const { mutate: feedLike } = useFeedLike(el.feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(el.feedId, accesstoken);

  return (
    <MapFeed>
      <MapFeedProfile>
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
          <Unknown />
        )}
        <MapFeedUserName>{el.member.nickname}</MapFeedUserName>
        <MapFeedAdress></MapFeedAdress>
      </MapFeedProfile>
      <MapFeedContents>
        <MapFeedTitle>{el.title}</MapFeedTitle>
        {el.content && (
          <MapFeedContent dangerouslySetInnerHTML={{ __html: el.content }} />
        )}
      </MapFeedContents>
      {el.images[0] && <MapFeedMedia src={el.images[0]} alt="" />}
      <MapFeedStatus>
        <MapFeedLike>
          <Heart
            width="20px"
            height="20px"
            isLike={el.likeYn}
            handleFunc={feedLike}
          />
          <span>{el.likeCount}</span>
        </MapFeedLike>
        <MapFeedReply>
          <Message />
          <span>{el.repliesCount}</span>
        </MapFeedReply>
        <Bookmark
          width="20px"
          height="20px"
          isBookmark={el.bookmarkYn}
          handleFunc={feedBookmark}
        />
      </MapFeedStatus>
      <MapFeedCover
        className="cover"
        onClick={() => handleGetFeedId(el.feedId)}
      >
        <span>상세보기</span>
      </MapFeedCover>
      {/* {isDetail && (
        <FeedDetail feedId={el.feedId} handleOpenDetail={handleOpenDetail} />
      )} */}
    </MapFeed>
  );
};

export default MapFeedItem;
