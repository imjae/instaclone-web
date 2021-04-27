import {
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import Separator from "../components/auth/Separator";
import routes from "../routes";
import PageTitle from "../components/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SubtitleSmall = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: rgb(142, 142, 142);
`;

const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="Sign up"/>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            친구들의 사진과 동영상을 보려면 가입하세요.
          </Subtitle>
          <Separator />
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <Input type="text" placeholder="성명" />
          <Input type="text" placeholder="사용자 이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value="가입" />
        </form>
        <SubtitleSmall>
          가입하면 Instagram의 <strong>약관</strong>, <strong>데이터 정책</strong> 및 <strong>쿠키 정책</strong>에 동의하게 됩니다.
        </SubtitleSmall>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
