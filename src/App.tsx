import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLinks from './components/UserLinks';
import CategoryLinks from './components/CategoryLinks';
import Navigation from './components/Navigation';
import Background from './components/Background';

function App() {
    
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
                <Background />
            </div>
        </Router>
    );
}

export default App;
