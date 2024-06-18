'use client'

import { useState } from 'react'

export default function LanguageDropdown({ onLanguageChange, selectedLanguage }) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'English', label: 'English' },
    { code: 'Thailand', label: 'Thailand' },
  ]

  const handleLanguageClick = (languageCode) => {
    setIsOpen(false) // Close the dropdown
    onLanguageChange(languageCode) // Notify parent component
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-900"
      >
        {selectedLanguage}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleLanguageClick(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
