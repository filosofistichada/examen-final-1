import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons } from '../services/dragonService'

export default function Home() {
    const [dragons, setDragons] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    // Cargar dragones al montar
    useEffect(() => {
        const loadDragons = async () => {
            try {
                setLoading(true)
                const spellsData = await fetchDragons()
                setDragons(spellsData)
                setError(null)
            } catch (error) {
                setError('Error al obtener los hechizos')
            } finally {
                setLoading(false)
            }
        }
        
        loadDragons()
    }, [])

    // Filtrar dragones
    const filteredDragons = dragons.filter(dragon => {
        const dragonName = dragon.name || "";
        const search = searchTerm || "";
    return dragonName.toLowerCase().includes(search.toLowerCase());
  });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <SearchBar onSearch={setSearch} />
            
            {/* Manejo de estados */}
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && filteredDragons.length === 0 && (
                <EmptyState message="No hay dragones que coincidan con tu búsqueda." />
            )}
            {!loading && !error && filteredDragons.length > 0 && (
                <DragonList dragons={filteredDragons} />
            )}
        </div>
    )
}