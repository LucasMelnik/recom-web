import { useContext } from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../../context/AuthContext";

export default function Navigation() {
  const { handleLogout } = useContext(Context)

  return (
    <Space size='large'>
      <Link to="/orders">Pedidos</Link>
      <Link to="/customers">Clientes</Link>
      <Link to="/factories">Fábricas</Link>
      <Link to="/products">Produtos</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </Space>
  )
}
