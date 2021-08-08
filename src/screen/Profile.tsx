import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

type useParamsProfile = {
  userName?: String
}

const Profile = () => {
  const { userName }: useParamsProfile = useParams();
  console.log(userName);

  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });

  console.log(data);

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
};

export default Profile;
