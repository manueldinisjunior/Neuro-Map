import { Moon, Sun, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm">
            <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                title="Light Mode"
            >
                <Sun size={16} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-zinc-800 text-blue-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                title="Dark Mode"
            >
                <Moon size={16} />
            </button>
            <button
                onClick={() => setTheme('red')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'red' ? 'bg-red-600/20 text-red-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                title="Modern Red"
            >
                <Flame size={16} />
            </button>
        </div>
    );
}
