import { createContext, useContext, useState, ReactNode } from 'react'

const FavoritesContext = createContext<any>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([])

  function addFavorite(dragon: any) {
    setFavorites(prev => {
      // Si el dragón ya está en favoritos (mismo nombre), no hacer nada [cite: 963]
      if (prev.some(d => d.name === dragon.name)) return prev;
      // Si no está, agregarlo al array [cite: 964]
      return [...prev, dragon];
    });
  }

  function removeFavorite(dragonName: string) {
    // Filtrar el dragón del array por nombre [cite: 967]
    setFavorites(prev => prev.filter(d => d.name !== dragonName));
  }

  function isFavorite(dragonName: string) {
    // Retornar true si el dragón está en el array de favoritos [cite: 970]
    return favorites.some(d => d.name === dragonName);
  }

  const value = { favorites, addFavorite, removeFavorite, isFavorite }

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