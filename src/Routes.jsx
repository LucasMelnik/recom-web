import { Routes as Switch, Route } from 'react-router-dom'

import CreateOrder from './pages/Order/CreateOrder'
import OrderList from './pages/Order/OrderList'

export default function Routes() {
  return(
    <Switch>
      <Route path="/orders" element={<OrderList/>} />
      <Route path="/orders/new" element={<CreateOrder/>} />
    </Switch>
    )
}
