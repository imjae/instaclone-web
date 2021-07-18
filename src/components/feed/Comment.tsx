import React from "react";
import { Link } from "react-router-dom";
import { FatText } from "../shared";
import styled from "styled-components";

const CommentsContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = ({ author, payload }: any) => {
  return (
    <CommentsContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word: string, index: number) =>
          /#[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentsContainer>
  );
};

export default Comment;
