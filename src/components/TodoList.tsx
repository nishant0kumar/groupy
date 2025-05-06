import { useState } from 'react';
import userData from '../data/userData';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    category: string;
    link?: {
        name: string;
        url: string;
    };
}

const Todo: Todo = {
    id: 0,
    text: '',
    completed: false,
    category: 'Personal',
    link: {
        name: '',
        url: ''
    }
}
console.log(Todo);

const saveTodo = (data: Todo): void => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem('TodoList', serializedData);
    } catch (error) {
        console.error("Failed to save user data to local storage:", error);
    }
};

const loadTodo = (): Todo | null => {
    try {
        const serializedData = localStorage.getItem('Todo');
        if (serializedData === null) {
            return null;
        }
        return JSON.parse(serializedData) as Todo;
    } catch (error) {
        console.error("Failed to load user data from local storage:", error);
        return null;
    }
};

const storedUserData = loadTodo();
if (storedUserData) {
    Todo.id = storedUserData.id;
    Todo.text = storedUserData.text;
    Todo.completed = storedUserData.completed;
    Todo.link = storedUserData.link;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Personal');
    const [showLinkSelect, setShowLinkSelect] = useState(false);

    const categories = ['Personal', ...userData.categories.map(cat => cat.name)];

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        
        setTodos([...todos, {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
            category: selectedCategory
        }]);
        setNewTodo('');
        setShowLinkSelect(false);
        saveTodo(Todo);
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-transparent/10 backdrop-blur-xl rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Today's Tasks</h2>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            
            <form onSubmit={addTodo} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setShowLinkSelect(!showLinkSelect)}
                    className="px-3 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300"
                >
                    🔗
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300 font-medium"
                >
                    Add
                </button>
            </form>

            {showLinkSelect && (
                <div className="mb-4 p-4 bg-white/60 rounded-xl">
                    <h3 className="font-medium mb-2">Attach Link</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {userData.categories
                            .find(cat => cat.name === selectedCategory)
                            ?.links.map(link => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        setNewTodo(prev => `${prev} - ${link.name}`);
                                        setShowLinkSelect(false);
                                    }}
                                    className="flex flex-col items-center p-2 rounded-lg hover:bg-white/80 transition-all"
                                >
                                    <img 
                                        src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`}
                                        alt=""
                                        className="w-6 h-6 rounded-lg mb-1"
                                    />
                                    <span className="text-xs text-center">{link.name}</span>
                                </button>
                            ))}
                    </div>
                </div>
            )}

            <div className="space-y-2 h-[15rem] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black/20">
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        className="flex items-center gap-3 p-3 bg-white/20 rounded-xl hover:bg-white/60 transition-all group"
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-5 h-5 rounded-md"
                        />
                        <div className="flex-1">
                            <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.text}
                            </div>
                            <div className="text-xs text-black-500 mt-0.5">
                                {todo.category} {todo.link && `• ${todo.link.name}`}
                            </div>
                        </div>
                        {todo.link && (
                            <a
                                href={todo.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-all"
                            >
                                Visit
                            </a>
                        )}
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-all"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                {todos.length === 0 && (
                    <div className="text-center text-black-500 py-4">
                        No tasks yet. Add one above!
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoList; 