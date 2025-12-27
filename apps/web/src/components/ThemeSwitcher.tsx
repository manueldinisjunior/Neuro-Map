import { Moon, Sun, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'red') => {
        setTheme(newTheme);
        // Add a subtle visual feedback
        console.log(`Theme changed to: ${newTheme}`);
    };

    return (
        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-lg">
            <button
                onClick={() => handleThemeChange('light')}
                className={`p-2 rounded-lg transition-all duration-200 ${theme === 'light'
                        ? 'bg-white text-zinc-900 shadow-md scale-105'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 active:scale-95'
                    }`}
                title="Light Mode"
                aria-label="Switch to Light Mode"
            >
                <Sun size={18} className="transition-transform duration-200" />
            </button>
            <button
                onClick={() => handleThemeChange('dark')}
                className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50 scale-105'
                        : 'text-zinc-500 hover:text-blue-400 hover:bg-zinc-800/50 active:scale-95'
                    }`}
                title="Dark Mode"
                aria-label="Switch to Dark Mode"
            >
                <Moon size={18} className="transition-transform duration-200" />
            </button>
            <button
                onClick={() => handleThemeChange('red')}
                className={`p-2 rounded-lg transition-all duration-200 ${theme === 'red'
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/50 scale-105'
                        : 'text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 active:scale-95'
                    }`}
                title="Modern Red"
                aria-label="Switch to Modern Red Mode"
            >
                <Flame size={18} className="transition-transform duration-200" />
            </button>
        </div>
    );
}
