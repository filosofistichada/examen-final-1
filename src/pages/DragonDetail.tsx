import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragons } from '../services/dragonService'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useFavorites } from '../context/FavoritesContext'

export default function DragonDetail() {
  const { name } = useParams()
  const [dragon, setDragon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  // useEffect para cargar detalle
  useEffect(() => {
    const loadDragon = async () => {
      try {
        setLoading(true)
        const data = await fetchDragons(name)
        setDragon(data)
        setError(null)
      } catch (err) {
        setError('No se encontró el detalle de este dragón.')
      } finally {
        setLoading(false)
      }
    }

    if (name) loadDragon()
  }, [name])

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!dragon) return null

  const isFav = isFavorite(dragon.name)

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/" className="text-yellow-500 font-bold hover:underline mb-6 inline-block">
        ← Volver
      </Link>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <img 
          src={dragon.image || 'https://via.placeholder.com/800x400'} 
          alt={dragon.name} 
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">{dragon.name}</h1>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                {dragon.type}
              </span>
            </div>
            
            {/* Botón de favorito */}
            <button 
              onClick={toggleFavorite}
              className={`px-6 py-3 rounded-lg font-bold transition-all shadow-sm ${
                isFav 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isFav ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            </button>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {dragon.description || 'Este dragón aún no tiene una descripción detallada en nuestros registros.'}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">Salud</span>
                <span className="font-bold text-xl text-green-600">{dragon.health ?? '?'}</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">Ataque</span>
                <span className="font-bold text-xl text-red-600">{dragon.attack ?? '?'}</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">Defensa</span>
                <span className="font-bold text-xl text-blue-600">{dragon.defense ?? '?'}</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">Velocidad</span>
                <span className="font-bold text-xl text-yellow-500">{dragon.speed ?? '?'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}