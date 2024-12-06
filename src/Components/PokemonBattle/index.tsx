import { useState, useEffect } from "react";
import { Pokemon } from "../Pokemon";
import { capitaliseFirstLetter } from "../../Services/functions";
import { useParams } from "react-router-dom";

export interface PokemonData {
    image?: string, 
    name: string,
    number: number, 
    weight: number
}

const defaultPokemonData = (): PokemonData => {
    return {
        image: import.meta.env.BASE_URL + 'missingno_front_default.png', 
        name: 'MissingNo.', 
        number: 0, 
        weight: 1590.8
    }
}

export function PokemonBattle() {
    const [ pokemon1, setPokemon1 ] = useState<PokemonData>(defaultPokemonData())
    const [ pokemon2, setPokemon2 ] = useState<PokemonData>(defaultPokemonData())
    const [ message, setMessage ] = useState<string>('Battling...')
    const { id1, id2 } = useParams()

    async function getPokemon( which: number | undefined, stateSetter: React.Dispatch<React.SetStateAction<PokemonData>> ): Promise<void> {
        if ( !which || which < 1 || isNaN(which) ) {
            which = Math.floor(Math.random() * (1025 - 1) + 1);
        }
        const json = await fetch('https://pokeapi.co/api/v2/pokemon/' + which)
        const pokemon = await json.json()
        const image = pokemon.sprites?.other["official-artwork"]?.front_default ?? ''
        const name = capitaliseFirstLetter(pokemon.species?.name) ?? 'missingno.'
        // the id number (which) seems to match the national dex number of a pokemon, 
        // but in case it doesn't we can fetch additional data about the pokedex entries
        // const pokedexInfo = await fetch(pokemon.species.url).then(data => data.json())
        // const number = pokedexInfo.pokedex_numbers[0].entry_number
        const weight = isNaN(pokemon.weight) ? 0 : pokemon.weight
        stateSetter({ image: image, name: name, number: which, weight: weight })
    }
    
    useEffect( () => {
        const nid1 = Number(id1)
        const nid2 = Number(id2)
        getPokemon( nid1, setPokemon1 )
        getPokemon( nid2, setPokemon2 )
    }, [id1, id2])

    useEffect(() => {
        if (Math.abs(pokemon1.weight - pokemon2.weight) < Number.EPSILON ) {
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
