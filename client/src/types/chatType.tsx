export type createNewChatType = {
  requestMemberId: number;
  inviteMemberId: number;
};
export type roomsDataType = {
  chatRoomId: number;
  otherMember_id: number;
  latestMessage: string;
  createdAt: string;
};
export type messagesType = {
  messageId: number;
  memberId: number;
  content: string;
  createdAt: string;
}[];
