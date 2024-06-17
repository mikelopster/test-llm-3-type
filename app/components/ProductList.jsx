'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductList({ products }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Link href={product.link} target="_blank">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Buy Now
              </button>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
