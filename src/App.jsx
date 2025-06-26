import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import  Home  from './Components/Home'
import CreateWallet from './Components/CreateWallet'
import SeedPhraseInput from './Components/existingWallet';

function App() {
  return (
    <>
      <div>
        <Home/>
      </div>
    </>
  )
}
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: '/import',
    element: <SeedPhraseInput/>,
  },
  {
    path: '/new-wallet',
    element: <CreateWallet/>,
  },
]);

export default appRouter
