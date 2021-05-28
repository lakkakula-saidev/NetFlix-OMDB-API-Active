import { Component } from "react";
import { Container, Card, ListGroup, ListGroupItem, Row, Col, Spinner } from "react-bootstrap";

class ShowDetail extends Component {
    state = {
        movieData: {},
        movieComments: [],
        isLoading: true
    };
    async componentDidMount() {
        let movieId = this.props.match.params.Id;
        const apiUrl = process.env.REACT_APP_API_URL;
        const endpoint = `${apiUrl}/${movieId}`;
        try {
            this.setState({ isLoading: true });
            let response = await fetch(endpoint);
            this.setState({ movieData: await response.json() });
            console.log(this.state.movieData);
        } catch (error) {}

        let commentEndpoint = "https://striveschool-api.herokuapp.com/api/comments/" + movieId;
        try {
            let response = await fetch(commentEndpoint, {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTk3MDQxNDYsImV4cCI6MTYyMDkxMzc0Nn0.kn5IJ6NrB0ParFoZTMbCv9U3bonQxfjR4MZZsjR9KzY"
                }
            });
            if (response.ok) {
                this.setState({ movieComments: await response.json(), isLoading: false });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                {this.state.isLoading && <Spinner className="loader" animation="border" variant="primary" />}
                {!this.state.isLoading && (
                    <Container className="movieDetailContainer  mt-5">
                        <h2>
                            <b>{this.state.movieData.Title}</b>
                        </h2>
                        <Row className="d-flex my-4 movieDetailRow">
                            <Col md={3}>
                                <img src={this.state.movieData.Poster} style={{ width: "80%" }} alt="" />
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <p>{this.state.movieData.Plot}</p>
                                </Row>
                                <Row>
                                    <ListGroup className=" movieDataList w-100">
                                        <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-start" key={"commentHeading"}>
                                            <div className="ms-2 me-auto">Runtime: {this.state.movieData.Runtime}</div>
                                            <span>Released: {this.state.movieData.Released}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-start" key={"commentHeading"}>
                                            <div className="ms-2 me-auto">Genre: {this.state.movieData.Genre}</div>
                                            <span>Year: {this.state.movieData.Year}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-start" key={"commentHeading"}>
                                            <div className="ms-2 me-auto">Director: {this.state.movieData.Director}</div>
                                            <span>Country: {this.state.movieData.Country}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-start" key={"commentHeading"}>
                                            <div className="ms-2 me-auto">Writers: {this.state.movieData.Writer}</div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Row>
                            </Col>
                            <Col md={{ span: 3 }} className="ml-4">
                                <Row className="movieComments ">
                                    <ListGroup>
                                        <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-start" key={"commentHeading"} variant="dark">
                                            <div className="ms-2 me-auto">
                                                <strong>Comment</strong>
                                            </div>
                                            <span>
                                                <strong>Rating</strong>
                                            </span>
                                        </ListGroup.Item>
                                        {this.state.movieComments.slice(0, 4).map((item) => (
                                            <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center " key={item._id} variant="secondary">
                                                <div className="ms-2 me-auto ">{item.comment}</div>
                                                <span className="badge bg-primary rounded-pill">{item.rate}</span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                )}
            </>
        );
    }
}

export default ShowDetail;

/*  {
   this.state.movieComments.map((item) => (
     <ListGroup.Item
       className="list-group-item d-flex justify-content-between align-items-start"
       key={item._id}
     >
       <div className="ms-2 me-auto">{item.comment}</div>
       <span className="badge bg-primary rounded-pill">{item.rate}</span>
     </ListGroup.Item>
   ));
 } */
