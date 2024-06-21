'use client'

import { useState, useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import ShowMoreButton from './components/ShowMoreButton'
import LanguageDropdown from './components/LanguageDropdown'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [limit, setLimit] = useState(10)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isLoading, setIsLoading] = useState(true) // Loading state

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true) // Start loading
      try {
        const apiUrl = `/api/products?language=${selectedLanguage}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data.slice(0, limit))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false) // Stop loading, even if there's an error
      }
    }
    fetchProducts()
  }, [selectedLanguage])

  const handleSearchChange = async (searchTerm) => {
    console.log('searchTerm function', searchTerm)
    setIsLoading(true)
    try {
      const apiUrl = `/api/products/search?text=${searchTerm}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data.slice(0, limit))
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage)
  }

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 10)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <LanguageDropdown
          onLanguageChange={handleLanguageChange}
          selectedLanguage={selectedLanguage}
        />
      </div>
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <>
          <SearchBar onSearchChange={handleSearchChange} />
          <ProductList products={filteredProducts} />
          {filteredProducts.length < products.length && (
            <div className="flex justify-center mt-4">
              <d onClick={handleShowMore} />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No Result</p> // Display "No Result"
      )}
    </main>
  )
}
