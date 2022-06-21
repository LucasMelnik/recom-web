import React, { useEffect, useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import './styles/createOrderModal.css'

function CreateOrderModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customers, setCustomers] = useState([])
  const [sellers, setSelles] = useState([])
  const [factories, setFactories] = useState([])
  const [customerSuggestions, setCustomerSuggestions] = useState([])
  const [factorySuggestions, setFactorySuggestions] = useState([])
  const [order, setOrder] = useState({
    customer: '',
    factory: ''
  })

  const loadSuggestions = async () => {
    const thisCustomers = await api.get('/customers')
    setCustomers(thisCustomers.data)
    const thisFactories = await api.get('/factories')
    setFactories(thisFactories.data)
  }

  const showModal = () => {
    setIsModalVisible(true);
    loadSuggestions()
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(order)
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
                <select style={{ height: '28px'}}>

                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                <label style={{ marginBottom: '5px'}}>Condição</label>
                <select style={{ height: '28px'}}>

                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                <label style={{ marginBottom: '5px'}}>Emissão</label>
                <input/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
                <label style={{ marginBottom: '5px'}}>Previsão de entrega</label>
                <input/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                <label style={{ marginBottom: '5px'}}>Vendedor</label>
                <select style={{ height: '28px'}}>

                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '35%' }}>
                <label style={{ marginBottom: '5px'}}>Desconto (%)</label>
                <input/>
              </div>
            </div>

          </Space>
        </form>
      </Modal>
    </>
  );
};

export default CreateOrderModal;
