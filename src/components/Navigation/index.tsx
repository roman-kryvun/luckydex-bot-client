import { AccountCircle, ContactSupportOutlined, ShoppingCart } from '@mui/icons-material'
// import { useCartContext } from '../../contexts/cart'
import { Badge, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logoBlackHoney from '../../assets/logo.svg'
import logo2085 from '../../assets/logo2085.jpg'

export const Navigation = () => {
  // const { total, order, shopType } = useCartContext()
  // const navigate = useNavigate()
  // const cartRules = {
  //   aliquot: 6,
  // }

  // const companyLogo = shopType === 'bear' ? logo2085 : logoBlackHoney
  // return (
  //   <div
  //     style={{
  //       position: 'sticky',
  //       top: 0,
  //       zIndex: 5,
  //       backgroundColor: 'var(--block-bg-color)',
  //       height: '42px',
  //       borderTop: '1px solid var(--page-hint-color)',
  //       borderBottom: '1px solid var(--page-hint-color)',
  //       display: 'flex',
  //       justifyContent: 'space-between',
  //       alignItems: 'center',
  //       padding: '0px 5px',
  //     }}>
  //     {shopType === 'bear' && (
  //       <div style={{ float: 'left', padding: '0 7px', fontWeight: 600, maxWidth: '50px', lineHeight: 0 }} onClick={() => navigate('/')}>
  //         <img src={companyLogo} alt="logo" style={{ maxWidth: '100%', width: '100%', height: '100%' }} />
  //       </div>
  //     )}
  //
  //     {shopType !== 'bear' && (
  //       <div style={{ float: 'left', padding: '7px', fontWeight: 600, maxWidth: '150px' }} onClick={() => navigate('/')}>
  //         {/*Black Honey*/}
  //         <img src={companyLogo} width="293" height="20" alt="logo" style={{ maxWidth: '100%' }} />
  //       </div>
  //     )}
  //
  //     <div style={{ float: 'right', display: 'flex' }}>
  //       {shopType === 'bear' && (
  //         <Box sx={{ padding: '11px 10px 5px' }} onClick={() => navigate('/contacts')}>
  //           <ContactSupportOutlined sx={{ color: 'var(--tg-theme-text-color)' }} />
  //         </Box>
  //       )}
  //       <Box sx={{ padding: '11px 10px 5px' }} onClick={() => navigate('/profile')}>
  //         <AccountCircle sx={{ color: 'var(--tg-theme-text-color)' }} />
  //       </Box>
  //
  //       <Box sx={{ padding: '11px 10px 5px', color: 'var(--tg-theme-text-color' }} onClick={() => navigate('/cart')}>
  //         <Badge
  //           badgeContent={total}
  //           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //           color="default"
  //           sx={{ 'svg + *': { bgcolor: 'var(--main-color)', border: '1px solid var(--tg-theme-bg-color)' } }}>
  //           {shopType !== 'bear' && <ShoppingCart color="inherit" />}
  //           {shopType === 'bear' && <ShoppingCart
  //             color={cartRules?.aliquot && total > 0 ? (total % cartRules?.aliquot ? "error" : "success") : "inherit"}
  //             onClick={() => navigate("/cart")} />}
  //         </Badge>
  //       </Box>
  //     </div>
  //   </div>
  // )

  return <div />
}
