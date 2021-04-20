import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  font-size: 12px;
`;

const Input = (props: any) => {
  return <StyledInput {...props} />;
};

export default Input;