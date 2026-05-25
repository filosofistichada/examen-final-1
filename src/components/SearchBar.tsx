import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onSearch(e.target.value) // Llama a onSearch con el valor del input [cite: 942]
  }

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
      </div>
      <input
        type="text"
        placeholder="Buscar dragón por nombre..."
        className="w-full bg-gray-800 text-white rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}