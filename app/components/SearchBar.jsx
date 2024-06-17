'use client'

import { useState } from 'react'

export default function SearchBar({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    onSearchChange(event.target.value)
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />
    </div>
  )
}
