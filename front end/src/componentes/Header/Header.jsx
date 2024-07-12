import { Link } from "react-router-dom";
import { useLoginStore } from "../../stores/useLoginStore";
import { useLogStore } from "../../stores/useLogStore";

import Logout from "../Logout/Logout"



function Header() {
  const { toggleLoginShow } = useLoginStore();
  const isLoggedIn = useLogStore((state) => state.isLoggedIn);

  return (
    <div className="header">
      <div className="header_logo">
        <img src="https://placekitten.com/184/84"></img>

        <h1> My E-commerce</h1>
      </div>
      <div className="header_links">
        <Link className="header_links_link" to={"/"}>
          Home
        </Link>
        {isLoggedIn ? (
          <Logout/>
        ) : (
          <Link
            className="header_links_link"
            to={"/"}
            onClick={() => toggleLoginShow()}
          >
            Login
          </Link>
        )}
        <Link className="header_links_link" to={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Header;
