import './styles.css'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useCartContext } from '../../contexts/cart'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import { ImageRenderer } from './components/ImageRenderer'
import Detective from './../../assets/detective-pikachu.png'
import { CopyNeeded } from './components/CopyNeeded'
import * as api from './../../api'
import { updatePokedex } from './../../api'

// import pokDataMap from './data/data.json'
// import pokInfoMap from './data/info.json'
import generatinosMap from './data/generations.json'
// import releasedPokemon from './data/released_pokemon.json'
// import __shinyPokemon from './data/shiny_pokemon.json'
//
// const shinyPokemon = [...new Set(__shinyPokemon.concat(['785', '786', '787', '793', '866', '900', '901']))]

var geners = [
  { key: '0', label: 'All' },
  { key: '1', label: 'Kanto' },
  { key: '2', label: 'Johto' },
  { key: '3', label: 'Hoenn' },
  { key: '4', label: 'Sinnoh' },
  { key: '5', label: 'Unova' },
  { key: '6', label: 'Kalos' },
  { key: '7', label: 'Alola' },
  { key: '8', label: 'Galar' },
  { key: '9', label: 'Paldea' },
]

const REGIONS: { [str: string]: string } = {
  '1': 'Kanto',
  '152': 'Johto',
  '252': 'Hoenn',
  '387': 'Sinnoh',
  '494': 'Unova',
  '650': 'Kalos',
  '722': 'Alola',
  '810': 'Galar',
  '906': 'Paldea',
}

type DexType = 'lucky' | 'shiny' | 'perfect' | 'shadow' | 'purified'

type Pokemon = { numero3decimals: string; urlImage: string; name: string; nr: string }

type SelectedPokemon = {
  [str: string]: {
    lucky?: boolean
    shiny?: boolean
    perfect?: boolean
    shadow?: boolean
    purified?: boolean
  }
}

// init start

type SettingsType = {
  first_form: boolean
  hide_collected: boolean
  hide_legendary: boolean
  hide_mythical: boolean
}

const DEFAULT_SETTING: SettingsType = {
  first_form: false,
  hide_collected: false,
  hide_legendary: false,
  hide_mythical: false,
}
const SETTINGS_KEY = 'settings_0'
const initSettings = getLocalStorageObject<SettingsType>(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTING))

type FilterType = {
  // is_first_form: boolean,
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  is_ultra_beasts: boolean
}

const DEFAULT_FILTERS: FilterType = {
  // is_first_form: false,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  is_ultra_beasts: false,
}
const FILTERS_KEY = 'filters_0'
const initFilters = getLocalStorageObject<FilterType>(FILTERS_KEY, JSON.stringify(DEFAULT_FILTERS))

const DEFAULT_GEN = '0'
const GEN_KEY = 'gen_0'
const initGen = getLocalStorageValue<string>(
  GEN_KEY,
  DEFAULT_GEN,
  geners.map(({ key }) => key),
)

const DEFAULT_DEX = 'lucky'
const DEX_KEY = 'dex_0'
const initDex = getLocalStorageValue<DexType>(DEX_KEY, DEFAULT_DEX, ['lucky', 'shiny', 'perfect', 'shadow', 'purified'])

