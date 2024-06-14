import "./Card.css";

export function Card({ titolo, durata, categoria }) {
  return (
    <>
      <div className="card mb-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{titolo}</h5>
          <hr />
          <h6 className="card-subtitle mb-2 text-muted">Durata: {durata}</h6>
          <p className="card-text">Tipologia: {categoria}</p>
        </div>
      </div>
    </>
  );
}
