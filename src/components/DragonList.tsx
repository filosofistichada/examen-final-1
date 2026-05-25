import DragonCard from './DragonCard'

export default function DragonList({ dragons }: { dragons: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {dragons.map((dragon: any) => (
        <DragonCard key={dragon.name} dragon={dragon} /> // key única [cite: 957]
      ))}
    </div>
  )
}