import { Button, Space } from "antd";
import CreateCustomer from "./CreateCustomer";
import CustomerListTable from "./CustomerListTable";

export default function CustomerList() {

  return (
    <Space direction="vertical" style={{ width: '100%'}}>
      <CreateCustomer />
      <CustomerListTable />
    </Space>
  );
}
