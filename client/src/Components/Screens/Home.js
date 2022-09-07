import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const [authenticated, setauthenticated] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    return navigate("/", { replace: true });
  } else {
    return (
      <div>
        <h1>Welcome to your Home page</h1>
      </div>
    );
  }
};
export default Home;
