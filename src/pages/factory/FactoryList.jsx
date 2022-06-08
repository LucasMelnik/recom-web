import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import api from "../../config/api";

export default function FactoryList() {

  async function getFactory() {
  const factory = await api.get('/factory')
  console.log("🚀 ~ file: FactoryList.jsx ~ line 9 ~ getFactory ~ factory", factory)
  }

  return (
    <Space size="small">
      <Button type="primary">
        <Link to="/factories/new">Novo Fornecedor</Link>
      </Button>
      <Button onClick={getFactory}>Relatório</Button>
    </Space>
  );
}
