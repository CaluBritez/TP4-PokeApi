import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemones, setPokemones] = useState([])
  const [visible, setVisible] = useState(true)

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
    }
    getPokemones()
  }

  ,[])

  const ver = ()=>{
    setVisible(!visible)
  }
  

  return (
    <>
      <div>
        <h1>PokeApi</h1>
        {
          pokemones.map(pokemon => {
            return(
              <div key={pokemon.id}>
                <p> {pokemon.name} </p>
                <img src={pokemon.img} alt="" />
                <button onClick={ver}>Elminar</button>
              </div>
            )}
          )
        }
      </div>
      
    </>
  )
}

export default App
