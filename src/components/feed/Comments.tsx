import { FatText } from "../shared";
import Comment from "./Comment";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-size: 12px;
  font-weight: 600;
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const Comments = ({
  photoId,
  author,
  caption,
  commentCount,
  comments,
}: any) => {
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) {
      return;
    }

    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });

    setValue("payload", "");
  };

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentCount === 1 ? "1 comment" : `${commentCount} comments`}
      </CommentCount>
      {comments?.map((comment: any) => (
        <Comment
          key={comment.id}
          author={comment.user.userName}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

export default Comments;
