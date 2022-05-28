import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import 'antd/dist/antd.css'
import './App.css'

import { BrowserRouter } from 'react-router-dom'
import Routes from "./Routes";
import Navigation from './layout/menu/Navigation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout className='layout'>
          <Header>
              <Navigation />
          </Header>

          <div className='body'>
            <Routes />
          </div>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
