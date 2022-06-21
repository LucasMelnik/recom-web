import { Button, Input, Space, Table, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router';



export default function OrderListTable() {
  const [ordersLoaded, setOrdersLoaded] = useState([])
  const [orders, SetOrders] = useState([])

  const navigate = useNavigate()


  useEffect(() => {
    api.get('orders').then((res) => {
      setOrdersLoaded(res.data)
    })
  }, [])

  useEffect(() => {
    SetOrders([])
    ordersLoaded.map((order) => {
      SetOrders((prevState) => [
        ...prevState,
        {
          key: order.id,
          customer: order.customer.corporate_name,
          factory: order.factory.fantasy_name,
          seller: order.seller.nickname,
          total: null,
          order_date: order.order_date,
          status: order.status.name
        }
      ])
    })
  }, [ordersLoaded])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Pesquisar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Filtrar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 100,
            }}
          >
            Resetar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      ...getColumnSearchProps('key')
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
      width: 450,
      ...getColumnSearchProps('customer')
    },
    {
      title: 'Fábrica',
      dataIndex: 'factory',
      key: 'factory',
      ...getColumnSearchProps('factory')
    },
    {
      title: 'Vendedor',
      dataIndex: 'seller',
      key: 'seller',
      ...getColumnSearchProps('seller')
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: 100,
      key: 'total'
    },
    {
      title: 'Data',
      dataIndex: 'order_date',
      key: 'order_date',
      ...getColumnSearchProps('order_date')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),

      render: (_, { status }) => {
        let color = 'green'

        if (status === 'PENDENTE DE ENVIO') {
          color = 'volcano'
        }

        if (status === 'ENVIADO') {
          color = 'blue'
        }

        if (status === 'CONFIRMADO') {
          color = 'green'
        }

        if (status === 'FATURADO') {
          color = 'slateblue'
        }

        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
  ];

  return <Table
    columns={columns}
    dataSource={orders}
    onRow={(record, rowIndex) => {
      return {
        onClick: event => {
          navigate(`./${record.key}`)
        },
      }
    }}
    style={{cursor: 'pointer'}}
  />;
}

