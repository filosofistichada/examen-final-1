import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function DragonCard({ dragon }: { dragon: any }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(dragon.name)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    if (favorite) removeFavorite(dragon.name)
    else addFavorite(dragon)
  }

  return (
    <Link to={`/dragon/${dragon.name}`} className="bg-gray-800 rounded-lg p-4 block hover:bg-gray-700 transition relative group">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 text-2xl text-red-500 hover:scale-110 transition z-10"
      >
        <i className={`fa-heart ${favorite ? 'fa-solid' : 'fa-regular'}`}></i>
      </button>
      <img
        src={dragon.sprites?.other?.['official-artwork']?.front_default || dragon.sprites?.front_default}
        alt={dragon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold capitalize text-center mt-2">{dragon.name}</h2>
      <div className="flex justify-center gap-2 mt-2">
        {dragon.types.map((t: any) => (
          <span key={t.type.name} className="px-2 py-1 bg-gray-900 rounded-md text-xs capitalize">
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  )
}