/* eslint-disable react/display-name */
import { memo, useState } from 'react'
import type { AddProductToWishListProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => import('./AddProductToWishlist').then(mod => mod.AddProductToWishList), {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
   product: {
    id: number
    price: number
    priceFormatted: string
    title: string
   }
   onAddToWishList: (id: number) => void
}

const ProductItemComponent = ({product, onAddToWishList}: ProductItemProps) => {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
    return (
        <div>
            {product.title} = <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Add to wishlist</button>
            {
                isAddingToWishlist && <AddProductToWishList onAddToWishList={() => onAddToWishList(product.id)}  onRequestClose={() => setIsAddingToWishlist(false)} />
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})
