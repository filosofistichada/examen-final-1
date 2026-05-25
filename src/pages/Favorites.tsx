import { useFavorites } from '../context/FavoritesContext'
import DragonList from '../components/DragonList'
import EmptyState from '../components/EmptyState'

export default function Favorites() {
    // Usa useFavorites() del contexto [cite: 998]
    const { favorites } = useFavorites()

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Mis Dragones Favoritos</h1>
            {/* Si la lista está vacía, muestra <EmptyState />, sino renderiza <DragonList /> [cite: 999, 1000] */}
            {favorites.length === 0 ? <EmptyState /> : <DragonList dragons={favorites} />}
        </div>
    )
}