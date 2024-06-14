import { useEffect, useState } from "react";
import { getCorsi } from "../../../services/firebase-services";
import { Card } from "../../Card/Card";
import { ToastContainer, toast } from "react-toastify"; // Importa la funzione toast
import "react-toastify/dist/ReactToastify.css"; // Importa i CSS di react-toastify

export function Corsi() {
  const [corsi, setCorsi] = useState([]);

  useEffect(() => {
    fetchCorsi();
  }, []);

  async function fetchCorsi() {
    try {
      const data = await getCorsi();
      if (data) {
        setCorsi(data);
      }
      toast.success("Corsi caricati con successo!", {
        autoClose: 1200,
      });
    } catch (error) {
      toast.error("Non siamo riusciti a caricare i corsi.", {
        autoClose: 1500,
      });
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="posts-container">
        {corsi.map((corso) => (
          <div key={corso.id}>
            <Card
              titolo={corso.titolo}
              durata={corso.durata}
              categoria={corso.categoria}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
