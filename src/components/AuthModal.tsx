import { useState } from 'react';
import userData from '../data/userData';

interface AuthModalProps {
    isOpen: boolean;
    type: 'login' | 'signup';
    onClose: () => void;
}

function AuthModal({ isOpen, type, onClose }: AuthModalProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (type === 'signup') {
            const userExists = userData.users?.some(user => user.username === username);
            if (userExists) {
                setError('Username already exists');
                return;
            }
            // Handle signup logic here
        }
        // Handle login logic here
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
             onClick={onClose}>
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl w-full max-w-md"
                 onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300 font-medium"
                    >
                        {type === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthModal; 