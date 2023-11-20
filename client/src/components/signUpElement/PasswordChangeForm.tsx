import React from "react";
import { useForm } from "react-hook-form";
import {
  ChangeForm,
  ChangeContainer,
  Topbox,
  BackIcon,
  MiddleBox,
} from "./PasswordChangeForm.style";

const PasswordChangeForm: React.FC<{
  setLostPw: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLostPw }) => {
  const { register, handleSubmit } = useForm();

  const handleModal = () => {
    setLostPw(false);
  };
  return (
    <ChangeForm>
      <ChangeContainer>
        <Topbox>
          <BackIcon onClick={handleModal} />
          <h3>비밀번호변경</h3>
        </Topbox>
        <MiddleBox>
          <form>
            <input />
            <input />
            <input />
            <input />
          </form>
        </MiddleBox>
      </ChangeContainer>
    </ChangeForm>
  );
};

export default PasswordChangeForm;
