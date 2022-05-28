import { Space } from "antd";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Space size='large'>
      <Link to="/orders">Pedidos</Link>
      <Link to="/customers">Clientes</Link>
      <Link to="/factories">Fábricas</Link>
      <Link to="/products">Produtos</Link>
    </Space>
  )
}
