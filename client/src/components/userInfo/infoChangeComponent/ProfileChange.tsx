import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMsg } from "../../signUpElement/SignUpInputs.style";
import {
  ChangeForm,
  ChangeContainer,
  Topbox,
  BackIcon,
  InputBox,
  ProfileBox,
  TextInput,
  PersonIcon,
  ProfileImg,
  ChangeImgButton,
} from "./ProfileChange.style";
import {
  usePatchUserNickname,
  usePatchUserIntro,
} from "../../../hooks/UserInfoHook";
import { ChageData } from "../../../types/userInfoType";

const ProfileChange: React.FC<ChageData> = ({
  setChangeInfo,
  nickname,
  intro,
}) => {
  const { register, watch } = useForm();
  //각각 input 태그 value 호출
  const newNickname = watch("NickName", "");
  const introduction = watch("introduction", "");
  const { mutate: patchNicknameMutate } = usePatchUserNickname(newNickname);
  const { mutate: patchIntroMutate } = usePatchUserIntro(introduction);
  const handleModal = () => {
    setChangeInfo(false);
  };
  const handelCahnge = () => {
    setChangeInfo(false);
  };
  const handleNickname = () => {
    newNickname ? patchNicknameMutate() : alert("닉네임을 입력해주세요.");
  };
  const handleIntro = () => {
    introduction ? patchIntroMutate() : alert("소개글을 입력해주세요.");
  };
  return (
    <ChangeForm>
      <ChangeContainer>
        <Topbox>
          <BackIcon onClick={handleModal} />
          <h3>프로필 설정</h3>
          <button className="submitButton" onClick={handelCahnge}>
            완료
          </button>
        </Topbox>
        <ProfileBox>
          <ProfileImg
            thumbnail={
              "https://i.pinimg.com/736x/64/63/40/646340423a648806278bfc51d055f7e6.jpg"
            }
          />
          <ChangeImgButton>프로필사진 바꾸기</ChangeImgButton>
        </ProfileBox>
        <InputBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <TextInput>
                <p>닉네임 변경</p>
                <PersonIcon />
                <input
                  type="text"
                  placeholder={nickname}
                  autoComplete="off"
                  {...register("NickName")}
                />
                <button onClick={handleNickname}>변경하기</button>
              </TextInput>
            </div>
            <div>
              <TextInput>
                <p>소개글 변경</p>
                <PersonIcon />
                <input
                  type="text"
                  placeholder={intro ? intro : "소개글을 입력해주세요"}
                  autoComplete="off"
                  {...register("introduction")}
                />
                <button onClick={handleIntro}>변경하기</button>
              </TextInput>
            </div>
          </form>
        </InputBox>
      </ChangeContainer>
    </ChangeForm>
  );
};

export default ProfileChange;
