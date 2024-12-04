import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { About } from './Components/About'
import { PokemonBattle } from './Components/PokemonBattle'
import { NotFound } from './Components/NotFound'

function App() {


    return (
        <>
            <h1 className="bg-amber-500 text-sky-700 outline-2 text-center text-8xl py-12 font-black">Pokémon Sumo</h1>
            <BrowserRouter>
                <div className="p-2 mb-12 bg-amber-500 flex gap-12 justify-center">
                    <Link to='/'      className="text-center text-2xl px-6 py-1 rounded-xl bg-slate-700 hover:bg-sky-700 transition-colors">Random</Link>
                    <Link to='/about' className="text-center text-2xl px-6 py-1 rounded-xl bg-slate-700 hover:bg-sky-700 transition-colors">About</Link>
                </div>

                <Routes>
                    <Route path='/' element={<PokemonBattle />} />
                    <Route path='/:id1' element={<PokemonBattle />} />
                    <Route path='/:id1/vs/:id2' element={<PokemonBattle />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
