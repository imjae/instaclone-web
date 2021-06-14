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
import { gql, useMutation } from "@apollo/client";

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

interface IPhotoProps {
  id: number;
  user: {
    userName: string;
    avatar?: string;
  };
  file: string;
  isLiked: boolean;
  likeCount: number;
}

const Photo = ({
  id,
  user: { userName, avatar },
  file,
  isLiked,
  likeCount,
}: IPhotoProps): any => {
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    // 쿼리의 응답을 받게되면 지정한 쿼리를 다시 실행시킨다. feed_query 와같이 비용이 큰 쿼리를 리패치하는것은 안좋은 방법이나
    // 가벼운 쿼리를 적용할때는 간편하게 사용할수 있어 좋을수도 있다.
    // refetchQueries: [{
    //   query: FEED_QUERY
    // }]
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={avatar} />
        <UserName>{userName}</UserName>
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
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
