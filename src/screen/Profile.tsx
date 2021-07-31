import { useParams } from "react-router-dom";

const Profile = () => {
  const {userName} : {userName : string} = useParams();
  console.log(userName);

  return <div><h1>{userName}</h1></div>;
};

export default Profile;