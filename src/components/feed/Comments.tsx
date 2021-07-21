import Comment from "./Comment";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

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
      id
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
  const data = useUser();

  const { register, handleSubmit, setValue, getValues } = useForm();

  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");

    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && data?.me) {
      const newComment = {
        __typename: "Comment",
        createAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...data.me,
        },
      };

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments: (prev: any) => [...prev, newComment],
          commentCount: (commentCount: any) => ++commentCount
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );

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
