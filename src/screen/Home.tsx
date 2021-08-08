import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);

  console.log("Home@@@1");
  console.log(data);

  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;