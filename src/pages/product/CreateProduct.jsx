import { Button, Card, Col, Image, Input, Row, Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";

export default function CreateProduct() {

  return (
    <Content>
      <Row gutter={16}>
        <Col>
          <Input placeholder="Referência"></Input>
        </Col>
        <Col>
          <Input placeholder="Genero"></Input>
        </Col>
        <Col>
          <Input placeholder="Faixa Etária"></Input>
        </Col>
      </Row>
    </Content>
  );
}
