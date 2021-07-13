import styled from "styled-components";

interface StyledAvatarProps {
  lg: Boolean;
}

interface IAvatarProps {
  lg?: boolean;
  url?: any;
}

const StyledAvatar = styled.div<StyledAvatarProps>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }:IAvatarProps) => {
  return (
    <StyledAvatar lg={lg}>
      {url !== "" ? <Img src={url} /> : null}
    </StyledAvatar>
  );
};

export default Avatar;
