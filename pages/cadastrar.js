import React, { useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import {
  Jumbotron,
  Button,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

function Cadastrar() {
  const [meta, setMeta] = useState({
    name: '',
    description: '',
    status: '1',
  });

  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: '',
  });

  const onChangeInput = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };
  const sendMeta = async (e) => {
    e.preventDefault();
    setResponse({ formSave: true });
    try {
      const res = await fetch('http://localhost:8080/metas/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(meta),
        headers: { 'Content-Type': 'application/json' },
      });

      const reponseEnv = await res.json();

      if (reponseEnv.error) {
        setResponse({
          formSave: false,
          type: 'error',
          message: reponseEnv.message,
        });
      } else {
        setResponse({
          formSave: false,
          type: 'success',
          message: reponseEnv.message,
        });
      }
    } catch (error) {
      setResponse({
        formSave: false,
        type: 'error',
        message: 'Erro: Meta não pode ser cadastrada , tente mais tarde!',
      });
    }
  };

  return (
    <>
      <Container>
        <Jumbotron>
          <h1 className="display-3 text-center">Cadastrar metas</h1>
          <hr className="my-2" />
          <Menu />
        </Jumbotron>

        <Row className="mt-2">
          <Col sm="12" md={{ size: 12, offset: 0 }}>
            {response.type === 'error' ? (
              <Alert color="warning">
                <p>{response.message}</p>
              </Alert>
            ) : (
              ''
            )}
            {response.type === 'success' ? (
              <Alert color="success">
                <p>{response.message}</p>
              </Alert>
            ) : (
              ''
            )}
            <div className="w-100 p-1 mt-4 mb-4">
              <Form className="border rounded w-100 p-2 " onSubmit={sendMeta}>
                <Row form className="d-flex justify-content-center p-2">
                  <Col md={8}>
                    <FormGroup>
                      <Label for="name">Nome</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nome da meta"
                        sm={10}
                        onChange={onChangeInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form className="d-flex justify-content-center p-2">
                  <Col md={8}>
                    <FormGroup>
                      <Label for="description">Descrição </Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Descrição da meta"
                        onChange={onChangeInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form className="d-flex justify-content-center p-2 ">
                  <Col md={8}>
                    <FormGroup>
                      <Label for="status">Escolha um status:</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        onChange={onChangeInput}
                      >
                        <option value="1">Pendente</option>
                        <option value="0">Concretizado</option>
                      </Input>
                    </FormGroup>

                    {response.formSave ? (
                      <Button color="danger" type="submit" disabled>
                        Enviando
                      </Button>
                    ) : (
                      <Button outline color="primary" type="submit">
                        Cadastrar
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>

        <Footer />
      </Container>
    </>
  );
}

export default Cadastrar;
