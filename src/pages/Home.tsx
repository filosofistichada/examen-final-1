import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons } from '../services/DragonService'

export default function Home() {
    const [dragons, setDragons] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        // Llama a fetchDragons() al montar el componente [cite: 976]
        fetchDragons()
            .then(data => {
                setDragons(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Filtra los dragones cuyo nombre incluya el texto de búsqueda (minúsculas) [cite: 984]
    const filteredDragons = dragons.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <SearchBar onSearch={setSearch} />
            {/* Manejo de estados de carga, error y lista vacía [cite: 978, 979, 980, 981] */}
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && filteredDragons.length === 0 && <EmptyState />}
            {!loading && !error && filteredDragons.length > 0 && <DragonList dragons={filteredDragons} />}
        </div>
    )
}