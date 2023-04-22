import { createContext, useContext } from "react"
import { useCart } from '../hooks/useCart'

type CartType = {
  total: number
  products: any[],
  shopType: 'bear' | 'coffee',
  order: { [id: string]: number }
  addItem: (id: string) => void
  removeItem: (id: string) => void
}

const init: CartType = {
  total: 0,
  order: {},
  products: [],
  shopType: 'coffee',
  addItem: () => {},
  removeItem: () => {},
}

export const CartContext = createContext<CartType>(init)

// export const CartProvider = <CartContext.Provider value={cart} />

export const CartProvider = ({ children }: { children: any }) => {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}


export const useCartContext = () => useContext(CartContext)
