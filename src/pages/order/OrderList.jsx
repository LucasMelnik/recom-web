import { Button, Space } from "antd";
import CreateOrderModal from "./CreateOrderModal";
import OrderListTable from "./OrderListTable";

export default function OrderList() {

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space size="small">
        <CreateOrderModal />
        <Button>Relatório</Button>
      </Space>

      <OrderListTable />
    </Space>
  );
}
