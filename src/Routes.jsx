import { useContext } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Context } from './context/AuthContext'
import FactoryList from './pages/factory/FactoryList.jsx'

import EditOrder from './pages/order/EditOrder'
import OrderList from './pages/order/OrderList'
import CreateProduct from './pages/product/CreateProduct'
import ProductList from './pages/product/ProductList'
// import { CreateFactory } from './pages/factory/CreateFactory.jsx'

export default function Routes() {
  const { loading } = useContext(Context)

  if (loading) {
    return <h1>loading</h1>
  }

  return(
    <Switch>
      {/* <Route path="/auth" element={<Login/>} /> */}
      <Route path="/products" element={<ProductList/>} />
      <Route path="/products/new" element={<CreateProduct/>} />
      <Route path="orders" element={<OrderList/>} />
      <Route path="orders/:id/edit" element={<EditOrder/>} />
      <Route path="factories/" element={<FactoryList/>} /> 
    </Switch>
  )
}
