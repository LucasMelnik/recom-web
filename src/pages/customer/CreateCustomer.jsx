import React, { useEffect, useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import '../order/styles/createOrderModal.css'
import { useNavigate } from 'react-router-dom';

function CreateCustomer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customer, setCustomer] = useState({
    corporate_name: '',
    fantasy_name: '',
    cnpj: '',
    state_registration: '',
    buyer: '',
    phone: '',
    email:'',
    purchase_credit:'',
    customer_address:'',
    address_number:'',
    complement:'',
    district:'',
    city:'',
    state:'',
    country:'',
    zip:'',
  })

  const navigate = useNavigate()
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await api.post('/customers', customer).then((res) => {
      navigate(`./${res.data.id}/items`)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

const handleChangeCorporateName = (event) => {
    setCustomer({ ...customer, corporate_name:  event.target.value.toUpperCase() })
  }

   const handleChangeFantasyName = (event) => {
    setCustomer({ ...customer, fantasy_name:  event.target.value.toUpperCase() })
   }

   const handleChangeCnpj = (event) => {
     const cnpj = event.target.value
     setCustomer({ ...customer, cnpj })
   }
   const handleChangeStateRegistration = (event) => {
    const cnpj = event.target.value
    setStateRegistration({ ...customer, state_registration })
  }

  const handleChangeBuyer = (event) => {
    const buyer= event.target.value
    setCustomer({ ...customer, buyer })
  }

   const handleChangePhone = (event) => {
    const phone = event.target.value
    setCustomer({ ...customer, phone })
  }

   const handleChangeEmail = (event) => {
    const email = event.target.value
    setCustomer({ ...customer, email })
  }
  
  const handleChangePurchaseCredit = (event) => {
    const purchase_credit= event.target.value
    setCustomer({ ...customer, purchase_credit })
  }

  const handleChangeCustomerAddress = (event) => {
    const customer_address = event.target.value
    setCustomer({ ...customer, customer_address })
  }
  
  const handleChangeAddressNumber = (event) => {
    const address_number = event.target.value
    setCustomer({ ...customer, address_number })
  }

  const handleChangeComplement = (event) => {
    const complement = event.target.value
    setCustomer({ ...customer, complement })
  }

  const handleChangeDistrict = (event) => {
    const district = event.target.value
    setCustomer({ ...customer, district })
  }

  const handleChangeCity = (event) => {
    const city = event.target.value
    setCustomer({ ...customer, city })
  }

  const handleChangeState = (event) => {
    const state = event.target.value
    setCustomer({ ...customer, state })
  }

  const handleChangeCountry = (event) => {
    const country = event.target.value
    setCustomer({ ...customer, country })
  }

  const handleChangeZip = (event) => {
    const zip = event.target.value
    setCustomer({ ...customer, zip })
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Cliente
      </Button>
      <Modal title="Novo Cliente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <form>
          <Space direction="vertical" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <center> <label style={{ marginBottom: '5px'}}>Nome da Empresa</label></center>
                    <input onChange={handleChangeCorporateName} value={customer.corporate_name}/>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <center><label style={{ marginBottom: '5px'}}>Nome Fantasia</label></center>
                <input onChange={handleChangeFantasyName} value={customer.fantasy_name}/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>CNPJ</label>
                <input onChange={handleChangeCnpj} value={customer.cnpj}/>
              </div>
                
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Inscrição Estadual</label>
                <input onChange={handleChangeStateRegistration} value={customer.state_registration}/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Comprador</label>
                <input onChange={handleChangeBuyer} value={customer.buyer}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Phone</label>
                <input onChange={handleChangePhone} value={customer.phone}/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Email </label>
                <input onChange={handleChangeEmail} value={customer.email}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Credito de Compra </label>
                    <input onChange={handleChangePurchaseCredit} value={customer.purchase_credit}/>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Endereço </label>
                    <input onChange={handleChangeCustomerAddress} value={customer.customer_address}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Número </label>
                    <input onChange={handleChangeAddressNumber} value={customer.address_number}/>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}> 
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Complemento </label>
                    <input onChange={handleChangeComplement} value={customer.complement}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Bairro </label>
                    <input onChange={handleChangeDistrict} value={customer.district}/>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Cidade </label>
                    <input onChange={handleChangeCity} value={customer.city}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>Estado </label>
                    <input onChange={handleChangeState} value={customer.state}/>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>País </label>
                    <input onChange={handleChangeCountry} value={customer.country}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                    <label style={{ marginBottom: '5px'}}>CEP </label>
                    <input onChange={handleChangeZip} value={customer.zip}/>
              </div>
            </div>
            


          </Space>
        </form>
      </Modal>
    </>
  );
};

export default CreateCustomer;
