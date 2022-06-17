import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'

import EditOrder from './pages/order/EditOrder'
import OrderList from './pages/order/OrderList'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>
      <Route path="orders" element={<OrderList/>} />
      <Route path="orders/:id/edit" element={<EditOrder/>} />
    </Switch>
    )
}
