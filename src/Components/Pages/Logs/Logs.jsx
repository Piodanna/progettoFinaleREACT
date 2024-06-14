import React, { useState, useEffect } from "react";
import {
  getLogs,
  createLog,
  deleteLog,
} from "../../../services/firebase-services";
import { useForm } from "react-hook-form";
import "./Logs.css";

export function Logs() {
  //Tramite lo useState sto creando una variabile logs per contenere i log e una funzione setLogs per aggiornare la variabile
  const [logs, setLogs] = useState([]);

  //La useEffect esegue il corpo tra le graffe quando il componente viene montato. Il secondo argomento ( [] ) è un array vuoto, il che significa che l'effetto viene eseguito solo una volta, quando il componente viene montato per la prima volta.
  useEffect(() => {
    fetchLogs();
  }, []);

  //In questa funzione facciamo il fetch dei logs, usiamo await in modo tale da aspettare che le operazioni asincrone vengano completate in sequenza
  async function fetchLogs() {
    const data = await getLogs();
    if (data) {
      setLogs(data);
    }
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  //Metodo che prende i dati con due operazioni asincrone regolate da await genera prima il nuovo log, ricara i log da visualizzare e infine pulisce il campo di testo
  const onSubmit = (data) => {
    async function logGeneration() {
      await createLog(data.message);
      await fetchLogs();
    }
    logGeneration();
    reset();
  };

  //Metodo che prende recuperato l'id del log con due operazioni asincrone regolate da await prima elimina il log referenziato dall'id e poi ricara i log da visualizzare
  function handleDelete(id) {
    async function logDeletion() {
      await deleteLog(id);
      await fetchLogs();
    }
    logDeletion();
  }

  return (
    <>
      <div className="form-group">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control mt-5"
            style={{width: "30%"}}
            id="messaggio"
            placeholder="Inserire il messaggio di log"
            {...register("message", { required: "Il messaggio va inserito!" })}
          />
          <br />
          <br />
          <button type="submit" className="btn btn-success">
            Crea
          </button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Message</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log.id}>
              <th scope="row">{index + 1}</th>
              <td>{log.id}</td>
              <td>{log.date}</td>
              <td>{log.message}</td>
              <td>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
