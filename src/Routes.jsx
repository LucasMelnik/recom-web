import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'

import CreateOrder from './pages/order/CreateOrder'
import OrderList from './pages/order/OrderList'
import Customer from './pages/customer/index'
import CreateCustomer from './pages/customer/create/index'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>

      <Route path="/orders" element={<OrderList/>} />

      <Route path="/customers" element={<Customer/>} />
      <Route path="/customers/new" element={<CreateCustomer/>} />

    </Switch>
  )
}
