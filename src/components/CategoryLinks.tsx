import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import userData from '../data/userData';
import incrementClickCount from '../data/userData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function CategoryLinks() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newLink, setNewLink] = useState({ name: '', url: '' });
    
    const category = userData.categories.find(
        cat => cat.name.toLowerCase() === categoryName?.toLowerCase()
    );

    const handleClick = (link: { name: string, url: string }) => {
        if (category) {
            const linkToUpdate = category.links.find(l => l.name === link.name);
            if (linkToUpdate) {
                linkToUpdate.clickCount = (linkToUpdate.clickCount || 0) + 1;
            }
            window.open(link.url, '_blank');
        }
    };

    const handleDelete = (linkName: string) => {
        if (category) {
            const linkIndex = category.links.findIndex(link => link.name === linkName);
            if (linkIndex !== -1) {
                category.links.splice(linkIndex, 1);
                setShowAddForm(show => !show);
            }
        }
    };

    // Add this function after the existing handlers
    const handleDeleteCategory = () => {
        const categoryIndex = userData.categories.findIndex(
            cat => cat.name.toLowerCase() === categoryName?.toLowerCase()
        );
        if (categoryIndex !== -1) {
            userData.categories.splice(categoryIndex, 1);
            setShowDeleteConfirm(false);
            navigate('/');
        }
    };

    const handleAddLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (category && newLink.name && newLink.url) {
            category.links.push({
                name: newLink.name,
                url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
                clickCount: 0
            });
            setNewLink({ name: '', url: '' });
            setShowAddForm(false);
        }
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            userData.categories.push({
                name: newCategoryName,
                links: []
            });
            setNewCategoryName('');
            setShowAddCategoryForm(false);
            navigate(`/category/${newCategoryName.toLowerCase()}`);
        }
    };

    if (!category) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white/50 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-4">Category not found</h2>
                <Link to="/" className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300">Back to Home</Link>
            </div>
        );
    }

    const sortedLinks = [...category.links].sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
    const chartData = sortedLinks.map(link => ({
        name: link.name,
        clicks: link.clickCount || 0
    }));

    return (
        <div className="p-8 mt-10">
            <div className="max-w-6xl mx-auto">
                {/* Update the header section */}
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        to="/" 
                        className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                        ← Back
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAddCategoryForm(true)}
                            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Add New Category"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Category"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-24"></div>
                </div>

                <div className="mb-8 p-6 rounded-xl bg-white/50 backdrop-blur-sm">
                    <h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backdropFilter: 'blur(8px)'
                                    }} 
                                />
                                <Bar dataKey="clicks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {sortedLinks.map(link => (
                        <div key={link.name} className="relative group">
                            <button 
                                onClick={() => handleClick(link)}
                                className="w-full flex flex-col items-center py-2 px-0 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 group"
                            >
                                <img 
                                    src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} 
                                    alt="" 
                                    className="w-14 h-14 rounded-xl shadow-lg mb-3 group-hover:scale-105 transition-transform"
                                />
                                <span className="font-medium text-sm mb-1">{link.name}</span>
                                <span className="text-xs text-gray-500">Clicked: {link.clickCount || 0} times</span>
                            </button>
                            <button
                                onClick={() => handleDelete(link.name)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    {/* Add New Link Button */}
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex flex-col items-center justify-center py-2 px-0 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-gray-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm text-gray-500 mt-2">Add New Link</span>
                    </button>
                </div>

                {/* Add New Link Form */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Add New Link</h3>
                            <form onSubmit={handleAddLink} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={newLink.name}
                                        onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="e.g., GitHub"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <input
                                        type="text"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="e.g., github.com"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                                    >
                                        Add Link
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add New Category Form */}
                {showAddCategoryForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
                            <form onSubmit={handleAddCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="e.g., Work, Study, Entertainment"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCategoryForm(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Delete Category Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4 text-red-600">Delete Category</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete the category "{category.name}"? 
                                This will also delete all {category.links.length} links in this category. 
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteCategory}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete Category
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryLinks;