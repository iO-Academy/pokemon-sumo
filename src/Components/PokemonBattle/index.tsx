import { useState, useEffect } from "react";
import { Pokemon } from "../Pokemon";
import { capitaliseFirstLetter } from "../../Services/functions";

export interface PokemonData {
    image?: string, 
    name: string, 
    weight: number
}

export function PokemonBattle() {
    const [ pokemon1, setPokemon1 ] = useState<PokemonData>({name: 'missingno.', weight: 0})
    const [ pokemon2, setPokemon2 ] = useState<PokemonData>({image: '', name: 'missingno.', weight: 0})
    const [ message, setMessage ] = useState<string>('Battling...')

    // pokemon sumo
    // compare the weights of two randomly selected pokemon, heaviest wins

    async function getPokemon( pokemonSetter: React.Dispatch<React.SetStateAction<PokemonData>> ) {
        const randomNum1 = Math.floor(Math.random() * (151 - 1) + 1);
        const json = await fetch('https://pokeapi.co/api/v2/pokemon/' + randomNum1)
        const pokemon = await json.json()
        const image = pokemon.sprites?.other["official-artwork"]?.front_default ?? ''
        const name = capitaliseFirstLetter(pokemon.species?.name) ?? 'missingno.'
        let weight = pokemon.weight * 0.1
        weight = isNaN(weight) ? 0 : weight
        pokemonSetter({ image: image, name: name, weight: weight })
    }
    
    useEffect( () => {
        getPokemon( setPokemon1 )
        getPokemon( setPokemon2 )

        // const randomNum2 = Math.floor(Math.random() * (151 - 1) + 1);
        // fetch('https://pokeapi.co/api/v2/pokemon/' + randomNum2)
        //     .then(response => response.json())
        //     .then(pokemon => {
        //         const stuffWeNeed = {
        //             image: pokemon.sprites?.other["official-artwork"]?.front_default ?? '',
        //             name: capitaliseFirstLetter(pokemon.species?.name) ?? 'missingno.',
        //             weight: (pokemon?.weight * 0.1)
        //         }
        //         setPokemon2(stuffWeNeed)
        //     })
    }, [])

    useEffect(() => {
        if (pokemon1.weight === pokemon2.weight) {
            setMessage("It's a draw")
        } else if ( pokemon1.weight > pokemon2.weight) {
            setMessage(`${pokemon1.name} wins!`)
        } else if ( pokemon2.weight > pokemon1.weight ) {
            setMessage(`${pokemon2.name} wins!`)
        } else {
            setMessage("Something else happened!")
        }
    }, [pokemon1, pokemon2])

    return (<div>
        <div className="mx-auto flex gap-6 justify-center">
            <Pokemon pokemon={pokemon1} />
            <Pokemon pokemon={pokemon2} />
        </div>
        <div className="mx-auto">
            <h3 className="text-center text-7xl py-12 font-bold">{message ?? 'Battling...'}</h3>
        </div>
    </div>)
}
