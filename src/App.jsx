import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();

      const detailedResponses = await Promise.all(
        data.results.map(p => fetch(p.url))
      );
      const detailedData = await Promise.all(detailedResponses.map(res => res.json()));

      setPokemons(detailedData);
    };

    getPokemons();
  }, []);

  return (
    <section className="container">
      <h2 className="title">Lista de pokemons(pokeapi) Serva</h2>

      <div className="card-grid">
        {pokemons.map(p => (
          <div key={p.id} className="card">
            <img src={p.sprites.front_default} alt={p.name} className="card-image" />
            <h3 className="card-name">{p.name}</h3>
            <p className="card-id">#{p.id}</p>
            <div className="types">
              {p.types.map((t, i) => (
                <span key={i} className={`type ${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
