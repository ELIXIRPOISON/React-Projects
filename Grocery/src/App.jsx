import { useState } from 'react'
import './App.css'
import AddGrocery from './Component/AddGrocery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddGrocery />
    </>
  )
}

export default App
