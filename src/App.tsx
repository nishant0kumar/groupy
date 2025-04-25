import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLinks from './components/UserLinks';
import CategoryLinks from './components/CategoryLinks';
import Navigation from './components/Navigation';
import ColorPicker from './components/ColorPicker';
import Background from './components/Background';
import { useState } from 'react';

function App() {
    const [bgColor, setBgColor] = useState('bg-red-500');
    
    return (
        <Router>
            <div className="app-container">
                <div>
                    <Navigation />
                </div>
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<UserLinks />} />
                        <Route path="/category/:categoryName" element={<CategoryLinks />} />
                    </Routes>
                </main>
                <Background color={bgColor} />
                <ColorPicker onSelectColor={setBgColor} />
            </div>
        </Router>
    );
}

export default App;
