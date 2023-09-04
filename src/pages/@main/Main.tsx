import { GlobalLoader } from '../../components/GlobalLoader'
import { useCartContext } from '../../contexts/cart'
import { useEffect, useMemo, useState } from 'react'
import * as api from '../../api'
import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DEX_COLORS } from '../../constants/colors'
import { showMainPage } from '../../utils'

export const Main = () => {
  const navigate = useNavigate()
  const { pokemons: dataset, pokemonsMap, releasedPokemon, shinyPokemon, shadowPokemon } = useCartContext()
  // return <GlobalLoader />
  const [catchPokemon, setCatchPokemon] = useState<SelectedPokemon>({})


  useEffect(() => {
    const uid = (Telegram?.WebApp?.initDataUnsafe?.user?.id || '').toString()
    // console.log('ue', uid)
    if (typeof uid === 'string') {
      api.getPokedex<SelectedPokemon>(uid).then(res => {
        if (res !== null) setCatchPokemon(res)
      })
    }
  }, [Telegram?.WebApp?.initDataUnsafe?.user?.id])

  const progress = useMemo(() => {
    const result: Record<string, number> = {
      shiny: 0,
      purified: 0,
      perfect: 0,
      shadow: 0,
      lucky: 0,
    }

    const len = 1000
    for (let i = 1; i <= len; i++) {
      Object.entries(catchPokemon[i] || {}).forEach(([key, value]) => {
        if (value) {
          result[key] = (result[key] || 0) + 1
        }
      })
    }

    return result
  }, [catchPokemon])


  const collections = [
    { label: 'LuckyDex', color: DEX_COLORS.lucky, count: progress.lucky, total: (releasedPokemon?.length - 14)},
    { label: 'ShinyDex', color: DEX_COLORS.shiny, count: progress.shiny, total: shinyPokemon?.length},
    { label: 'PerfectDex', color: DEX_COLORS.perfect, count: progress.perfect, total: releasedPokemon?.length},
    { label: 'PurifiedDex', color: DEX_COLORS.purified, count: progress.purified, total: shadowPokemon?.length},
    { label: 'ShadowDex', color: DEX_COLORS.shadow, count: progress.shadow, total: shadowPokemon?.length},
  ]

  console.log('> catchPokemon', catchPokemon)
  console.log('> progress', progress)
  console.log('> ')

  if (!dataset?.length) return (<GlobalLoader />)

  return (
    <>
      {showMainPage() && <Box>
        <Box onClick={() => navigate('/')}>Pokedex</Box>
      </Box>}

      <h1>Trainer</h1>

      {collections.map((item) => <CollectionItem key={item.label} {...item}/>)}


      {/*<script async type="text/javascript">*/}
      {/*  function onTelegramAuth(user) {*/}
      {/*  // @ts-ignore*/}
      {/*  alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');*/}
      {/*}*/}
      {/*</script>*/}
    </>
  )
}

function onTelegramAuth(user: {
  username: string, first_name: string,
  last_name: string, id: string
}) {
  const name = user?.username ? '@' + user?.username : [user?.first_name, user?.last_name].filter(Boolean).join(' ')
  alert(`Logged in as ${name}`)
  // alert(
  //   'Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')'
  // );
}

// <script type='text/javascript'>
//   function onTelegramAuth(user) {

//       // alert(
//       //   'Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')'
//       // );
//     }
//     </script>
type CollectionItemProps = {
  label: string
  count?: number,
  total?: number,
  color: string,
}

const CollectionItem = ({ label, count, total, color }: CollectionItemProps) => {
  return <Box display="flex" gap={2} my={1} alignItems="center">
    <CircularProgressWithLabel mainColor={color} value={(100 * (count || 0)) / (total || 0)} />
    {label} <small>{count || 0} / {total || 0}</small>
  </Box>
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, mainColor: string },
) {

  const { mainColor, ...prop } = props
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Box color={mainColor} lineHeight={0}>
        <CircularProgress color='inherit' variant='determinate' {...prop} />
      </Box>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='inherit'
          sx={{ opacity: .8 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}