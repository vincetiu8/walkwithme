import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import Header from './Header';
import {Link} from "react-router-dom";

function AddTrip() {

    const timeRef = useRef()
    const dateRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()

        // Write to database
        const jsonData = {
            time: timeRef.current.value,
            date: dateRef.current.value
        };
        
        fetch('http://placeholder', {
            method: 'POST',
            body: JSON.stringify(jsonData)
        })

    }

    return (
        <div className="mainpage">
            <Header />

            <Card>
                <Card.Header as="h5"> Add Journey</Card.Header>
                <Card.Body>
                    <Card.Title>Select time and date for your journey</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEnterTime">
                            <Form.Control type="time" name="time" ref={timeRef}/>
                            <Form.Control type="date" name="date" ref={dateRef}/>
                        </Form.Group>
                    </Form>

                    <Card.Title>Select Location</Card.Title>
                    <Form>
                        <Form.Group controlId="formEnterLocation">

                        </Form.Group>
                    </Form>

                <Button type="Submit">
                    Submit
                </Button>

                <div className="col">
								<Link to="/" className="btn btn-primary w-100 mt-3">
									Back to Home
								</Link>
							</div>


                </Card.Body>
            </Card>
        </div>        
    )
}

export default AddTrip