import { Button, Space } from "antd";
import CreateCustomer from "./CreateCustomer";
import CustomerListTable from "./CustomerListTable";

export default function CustomerList() {

  return (
    <Space direction="vertical">
      <Space size="small">
        <CreateCustomer />
        <Button>Relatório</Button>
      </Space>

      <CustomerListTable />
    </Space>
  );
}
