import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import MainScene from './core/layout/MainScene';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <MainScene />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
