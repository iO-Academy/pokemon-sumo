import { useContext } from "react"
import { PokemonData } from "../PokemonBattle"
import UserContext from "../../Contexts/UserContext"
import { formatWeight } from "../../Services/functions"

export interface PokemonProps {
    pokemon: PokemonData
}

export function Pokemon( { pokemon }: PokemonProps ) {
    const { weightUnit, setUnit } = useContext(UserContext)

    return (
        pokemon.name &&
        <div className="bg-slate-800 rounded-2xl p-6 border-8 border-slate-600">
            <img className="block h-80" src={pokemon.image}/>
            <p className="text-center text-4xl py-6 font-semibold"><span className="text-2xl">#{pokemon.number}</span> {pokemon.name}</p>
            <p onClick={() => { if (setUnit) { setUnit() } }} className="text-center text-3xl py-6 font-semibold">{formatWeight(pokemon.weight, weightUnit)}</p>
        </div>
    )
}
