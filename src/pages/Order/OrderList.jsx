import { Button, Space } from "antd";
import { Link } from "react-router-dom";

export default function OrderList() {
  return (
    <Space size="small">
      <Button type="primary">
        <Link to="/order/new">Novo Pedido</Link>
      </Button>
      <Button>Relatório</Button>
    </Space>
  );
}
