import { Descriptions, Card } from "antd";

export default function CustomerDetail({ customer }) {
  return (
    <Card>
      <Descriptions
        title={customer.corporate_name}
        layout="horizontal"
        labelStyle={{ fontWeight: 'bold' }}
        size="small"
        >
        <Descriptions.Item label="CNPJ">{customer.cnpj}</Descriptions.Item>
        <Descriptions.Item label="I. E.">{customer.state_registration}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{customer.email}</Descriptions.Item>
        <Descriptions.Item label="Telefone">{customer.phone}</Descriptions.Item>
        <Descriptions.Item label="Comprador">{customer.buyer}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
