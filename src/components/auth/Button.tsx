import styled from "styled-components";

const StyledButton = styled.input`
  border: none;
  width: 100%;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
`;

const Button = (props: any) => {
  return <StyledButton {...props} onClick={() => console.log(props)}/>;
};

export default Button;
