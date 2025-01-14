import { useParams, Link } from 'react-router-dom';
import userData, { incrementClickCount } from '../data/userData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function CategoryLinks() {
    const { categoryName } = useParams();
    
    const category = userData.categories.find(
        cat => cat.name.toLowerCase() === categoryName?.toLowerCase()
    );

    const handleClick = (link: { name: string, url: string }) => {
        if (category) {
            incrementClickCount(category.name, link.name);
            window.open(link.url, '_blank');
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

    // Sort links by click count in descending order
    const sortedLinks = [...category.links].sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));

    // Prepare data for chart
    const chartData = sortedLinks.map(link => ({
        name: link.name,
        clicks: link.clickCount || 0
    }));

    return (
        <div className="p-8 mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        to="/" 
                        className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                        ← Back
                    </Link>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <div className="w-24"></div>
                </div>

                {/* Usage Chart */}
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
                        <button 
                            key={link.name}
                            onClick={() => handleClick(link)}
                            className="flex flex-col items-center py-2 px-0 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 group"
                        >
                            <img 
                                src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`} 
                                alt="" 
                                className="w-14 h-14 rounded-xl shadow-lg mb-3 group-hover:scale-105 transition-transform"
                            />
                            <span className="font-medium text-sm mb-1">{link.name}</span>
                            <span className="text-xs text-gray-500">Clicked: {link.clickCount || 0} times</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryLinks; 