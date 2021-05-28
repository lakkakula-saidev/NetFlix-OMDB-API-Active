import { Component } from "react";
import { Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import Get from "./Get";
class MainBody extends Component {
    state = {
        movieList: ["Harry Potter", "The Lord of the Rings"],
        newMedia: null,
        responseArray: [],
        isLoading: true
    };

    async componentDidMount() {
        try {
            const endpoint = "http://www.omdbapi.com/?apikey=35a13d0b&s=";
            const moviesArr = await Promise.all(
                this.state.movieList.map(async (category) => {
                    const res = await fetch(endpoint + category);
                    return await res.json();
                })
            );
            this.setState({ responseArray: moviesArr });
            console.log(this.state.responseArray, "New movies");
            try {
                await this.setState({ newMedia: await Get("media") });
                await this.setState({ isLoading: false });
                console.log(this.state.newMedia);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Container className="my-5 mainBodyContianer">
                {this.state.responseArray.map((gallery, id) => (
                    <>
                        <h3 className="carouselHeading">
                            <b>{this.state.movieList[id]}</b>
                        </h3>
                        <Row>
                            <Carousel indicators={false}>
                                <Carousel.Item class="d-flex flex-row">
                                    <Row className="my-4">
                                        {gallery.Search.slice(0, 6).map((movie) => (
                                            <Col md={2}>
                                                <img className="d-block w-100" src={movie.Poster} alt="First slide" onClick={() => this.props.history.push("/ShowDetail/" + movie.imdbID)} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            </Carousel>
                        </Row>
                    </>
                ))}

                {/* <Row>
                    {this.state.isLoading && <Spinner animation="border" variant="primary" />}
                    {!this.state.isLoading && (
                        <>
                            {this.state.newMedia.map((movie) => {
                                <Col md={2}>
                                    <img className="d-block w-100" src={movie.Poster} alt="First slide" onClick={() => this.props.history.push("/ShowDetail/" + movie.imdbID)} />
                                    <p>{movie.Title}</p>
                                </Col>;
                            })}
                        </>
                    )}
                </Row> */}
            </Container>
        );
    }
}

export default MainBody;
