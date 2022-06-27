import { Button, Space } from "antd";
import CreateFactory from "./CreateFactory";
import FactoryListTable from "./FactoryListTable";

export default function FactoryList() {

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CreateFactory />
      <FactoryListTable />
    </Space>
  );
}
