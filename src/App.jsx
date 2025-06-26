import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SeedPhraseInput from './Components/existingWallet'
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import  Home  from './Components/Home'
function App() {
  const [newAccount ,setNewAccount] = useState(true)
  const [oldAccount,setOldAccount] = useState(true)
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
    element: <SeedPhraseInput />,
  },
]);

export default appRouter
