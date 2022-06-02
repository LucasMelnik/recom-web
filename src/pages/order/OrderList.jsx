import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import api from "../../config/api";

export default function OrderList() {

  async function getUsers() {
  const users = await api.get('/users')
  console.log("🚀 ~ file: OrderList.jsx ~ line 9 ~ getUsers ~ users", users)
  }

  return (
    <Space size="small">
      <Button type="primary">
        <Link to="/order/new">Novo Pedido</Link>
      </Button>
      <Button onClick={getUsers}>Relatório</Button>
    </Space>
  );
}
