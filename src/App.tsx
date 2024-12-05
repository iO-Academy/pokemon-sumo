import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { About } from './Components/About'
import { PokemonBattle } from './Components/PokemonBattle'
import { NotFound } from './Components/NotFound'
import UserContext from './Contexts/UserContext'
import { useState } from 'react'
import { weightUnits } from './Services/functions'

function App() {
    const [ unit, setUnit ] = useState<weightUnits>('kg')

    const toggleUnit = () => { 
        if (unit === 'kg') { setUnit('lb') } 
        else { setUnit('kg') }
    }

    return (
        <>
            <UserContext.Provider value={{ weightUnit: unit }} >
                <div className="bg-amber-500 p-2">
                    <img className="block mx-auto h-40" src={import.meta.env.BASE_URL + "pokemon-sumo.png"} alt="Pokémon Sumo" />
                </div>
                <BrowserRouter>
                    <div className="p-2 mb-12 bg-amber-500 flex gap-12 justify-center">
                        <Link to='/' className="text-center text-2xl px-6 py-1 rounded-xl bg-slate-700 hover:bg-sky-700 transition-colors">Random</Link>
                        <Link to='/about' className="text-center text-2xl px-6 py-1 rounded-xl bg-slate-700 hover:bg-sky-700 transition-colors">About</Link>
                        <p onClick={ toggleUnit } className="text-center text-2xl px-6 py-1 rounded-xl bg-slate-700 hover:bg-sky-700 transition-colors">{unit}</p>
                    </div>
                    <Routes>
                        <Route path='/' element={<PokemonBattle />} />
                        <Route path='/:id1' element={<PokemonBattle />} />
                        <Route path='/:id1/vs/:id2' element={<PokemonBattle />} />
                        <Route path='/about' element={<About />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}

export default App
