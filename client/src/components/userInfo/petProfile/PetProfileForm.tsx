import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import {
  ProfileForm,
  TopBox,
  ContentBox,
  HeadText,
  BackIcon,
  ModifyButton,
  ImgInfo,
  TextInfo,
  NameText,
  Introduction,
  CategoryBox,
  DeleteButton,
  Form,
  CategoryForm,
} from "./PetProfileForm.style";
import { useDeletePetImg, usePatchPetIntro } from "../../../hooks/UserInfoHook";
import { confirmAtom, tokenAtom, memberIdAtom } from "../../../atoms";
import {
  getPetInfo,
  patchPetProfileImg,
} from "../../../services/userInfoService";
import { PetImgForm } from "../../../atoms/imgForm/ImgForm";
import { petIntro } from "../../../types/userInfoType";
import {
  ChangeImgButton,
  SelectImgBox,
} from "../infoChangeComponent/ProfileChange.style";
import { AttachingInput } from "../../petFeed/writingSpace/CreatingSpace/Upload.Style";
import { getPresignedUrl, uploadToS3 } from "../../../services/feedService";
import { queryClient } from "../../..";

const PetProfileForm = () => {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useRecoilState(confirmAtom);
  const { petId } = useParams<{ petId: string }>();
  const currentPetId = petId || "";
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const [petData, setPetData] = useState<petIntro>({ petIntro: "" });
  const [imageFiles, setImageFiles] = useState<{
    file: File | null;
    name: string;
    type: string;
  }>({ file: null, name: "", type: "" });
  const [isEditing, setIsEditing] = useState(false); // 수정 상태

  const handleEdit = () => {
    setIsEditing(true); // 수정 상태로 전환
  };
  const { register, handleSubmit } = useForm();
  const { mutate: patchPet } = usePatchPetIntro(petData, currentPetId);
  const { mutate: deletePetImg } = useDeletePetImg(Number(petId));

  //수정 누르고 수정후 저장버튼을 누르면 실행
  const onSubmit = (data: any) => {
    setIsEditing(false);
    if (data.petIntro !== "") {
      setPetData(data);
      patchPet();
    }
    handelChange();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["petInfo", currentPetId, token],
    queryFn: () => getPetInfo(currentPetId, token),
  });

  //펫 프로필이미지 변경
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const name = file.name;
      const type = file.type;
      setImageFiles({ file: file, name: name, type: type });
    }
  };
  let imgURL = "";
  const handelChange = async () => {
    if (imageFiles.file !== null) {
      await getPresignedUrl(imageFiles.name).then((res) => {
        uploadToS3(res, imageFiles.file, imageFiles.type).then((res) => {
          if (res.config.url) {
            imgURL = res.config.url.substring(0, res.config.url.indexOf("?"));
            patchPetProfileImg(imgURL, token, Number(currentPetId)).then(() => {
              queryClient.invalidateQueries({ queryKey: ["petInfo"] });
              navigate(-1);
            });
          }
        });
      });
    }
  };

  // 입력받아온 값으로 나이 계산
  const calculateAge = (birthdate: string) => {
    // 'YYYYMMDD' 형식의 문자열을 'YYYY-MM-DD' 형식으로 변환
    const formattedBirthdate = birthdate.replace(
      /(\d{4})(\d{2})(\d{2})/,
      "$1-$2-$3",
    );

    // 생일 기준 Date 생성
    const birthDate = new Date(formattedBirthdate);

    // 현재 날짜 기준 Date 생성
    const today = new Date();

    // 나이 계산
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // 펫 삭제 컨펌모달
  const handleDeleteAlert = () =>
    setAlertModal({
      ...alertModal,
      sort: "deletePet",
      content: "삭제하시겠습니까?",
      currentPetId: currentPetId,
    });
  if (error) {
    return <div>{petId}Error</div>;
  }
  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <ProfileForm>
      <TopBox>
        <BackIcon onClick={() => navigate(-1)} />
        <HeadText>{`${data?.data.name}`} 프로필</HeadText>
        {data?.data.memberInfo.memberId === memberId && (
          <div>
            {!isEditing ? (
              <ModifyButton onClick={handleEdit}>수정</ModifyButton>
            ) : (
              <ModifyButton onClick={handleSubmit(onSubmit)}>저장</ModifyButton>
            )}
          </div>
        )}
      </TopBox>
      <ContentBox>
        <Form
          onSubmit={(e) => {
            e.preventDefault;
          }}
        >
          <ImgInfo>
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
              <PetImgForm
                width={200}
                height={200}
                radius={50}
                URL={data?.data.image}
              />
            )}
            {isEditing && (
              <SelectImgBox>
                <ChangeImgButton htmlFor="add_image">
                  프로필사진 선택
                </ChangeImgButton>
                <ChangeImgButton onClick={() => deletePetImg()}>
                  프로필사진 삭제
                </ChangeImgButton>
              </SelectImgBox>
            )}
            <NameText>
              <strong>{data?.data.name}</strong> ∙
              {calculateAge(data?.data.age.toString())}살
            </NameText>
            {isEditing ? (
              <textarea
                placeholder={data?.data.petIntro}
                {...register("petIntro")}
              />
            ) : (
              <Introduction>
                {data?.data.petIntro
                  ? data.data.petIntro
                  : "등록된 소개가 없습니다."}
              </Introduction>
            )}
          </ImgInfo>
          <TextInfo>
            <CategoryBox>
              <CategoryForm>
                <h3>견종</h3>
                {<p>{data?.data.type ?? "등록된 견종이 없습니다."}</p>}
              </CategoryForm>
              <CategoryForm>
                <h3>생일</h3>
                <p>
                  {data?.data.age
                    .toString()
                    .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}
                </p>
              </CategoryForm>
              <CategoryForm>
                <h3>성별</h3>
                {<p>{data?.data.gender === "FEMALE" ? "여자" : "남자"}</p>}
              </CategoryForm>
            </CategoryBox>
          </TextInfo>
        </Form>
      </ContentBox>
      <DeleteButton onClick={handleDeleteAlert}>삭제</DeleteButton>
    </ProfileForm>
  );
};

export default PetProfileForm;
