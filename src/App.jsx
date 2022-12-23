import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import AppRoutes from 'Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { getUserFromStorage } from '../src/state/actions'
import { useEffect } from 'react'
import { useWindowSize } from '../src/hooks/useWindowSize'

function App() {
  const size = useWindowSize().windowSize
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserFromStorage())
  }, [])
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <AppRoutes size={size} user={user} />
      </Router>
    </div>
  )
}

export default App
