import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ChangeForm,
  ChangeContainer,
  Topbox,
  BackIcon,
  InputBox,
  ProfileBox,
  TextInput,
  PersonIcon,
  ChangeImgButton,
} from "./ProfileChange.style";
import {
  usePatchUserNickname,
  usePatchUserIntro,
  usePatchImg,
} from "../../../hooks/UserInfoHook";
import { ChageData } from "../../../types/userInfoType";
import { UserImgForm } from "../../../atoms/imgForm/ImgForm";
import { AttachingInput } from "../../petFeed/writingSpace/CreatingSpace/Upload.Style";
import { getPresignedUrl, uploadToS3 } from "../../../services/feedService";

const ProfileChange: React.FC<ChageData> = ({
  setChangeInfo,
  nickname,
  intro,
  img,
}) => {
  const { register, watch } = useForm();
  let imgURL = "";
  const [imageFiles, setImageFiles] = useState<{
    file: File | null;
    name: string;
    type: string;
  }>({ file: null, name: "", type: "" });
  //각각 input 태그 value 호출
  const newNickname = watch("NickName", "");
  const introduction = watch("introduction", "");
  const { mutate: patchNicknameMutate } = usePatchUserNickname(newNickname);
  const { mutate: patchIntroMutate } = usePatchUserIntro(introduction);
  const { mutate: patchImgMutate } = usePatchImg(imgURL);
  const handleModal = () => {
    setChangeInfo(false);
  };
  const handelChange = () => {
    getPresignedUrl(imageFiles.name).then((res) => {
      uploadToS3(res, imageFiles.file, imageFiles.type).then((res) => {
        if (res.config.url) {
          imgURL = res.config.url.substring(0, res.config.url.indexOf("?"));
        }
      });
    });
    patchImgMutate();
    setChangeInfo(false);
  };
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const name = file.name;
      const type = file.type;
      setImageFiles({ file: file, name: name, type: type });
    }
  };
  const handleNickname = () => {
    newNickname ? patchNicknameMutate() : alert("닉네임을 입력해주세요.");
  };
  const handleIntro = () => {
    introduction.length < 9
      ? alert("소개글은 10자 이상이어야 합니다.")
      : patchIntroMutate();
  };
  return (
    <ChangeForm>
      <ChangeContainer>
        <Topbox>
          <BackIcon onClick={handleModal} />
          <h3>프로필 설정</h3>
          <button className="submitButton" onClick={handelChange}>
            완료
          </button>
        </Topbox>
        <ProfileBox>
          <AttachingInput
            id="add_image"
            type="file"
            accept="image/*"
            onChange={uploadImg}
          />
          {imageFiles.file ? (
            <UserImgForm
              width={100}
              height={100}
              radius={50}
              URL={URL.createObjectURL(imageFiles.file)}
            />
          ) : (
            <UserImgForm width={100} height={100} radius={50} />
          )}
          <ChangeImgButton htmlFor="add_image">
            프로필사진 바꾸기
          </ChangeImgButton>
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
                  {...register("introduction", {
                    required: true,
                    minLength: 10,
                  })}
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