function setLocalStorageObject(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorageObject<T>(key: string, defaultJSON: string): T {
  // @ts-ignore
  let storedVisibleTeamList = window.localStorage.getItem(key) || defaultJSON
  let initVisibleTeamList = JSON.parse(defaultJSON)
  try {
    // @ts-ignore
    initVisibleTeamList = JSON.parse(storedVisibleTeamList) || {}
  } catch (e) {
    console.error(e)
  }

  return initVisibleTeamList as T
}

function setLocalStorageValue(key: string, value: any) {
  window.localStorage.setItem(key, value)
}

function getLocalStorageValue<T>(key: string, def: T, validValues: T[]): T {
  // @ts-ignore
  const storedValue: T = window.localStorage.getItem(key) || def
  return validValues.includes(storedValue) ? storedValue : def
}

// init end

export const Home = () => {
  const navigate = useNavigate()
  const { pokemons: dataset, pokemonsMap, releasedPokemon, shinyPokemon, shadowPokemon } = useCartContext()

  const [editable, setEditable] = useState(true)

  const [settings, setSettings] = useState(initSettings)
  const [filters, setFilters] = useState(initFilters)
  const [displayPokemons, setDisplayPokemons] = useState<Pokemon[]>([])
  // const [disPok, setDisPok] = useState<Pokemon[]>([])

  const [relesedPokemon, setRelesedPokemon] = useState<Pokemon[]>([])
  const [shinyRelesedPokemon, setShinyRelesedPokemon] = useState<Pokemon[]>([])
  const [shadowRelesedPokemon, setShadowRelesedPokemon] = useState<Pokemon[]>([])
  const [purifiedRelesedPokemon, setPurifiedRelesedPokemon] = useState<Pokemon[]>([])

  const [catchPokemon, setCatchPokemon] = useState<SelectedPokemon>({})
  const [showFilters, setShowFilters] = useState(false)
  // const [showSettings, setShowSettings] = useState(false)
  const [gen, setGen] = useState(initGen)
  const [dex, setDex] = useState<DexType>(initDex)

  // console.log('catchPokemon', catchPokemon);
  /////////////////////////////////

  var toggle = false

  // @ts-ignore
  function imgLoaded(img) {
    var imagelink = img.parentNode

    imagelink.className += imagelink.className ? ' loaded' : 'loaded'
  }

  // @ts-ignore
  function orderNumber(str) {
    var mySubString = str.substring(str.lastIndexOf('s/') + 2, str.lastIndexOf('/'))
    return mySubString
  }

  //https://vignette.wikia.nocookie.net/es.pokemon/images/4/43/Bulbasaur.png
  let html = ''
  // @ts-ignore
  const fetchPokemons = async (endpoint, gen) => {
    if (gen === '0') {
      // @ts-ignore
      return geners.reduce((agg, { key }) => {
        if (key === '0') return agg
        // @ts-ignore
        return [...agg, ...generatinosMap[key]]
      }, [])
    }
    // @ts-ignore
    return generatinosMap[gen]
    // let data
    //
    // try {
    //   //fetch(endpoint, {mode: 'cors'})
    //   const response = await fetch(endpoint, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     //body: JSON.stringify(todo)
    //   })
    //   data = await response.json()
    // } catch (error) {
    //   console.log(error)
    // }
    // return data.pokemon_species
  }

  async function getPokemons(toggle = false) {
    let endpoint = `https://pokeapi.co/api/v2/generation/${gen}/`
    // var container = document.getElementById('container')
    // @ts-ignore
    // container.innerHTML = ''
    let pokemons = []

    pokemons = await fetchPokemons(endpoint, gen)

    for (let j = 0; j < pokemons.length; j++) {
      pokemons[j].nr = orderNumber(pokemons[j].url)
    }

    pokemons = pokemons.filter(({ nr }: { nr: string }) => releasedPokemon.includes(nr))

    if (dex === 'lucky') {
      // @ts-ignore
      pokemons = pokemons.filter(({ nr }) => {
        const _deteils = pokemonsMap[nr]
        return !_deteils?.mythical || ['808', '809'].includes(nr)
      })
    }

    // @ts-ignore
    pokemons.sort((a, b) => a.nr - b.nr)

    // const toggleurl = toggle
    //   ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
    //   : "https://www.serebii.net/pokemongo/pokemon/shiny/";

    // @ts-ignore
    const _nv = pokemons.map(pokemon => {
      let numero3decimals = orderNumber(pokemon.url)
      if (numero3decimals < 10) {
        numero3decimals = '0' + numero3decimals
      }
      if (numero3decimals < 100) {
        numero3decimals = '0' + numero3decimals
      }
      let toggleurl = dex === 'shiny' ? 'https://www.serebii.net/pokemongo/pokemon/shiny/' : 'https://www.serebii.net/pokemongo/pokemon/'

      // fix for Lake Trio Shiny
      if (dex === 'shiny' && ['480', '481', '482'].includes(numero3decimals)) {
        toggleurl = 'https://www.serebii.net/Shiny/SWSH/'
      }

      // img.src = 'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif'
      const urlImage = `${toggleurl}${numero3decimals}.png`

      return { ...pokemon, numero3decimals, urlImage }
    })

    setRelesedPokemon(_nv)
    setShinyRelesedPokemon(_nv.filter(({ nr }: { nr: string }) => shinyPokemon.includes(nr)))
    setShadowRelesedPokemon(_nv.filter(({ nr }: { nr: string }) => shadowPokemon.includes(nr)))
    setPurifiedRelesedPokemon(_nv.filter(({ nr }: { nr: string }) => Boolean(pokemonsMap[nr]?.released_shadow)))

    // setDisPok(_nv)
    // container.innerHTML+=html;
  }

  const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

  const urlOficialimages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
  //https://pokeapi.co/api/v2/generation/1
  const container = document.getElementById('container')
  const otherImages = 'https://raw.githubusercontent.com/anchetaWern/pokeapi-json/master/data/v1/media/img/1.png'
  //const imagesPOkemonGo= 'https://www.serebii.net/pokemongo/pokemon/113.png';
  const URL2 = 'https://pokeapi.co/api/v2/generation/1/'
  //pokemon_species[name,url];
  //var selection = document.querySelector('input[name="generation"]:checked').value;
  // var numero = 1;

  // const goToCart = () => {
  //   // @ts-ignores
  //   window.Telegram.WebApp.MainButton.hide()
  //   navigate('/cart')
  // }

  //
  // useEffect(() => {
  //   fetchRelesedPokemons()
  // }, [])

  const onDexSelected = (nextDex: DexType) => {
    setDex(nextDex)
  }

  const onResetSettings = () => {
    // @ts-ignore
    // setSettings(Object.fromEntries(Object.entries(filters).map(([key]) => [key, false])))
    setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTING)))
    // setShowSettings(false)
  }

  const onSettingsSelected = (filter: string) => {
    setSettings(prev => {
      // @ts-ignore
      return Object.assign({}, prev, { [filter]: !prev[filter] })
    })
  }

  const onResetFilter = () => {
    // @ts-ignore
    // setFilters(Object.fromEntries(Object.entries(filters).map(([key]) => [key, false])))
    setFilters(JSON.parse(JSON.stringify(DEFAULT_FILTERS)))
    // setShowFilters(false)
    setSettings(JSON.parse(JSON.stringify(DEFAULT_SETTING)))
  }

  const onFilterSelected = (filter: string) => {
    setFilters(prev => {
      // @ts-ignore
      return Object.assign({}, prev, { [filter]: !prev[filter] })
    })
  }

  const onGenSelected = (nextGen: string) => setGen(nextGen)

  const onPokemonSelect = async (dex: DexType, pokemonNumber: string) => {
    if (!editable) return

    try {
      const _pok = catchPokemon[pokemonNumber] || {}
      const value = !_pok[dex]

      const uid = (Telegram?.WebApp?.initDataUnsafe?.user?.id || '').toString()
      await updatePokedex(uid, { dex, pokemon: pokemonNumber, value })

      setCatchPokemon(prev => {
        // const _pok = prev[pokemonNumber] || {}
        return { ...prev, [pokemonNumber]: { ..._pok, [dex]: !_pok[dex] } }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const updateDisplayPokemon = () => {
    // let res = dex === 'shiny' ? [...shinyRelesedPokemon] : [...relesedPokemon]
    let res = relesedPokemon

    switch (dex) {
      case 'lucky':
        res = [...relesedPokemon]
        break
      case 'perfect':
        res = [...relesedPokemon]
        break
      case 'shiny':
        res = [...shinyRelesedPokemon]
        break
      case 'shadow':
        res = [...shadowRelesedPokemon]
        break
      case 'purified':
        res = [...purifiedRelesedPokemon]
        break
      default:
        res = [...relesedPokemon]
    }

    console.log({ filters, settings })

    if (Object.values(filters).some(Boolean) || Object.values(settings).some(Boolean)) {
      const { is_baby, is_legendary, is_mythical, is_ultra_beasts } = filters
      const { first_form, hide_collected, hide_mythical, hide_legendary } = settings

      res = res
        .filter(({ nr }) => {
          if (!first_form) return true
          const _info = pokemonsMap[nr]

          return first_form && _info?.first_form
        })
        .filter(({ nr }) => {
          if (!hide_collected) return true
          // @ts-ignore
          const _info = catchPokemon[nr] || {}

          return hide_collected && !_info[dex]
        })
        .filter(({ nr }) => {
          const _deteils = pokemonsMap[nr]

          if (!hide_legendary) return true

          return hide_legendary && !_deteils?.legendary
        })
        .filter(({ nr }) => {
          const _deteils = pokemonsMap[nr]

          if (!hide_mythical) return true

          return hide_mythical && !_deteils?.mythical
        })
        .filter(({ nr }) => {
          const _deteils = pokemonsMap[nr]

          if (_deteils && [is_baby, is_legendary, is_mythical, is_ultra_beasts].includes(true)) {
            return (
              (is_baby && _deteils?.baby) ||
              (is_legendary && _deteils?.legendary) ||
              (is_mythical && _deteils?.mythical) ||
              (is_ultra_beasts && _deteils?.ultra_beasts)
            )
          }

          return true
        })
        .map(item => {
          catchPokemon[item.nr]
          return Object.assign({}, item)
        })
    }

    setDisplayPokemons(res)
  }

  useEffect(() => {
    getPokemons()
  }, [dex, gen, dataset])

  // useEffect(() => {
  //   updateDisplayPokemon()
  // }, [shinyRelesedPokemon, relesedPokemon])

  useEffect(() => {
    updateDisplayPokemon()
  }, [dex, shinyRelesedPokemon, relesedPokemon, filters, settings, gen])

  useEffect(() => {
    const uid = (Telegram?.WebApp?.initDataUnsafe?.user?.id || '').toString()
    // console.log('ue', uid)
    if (typeof uid === 'string') {
      api.getPokedex<SelectedPokemon>(uid).then(res => {
        if (res !== null) setCatchPokemon(res)
      })
    }
  }, [dex])

  const selectOptions = useMemo(() => {
    const [common, ...rest] = geners
    const options = rest.map(({ key, label }) => {
      let count = 0
      let total = 0
      if (key === '0') {
        // @ts-ignore
        // total = geners.reduce((agg, { key }) => {
        //   // @ts-ignore
        //   const arr = generatinosMap[key] || []
        //   return agg + (arr?.length || 0)
        //   // return agg + 1
        // }, 0)
      } else {
        // @ts-ignore
        const arr = (generatinosMap[key] || []).filter(({ url }: { url: string }) => {
          const _nr = orderNumber(url)

          switch (dex) {
            case 'lucky':
              return (pokemonsMap[_nr]?.released && (!pokemonsMap[_nr]?.mythical || ['808', '809'].includes(_nr))) || false
            case 'perfect':
              return pokemonsMap[_nr]?.released || false
            case 'shiny':
              return pokemonsMap[_nr]?.released_shiny || false
            case 'shadow':
              return pokemonsMap[_nr]?.released_shadow || false
            case 'purified':
              return pokemonsMap[_nr]?.released_shadow || false
            default:
              return pokemonsMap[_nr]?.released || false
          }

          // if (dex === 'lucky') {
          //   return releasedPokemon.includes(_nr) && (!pokemonsMap[_nr]?.mythical || ['808', '809'].includes(_nr))
          // }
          // return dex === 'shiny' ? shinyPokemon.includes(_nr) : releasedPokemon.includes(_nr)
        })
        // console.log('-----------------')
        // console.log('arr', arr)
        // console.log('-----------------')
        // const arr = (generatinosMap[key] || []).filter((_i) => dex !== 'shiny' ? releasedPokemon.includes(_i) : shinyPokemon.includes(_i))
        total = arr.length || 0
        // @ts-ignore
        count = arr.filter(({ url }) => {
          const number = orderNumber(url)
          const pok = catchPokemon[number] || {}
          return pok[dex] || false
        }).length
        // total = 0
      }

      return { key, label, count, total }
    })

    const { count, total } = options.reduce(
      (agg, { count, total }) => {
        agg.count = agg.count + count
        agg.total = agg.total + total
        return { ...agg }
      },
      { count: 0, total: 0 },
    )

    return [{ ...common, count, total }, ...options].reduce((agg, { key, label, count, total }) => {
      //@ts-ignore
      agg[key] = `${label}  (${count}/${total})`

      return agg
    }, {})
  }, [gen, dex, catchPokemon, displayPokemons, filters, settings])

  useEffect(() => setLocalStorageValue(DEX_KEY, dex), [dex])
  useEffect(() => setLocalStorageValue(GEN_KEY, gen), [gen])
  useEffect(() => setLocalStorageObject(SETTINGS_KEY, settings), [settings])
  useEffect(() => setLocalStorageObject(FILTERS_KEY, filters), [filters])

  const filtersApply = Object.values(filters).filter(Boolean).length + Object.values(settings).filter(Boolean).length

  if (!dataset?.length) {
    return (
      <div className='global-loader'>
        <div className='gbc'>
          <input id='powerSwitch' checked aria-label='Toggle Gameboy power' className='gbc-power-control'
                 type='checkbox' />
          <label htmlFor='powerSwitch' className='gbc-power-label'>
            <div className='gbc-power-label-lines'>
              <div className='gbc-power-label-line gbc-power-label-line-1' />
              <div className='gbc-power-label-line gbc-power-label-line-2' />
              <div className='gbc-power-label-line gbc-power-label-line-3' />
            </div>
          </label>
          <div className='gbc-body'>
            <div className='gbc-screen-wrap'>
              <div className='gbc-screen-light' />
              <div className='gbc-screen'>
                <div className='pika-wrap'>
                  <div className='pika'>
                    <div className='pika-head'>
                      <div className='pika-face'>
                        <div className='pika-eye pika-eye-left' />
                        <div className='pika-eye pika-eye-right' />
                        <div className='pika-nose' />
                        <div className='pika-mouth'>
                          <div className='pika-mouth-3' />
                          <div className='pika-mouth-inner' />
                        </div>
                        <div className='pika-cheek pika-cheek-left' />
                        <div className='pika-cheek pika-cheek-right' />
                      </div>
                      <div className='pika-ear pika-ear-left' />
                      <div className='pika-ear pika-ear-right' />
                    </div>
                    <div className='pika-body'>
                      <div className='pika-torso' />
                      <div className='pika-arm pika-arm-left'>
                        <div className='pika-arm-fingers' />
                        <div className='pika-arm-shadow' />
                      </div>
                      <div className='pika-arm pika-arm-right'>
                        <div className='pika-arm-fingers' />
                        <div className='pika-arm-shadow' />
                      </div>
                      <div className='pika-tail pika-tail-1'>
                        <div className='pika-tail pika-tail-2'>
                          <div className='pika-tail pika-tail-3' />
                        </div>
                      </div>
                    </div>
                    <div className='pika-bubble'>Pika!</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='gbc-controls'>
              <div className='gbc-dpad' />
              <div className='gbc-button gbc-button-a' />
              <div className='gbc-button gbc-button-b' />
              <div className='gbc-pill gbc-pill-start' />
              <div className='gbc-pill gbc-pill-select' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <CopyNeeded list={displayPokemons.map(({ nr }) => nr)} />
      {/*<Navigation />*/}
      <div className={`dex-buttons`}>
        <div className={`dex-button  dex-lucky ${dex === 'lucky' ? 'active' : ''}`}
             onClick={() => onDexSelected('lucky')}>
          Lucky
        </div>
        <div className={`dex-button  dex-shiny ${dex === 'shiny' ? 'active' : ''}`}
             onClick={() => onDexSelected('shiny')}>
          Shiny
        </div>
        <div className={`dex-button  dex-perfect ${dex === 'perfect' ? 'active' : ''}`}
             onClick={() => onDexSelected('perfect')}>
          Perfect
        </div>
        <div className={`dex-button  dex-shadow ${dex === 'shadow' ? 'active' : ''}`}
             onClick={() => onDexSelected('shadow')}>
          Shadow
        </div>
        <div className={`dex-button  dex-purified ${dex === 'purified' ? 'active' : ''}`}
             onClick={() => onDexSelected('purified')}>
          Purified
        </div>
      </div>

      <section className=''>
        {/*<img id="btnAllSchool" src="https://img.icons8.com/color/48/000000/pokeball-2.png" />*/}
        <h2 className='title' id='title'>
          Gotta catch 'em all!
        </h2>

        <div className='filters filters-sticky'>
          <select
            style={{ flex: '1 1 100%', margin: '0 0.25rem', textAlign: 'center' }}
            className='minimal'
            name='generation-select'
            id='generation-select'
            value={gen}
            onChange={e => onGenSelected(e.target.value)}>
            {/*{selectOptions?.map(({ key, label }) => (*/}
            {/*  <option key={label} value={key}>*/}
            {/*    {label}*/}
            {/*  </option>*/}
            {/*))}*/}
            {/*<option value="0">All generations </option>*/}
            {geners.map(({ key, label }) => (
              <option key={label} value={key}>
                {
                  // @ts-ignore
                  selectOptions[key]
                }
              </option>
            ))}
          </select>
          {/*<input className="radio-gens" type="radio" id="all-gens" value={'0'} name="generation" checked={gen === '0'} readOnly />*/}
          {/*<label htmlFor="all-gens" className="label-gens" onClick={() => onGenSelected('0')}>*/}
          {/*  All*/}
          {/*</label>*/}
          {/*{geners.map(({ key, label }) => (*/}
          {/*  <Fragment key={label}>*/}
          {/*    <input className="radio-gens" type="radio" id={label} value={key} name="generation" checked={gen === key} readOnly />*/}
          {/*    <label htmlFor={label} className="label-gens" onClick={() => onGenSelected(key)}>*/}
          {/*      {label}*/}
          {/*    </label>*/}
          {/*  </Fragment>*/}
          {/*))}*/}

          {/* ********************************* */}
          {/* ************ Setting ************ */}
          {/* ********************************* */}
          {/*<div className="config-box left">*/}
          {/*  <div className="filters-head">*/}
          {/*    /!*<button className={['dex-button', showSettings ? 'active' : ''].join(' ')} style={{ margin: '' }} onClick={() => setShowSettings(!showSettings)}>*!/*/}
          {/*    /!*  Settings*!/*/}
          {/*    /!*</button>*!/*/}
          {/*    {Object.values(settings).some(Boolean) && (*/}
          {/*      <div style={{ lineHeight: 0, opacity: 0.8 }} onClick={onResetSettings}>*/}
          {/*        <svg*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          fill="#000000"*/}
          {/*          height="31px"*/}
          {/*          width="31px"*/}
          {/*          version="1.1"*/}
          {/*          id="Layer_1"*/}
          {/*          viewBox="0 0 512 512"*/}
          {/*          style={{ padding: '8px', fill: 'var(--text-color)' }}>*/}
          {/*          <g>*/}
          {/*            <g>*/}
          {/*              <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512     512,452.922 315.076,256   " />*/}
          {/*            </g>*/}
          {/*          </g>*/}
          {/*        </svg>*/}
          {/*        /!*reset*!/*/}
          {/*        /!*reset {Object.values(settings).some(Boolean) && <span>{Object.values(settings).filter(Boolean).length}</span>}*!/*/}
          {/*        /!*setting{Object.values(settings).filter(Boolean).length > 1 && 's'}*!/*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </div>*/}

          {/*  {showFilters &&*/}
          {/*    [*/}
          {/*      { key: 'first_form', label: '1st form' },*/}
          {/*      { key: 'hide_collected', label: `Hide ${dex}` },*/}
          {/*      { key: 'hide_legendary', label: 'Hide Legendary' },*/}
          {/*      {*/}
          {/*        key: 'hide_mythical',*/}
          {/*        label: 'Hide Mythical',*/}
          {/*      },*/}
          {/*    ].map(({ key, label }) => (*/}
          {/*      <Fragment key={label}>*/}
          {/*        <input*/}
          {/*          className="radio-gens"*/}
          {/*          type="radio"*/}
          {/*          id={'settings' + label}*/}
          {/*          value={key}*/}
          {/*          name={'settings' + key}*/}
          {/*          checked={*/}
          {/*            // @ts-ignore*/}
          {/*            settings[key] === true*/}
          {/*          }*/}
          {/*          readOnly*/}
          {/*        />*/}
          {/*        <label htmlFor={'settings' + label} className="label-gens" onClick={() => onSettingsSelected(key)}>*/}
          {/*          {label}*/}
          {/*        </label>*/}
          {/*      </Fragment>*/}
          {/*    ))}*/}
          {/*</div>*/}
          {/* ********************************* */}
          {/* ************ FILTERS ************ */}
          {/* ********************************* */}
          <div className='config-box left'>
            <div className='filters-head text' onClick={() => setEditable(!editable)}>
              <span style={{ fontSize: '24px' }}>{editable ? '🔓' : '🔒'}</span>
              <small>{editable ? 'edit mode' : 'view only'}</small>
            </div>
          </div>
          <div className='config-box right'>
            <div className='filters-head'>
              {/*{(Object.values(filters).some(Boolean) || Object.values(settings).some(Boolean)) && (*/}
              {/*  <div style={{ lineHeight: 0, opacity: 0.8 }} onClick={onResetFilter}>*/}
              {/*    <span style={{verticalAlign: "text-top"}}>reset</span>*/}
              {/*    <svg*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*      fill="#000000"*/}
              {/*      height="30px"*/}
              {/*      width="30px"*/}
              {/*      version="1.1"*/}
              {/*      id="Layer_1"*/}
              {/*      viewBox="0 0 512 512"*/}
              {/*      style={{ padding: '8px', fill: 'var(--text-color)' }}>*/}
              {/*      <g>*/}
              {/*        <g>*/}
              {/*          <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512     512,452.922 315.076,256   " />*/}
              {/*        </g>*/}
              {/*      </g>*/}
              {/*    </svg>*/}
              {/*    /!*reset*!/*/}
              {/*    /!*reset {Object.values(settings).some(Boolean) && <span>{Object.values(settings).filter(Boolean).length}</span>}*!/*/}
              {/*    /!*setting{Object.values(settings).filter(Boolean).length > 1 && 's'}*!/*/}
              {/*  </div>*/}
              {/*)}*/}
              <button className={['dex-button', showFilters ? 'active' : ''].join(' ')}
                      style={{ margin: '', fontSize: '14px' }} onClick={() => setShowFilters(!showFilters)}>
                Filters
                {filtersApply > 0 && <small>{` (${filtersApply})`}</small>}
              </button>
            </div>

            {showFilters && (
              <div className='filters-popup'>
                <span style={{ padding: '2px 4px 0' }}>Show</span>

                {[{ key: 'first_form', label: '1st form' }].map(({ key, label }) => (
                  <Fragment key={label}>
                    <input
                      className='radio-gens'
                      type='radio'
                      id={'settings' + label}
                      value={key}
                      name={'settings' + key}
                      checked={
                        // @ts-ignore
                        settings[key] === true
                      }
                      readOnly
                    />
                    <label htmlFor={'settings' + label} className='label-gens' onClick={() => onSettingsSelected(key)}>
                      {
                        // @ts-ignore
                        settings[key] === true ? '✔️' : ''
                      }{' '}
                      {label}
                    </label>
                  </Fragment>
                ))}
                {[
                  // { key: 'is_first_form', label: '1st form' },
                  { key: 'is_baby', label: 'baby' },
                  { key: 'is_legendary', label: 'legendary' },
                  { key: 'is_mythical', label: 'mythical' },
                  { key: 'is_ultra_beasts', label: 'ultra beasts' },
                ].map(({ key, label }) => (
                  <Fragment key={label}>
                    <input
                      className='radio-gens'
                      type='radio'
                      id={label}
                      value={key}
                      name={'filter' + key}
                      checked={
                        // @ts-ignore
                        filters[key] === true
                      }
                      readOnly
                    />
                    <label htmlFor={label} className='label-gens' onClick={() => onFilterSelected(key)}>
                      {
                        // @ts-ignore
                        filters[key] === true ? '✔️' : ''
                      }{' '}
                      {label}
                    </label>
                  </Fragment>
                ))}
                <span style={{ padding: '2px 4px 0' }}>Hide</span>
                {[{ key: 'hide_collected', label: `${dex}` }].map(({ key, label }) => (
                  <Fragment key={label}>
                    <input
                      className='radio-gens'
                      type='radio'
                      id={'settings' + label}
                      value={key}
                      name={'settings' + key}
                      checked={
                        // @ts-ignore
                        settings[key] === true
                      }
                      readOnly
                    />
                    <label htmlFor={'settings' + label} className='label-gens' onClick={() => onSettingsSelected(key)}>
                      {
                        // @ts-ignore
                        settings[key] === true ? '❌️' : ''
                      }{' '}
                      {label}
                    </label>
                  </Fragment>
                ))}
                <div style={{ padding: '4px' }} />
                {[
                  // { key: 'hide_collected', label: `${dex}` },
                  { key: 'hide_legendary', label: 'Legendary' },
                  { key: 'hide_mythical', label: 'Mythical' },
                ].map(({ key, label }) => (
                  <Fragment key={label}>
                    <input
                      className='radio-gens'
                      type='radio'
                      id={'settings' + label}
                      value={key}
                      name={'settings' + key}
                      checked={
                        // @ts-ignore
                        settings[key] === true
                      }
                      readOnly
                    />
                    <label htmlFor={'settings' + label} className='label-gens' onClick={() => onSettingsSelected(key)}>
                      {
                        // @ts-ignore
                        settings[key] === true ? '❌' : ''
                      }{' '}
                      {label}
                    </label>
                  </Fragment>
                ))}

                <button className='dex-button' disabled={!filtersApply} style={{
                  margin: '10px 4px 0', background: 'var(--danger-color)',
                  borderColor: 'var(--danger-color)',
                  color: 'var(--white)', fontSize: '14px',
                }} onClick={onResetFilter}>
                  RESET
                </button>

                <button className='dex-button' style={{
                  margin: '0 4px 0', background: 'var(--success-color)',
                  borderColor: 'var(--success-color)',
                  color: 'var(--white)', fontSize: '14px',
                }} onClick={() => setShowFilters(!showFilters)}>
                  OK
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`container dex-${dex}`} id='container'>
          {displayPokemons.map((pokemon, i) => (
            <Fragment key={[dex, i].join('_')}>
              {REGIONS[pokemon.nr] && (
                <li className='region'>
                  <div>{REGIONS[pokemon.nr]}</div>
                </li>
              )}

              <li
                className={`item ${catchPokemon[pokemon.nr] && catchPokemon[pokemon.nr][dex] ? 'selected' : ''}`}
                key={[dex, i].join('_')}
                onClick={() => onPokemonSelect(dex, pokemon.nr)}>
                <ImageRenderer
                  key={pokemon.numero3decimals || i}
                  url={pokemon.urlImage}
                  altLabel={pokemon.name}
                  thumb={'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif'}
                  width={100}
                  height={100}
                />
                <div>#{pokemon.numero3decimals}</div>
              </li>
            </Fragment>
          ))}

          {relesedPokemon.length > 0 && displayPokemons.length === 0 && (
            <div className='no-pokemons'>
              <img src={Detective} alt='sad pokemon' className='displayed' style={{ maxWidth: '120px' }} />
              <br />
              <div>No matching Pokemon found</div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

//https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
//https://www.serebii.net/pokemongo/pokemon/${numero3decimals}.png
