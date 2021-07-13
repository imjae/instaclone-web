import { FatText } from "../shared";
import styled from "styled-components";

const CommentsContainer = styled.div`
`;
const CommentCaption = styled.span`
margin-left: 10px;
`;

const Comment = ({author, payload}: any) => {
  return (
    <CommentsContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentsContainer>
  );
};

export default Comment;
