import { Button, Input, Space, Table, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router';



export default function FactoryListTable() {
  const [factories, setFactories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    api.get('factories').then((res) => {
      setFactories(res.data)
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
      key: 'id',
      ...getColumnSearchProps('id')
    },
    {
      title: 'Nome do Fornecedor',
      dataIndex: 'corporate_name',
      key: 'corporate_name',
      width: 450,
      ...getColumnSearchProps('corporate_name')
    },
    {
      title: 'Nome Fantasía',
      dataIndex: 'fantasy_name',
      key: 'fantasy_name',
      ...getColumnSearchProps('fantasy_name')
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      ...getColumnSearchProps('cnpj')
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: 100,
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
  ];

  return <Table
    columns={columns}
    dataSource={factories}
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

