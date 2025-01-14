import { Link } from 'react-router-dom';
import userData from '../data/userData';
import UserHeader from './UserHeader';
import { useState } from 'react';
import TodoList from './TodoList';

function UserLinks() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (e: React.MouseEvent, categoryName: string) => {
        e.preventDefault();
        setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
    };

    return (
    <>
        <UserHeader />
        <TodoList />

        {/* Popup Overlay */}
        {selectedCategory && (
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-20"
                 onClick={() => setSelectedCategory(null)}>
                <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl w-[80%] max-w-3xl max-h-[80vh] overflow-auto"
                     onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{selectedCategory}</h2>
                        <Link 
                            to={`/category/${selectedCategory.toLowerCase()}`}
                            className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300 text-sm font-medium"
                        >
                            More Details →
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                        {userData.categories
                            .find(cat => cat.name === selectedCategory)?.links
                            .map(link => (
                                <a key={link.name} 
                                   href={link.url}
                                   target="_blank"
                                   className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl hover:bg-white/80 transition-all">
                                    <img 
                                        src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
                                        alt=""
                                        className="w-12 h-12 rounded-xl shadow-lg"
                                    />
                                    <span className="text-sm text-center font-medium">{link.name}</span>
                                </a>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Dock */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="dock-bg backdrop-blur-xl bg-white/20 px-6 py-2 rounded-2xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-center gap-2">
                    {userData.categories.map(category => (
                        <Link 
                            key={category.name}
                            to={`/category/${category.name.toLowerCase()}`}
                            onClick={(e) => handleCategoryClick(e, category.name)}
                            className={`group relative transition-all duration-150 ease-in-out ${selectedCategory === category.name ? 'scale-110' : ''}`}>
                            <div className="dock-item p-2 rounded-xl hover:bg-white/30 transition-all group-hover:scale-110 group-hover:-translate-y-4">
                                <div className="w-16 h-16 flex flex-wrap justify-center bg-white/20 from-gray-200 to-gray-300 rounded-lg shadow-lg p-2">
                                    <div className="links-grid flex flex-wrap justify-evenly gap-0.5">
                                        {category.links.slice(0, 4).map(link => (
                                            <div key={link.name} className="link-card flex">
                                                <img 
                                                    src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} 
                                                    alt="" 
                                                    className="link-favicon bg-white h-4 w-4 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                                    {category.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>
    );
}

export default UserLinks; 