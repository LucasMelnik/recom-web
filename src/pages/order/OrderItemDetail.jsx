import { Table } from "antd";
import { useState, useEffect } from "react";
import api from "../../config/api";

const columns = [
  {
    title: 'REF',
    dataIndex: 'ref',
    key: 'ref',
  },
  {
    title: 'Cor',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Tamanho',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Pares',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Valor unitário',
    dataIndex: 'unit_value',
    key: 'unit_value'
  },
  {
    title: 'Valor total',
    dataIndex: 'total',
    key: 'total',
  },
];

export default function OrderItemDetail({ orderId, setTotalValue, setTotalPairs }) {
  const [items, setItems] = useState([])
  const [tableItems, setTableItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [colors, setColors] = useState([])


  useEffect(() => {
    api.get(`/order-items/${orderId}`).then((res) => {
      setItems(res.data)
    })

    api.get(`/colors`).then(res => setColors(res.data))
  }, [])

  useEffect(() => {
    setTableItems([])

    let totalValue = 0
    let totalPairs = 0

    items.map((item) => {

      const quantity = Number(item.quantity)
      const unit_value = Number.parseFloat(item.product_price.price).toFixed(2)
      const total = Number.parseFloat(unit_value * quantity).toFixed(2)

      totalPairs = totalPairs + quantity;
      totalValue = Number(totalValue) + Number(total)

      const itemColor = colors.find(color => color.id == item.color_id)

      if (itemColor) {
        setTableItems((prevState) => [
          ...prevState,
          {
            key: item.id,
            ref: item.product_price.product.ref,
            size: item.size.name,
            quantity,
            unit_value,
            total,
            color: itemColor.name
          }
        ])
      }
    })

    setTotalPairs(totalPairs)
    setTotalValue(totalValue)
  }, [items])

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={tableItems}
    />
  )
}
