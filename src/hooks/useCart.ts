import { useEffect, useMemo, useState } from 'react'
import { getPokemons } from '../api'

export type Pokemon = {
  num: string
  name: string
  first_form: boolean
  baby: boolean
  legendary: boolean
  mythical: boolean
  ultra_beasts: boolean
  gender_diff: boolean
  released: boolean
  released_shiny: boolean
  forms_switchable: boolean
  released_shadow: boolean
  shiny_shadow: boolean
}

// let initOrder: Pokemon = {
//   num: "1",
//   name: "Bulbasaur",
//   first_form: true,
//   baby: false,
//   legendary: false,
//   mythical: false,
//   ultra_beasts: false,
//   gender_diff: false,
//   released: true,
//   released_shiny: true,
//   forms_switchable: false,
//   released_shadow: true,
//   shiny_shadow: true
// }
//
// try {
//   const storedOrder: string = window.localStorage.getItem('order') || '{}'
//   const res = JSON.parse(storedOrder)
//
//   const filterd = Object.entries(res).filter(([id, count]) => prodLists.some(item => item.title === id))
//   const obj = Object.fromEntries(filterd)
//   // @ts-ignore
//   if (obj) initOrder = obj
// } catch (e) {
//   console.error(e)
// }

const initPokemons: Pokemon[] = []
export const useCart = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initPokemons)

  // const total = useMemo(() => Object.values(order).reduce((total, numb) => total + numb, 0), [order])
  //
  // const addItem = (id: string): void => {
  //   setOrder(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  // }
  // const removeItem = (id: string): void => {
  //   if (!order[id]) return
  //
  //   setOrder(prev => {
  //     const decr = order[id] - 1
  //     const next = decr < 1 ? 0 : decr
  //     return { ...prev, [id]: decr }
  //   })
  // }

  // useEffect(() => {
  //   setTimeout(() => window.localStorage.setItem('order', JSON.stringify(order)), 10)
  // }, [order])

  useEffect(() => {
    getPokemons<{ response: Pokemon[] }>().then(r => {
      if (r?.response) setPokemons(r.response)
    })
  }, [])

  const pokemonsMap = useMemo(() => {
    return pokemons.reduce((agg: { [srt: string]: Pokemon }, pok) => {
      agg[pok.num] = pok
      return agg
    }, {})
  }, [pokemons])

  const releasedPokemon = pokemons.filter(({ released }) => released).map(({ num }) => num)
  const shinyPokemon = pokemons.filter(({ released_shiny }) => released_shiny).map(({ num }) => num)
  const shadowPokemon = pokemons.filter(({ released_shadow }) => released_shadow).map(({ num }) => num)

  return {
    pokemons,
    pokemonsMap,
    releasedPokemon,
    shinyPokemon,
    shadowPokemon,
  }
}
