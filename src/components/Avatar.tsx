import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  align-items: center;
`;

const Avatar = ({ url = "" }) => {
  return <StyledAvatar>{url !== "" ? <Img src={url} /> : null}</StyledAvatar>;
};

export default Avatar;
