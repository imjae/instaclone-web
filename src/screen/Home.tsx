import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      caption
      likeCount
      commentCount
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const UserName = styled(FatText)`
  margin-left: 5px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data?.seeFeed?.map((photo: any) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <UserName>{photo.user.userName}</UserName>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
