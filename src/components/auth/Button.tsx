import styled from "styled-components";

const Button = styled.input`
  border: none;
  width: 100%;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;

// propt에 뭔가 추가가 되지않을 경우 그냥 styled components를 그냥 export하는 방식
// const Button = (props: any) => {
//   return <StyledButton {...props} onClick={() => console.log(props)}/>;
// };

export default Button;
