import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'

import FactoryList from './pages/factory/FactoryList.jsx'
import OrderItems from './pages/order/OrderItems'
import OrderList from './pages/order/OrderList'
import CreateProduct from './pages/product/CreateProduct'
import ProductList from './pages/product/ProductList'
import CustomerList from './pages/customer/CustomerList'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>
      <Route path='/' element={<OrderList/>} />

      <Route path="/products" element={<ProductList/>} />
      <Route path="/products/new" element={<CreateProduct/>} />

      <Route path="/orders" element={<OrderList/>} />
      <Route path="/orders/:id" element={<OrderItems/>} />

      <Route path="factories/" element={<FactoryList/>} />

      <Route path="customers/" element={<CustomerList/>} />
      </Switch>
    )
}
