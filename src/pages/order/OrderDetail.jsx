import { Descriptions, Card } from "antd";

export default function OrderDetail({ order }) {
  return (
    <Card>
      <Descriptions
        title={`#${order.id} - ${order.factory.fantasy_name}`}
        layout="horizontal"
        labelStyle={{ fontWeight: 'bold' }}
        size="small"
        column={2}
        >
        <Descriptions.Item label="Condição">{order.payment_conditions.name}</Descriptions.Item>
        <Descriptions.Item label="Comissão">{`${order.commission.name}%`}</Descriptions.Item>
        <Descriptions.Item label="Desconto">{`${order.discount}%`}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
