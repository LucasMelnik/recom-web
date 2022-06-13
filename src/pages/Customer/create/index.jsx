import React from "react";
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, PageHeader, Row, Tag, Typography, Space, Table, } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        2nd menu item
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                        3rd menu item
                    </a>
                ),
            },
        ]}
    />
);

const IconLink = ({ src, text }) => (
    <a className="example-link">
        <img className="example-link-icon" src={src} alt={text} />
        {text}
    </a>
);
const columns = [
    {
        title: "REF",
        dataIndex: "ref",
        key: "ref",
        render: (text) => <Text>{text}</Text>
    },

    {
        title: "COR",
        dataIndex: "color",
        key: "color",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "GRADE",
        dataIndex: "grade",
        key: "grade",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "CAIXAS",
        dataIndex: "caixas",
        key: "caixas",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "PARES",
        dataIndex: "pares",
        key: "pares",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "VALOR UNITÁRIO",
        dataIndex: "unity",
        key: "unity",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "VALOR TOTAL",
        dataIndex: "total",
        key: "total",
        render: (text) => <Text>{text}</Text>
    }, {
        title: "AÇÕES",
        dataIndex: "actions",
        key: "actions",
        render: (text) => <Text>{text}</Text>
    }
]

const data = [
    {
        key: '1',
        ref: 'John Brown',
        cor: "32",
        grade: 'New York No. 1 Lake Park',
        caixas: "akdhfajndf",
        pares: "akdhfajndf",
        unity: "akdhfajndf",
        total: "akdhfajndf",
        actions: "akdhfajndf",
      },
      
]

const content = (
    <div>
        <div>
            <div> // CONTEUDO SUBHEADER 1
                <div style={{ width: "80%", height: "70%", border: "2px solid lightblue", borderRadius: 20 }}>
                    <div style={{ backgroundColor: 'lightblue' }}>
                        <Title>
                            LCR CALÇADOS E CONFECÇÕES
                        </Title>
                        <Text>
                            ENDEREÇO: { }
                        </Text>
                        <Text>
                            BAIRRO: { }
                        </Text>
                        <Text>
                            CIDADE: { }
                        </Text>
                        <Text>
                            UF: { }
                        </Text>
                        <Text>
                            CEP: { }
                        </Text>
                    </div>
                    <div style={{ backgroundColor: "white" }}>
                        <Text>
                            CNPJ: { }
                        </Text>
                        <Text>
                            INSCRIÇÂO: { }
                        </Text>
                        <Text>
                            EMAIL: { }
                        </Text>
                        <Text>
                            TELEFONE: { }
                        </Text>
                        <Text>
                            COMPRADOR: { }
                        </Text>
                        <Text>
                            GRUPO: { }
                        </Text>
                    </div>
                </div>
                <div style={{ justifyContent: "space-between", border: "2px solid lightblue", borderRadius: 20 }}>
                    <Text>
                        Emissão: { }
                    </Text>
                    <Text>
                        Entrega: { }
                    </Text>
                    <Text>
                        Vendedor: { }
                    </Text>
                    <Button>
                        Pendente Envio
                    </Button>
                </div>
            </div>
            <div> // CONTEUDO SUBHEADER 2
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                        14149
                    </Text>
                    <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                        Energy
                    </Text>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <div>
                        <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                            Desconto: { }
                        </Text>
                    </div>
                    <div>
                        <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                            Condição: { }
                        </Text>
                    </div>
                    <div>
                        <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                            Comissão: { }
                        </Text>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                        R$ 7.879,00
                    </Text>
                    <Text style={{ width: "100%", justifyContent: "flex-start" }}>
                        120 Pares
                    </Text>
                </div>
            </div>
        </div>
        <div> // CONTEUDO TABELA
        <Table dataSource={data} columns={columns} />;
        </div>
    </div>
);

const Content = ({ children, extraContent }) => (
    <Row>
        <div
            style={{
                flex: 1,
            }}
        >
            {children}
        </div>
        <div className="image">{extraContent}</div>
    </Row>
);

export default function Create() {
    return (
        <PageHeader
            title="Lucas"
            extra={[
                <Button key="3">
                    Pedidos
                </Button>,
                <Button key="2">Clientes</Button>,
                <Button key="1" type="primary">
                    Fábricas
                </Button>,
                <Button key="1" type="primary">
                    Produtos
                </Button>,
            ]}
            avatar={{
                src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
            }}
        >
            <Content            >
                {content}
            </Content>
        </PageHeader>
    );
}