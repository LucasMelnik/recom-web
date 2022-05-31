import { Routes as Switch, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import CreateOrder from './pages/order/CreateOrder'
import OrderList from './pages/order/OrderList'

export default function Routes() {
  return(
    <Switch>
      <Route path="/auth" element={<Login/>} />
      <Route path="/orders" element={<OrderList/>} />
      <Route path="/orders/new" element={<CreateOrder/>} />
    </Switch>
    )
}
