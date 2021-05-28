import React, { Component } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Post from "./Post.js";
import FormDataPost from "./FormDataPost.js";

export class addNewMedia extends Component {
    state = {
        media: {
            Title: null,
            Year: null,
            Type: null
        },
        mediaPoster: null,
        email: { emailAddress: "lakkakula.saidev@gmail.com" }
    };

    ImageHandle(e) {
        const files = e.target.files[0];
        console.log(files);
        return files;
    }

    handleChange(e) {
        this.setState({ media: { ...this.state.media, [e.target.id]: e.target.value } });
        console.log(this.state.media);
    }

    async postData(e) {
        e.preventDefault();
        let Value = !Object.values(this.state.media).some((element) => element === null);

        if (Value) {
            let response = await Post("media", this.state.media);
            if (response) {
                console.log("Data is posted, Poster is yet to be....");
                if (this.state.mediaPoster !== null) {
                    response = await response.json();
                    let formData = new FormData();
                    formData.append("poster", this.state.mediaPoster);
                    console.log(response);
                    let imdbID = response._id;
                    const post_truthy = await FormDataPost(formData, imdbID, "media", "uploadPoster");
                    if (post_truthy) {
                        await Post("mail", this.state.email);
                        console.log("Email successfully sent...");
                    }
                }
            }
        }
    }

    render() {
        return (
            <Container className="movieDetailContainer  mt-5">
                <h2>
                    <b>{this.props.title}</b>
                </h2>
                <Row className="d-flex justify-content-center">
                    <Col className="col-5">
                        <Form className="mt-5" onSubmit={(e) => this.postData(e)}>
                            <Form.Group className="mt-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="Title" onChange={(e) => this.handleChange(e)} size="md" placeholder="Title" />
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>Cover</Form.Label>
                                <Form.Control id="poster" onChange={(e) => this.setState({ mediaPoster: this.ImageHandle(e) })} type="file" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Type of Media</Form.Label>
                                <Form.Control id="Type" onChange={(e) => this.handleChange(e)} size="lg" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Year of Release</Form.Label>
                                <Form.Control id="Year" onChange={(e) => this.handleChange(e)} type="number" size="lg" />
                            </Form.Group>
                            <Form.Group className="d-flex mt-3 justify-content-end">
                                <Button type="reset" size="sm" variant="secondary">
                                    Reset
                                </Button>
                                <Button type="submit" size="sm" variant="primary" style={{ marginLeft: "1em" }}>
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default addNewMedia;
