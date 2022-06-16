import React, { useEffect, useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import './styles/createOrderModal.css'
import { useNavigate } from 'react-router-dom';

function CreateOrderModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customers, setCustomers] = useState([])
  const [sellers, setSellers] = useState([])
  const [factories, setFactories] = useState([])
  const [commissions, setCommissions] = useState([])
  const [paymentConditions, setPaymentConditions] = useState([])
  const [customerSuggestions, setCustomerSuggestions] = useState([])
  const [factorySuggestions, setFactorySuggestions] = useState([])
  const [order, setOrder] = useState({
    customer: '',
    factory: '',
    order_date: '',
    delivery_date: '',
    discount: '',
  })

  const navigate = useNavigate()

  const loadSuggestions = async () => {
    const thisCustomers = await api.get('/customers')
    setCustomers(thisCustomers.data)

    const thisFactories = await api.get('/factories')
    setFactories(thisFactories.data)

    const thisSellers = await api.get('/users')
    setSellers(thisSellers.data)

    const thisCommissions = await api.get('/commissions')
    setCommissions(thisCommissions.data)

    const thisConditions = await api.get('/payment-condition')
    setPaymentConditions(thisConditions.data)
  }

  const showModal = () => {
    setIsModalVisible(true);
    loadSuggestions()
  };

  const handleOk = async () => {
    await api.post('/orders', order).then((res) => {
      navigate(`./${res.data.id}/items`)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeCustomer = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = customers.filter(customer => {
        const regex = new RegExp(`${text}`, 'gi');
        return customer.corporate_name.match(regex)
      })
    }
    setCustomerSuggestions(matches)
    setOrder({...order, customer: text})
  }

  const onSuggestCustomerHandler = (text) => {
    setOrder({...order, customer: text })
    setCustomerSuggestions([])
  }

  const handleChangeFactory = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = factories.filter(factory => {
        const regex = new RegExp(`${text}`, 'gi');
        return factory.fantasy_name.match(regex)
      })
    }
    setFactorySuggestions(matches)
    setOrder({...order, factory: text })
  }

  const onSuggestFactoryHandler = (text) => {
    setOrder({...order, factory: text })
    setFactorySuggestions([])
  }

  const handleChangeSeller = (event) => {
    const sellerId = Number(event.target.value)
    setOrder({ ...order, seller_id: sellerId })
  }

  const handleChangeCommission = (event) => {
    const commissionId = Number(event.target.value)
    setOrder({ ...order, commission_id: commissionId })
  }

  const handleChangeCondition = (event) => {
    const conditionId = Number(event.target.value)
    setOrder({ ...order, payment_conditions_id: conditionId })
  }

  const handleChangeEmission = (event) => {
    setOrder({ ...order, order_date: event.target.value })
  }

  const handleChangeDelivery = (event) => {
    setOrder({ ...order, delivery_date:  event.target.value.toUpperCase() })
  }

  const handleChangeDiscount = (event) => {
    const discount = Number(event.target.value)
    setOrder({ ...order, discount })
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Pedido
      </Button>
      <Modal title="Novo Pedido" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <form>
          <Space direction="vertical" style={{ display: 'flex' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                <label style={{ marginBottom: '5px'}}>Cliente</label>
                <input
                  onChange={e => handleChangeCustomer(e.target.value)}
                  value={order.customer}
                  onBlur={() => {
                    setTimeout(() => {
                      setCustomerSuggestions([])
                    }, 100)
                  }}
                />
                <div className='suggestionContainer'>
                  {customerSuggestions && customerSuggestions.map((suggestion, i) =>
                    <div
                      key={i}
                      className="suggestion"
                      onClick={() => onSuggestCustomerHandler(suggestion.corporate_name)}
                    >
                      {suggestion.corporate_name}
                      <br />
                    </div>
                  )}
                </div>
              </div>
              <Button type='primary' size="middle">+</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '5px'}}>Fabrica</label>
              <input
                onChange={e => handleChangeFactory(e.target.value)}
                value={order.factory}
                onBlur={() => {
                  setTimeout(() => {
                    setFactorySuggestions([])
                  }, 100)
                }}
              />
              <div className='suggestionContainer'>
                  {factorySuggestions && factorySuggestions.map((suggestion, i) =>
                    <div
                      key={i}
                      className="suggestion"
                      onClick={() => onSuggestFactoryHandler(suggestion.fantasy_name)}
                    >
                      {suggestion.fantasy_name}
                      <br />
                    </div>
                  )}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
                <label style={{ marginBottom: '5px'}}>Comissão</label>
                <select onChange={handleChangeCommission} style={{ height: '28px'}}>
                    <option value="Selecionar">Selecionar...</option>
                    {
                    commissions.map((commission, index) => {
                      return <option key={index} value={commission.id}>{`${commission.name}%`}</option>
                    })
                  }
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                <label style={{ marginBottom: '5px'}}>Condição</label>
                <select onChange={handleChangeCondition} style={{ height: '28px'}}>
                <option value="Selecionar">Selecionar...</option>
                  {
                    paymentConditions.map((condition, index) => {
                      return <option key={index} value={condition.id}>{condition.name}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                <label style={{ marginBottom: '5px'}}>Emissão</label>
                <input onChange={handleChangeEmission} value={order.order_date} type="date"/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
                <label style={{ marginBottom: '5px'}}>Previsão de entrega</label>
                <input onChange={handleChangeDelivery} value={order.delivery_date}/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                <label style={{ marginBottom: '5px'}}>Vendedor</label>
                <select onChange={handleChangeSeller} style={{ height: '28px'}}>
                  <option value='Selecionar'>Selecionar...</option>
                  {
                    sellers.map((seller, index) => {
                      return <option key={index} value={seller.id}>{seller.nickname}</option>
                    })
                  }
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '35%' }}>
                <label style={{ marginBottom: '5px'}}>Desconto (%)</label>
                <input onChange={handleChangeDiscount} value={order.discount}/>
              </div>
            </div>

          </Space>
        </form>
      </Modal>
    </>
  );
};

export default CreateOrderModal;
