import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import Home from './pages/Home'
// Asumo que tienes creado el componente Favorites.tsx (similar al repo anterior)
import Favorites from './pages/Favorites' 
import DragonDetail from './pages/DragonDetail'
import './App.css'

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          
          <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 tracking-tight">
                🐲 DragonDex
              </Link>
              <div className="flex gap-4 sm:gap-8 font-medium">
                <Link to="/" className="hover:text-yellow-400 transition-colors">
                  Explorar
                </Link>
                <Link to="/favorites" className="hover:text-yellow-400 transition-colors">
                  Mis Favoritos
                </Link>
              </div>
            </div>
          </nav>

          <main className="py-6 sm:py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/dragon/:name" element={<DragonDetail />} />
            </Routes>
          </main>
          
        </div>
      </Router>
    </FavoritesProvider>
  )
}

export default App