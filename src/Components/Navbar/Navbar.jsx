import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../State/User/userSlice";
import Cookies from "js-cookie";

export function Navbar() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  function logout() {
    Cookies.remove("token");
    if (user) {
      dispatch(
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          role: [],
          isLogged: false,
        })
      );
    }
    navigateTo("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {!user.isLogged ? (
            <NavLink
              className="navbar-brand"
              to="/login"
              style={{ fontWeight: "bold" }}
            >
              Coursisto
            </NavLink>
          ) : (
            <NavLink
              className="navbar-brand"
              to="/"
              style={{ fontWeight: "bold" }}
            >
              Coursisto
            </NavLink>
          )}

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
              {user.isLogged && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="logged/corsi">
                    Corsi
                  </NavLink>
                </li>
              )}

              {user.role[0] === "Admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logged/newCorso">
                    Aggiungi corso
                  </NavLink>
                </li>
              )}
              {user.isLogged && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/all-users">
                    Tutti gli utenti
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="d-flex ms-auto">
              {!user.isLogged ? (
                <>
                  <NavLink className="btn btn-outline-primary me-2" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-primary" to="/registration">
                    Sign up
                  </NavLink>
                </>
              ) : (
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
