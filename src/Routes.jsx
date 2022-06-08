import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'

import Login from './pages/login/Login'
import CreateOrder from './pages/order/CreateOrder'
import OrderList from './pages/order/OrderList'
import FactoryList from './pages/factory/FactoryList.jsx'
import CreateFactory from './pages/factory/CreateFactory.jsx'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>
      {/* <Route path="/auth" element={<Login/>} /> */}
      <Route path="/orders" element={<OrderList/>} />
      <Route path="/orders/new" element={<CreateOrder/>} />
      <Route path="/factories/" element={<FactoryList/>} />
      <Route path="/factories/new" element={<CreateFactory/>} />
            

    </Switch>
    )
}
