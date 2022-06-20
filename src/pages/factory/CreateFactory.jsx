import React, { useEffect, useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { useForm } from 'react-hook-form';
import api from '../../config/api';
import '../order/styles/createOrderModal.css'
import { useNavigate } from 'react-router-dom';

function CreateFactory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [factory, setFactory] = useState({
    corporate_name: '',
    fantasy_name: '',
    cnpj: '',
    phone: '',
    email: '',
  })

  const navigate = useNavigate()
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await api.post('/factories', factory).then((res) => {
      navigate(`./${res.data.id}/items`)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

const handleChangeCorporateName = (event) => {
    setFactory({ ...factory, corporate_name:  event.target.value.toUpperCase() })
  }

   const handleChangeFantasyName = (event) => {
     setFactory({ ...factory, fantasy_name:  event.target.value.toUpperCase() })
   }

   const handleChangeCnpj = (event) => {
     const cnpj = event.target.value
     setFactory({ ...factory, cnpj })
   }
   const handleChangePhone = (event) => {
    const phone = event.target.value
    setFactory({ ...factory, phone })
  }
   const handleChangeEmail = (event) => {
    const email = event.target.value
    setFactory({ ...factory, email })
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Forncedor
      </Button>
      <Modal title="Novo Fornecedor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <form>
          <Space direction="vertical" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Nome da Empresa</label>
                <input onChange={handleChangeCorporateName} value={factory.corporate_name}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Nome Fantasia</label>
                <input onChange={handleChangeFantasyName} value={factory.fantasy_name}/>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>CNPJ</label>
                <input onChange={handleChangeCnpj} value={factory.cnpj}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                <label style={{ marginBottom: '5px'}}>Phone</label>
                <input onChange={handleChangePhone} value={factory.phone}/>
              </div>


            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label style={{ marginBottom: '5px'}}>Email </label>
                <input onChange={handleChangeEmail} value={factory.email}/>
              </div>

          </Space>
        </form>
      </Modal>
    </>
  );
};

export default CreateFactory;
