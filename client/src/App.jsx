import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-4xl text-center font-bold bg-amber-200 text-slate-950'>Hello World</h1>
    </>
  )
}

export default App
