import { PokemonData } from "../PokemonBattle"

export interface PokemonProps {
    pokemon: PokemonData
}

export function Pokemon( { pokemon }: PokemonProps ) {


    return (
        pokemon.name &&
        <div className="bg-slate-800 rounded-2xl p-6 border-8 border-slate-600">
            <img className="block h-80" src={pokemon.image}/>
            <p className="text-center text-4xl py-6 font-semibold"><span className="text-2xl">#{pokemon.number}</span> {pokemon.name}</p>
            <p className="text-center text-3xl py-6 font-semibold">{pokemon.weight.toFixed(1)} kg</p>
        </div>
    )
}
