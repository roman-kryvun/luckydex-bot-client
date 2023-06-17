import { createContext, useContext } from "react"
import { Pokemon, useCart } from '../hooks/useCart'

type CartType = {
  pokemons: Pokemon[],
  pokemonsMap: {[num: string]: Pokemon },
  releasedPokemon: string[],
  shinyPokemon: string[],
  shadowPokemon: string[],
  // total: number
  // shopType: 'bear' | 'coffee',
  // order: { [id: string]: number }
  // addItem: (id: string) => void
  // removeItem: (id: string) => void
}

const init: CartType = {
  pokemons: [],
  pokemonsMap: {},
  releasedPokemon: [],
  shinyPokemon: [],
  shadowPokemon: [],
}

export const CartContext = createContext<CartType>(init)

// export const CartProvider = <CartContext.Provider value={cart} />

export const CartProvider = ({ children }: { children: any }) => {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}


export const useCartContext = () => useContext(CartContext)
