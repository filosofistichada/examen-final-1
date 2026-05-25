export const fetchDragons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
    if (!res.ok) throw new Error('Error al cargar los dragones');
    const data = await res.json();
    
    const detailedDragons = await Promise.all(
        data.results.map(async (d: { url: string | URL | Request; }) => {
            const detailRes = await fetch(d.url);
            return detailRes.json();
        })
    );
    return detailedDragons;
};

export const fetchDragonDetail = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error('Error al cargar el detalle del dragón');
    return res.json();
};