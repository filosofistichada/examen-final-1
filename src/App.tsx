import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DragonDetail from './pages/DragonDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="p-4 bg-gray-800 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-wider">
          🐉 DracoDex! Raaaaaaaaaaaah!
        </Link>
        <Link to="/favorites" className="text-lg hover:text-yellow-400 transition flex items-center gap-2">
          <i className="fa-solid fa-heart text-red-500"></i> Mis Favoritos
        </Link>
      </nav>
      
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragon/:name" element={<DragonDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;