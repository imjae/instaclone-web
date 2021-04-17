const Home = ({ setIsLoggedIn }: { setIsLoggedIn: Function }) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Log out now!</button>
    </div>
  );
};

export default Home;
