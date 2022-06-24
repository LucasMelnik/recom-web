import { Button, Card, Col, Descriptions, Divider, Row, Space, Tag } from "antd"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import api from "../../config/api"
import CustomerDetail from "../customer/CustomerDetail"
import AddOrderItemModal from "./AddOrderItemModal"
import OrderDetail from "./OrderDetail"
import OrderItemDetail from "./OrderItemDetail"

export default function OrderItems() {
  const [totalValue, setTotalValue] = useState()
  const [totalPairs, setTotalPairs] = useState()
  const [order, setOrder] = useState({
    customer: {
      id: 1
    },
    factory: {
      id: 1
    },
    payment_conditions: {
      id: 1
    },
    commission: {
      id: 1
    },
    status: {
      name: '',
    },
    seller: {
      id: 1
    }
  })
  const [customer, setCustomer] = useState({})
  const { id } = useParams()

  useEffect(() => {
    api.get(`orders/${id}`).then((res) => {
      setOrder(res.data)
    })
  }, [])

  useEffect(() => {
    api.get(`customers/${order.customer.id}`).then((res) => {
      setCustomer(res.data)
    })

    // console.log(order)

  }, [order])

  // console.log(order.customer.id)

  return (
    <Space direction="vertical">
      <Row>
        <Col span={16}>
          <CustomerDetail customer={customer} />
          <Card >
            <Row>
              <Col span={18}>
                <Descriptions
                  layout="horizontal"
                  labelStyle={{ fontWeight: 'bold' }}
                  size="small"
                  column={3}
                  >
                  <Descriptions.Item label="Emissão">{order.order_date}</Descriptions.Item>
                  <Descriptions.Item label="Entrega">{order.delivery_date}</Descriptions.Item>
                  <Descriptions.Item label="Vendedor">{order.seller.nickname}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col>
                <Tag>{order.status.name}</Tag>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <OrderDetail order={order} />
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px 0px' }}>
            <Space size='large'>
              <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#0FDA60' }}>{`R$ ${Number.parseFloat(totalValue).toFixed(2)}`}</span>
              <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#40A9FF' }}>{`${totalPairs} PARES`}</span>
            </Space>
          </div>
        </Col>
      </Row>

      <Divider />

      <OrderItemDetail
        orderId={id}
        order={order}
        setTotalPairs={setTotalPairs}
        setTotalValue={setTotalValue}
      />
      <AddOrderItemModal
        orderId={order.id}
        factoryId={order.factory.id}
        commissionId={order.commission.id}
        paymentConditionsId={order.payment_conditions.id}
      />
    </Space>
  )
}
