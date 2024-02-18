import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Header() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();
  console.log(loggedData)

  function logout() {
    console.log("logout")
    localStorage.removeItem("nutrify-user");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
      data-bs-theme="dark"
      style={{ fontSize: "1.3rem" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand px-3" to="/">
          NutritionTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/track">
                Track
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/diet">
                Diet
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/register">
                Register
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {loggedData.loggedUser===null ? (
              <button className="btn btn-outline-success" type="">
              <Link className="nav-link " aria-current="page" to="/login">
                Login
              </Link>
            </button>
              
            ) : (
              <div className="btn btn-outline-success" type="button" onClick={logout}>
                  Logout
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
