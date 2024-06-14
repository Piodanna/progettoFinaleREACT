import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export function NewCorso() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { titolo: "", durata: "", catagoria: "" } });

  const [courseData, setCourseData] = useState({
    titolo: "",
    durata: "",
    categoria: "",
  });

  useEffect(()=>{
  }, [courseData]);

  // handleChange aggiorna courseData ogni volta che un campo del modulo cambia.
  function handleChange(e) {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  }

  return (
    <>
      <div className="container text-center" style={{ width: "30%" }}>
        <div className="row">
          <div className="col mb-3">
            <h3>Inserisci qui i dati del tuo nuovo post.</h3>
          </div>
          <form
            action=""
            method="POST"
            onSubmit={handleSubmit((data) => {
              // Aggiungere i dati del form all'array di dati del form
              //setFormEntries([...formEntries, data]);

              dispatch(addPost(data));

              console.log(data);

              setCourseData({
                titolo: "",
                durata: "",
                categoria: "",
              });
            })}
          >
            <div className="row">
              <div className="col mt-3">
                <label htmlFor="titolo" className="form-label">
                  Titolo del corso
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titolo"
                  {...register("titolo", {
                    required: "Titolo del corso richiesto.",
                    minLength: { value: 4, message: "Lunghezza minima 1" },
                  })}
                  placeholder="Inserisci il titolo"
                  value={courseData.titolo}
                  onChange={handleChange}
                />
                <p>{errors.titolo && errors.titolo.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3">
                <label htmlFor="durata" className="form-label">
                  Contenuto
                </label>
                <textarea
                  className="form-control"
                  id="durata"
                  {...register("durata", {
                    required: "Contenuto post richiesto.",
                  })}
                  placeholder="Contenuto"
                  value={courseData.durata}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
                <p>{errors.durata?.message}</p>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3">
                <button
                  className="btn btn-primary"
                  style={{ width: "23%", marginRight: "5%" }}
                  type="submit"
                >
                  Invia
                </button>
                <button
                  className="btn btn-primary"
                  style={{ width: "23%" }}
                  type="reset"
                >
                  Annulla
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );

}
