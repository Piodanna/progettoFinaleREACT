import { useOutlet } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../../services/firebase-services";
import { setUser } from "../../State/User/userSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function MainLayout() {
  const outlet = useOutlet();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const token = Cookies.get("token");
      if (token) {
        const email = jwtDecode(token).email;
        console.log(email);
        const user = await getUser(email);
        if (user) {
          dispatch(
            setUser({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: [...user.role],
              isLogged: true,
            })
          );
        }
      }
    }
    fetchUser();
  }, );

  return (
    <>
      <Navbar />
      {outlet}
    </>
  );
}
