import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const getPokemon = async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    };

    getPokemon('charizard');
  }, []);

  return( 
    <section>
      <h2>PokeApi</h2>
    <div>
      <h3>{pokemon.name}<sub>{pokemon.id}</sub></h3>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
    </div>
    </section>
  )
}

export default App
