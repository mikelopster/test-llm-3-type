'use client'

import { useState } from 'react'

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-900"
      >
        Language
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
          {languages.map((lang) => (
            <li key={lang.code} className="px-4 py-2 hover:bg-gray-100">
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
