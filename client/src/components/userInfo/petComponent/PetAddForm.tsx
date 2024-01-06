import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  PetAddContainer,
  TopBox,
  BackIcon,
  Title,
  MiddleBox,
  RegisterButton,
  Input,
  RadioBox,
  Textarea,
  ImgBox,
} from "./PetAdd.style";
import { postPetInfo } from "../../../services/userInfoService";
import { tokenAtom, memberIdAtom } from "../../../atoms";
import { AttachingInput } from "../../petFeed/writingSpace/CreatingSpace/Upload.Style";
import { PetImgForm } from "../../../atoms/imgForm/ImgForm";
import { ChangeImgButton } from "../infoChangeComponent/ProfileChange.style";
import { getPresignedUrl, uploadToS3 } from "../../../services/feedService";
import { ErrorMsg } from "../../signUpElement/SignUpInputs.style";
import { queryClient } from "../../..";

const PetAddForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFiles, setImageFiles] = useState<{
    file: File | null;
    name: string;
    type: string;
  }>({ file: null, name: "", type: "" });
  const toekn = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  let imgURL = "";
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const name = file.name;
      const type = file.type;
      setImageFiles({ file: file, name: name, type: type });
    }
  };
  const onSubmit = async (data: any) => {
    if (imageFiles.file !== null) {
      await getPresignedUrl(imageFiles.name).then((res) => {
        uploadToS3(res, imageFiles.file, imageFiles.type).then((res) => {
          if (res.config.url) {
            imgURL = res.config.url.substring(0, res.config.url.indexOf("?"));
            const realData = { ...data, image: imgURL };
            postPetInfo(realData, toekn);
            navigate(-1);
            queryClient.invalidateQueries({ queryKey: ["userInfo"] });
            return;
          }
        });
      });
    } else {
      postPetInfo(data, toekn);
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigate(`/user/${memberId}`);
    }
  };
  return (
    <PetAddContainer>
      <TopBox>
        <BackIcon onClick={() => navigate(-1)} />
        <Title>펫 등록</Title>
      </TopBox>
      <MiddleBox>
        <ImgBox>
          <AttachingInput
            id="add_image"
            type="file"
            accept="image/*"
            onChange={uploadImg}
          />
          {imageFiles.file ? (
            <PetImgForm
              width={200}
              height={200}
              radius={50}
              URL={URL.createObjectURL(imageFiles.file)}
            />
          ) : (
            <PetImgForm width={200} height={200} radius={50} URL={null} />
          )}
          <ChangeImgButton htmlFor="add_image">프로필사진 추가</ChangeImgButton>
        </ImgBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="반려동물의 이름 입력해주세요."
            autoComplete="off"
            {...register("name", { required: true })}
          />
          <Input
            type="text"
            placeholder="반려동물의 종류를 입력해주세요."
            autoComplete="off"
            {...register("type")}
          />
          <Input
            type="text"
            placeholder="반려동물의 나이를 입력해주세요."
            autoComplete="off"
            {...register("age", {
              required: true,
              pattern: /^[0-9]*$/,
            })}
          />
          {errors.age && (
            <ErrorMsg>
              <p>반려동물의 나이를 숫자만 입력해주세요.</p>
            </ErrorMsg>
          )}
          <Textarea
            placeholder="반려동물의 소개를 자유롭게 입력해주세요."
            autoComplete="off"
            {...register("petIntro")}
          />
          <RadioBox>
            <label>
              여자
              <input
                type="radio"
                value="FEMALE"
                {...register("gender", { required: true })}
              />
            </label>
            <label>
              남자
              <input
                type="radio"
                value="MALE"
                {...register("gender", { required: true })}
              />
            </label>
          </RadioBox>
          <RegisterButton type="submit">등록</RegisterButton>
        </form>
      </MiddleBox>
    </PetAddContainer>
  );
};

export default PetAddForm;
