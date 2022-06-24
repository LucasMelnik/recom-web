import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'

import FactoryList from './pages/factory/FactoryList.jsx'
import OrderItems from './pages/order/OrderItems'
import OrderList from './pages/order/OrderList'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>
      <Route path="orders" element={<OrderList/>} />
      <Route path="orders/:id/items" element={<OrderItems/>} />

      <Route path="factories/" element={<FactoryList/>} />
      </Switch>
    )
}
