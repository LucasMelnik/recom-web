import { Button, Card, Col, Divider, Space } from 'antd'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)

  return(
    <Col span={12} offset={6}>
      <Card title="Login">
        <Space direction="vertical" size={'small'} style={{ display: 'flex'}}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Space direction="vertical" size={'small'} style={{ display: 'flex'}}>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px'}}>E-mail</label>
                <input {...register('email', { required: true })}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px'}}>Senha</label>
                <input placeholder='Senha' {...register('password')}/>
              </div>

              <Divider>
                <Link to="/password-recover">Esqueceu a senha?</Link>
              </Divider>

              <Button htmlType='submit' type='primary' size='large'>Enviar</Button>
            </Space>
          </form>

        </Space>
      </Card>
    </Col>
  )
}
