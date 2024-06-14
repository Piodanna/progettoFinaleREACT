import { useEffect, useState } from "react";
import { registerUser } from "../../../services/firebase-services";
import "./Registration.css";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";
import Icon from "react-icons-kit";
import { useNavigate } from "react-router-dom";

export function Registration() {
  const navigateTo = useNavigate();
  useEffect(()=>{
    document.title="Sign-in";
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  //Li utilizzo per controllare la password
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const passwordRegex = {
    length: /.{6,}/,
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /\d/,
    specialChar: /[@$!%*?&_]/,
  };

  useEffect(() => {}, [userData]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordValidations({
        length: passwordRegex.length.test(value),
        upperCase: passwordRegex.upperCase.test(value),
        lowerCase: passwordRegex.lowerCase.test(value),
        number: passwordRegex.number.test(value),
        specialChar: passwordRegex.specialChar.test(value),
      });
      //Verifico se la password corrisponde a quella inserita nel campo check_password e aggiorno passwordsMatch di conseguenza
      setPasswordMatch(value !== "" && value === checkPassword);
    }

    if (name === "check_password") {
      setCheckPassword(value);
      //Controllo se il valore di check_password corrisponde a userData.password e aggiorno passwordsMatch di conseguenza
      setPasswordMatch(userData.password !== "" && userData.password === value);
    }

    setUserData({ ...userData, [name]: value });
  }

  function handleReset() {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setCheckPassword("");
    setPasswordMatch(false);
    setPasswordValidations({
      length: false,
      upperCase: false,
      lowerCase: false,
      number: false,
      specialChar: false,
    });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { length, upperCase, lowerCase, number, specialChar } =
      passwordValidations;

    if (!emailRegex.test(userData.email)) {
      setError("Formato email non valido");
      return;
    }

    if (!length || !upperCase || !lowerCase || !number || !specialChar) {
      setError("La password non soddisfa tutti i requisiti");
      return;
    }

    if (!passwordMatch) {
      setError("Le password non corrispondono");
      return;
    }

    try {
      await registerUser(userData);
      swal({
        title: "Registrazione effettuata con successo!",
        icon: "success",
        button: "Vai al login",
      });
      //await createLog(`INFO: Accesso autorizzato ${data.email}`);
      navigateTo("/login");
      handleReset();
      
    } catch (error) {
      swal({
        title: "Errore durante la registrazione!",
        icon: "error",
        button: "Riprovare",
      });
      //await createLog(`ERROR: Accesso autorizzato ${data.email}`);
      setError(error.message);
    }
  }

  return (
    <>
      <div className="container text-center" style={{ width: "50%" }}>
        <div className="row">
          <div className="col mb-3">
            <h3>Registrazione</h3>
          </div>
          <div className="row">
            <div className="col mb-3">
              <form action="" method="post" onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="row justify-content-center">
                  <div className="col-7 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Inserisci il nome"
                      id="firstName"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-7 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Cognome
                    </label>
                    <input
                      type="text"
                      placeholder="Inserisci il cognome"
                      id="lastName"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-7 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Inserisci l'email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-7 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Inserisci la password"
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-7 mb-3">
                    <input
                      type="password"
                      placeholder="Inserisci nuovamente la password"
                      id="check_password"
                      name="check_password"
                      value={checkPassword}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <main className="tracker-box col-7">
                  <div
                    className={passwordValidations.length ? "valid" : "invalid"}
                  >
                    {passwordValidations.length ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Almeno 6 caratteri
                  </div>
                  <div
                    className={
                      passwordValidations.upperCase ? "valid" : "invalid"
                    }
                  >
                    {passwordValidations.upperCase ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Almeno una lettera maiuscola
                  </div>
                  <div
                    className={
                      passwordValidations.lowerCase ? "valid" : "invalid"
                    }
                  >
                    {passwordValidations.lowerCase ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Almeno una lettera minuscola
                  </div>
                  <div
                    className={passwordValidations.number ? "valid" : "invalid"}
                  >
                    {passwordValidations.number ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Almeno un numero
                  </div>
                  <div
                    className={
                      passwordValidations.specialChar ? "valid" : "invalid"
                    }
                  >
                    {passwordValidations.specialChar ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Almeno un carattere speciale
                  </div>
                  <div className={passwordMatch ? "valid" : "invalid"}>
                    {passwordMatch ? (
                      <span className="list-icon green">
                        <Icon icon={arrows_circle_check} />
                      </span>
                    ) : (
                      <span className="list-icon">
                        <Icon icon={arrows_exclamation} />
                      </span>
                    )}
                    Le password corrispondono
                  </div>
                </main>
                <div className="row justify-content-center">
                  <div className="col mb-3">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{ width: "15%", marginRight: "3%" }}
                    >
                      Invia
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="reset"
                      onClick={handleReset}
                      style={{ width: "15%" }}
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
