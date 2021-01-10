import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import {
  Row,
  Col,
  Table,
  Jumbotron,
  Container,
  Button,
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:8080/metas`);
  const data = await response.json();

  return {
    props: { data },
  };
}

function Home({ data }) {
  const [pendingin, setPendingin] = useState([]);
  const [concluded, setConcluded] = useState([]);

  useEffect(() => {
    const pendinginCont = [];
    const concludedCont = [];
    data.metas.forEach((e) => {
      e.status === '1'
        ? pendinginCont.push(e.status)
        : concludedCont.push(e.status);
    });
    setPendingin(pendinginCont);
    setConcluded(concludedCont);
  }, []);

  return (
    <>
      <Container>
        <Jumbotron>
          <h1 className="display-3 text-center">Minhas metas</h1>
          <hr className="my-2" />
          <Menu />
        </Jumbotron>

        <hr />

        <Row className="mt-4">
          <Col sm="4" className="mb-4">
            <Card body>
              <CardTitle tag="h5">Quantidade de metas</CardTitle>
              <CardText>{data.metas.length}</CardText>
            </Card>
          </Col>
          <Col sm="4" className="mb-4">
            <Card body>
              <CardTitle tag="h5">Pendentes</CardTitle>
              <CardText>{pendingin.length}</CardText>
            </Card>
          </Col>
          <Col sm="4" className="mb-4">
            <Card body>
              <CardTitle tag="h5">Concluídos</CardTitle>
              <CardText>{concluded.length}</CardText>
            </Card>
          </Col>
        </Row>
        <Container>
          <Row className="mt-2">
            <Col sm="12" md={{ size: 12, offset: 0 }}>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {data.metas.map((meta, index) => (
                    <tr key={meta._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{meta.name}</td>
                      <td>{meta.description}</td>
                      <td>
                        {meta.status === '1' ? (
                          <p>Pendente</p>
                        ) : (
                          <p>Concluído</p>
                        )}
                      </td>
                      <td>
                        <Button color="warning">Alterar</Button>
                      </td>
                      <td>
                        <Button color="danger" href="/modalExcluir/">
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <hr />
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default Home;
