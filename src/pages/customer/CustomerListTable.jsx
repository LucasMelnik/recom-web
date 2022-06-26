import { Button, Input, Space, Table, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router';



export default function CustomerListTable() {
  const [customers, setCustomers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    api.get('customers').then((res) => {
      setCustomers(res.data)
    })
  }, [])

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
      dataIndex: 'id',
      key: 'key',
      ...getColumnSearchProps('id')
    },
    {
      title: 'Nome do Cliente',
      dataIndex: 'corporate_name',
      key: 'corporate_name',
      width: 200,
      ...getColumnSearchProps('corporate_name')
    },
    {
      title: 'Nome Fantasía',
      dataIndex: 'fantasy_name',
      key: 'fantasy_name',
      width: 200,
      ...getColumnSearchProps('fantasy_name')
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      width: 150,
      ...getColumnSearchProps('cnpj')
    },
    {
      title: 'Estado de Registro',
      dataIndex: 'state_registration',
      width: 150,
      key: 'state_registration'
    },
    {
      title: 'Comprador',
      dataIndex: 'buyer',
      key: 'buyer',
      width: 150,
      ...getColumnSearchProps('buyer')
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
        ...getColumnSearchProps('phone')
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
        ...getColumnSearchProps('email')
    },
    {
        title: 'Credito de Compra',
        dataIndex: 'purchase_credit',
        key: 'purchase_credit',
        width: 150,
        ...getColumnSearchProps('purchase_credit')
    },
    // {
    //     title: 'Endereço',
    //     dataIndex: 'customer_address',
    //     key: 'customer_address',
    //     ...getColumnSearchProps('customer_address')
    // },
    // {
    //     title: 'Número',
    //     dataIndex: 'address_number',
    //     key: 'address_number',
    //     ...getColumnSearchProps('address_number')
    // },
    // {
    //     title: 'Complemento',
    //     dataIndex: 'complement',
    //     key: 'complement',
    //     ...getColumnSearchProps('complement')
    // },
    // {
    //     title: 'Bairro',
    //     dataIndex: 'district',
    //     key: 'district',
    //     ...getColumnSearchProps('district')
    // },
    // {
    //     title: 'Cidade',
    //     dataIndex: 'city',
    //     key: 'city',
    //     ...getColumnSearchProps('city')
    // },
    // {
    //     title: 'Estado',
    //     dataIndex: 'state',
    //     key: 'state',
    //     ...getColumnSearchProps('state')
    // },
    // {
    //     title: 'País',
    //     dataIndex: 'country',
    //     key: 'country',
    //     ...getColumnSearchProps('country')
    // },
    // {
    //     title: 'CEP',
    //     dataIndex: 'zip',
    //     key: 'zip',
    //     ...getColumnSearchProps('zip')
    // },

  ];

  return <Table
    columns={columns}
    dataSource={customers}
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

