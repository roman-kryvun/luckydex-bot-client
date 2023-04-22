import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from '../contexts/cart'
import { Home } from './@home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  // {
  //   path: '/cart',
  //   element: <Cart />,
  // },
  // {
  //   path: '/profile',
  //   element: <Profile />,
  // },
  // {
  //   path: '/contacts',
  //   element: <Contacts />,
  // },
])

export const Router = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  )
}
