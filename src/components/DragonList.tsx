import DragonCard from './DragonCard'

export default function DragonList({ dragons }) {
  if (!dragons || dragons.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {dragons.map((dragon) => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
    </div>
  )
}