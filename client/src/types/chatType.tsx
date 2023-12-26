export type createNewChatType = {
  requestMemberId: number;
  inviteMemberId: number;
};
export type roomsDataType = {
  chatRoomId: number;
  otherMemberId: number;
  latestMessage: string;
  createdAt: string;
};
export type messagesType = {
  messageId: number;
  memberId: number;
  content: string;
  createdAt: string;
}[];
export type searchedUserType = {
  memberId: number;
  nickname: string;
  imageUrl: string;
};
