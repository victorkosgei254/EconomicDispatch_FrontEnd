import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./styles.module.css";
import { useState } from "react";
import { Container, Form, Button, Table, Spinner } from "react-bootstrap";
import { MathJax, MathJaxContext } from "better-react-mathjax";
function App() {
  const [results, setResults] = useState({ results: [] });
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [b11, setB11] = useState(0);
  const [b12, setB12] = useState(0);
  const [b21, setB21] = useState(0);
  const [b22, setB22] = useState(0);
  const [pd, setPD] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function solveProblem() {
    // resultProducer(p1, c1, p2, c2, b11, b12, b21, b22, pd, accuracy);
    setIsLoading(true);
    let body = {
      P1: p1,
      C1: c1,
      P2: p2,
      C2: c2,
      B11: b11,
      B12: b12,
      B21: b21,
      B22: b22,
      PD: pd,
      ACCURACY: accuracy,
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };
    fetch("https://economicdispatchengine.herokuapp.com/", requestOptions)
      .then((response) => response.json())
      .then((data) => setResults(data));
    setIsLoading(false);
  }

  return (
    <Container className={Style.container}>
      <div className={Style.question}>
        <h4>
          Consider a power system with two plants having incremental cost as
        </h4>
        <h4>
          IC<sub>1</sub>={p1}P<sub>1</sub> + {c1}+ Ksh/Mwh
        </h4>
        <h4>
          IC<sub>2</sub>={p2}P<sub>2</sub> + {c2}+ Ksh/Mwh
        </h4>

        <h6>Having the following loss Co-efficient</h6>
        <h6>
          Find the optimum scheduling for a system load of <b>{pd}</b> MW.
        </h6>
        <div>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>{b11}</td>
                <td>{b12}</td>
              </tr>
              <tr>
                <td>{b21}</td>
                <td>{b22}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Form>
        <div>
          <Form.Group className="mb-3" controlId="P1">
            <Form.Label>P1 </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter P1"
              onChange={(e) => {
                setP1(parseFloat(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="C1">
            <Form.Label>C1 </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter C1"
              onChange={(e) => {
                setC1(parseFloat(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="P2">
            <Form.Label>P2 </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter P2"
              onChange={(e) => {
                setP2(parseFloat(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="C2">
            <Form.Label>C2 </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter C2"
              onChange={(e) => {
                setC2(parseFloat(e.target.value));
              }}
            />
          </Form.Group>
        </div>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>B11</td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="B11"
                  onChange={(e) => {
                    setB11(parseFloat(e.target.value));
                  }}
                />
              </td>
              <td>B12</td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="B12"
                  onChange={(e) => {
                    setB12(parseFloat(e.target.value));
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>B21</td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="B21"
                  onChange={(e) => {
                    setB21(parseFloat(e.target.value));
                  }}
                />
              </td>
              <td>B22</td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="B22"
                  onChange={(e) => {
                    setB22(parseFloat(e.target.value));
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Form.Group className="mb-3" controlId="P1">
          <Form.Label>Set PD </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter PD"
            onChange={(e) => {
              setPD(parseFloat(e.target.value));
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Accuracy">
          <Form.Label>Set Accuracy </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Accuracy"
            onChange={(e) => {
              setAccuracy(parseFloat(e.target.value));
            }}
          />
        </Form.Group>
        {isLoading && (
          <Spinner animation="border" role="status" variant="warning">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <div className={Style.bCof}>
          <Button className="btn btn-success" onClick={solveProblem}>
            economic Dispatch
          </Button>
        </div>
      </Form>
      <h6>Results</h6>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <MathJaxContext>
                <MathJax>{"\\(\\lambda\\)"}</MathJax>
              </MathJaxContext>
            </th>
            <th>P1</th>
            <th>P2</th>
            <th>
              P<sub>L</sub>
            </th>
            <th>
              P<sub>1</sub> + P<sub>2</sub>
            </th>
            <th>
              P<sub>D</sub> + P<sub>L</sub>
            </th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.results.map((item) => (
              <tr key={item.P1}>
                <td>{parseFloat(item.Lamda).toFixed(4)}</td>
                <td>{item.P1}</td>
                <td>{item.P2}</td>
                <td>{item["Power Loss"]}</td>
                <td>{item["P1+P2"]}</td>
                <td>{item["PD + PL"]}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <p>Developed by Kosgei Victor &copy; 2022</p>
    </Container>
  );
}

export default App;
