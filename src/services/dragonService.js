const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

export const fetchDragons = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los dragones');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
        throw error;
    }
};