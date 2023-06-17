import { db } from './config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import axios from 'axios'

const COLLECTION_POKEDEX = 'pokedex'

export const getPokemons = async <T>(): Promise<T | null> => {
  return axios
    .get('https://luckydex-bot.herokuapp.com/pokemons')
    .then(res => res.data)
    .catch(error => {
      console.log(error)
    })
}

export const getPokedex = async <T>(uid: string): Promise<T | null> => {
  const docRef = doc(db, COLLECTION_POKEDEX, uid || '_')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as T
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
    return null
  }
}

type UpdatePokedexParams = {
  dex: string
  pokemon: string
  value: boolean
}
export const updatePokedex = async (uid: string, params: UpdatePokedexParams) => {
  const { dex, pokemon, value } = params
  const docRef = doc(db, COLLECTION_POKEDEX, uid || '_')
  await setDoc(docRef, { [pokemon]: { [dex]: value } }, { merge: true })
}
