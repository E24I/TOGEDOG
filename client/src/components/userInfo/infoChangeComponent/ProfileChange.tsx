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

const ProfileChange: React.FC<{
  setChangeInfo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setChangeInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //각각 input 태그 value 호출
  const NickName = watch("NickName", "");
  const introduction = watch("introduction", "");

  const handleModal = () => {
    setChangeInfo(false);
  };
  return (
    <ChangeForm>
      <ChangeContainer>
        <Topbox>
          <BackIcon onClick={handleModal} />
          <h3>프로필 설정</h3>
          <button
            className="submitButton"
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
          >
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
          <form>
            <div>
              <TextInput>
                <p>닉네임 변경</p>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="기존닉네임."
                  autoComplete="off"
                  {...register("NickName")}
                />
                <button>중복확인</button>
              </TextInput>
              {/*추후 중복확인 후 오류 메세지 띄어줄거임 */}
              {/* {errors.email && (
                <ErrorMsg>
                  <p></p>
                </ErrorMsg>
              )} */}
            </div>
            <div>
              <TextInput>
                <p>소개글 변경</p>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="기존 소개글."
                  autoComplete="off"
                  {...register("introduction")}
                />
              </TextInput>
            </div>
          </form>
        </InputBox>
      </ChangeContainer>
    </ChangeForm>
  );
};

export default ProfileChange;
