import { Button, Card, Col, Form, Image, Input, notification, Row, Select, Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const [product, setProduct] = useState({});
  const [genders, setGenders] = useState([]);
  const [ages, setAges] = useState([]);
  const [factories, setFactories] = useState([]);
  const [error, setError] = useState();
  const [colorList, setColorList] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [conditions, setConditions] = useState([]);

  const navigate = useNavigate()

  const handleInputChange = (event, select_name) => {
    const name = select_name ? select_name : event.target.name
    const value = event.target ? event.target.value : event;
    setProduct({ ...product, [name]: value })
  };

  useEffect(() => {
    api.get('/genders').then((res) => {
      setGenders(res.data)
    });
    api.get('/age-groups').then((res) => {
      setAges(res.data)
    });
    api.get('/factories').then((res) => {
      setFactories(res.data)
    });
    api.get('/commissions').then((res) => {
      setCommissions(res.data)
    });
    api.get('/payment-condition').then((res) => {
      setConditions(res.data)
    });
  }, [])

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  function createProduct(data) {
    data.colors = colorList;
    data.productPrices = valueList;

    api.post('products', data)
      .then( (response) => {
        setProduct(response)
        navigate('/products');
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'ERRO!', err.response.data.error)
        console.error(err.response.data.error);
      })
  }

  const handleInputColorChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...colorList];
    list[index] = value;
    setColorList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveInputColor = index => {
    const list = [...colorList];
    list.splice(index, 1);
    setColorList(list);
  };
 
  // handle click event of the Add button
  const handleAddInputColor = () => {
    setColorList([...colorList, []]);
  };

  const handleValueListChange = (e, index, select_name) => {
    const value = e.target ? e.target.value : e;
    const name = select_name ? select_name : e.target.name;
    const list = [...valueList];
    list[index][name] = value;
    setValueList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveValueList = index => {
    const list = [...valueList];
    list.splice(index, 1);
    setValueList(list);
  };
 
  // handle click event of the Add button
  const handleAddValueList = () => {
    setValueList([...valueList, {}]);
  };


  return (
    <Content>
      <Form>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col>
            <label >Referência</label>
            <Input name="ref" placeholder="Referência" onChange={handleInputChange}></Input>
          </Col>
          <Col style={{display: 'flex', flexDirection: 'column'}}>
            <label >Gênero</label>
            <Select name="gender_id" placeholder="Genero" onChange={(value) => handleInputChange(value, 'gender_id')}>
              {
                genders?.map((gender) => (
                  <Option value={gender.id} key={gender.id}> {gender.name} </Option>
                ))
              }
            </Select>
          </Col>
          <Col style={{display: 'flex', flexDirection: 'column'}}>
            <label >Faixa etária</label>
            <Select name="age_id" placeholder="Faixa Etária"  onChange={(value) => handleInputChange(value, 'age_id')}>
              {
                ages?.map((age) => (
                  <Option value={age.id} key={age.id} > {age.name} </Option>
                ))
              }
            </Select>
          </Col>
          <Col>
            roletinha de numero
          </Col>
        </Row>
        <Row gutter={16} style={{  marginTop: '1em' }}>
          <Col style={{display: 'flex', flexDirection: 'column'}}>
            <label> Fábrica</label>
            <Select  onChange={(value) => handleInputChange(value, 'factory_id')} name="factory_id" placeholder="Fábrica">
              {
                factories?.map((factory) => (
                  <Option value={factory.id}  key={factory.id}> {factory.fantasy_name} </Option>
                ))
              }
            </Select>
          </Col>
          <Col>
            <label >Descrição</label>
            <Input name="comments" placeholder="Descrição" onChange={handleInputChange}></Input>
          </Col>
        </Row>
        <Row gutter={16} style={{  marginTop: '1em' }} align="bottom">
            {
              colorList.map((data, index) =>(
                <Col>
                  <Row align="bottom">
                    <Col>
                      <label >Cor {index+1}</label>
                      <Input name="color"  onChange={ e => handleInputColorChange(e, index)}/> 
                    </Col>
                    <Col>
                      <Button
                        style={{ backgroundColor: '#EF5A5A'}}
                        onClick={() => (
                          handleRemoveInputColor()
                        )}>
                          X
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ))
            }
          <Col>
            <Button 
              style={{ backgroundColor: '#14B253'}}
              id="adicionarCor"
              onClick={() => (
                handleAddInputColor()
              )}
            >
              Adicionar Cor
            </Button>
            
          </Col>
        </Row>
        <Row gutter={16} style={{  marginTop: '1em' }}>
          <Col>
            <label> Imagem</label>
            <Input type="file" name="image_path" placeholder="imagem"></Input>
          </Col>
        </Row>
      
        <Row gutter={16} style={{  marginTop: '1em' }}>
          {
            valueList.map((data, index) =>(
              <Col span={8} style={{  marginTop: '1em' }}>
                <Card
                  title={`Valor ${index+1}`}
                  headStyle={{color: "#50BDFB"}}
                  extra={
                    <Button
                      style={{ backgroundColor: '#EF5A5A'}}
                      onClick={() => (
                        handleRemoveValueList()
                      )}>
                        X
                    </Button>
                  }
                >
                  <Row>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                      <label >Comissão</label>
                      <Select name="commission_id" placeholder="Comissão" onChange={ e => handleValueListChange(e, index, 'commission_id')}>
                        {
                          commissions?.map((commission) => (
                            <Option value={commission.id} key={commission.id}> {commission.name * 100} % </Option>
                          ))
                        }
                      </Select> 
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                      <label >Condição</label>
                      <Select name="condition_id" placeholder="Condição"  onChange={ e => handleValueListChange(e, index, 'condition_id')}>
                        {
                          conditions?.map((condition) => (
                            <Option value={condition.id} key={condition.id}> {condition.name} </Option>
                          ))
                        }
                      </Select> 
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                      <label >Preço</label>
                      <Input name="price" type="number" onChange={ e => handleValueListChange(e, index)}/> 
                    </Col>
                  </Row>
                  
                </Card>
              </Col>
            ))
          }
          <Col style={{  marginTop: '1em' }}>
            <Button 
              style={{ backgroundColor: '#14B253'}}
              onClick={() => (
                handleAddValueList()
              )}
            >
              Adicionar Valor
            </Button>
          </Col>
        </Row>

        <Row gutter={16} style={{  marginTop: '1em' }}>
          
          <Col>
            <Button 
              type="primary"
              id="cadastrar"
              onClick={() => {
                createProduct(product);
              }}
            >
              Cadastrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Content>
  );
}
