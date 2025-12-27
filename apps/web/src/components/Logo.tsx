import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ className = "", iconSize = 24, textSize = "text-xl" }) {
    return (
        <Link to="/" className={`flex items-center gap-2 group ${className}`} aria-label="Neuro Notes Home">
            <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:bg-blue-500 transition-all group-hover:shadow-lg group-hover:shadow-blue-600/20 active:scale-95 shadow-md">
                <BrainCircuit size={iconSize} />
            </div>
            <span className={`${textSize} font-black uppercase tracking-tighter text-white`}>
                Neuro
            </span>
        </Link>
    );
}
