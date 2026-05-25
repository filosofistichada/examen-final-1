import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragonDetail } from '../services/DragonService'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useFavorites } from '../context/FavoritesContext'

export default function DragonDetail() {
  const { name } = useParams() // Obtiene el parámetro name de la URL [cite: 987]
  const [dragon, setDragon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    // Llamar a fetchDragonDetail(name) cuando name cambie [cite: 988]
    fetchDragonDetail(name)
      .then(data => {
        setDragon(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!dragon) return null

  const favorite = isFavorite(dragon.name)

  const handleFavoriteClick = () => {
    if (favorite) removeFavorite(dragon.name)
    else addFavorite(dragon)
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl text-center mt-6">
      {/* Link para volver a la página principal [cite: 996] */}
      <Link to="/" className="text-yellow-400 hover:underline block mb-4 text-left">← Volver</Link>
      
      <img
        src={dragon.sprites?.other?.['official-artwork']?.front_default}
        alt={dragon.name}
        className="w-64 h-64 mx-auto drop-shadow-2xl"
      />
      
      <h1 className="text-4xl font-bold capitalize mt-4">{dragon.name}</h1>
      
      <div className="flex justify-center gap-2 mt-3">
        {dragon.types.map((t: any) => (
          <span key={t.type.name} className="px-4 py-1 bg-gray-700 rounded-full text-sm capitalize">
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Stats principales: HP, Attack, Defense [cite: 994] */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        {dragon.stats.filter((s: any) => ['hp', 'attack', 'defense'].includes(s.stat.name)).map((s: any) => (
          <div key={s.stat.name} className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-400 uppercase">{s.stat.name}</p>
            <p className="text-xl font-bold">{s.base_stat}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleFavoriteClick}
        className={`mt-6 px-6 py-2 rounded-full font-bold transition flex items-center justify-center mx-auto gap-2 ${favorite ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}
      >
        <i className={`fa-heart ${favorite ? 'fa-solid' : 'fa-regular'}`}></i>
        {favorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  )
}