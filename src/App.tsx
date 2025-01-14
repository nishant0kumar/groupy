import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLinks from './components/UserLinks';
import CategoryLinks from './components/CategoryLinks';
import './styles/components.css';
import Navigation from './components/Navigation';
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
            </div>
        </Router>
    );
}

export default App;
