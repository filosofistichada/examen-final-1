import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function DragonCard({ dragon }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const isFav = isFavorite(dragon.name)

  const toggleFavorite = (e) => {
    e.preventDefault() // Evita navegar al detalle al hacer clic en el botón
    if (isFav) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  return (
    <Link 
      to={`/dragon/${dragon.name}`} 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
    >
      <div className="overflow-hidden">
        <img 
          src={dragon.image || 'https://via.placeholder.com/400x300'} 
          alt={dragon.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{dragon.name}</h2>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded w-max mb-4">
          {dragon.type}
        </span>
        
        <button
          onClick={toggleFavorite}
          className={`mt-auto w-full py-2.5 rounded-lg font-semibold transition-colors flex justify-center items-center gap-2 ${
            isFav 
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isFav ? '♥ Quitar Favorito' : '♡ Añadir Favorito'}
        </button>
      </div>
    </Link>
  )
}