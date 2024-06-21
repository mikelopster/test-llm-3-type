'use client'

import { useState } from 'react'

export default function SearchBar({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('enter pressed', searchTerm)
      onSearchChange(searchTerm)
    }
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
        className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
      />
    </div>
  )
}
