import { useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, error, token },
      } = data;

      if (!ok) {
        setError("result", {
          message: error,
        });
      }
    },
  });

  const clearLoginError = () => {
    clearErrors("result");
  };

  const onSubmitValid = (data: any) => {
    //console.log(data);
    if (loading) {
      return;
    }
    const { userName, password } = getValues();
    login({
      variables: {
        userName,
        password,
      },
    });
  };

  const onSubmitInvalid = (data: any) => {
    //console.log(data, "invalid");
  };
  // console.log(formState);

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            ref={register({
              required: "사용자 이름을 작성해 주세요.",
              minLength: {
                value: 5,
                message: "사용자 이름을 5글자 이상으로 작성해 주세요.",
              },
              // validate: (currentValue: any) => currentValue.includes("potato")
            })}
            name="userName"
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
            hasError={Boolean(errors?.userName?.message)}
            onChange={clearLoginError}
          />
          <FormError message={errors?.userName?.message} />
          <Input
            ref={register({
              required: "비밀번호를 작성해 주세요.",
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />

          <FormError message={errors?.password?.message} />
          <Button type="submit" value="Log in" disabled={!formState.isValid} />
          <FormError message={errors?.result?.message} />
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
