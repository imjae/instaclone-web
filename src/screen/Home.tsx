import { isLoggedInVar, logUserOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Welcom we did it!</h1>
      <button onClick={logUserOut}>Log out now!</button>
    </div>
  );
};

export default Home;
