import React from "react";
import { Link } from "react-router-dom";
import { FatText } from "../shared";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

export type commentComponentType = {
  id?: number,
  photoId?: number,
  author: string,
  payload: string,
  isMine?: boolean
}

const Comment = ({ id, photoId, author, payload, isMine }: commentComponentType) => {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if(ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentCount: (prev:number) => --prev
        }
      })
    }
  };
  
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

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
      {isMine ? <button onClick={() => onDeleteClick()}> X </button> : null}
    </CommentsContainer>
  );
};

export default Comment;
