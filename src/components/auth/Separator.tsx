import styled from "styled-components";

const StyledSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
    font-size: 12px;
    width:5em;
  }
`;

const Separator = () => {
  return (
    <StyledSeparator>
      <div></div>
      <span>또는</span>
      <div></div>
    </StyledSeparator>
  );
};

export default Separator;
