import { Component } from "react";
import { withRouter } from "react-router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Registration extends Component {
  state = {
    formYearRange: [],
  };

  yearsRange(startYear) {
    let years = [];
    var currentYear = new Date().getFullYear(),
      startYear = startYear || 1910;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }

    /* this.setState({ formYearRange: years }); */
    console.log(years);
    /*  console.log(this.state.formYearRange); */
    return years;
  }
  componentDidMount() {
    this.setState({ formYearRange: this.yearsRange(1910) });
    console.log(this.state.formYearRange);
  }
  render() {
    return (
      <>
        <Container className="registerContainer ">
          <h1>{this.props.title}</h1>
          <Row className="justify-content-center">
            <Col md={7}>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        minLength="2"
                        type="text"
                        placeholder="Enter Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Surname</Form.Label>
                      <Form.Control
                        minLength="3"
                        type="text"
                        placeholder="Enter surname"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        pattern="(?=.*\d)(?=.*[\W_]).{8,}"
                        title="Minimum of 7 characters. Should have at least one special character and one number."
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Label>Year of Birth</Form.Label>
                      <Form.Control as="select" custom required>
                        {this.state.formYearRange.map((year) => {
                          <option>year</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" required />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." required>
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="number" minLength="5" required />
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Registration);
