import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const onUserNameChange = (event: any) => {
    setUserName(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setUserNameError("");
    if (userName === "") {
      setUserNameError("Not empty pls.");
    }
    if (userName.length < 10) {
      setUserNameError("Too short");
    }
  };
  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit}>
          {userNameError}
          <Input
            onChange={onUserNameChange}
            value={userName}
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
          />
          <Input type="password" placeholder="비밀번호" />
          <Button
            type="submit"
            value="Log in"
            disabled={userName === "" && userName.length < 10}
          />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요?"
        linkText="가입하기"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
