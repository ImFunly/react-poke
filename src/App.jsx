import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setPokemonData(null);
      return;
    }

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      setPokemonData(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app">
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Ingresa el nombre del Pokémon"
      />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div className="pokemon-result">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default App;
