import { Button, Space } from "antd";
import CreateOrderModal from "./CreateOrderModal";
import OrderListTable from "./OrderListTable";

export default function OrderList() {

  return (
    <Space direction="vertical">
      <Space size="small">
        <CreateOrderModal />
        <Button>Relatório</Button>
      </Space>

      <OrderListTable />
    </Space>
  );
}
