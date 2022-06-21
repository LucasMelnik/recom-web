import { Button, Space } from "antd";
import CreateOrderModal from "./CreateOrderModal";

export default function OrderList() {

  return (
    <Space size="small">
      <CreateOrderModal />
      <Button>Relatório</Button>
    </Space>
  );
}
