import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const StyledBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

interface bottomBoxType {
	cta: string;
	link: string;
	linkText: string;
}

const BottomBox = ({ cta, link, linkText }: bottomBoxType): any => {
  return (
    <StyledBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </StyledBottomBox>
  );
};

export default BottomBox;
