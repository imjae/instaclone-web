import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
// import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";

const StyledHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 500;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const data = useUser();

  return (
    <StyledHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Button onClick={() => logUserOut()}>Log out!</Button>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.userName}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>

              {/* {data?.me?.avatar ? (
                ""
              ) : (
                <Icon>
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Icon>
              )} */}
            </IconsContainer>
          ) : (
            <Link to="" href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;
