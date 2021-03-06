import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FatText } from "../shared";
import Avatar from "../Avatar";
import Comments from "./Comments";
import { gql, useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import { Link } from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const UserName = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

interface IComments {
  id: number;
  user: {
    userName: string;
    avatar?: string;
  };
  payload: string;
  isMine: boolean;
  createdAt: string;
}

interface IPhotoProps {
  id: number;
  user: {
    userName: string;
    avatar?: string;
  };
  file: string;
  isLiked: boolean;
  likeCount: number;
  caption?: string;
  commentCount: number;
  comments: IComments[];
}

const Photo = ({
  id,
  user: { userName, avatar },
  file,
  isLiked,
  likeCount,
  caption,
  commentCount,
  comments,
}: IPhotoProps) => {
  const updateToggleLike = (cache: any, mutationResult: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = mutationResult;
    if (ok) {
      const cacheId = `Photo:${id}`;
      cache.modify({
        id: cacheId,
        fields: {
          isLiked: (prev: boolean) => !prev,
          likeCount: (prev: number) => (isLiked ? --prev : ++prev),
        },
      });
    }
  };

  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    // ????????? ????????? ???????????? ????????? ????????? ?????? ???????????????. feed_query ????????? ????????? ??? ????????? ????????????????????? ????????? ????????????
    // ????????? ????????? ??????????????? ???????????? ???????????? ?????? ???????????? ??????.
    // cache??? ???????????? ????????? ??? ???????????? ????????? ??????. ????????? ??????????????? ?????????. backend ??? ?????? ???????????? ?????????.
    // refetchQueries: [{
    //   query: FEED_QUERY
    // }]
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${userName}`}>
          <Avatar lg url={avatar} />
        </Link>
        <Link to={`/users/${userName}`}>
          <UserName>{userName}</UserName>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Likes>
        <Comments
          photoId={id}
          author={userName}
          caption={caption}
          comments={comments}
          commentCount={commentCount}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
