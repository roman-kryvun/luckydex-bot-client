import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from '../contexts/cart'
import { Home } from './@home'
import { Login } from './@login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
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
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
