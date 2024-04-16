import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemones, setPokemones] = useState([])
  const [visibilidad, setVisibilidad] = useState([]);

  useEffect (()=>{
    const getPokemones = async() =>{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      const listaPokemones = await response.json()
      const {results} = listaPokemones

      const pokemon = results.map(async (pokemon) =>{
        const dataPokemon = await fetch(pokemon.url)
        const poke = await dataPokemon.json()
        return{
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default
        }
      })
      setPokemones(await Promise.all(pokemon))
      setVisibilidad(Array(pokemon.length).fill(true)); // Inicializa el array de visibilidades con true
    }
    getPokemones()
  }

  ,[])

  const toggleVisibilidad = (index) => {
    setVisibilidad(prevVisibilidad => {
      const newVisibilidad = [...prevVisibilidad];
      newVisibilidad[index] = !newVisibilidad[index]; // Cambia la visibilidad del elemento en el índice dado
      return newVisibilidad;
    });
  };
  

  return (
    <>
      <div>
        <h1>PokeApi</h1>
        {
          pokemones.map(pokemon => {
            return(
              <div key={pokemon.id} className={visibilidad[pokemon.id-1] ? "visible" : "invisible"}>
                <p> {pokemon.name.toUpperCase()} </p>
                <img src={pokemon.img} alt="" />
                <button onClick={() => toggleVisibilidad(pokemon.id-1)}>Eliminar</button>
              </div>
            )}
          )
        }
      </div>
      
    </>
  )
}

export default App
