import { Button, Space } from "antd";
import CreateFactory from "./CreateFactory";
import FactoryListTable from "./FactoryListTable";

export default function FactoryList() {

  return (
    <Space direction="vertical">
      <Space size="small">
        <CreateFactory />
        <Button>Relatório</Button>
      </Space>

      <FactoryListTable />
    </Space>
  );
}
