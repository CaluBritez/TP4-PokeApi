import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemones, setPokemones] = useState([])

  useEffect (()=>{
    const getPokemones = async() =>{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      const listaPokemones = await response.json()
      const {results} = listaPokemones

      setPokemones(results)
      const pokemon = results.map(async (pokemon) =>{
        const dataPokemon = await fetch(pokemon.url)
        const poke = await dataPokemon.json()
        return{
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default
        }
      })
      console.log(pokemon);
      
      
    }

    getPokemones()
  }

  ,[])

  return (
    <>
      <div>
        <h1>PokeApi</h1>
        {
          pokemones.map(pokemon => 
            <p> {pokemon.name} </p> 

          )
        }
      </div>
      
    </>
  )
}

export default App
