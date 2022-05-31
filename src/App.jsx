import { BrowserRouter } from 'react-router-dom'
import Routes from "./Routes";
import 'antd/dist/antd.css'
import './App.css'

import Header from './core/layout/menu/Header';

import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Header />
          <div className='body'>
            <Routes />
          </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
