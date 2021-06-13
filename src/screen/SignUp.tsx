import { faInstagram } from "@fortawesome/free-brands-svg-icons";
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
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router";

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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data: any) => {
    const { userName, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }

    // react router dom 에서 지원하는 useHistory 기능은 단순히 url 이동뿐만 아니라 여러 기능을 지원해준다.
    // 아래와 같이 데이터를 보내는 역할도 할수 있다.
    // 아래에 history.push함수의 두번째 인자로 전달되는 객체는 useLocation() 함수로 만들어지는 location 객체에 저장된다
    // 따라서 받을 화면에서 useLocation() 함수로 state를 관리하는 변수를 작성하고, location?.state?.message 와같이 접근한다.
    history.push(routes.home, {
      message: "Account created. Pleasw log in.",
      userName,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
          <Separator />
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "성을 입력하세요.",
            })}
            name="firstName"
            type="text"
            placeholder="성"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="이름"
          />
          <Input
            ref={register({
              required: "이메일 주소를 입력하세요.",
            })}
            name="email"
            type="text"
            placeholder="이메일 주소"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: "사용자 이름을 입력해 주세요.",
              minLength: {
                value: 5,
                message: "사용자 이름을 5글자 이상으로 입력해 주세요.",
              },
              // validate: (currentValue: any) => currentValue.includes("potato")
            })}
            name="userName"
            type="text"
            placeholder="사용자 이름"
            hasError={Boolean(errors?.userName?.message)}
          />
          <FormError message={errors?.userName?.message} />
          <Input
            ref={register({
              required: "비밀번호를 입력하세요.",
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <SubtitleSmall>
          가입하면 Instagram의 <strong>약관</strong>,{" "}
          <strong>데이터 정책</strong> 및 <strong>쿠키 정책</strong>에 동의하게
          됩니다.
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
