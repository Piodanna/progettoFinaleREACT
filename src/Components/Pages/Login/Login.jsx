import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { loginUser } from "../../../services/firebase-services";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export function Login() {
  // Definisco uno stato per gestire il reindirizzamento
  const navigateTo = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Funzione per effettuare il Login
  const onSubmit = async (data) => {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });
      swal({
        title: "Login avvenuto con successo!",
        icon: "success",
        button: "Vai alla home",
      });
      //await createLog(`INFO: Accesso autorizzato ${data.email}`);
      navigateTo("/");
    } catch (error) {
      swal({
        title: "Credenziali errate.",
        icon: "error",
        button: "Riprovare",
      });
      //await createLog(`ERROR: Accesso autorizzato ${data.email}`);
    }
  };

  return (
    <>
      <div className="container text-center" style={{ width: "50%" }}>
        <div className="row">
          <div className="col mb-3">
            <h3>Effettua il login per accedere</h3>
          </div>
          <div className="row">
            <div className="col mb-3">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center">
                  <div className="col-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      {...register("email", {
                        required: "Email richiesta.",
                        minLength: { value: 1, message: "Lunghezza minima: 1" },
                      })}
                      className="form-control"
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      {...register("password", {
                        required: "Password richiesta.",
                      })}
                      className="form-control"
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
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
