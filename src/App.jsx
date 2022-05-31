import { BrowserRouter } from 'react-router-dom'
import Routes from "./Routes";
import { Layout } from 'antd';
import 'antd/dist/antd.css'
import './App.css'

import Header from './core/layout/menu/Header';

function App() {
  return (
      <BrowserRouter>
          <Header />
          <div className='body'>
            <Routes />
          </div>
      </BrowserRouter>
  )
}

export default App;
