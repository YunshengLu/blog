import { RouterView } from 'oh-router-react'
import { router } from './router'
import { GlobalStyle } from './style'

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <RouterView router={router}/>
    </div>
  )
}

export default App
