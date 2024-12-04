import { Link } from "react-router-dom";

export function About() {


    return (<div className="mx-auto w-7/12">
        <p className="text-center text-4xl pb-12 font-bold">The heaviest pokémon wins.</p>
        <p className="text-center text-3xl pb-12">To battle with two random pokémon, click <Link to='/' className="hover:text-sky-400 transition-colors">Random</Link>.</p>
        <p className="text-center text-3xl pb-12">To battle with two chosen pokémon, enter a URL with their National Dex numbers, for example: <Link to='/1/vs/151' className="font-mono rounded px-2 bg-slate-800 border-2 border-slate-900 hover:text-sky-400 transition-colors">/1/vs/151</Link></p>
    </div>)
}
