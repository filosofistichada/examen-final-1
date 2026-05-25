import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (dragon) => {
    setFavorites((prev) => {
      // Si el dragón ya está en favoritos, no hacer nada
      if (prev.some((d) => d.name === dragon.name)) return prev;
      // Agregar el dragón al array de favoritos
      return [...prev, dragon];
    })
  }

  const removeFavorite = (dragonName) => {
    // Filtrar el dragón del array por nombre
    setFavorites((prev) => prev.filter((d) => d.name !== dragonName))
  }

  const isFavorite = (dragonName) => {
    // Retornar true si el dragón ya está en favoritos
    return favorites.some((d) => d.name === dragonName)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}