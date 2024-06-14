export function Home() {
  return (
    <div className="homepage">
            <header>
                <h1>Benvenuto nella nostra piattaforma di corsi online</h1>
                <p>Impara, Cresci e Avrai Successo con i nostri Corsi di Alta Qualità</p>
            </header>
            <section className="featured-courses">
                <h2>Corsi in Evidenza</h2>
                <div className="course-card">
                    <img src="course1.jpg" alt="Corso 1" />
                    <h3>Introduzione allo Sviluppo Web</h3>
                    <p>Impara le basi di HTML, CSS e JavaScript.</p>
                </div>
                <div className="course-card">
                    <img src="course2.jpg" alt="Corso 2" />
                    <h3>Data Science e Machine Learning</h3>
                    <p>Esplora l'analisi dei dati, gli algoritmi e la modellazione predittiva.</p>
                </div>
                {/* Aggiungi altre schede dei corsi qui */}
            </section>
            <section className="cta">
                <h2>Pronto per Iniziare a Imparare?</h2>
                <button>Esplora i Corsi</button>
            </section>
            <footer>
                <p>&copy; 2023 Piattaforma di Corsi Online. Tutti i diritti riservati.</p>
            </footer>
        </div>
  );
}
