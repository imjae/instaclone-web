import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    // me가 undefined가 아닌 null인 이유는 protectedResolver함수에서 useUser함수를 사용하고,
    // 이때 token값이 일치하지않으면 null을반환하는 로직을 넣어놓았기 때문이다
    // data.me가 null이라면 실제 토큰값과  현재 로그인하려는 유저의 token값이 일치하지않기 때문이다.
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return data;
};

export default useUser;
