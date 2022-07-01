import { Button, Modal, Space } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../config/api";
import './styles/createOrderModal.css'


export default function AddOrderItemModal({ factoryId, commissionId, paymentConditionsId, orderId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([])
  const [color, setColor] = useState()
  const [productcolors, setProductColors] = useState([])
  const [refs, setRefs] = useState([])
  const [refSuggestions, setRefSuggestions] = useState([])
  const [sizes, setSizes] = useState([])
  const [item, setItem] = useState({
    ref: '',
    totalPairs: 0,
    color: '',
    packets: 1
  })
  const [itemSizes, setItemSizes] = useState([])
  const [productPrices, setProductPrices] = useState([])

  useEffect(() => {
    api.get(`/factories/${factoryId}/products`).then((res) => {
      setProducts(res.data)
    })

    api.get('/sizes').then((res) => {
      setSizes(res.data)
    })
  }, [])

  useEffect(() => {
    let allRefs = []
    products.map((product) => {
      allRefs.push(product.ref)
    })

    setRefs([...new Set(allRefs)])
  }, [products])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    itemSizes.map((size) => {
      const object = {
        order_id: orderId,
        product_price_id: productPrices.id,
        size_id: size.size,
        quantity: size.quantity,
        color_id: color
      }

      api.post('/order-items', object).then((res) => {
        window.location.reload();
      })
    })

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeRef = (text) => {
    setProductPrices(null)
    setProductColors([])

    let matches = []
    if (text.length > 0) {
      matches = refs.filter(ref => {
        const regex = new RegExp(`${text}`, 'gi');
        return ref.match(regex)
      })
    }
    setRefSuggestions(matches)
    setItem({...item, ref: text})
    const actualRef = products.find((product) => product.ref === text)

    if (actualRef) {
      api.get(`/colors/${actualRef.id}`).then((res) => {
        setProductColors(res.data)
      })

      api.get(`product-prices/${commissionId}/${paymentConditionsId}/${actualRef.id}`).then((res) => {
        setProductPrices(res.data)
      })
    }
  }

  const onSuggestRefHandler = (text) => {
    handleChangeRef(text)
    setRefSuggestions([])
  }

  const handleChangeColor = (event) => {
    setColor(Number(event.target.value))
  }

  const handleChangeSize = (event) => {
    const filteredSizes = itemSizes.filter((size) => size.size !== Number(event.target.id))

    setItemSizes(filteredSizes)
    setItemSizes((prevState) => [
      ...prevState,
      {
        size: Number(event.target.id),
        quantity: Number(event.target.value)
      }
    ])
  }

  const handleChangePackets = (event) => {
    setItem({...item, packets: event.target.value})
  }

  useEffect(() => {
    let totalPairs = 0
    itemSizes.forEach((size) => {
      totalPairs = totalPairs + size.quantity
    })

    setItem({...item, totalPairs })
  }, [itemSizes])

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Adicionar Item
      </Button>
      <Modal title="Adicionar Item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <form>
          <Space direction="vertical" size='large'>
            <Space size='small' style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label style={{ marginBottom: '5px'}}>Referencia</label>
                <input
                  onChange={e => handleChangeRef(e.target.value)}
                  value={item.ref}
                  onBlur={() => {
                    setTimeout(() => {
                      setRefSuggestions([])
                    }, 100)
                  }}
                />
                <div className='suggestionContainer' style={{ width: '36%' }}>
                  {refSuggestions && refSuggestions.map((suggestion, i) =>
                    <div
                      key={i}
                      className="suggestion"
                      onClick={() => onSuggestRefHandler(suggestion)}
                    >
                      {suggestion}
                      <br />
                    </div>
                  )}
                </div>

              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px'}}>Cor</label>
                <select onChange={handleChangeColor} style={{ height: '28px', width: '276px' }}>
                  <option>Selecionar...</option>
                  {
                    productcolors.map((color, index) => {
                      return <option key={index} value={color.id}>{color.name}</option>
                    })
                  }
                </select>
              </div>

            </Space>

            <Space direction="vertical">
              <Space direction="horizontal">
                {
                  sizes.map((size, index) => {
                    return (
                      <div key={index} style={{ width: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label>{size.name}</label>
                        <input onChange={handleChangeSize} type='number' id={size.id} style={{ width: '100%' }}/>
                      </div>
                    )
                  })
                }
              </Space>
              <span style={{ fontSize: '16px', color: '#40A9FF' }}>{`Pares por caixa: ${item.totalPairs}`}</span>
            </Space>

            <Space size='large'>

              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <label>Caixas</label>
                <input onChange={handleChangePackets} type='number' style={{ width: '50px' }} value={item.packets}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <label>Valor unitário</label>
                <span style={{ fontSize: '18px', color: 'green', fontWeight: 'bold' }}>
                  {
                    (productPrices != undefined) ? `R$ ${Number.parseFloat(productPrices.price).toFixed(2)}` : 'R$ ---'
                  }
                </span>
              </div>
            </Space>

          </Space>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20}}>
            <span style={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#40A9FF'
            }}>
              {`TOTAL DE PARES: ${item.totalPairs * item.packets}`}
            </span>
            <span style={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#0FDA60'
            }}>
              {`VALOR TOTAL: ${(productPrices != undefined) ? `R$ ${Number.parseFloat((item.totalPairs * item.packets) * productPrices.price).toFixed(2)}` : ''}`}
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
}
