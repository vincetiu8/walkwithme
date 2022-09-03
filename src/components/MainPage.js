import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import Header from './Header';

function MainPage() {

    const timeRef = useRef()
    const dateRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()

        try {
            // Write to database
            const data = {
                time: timeRef.current.value,
                date: dateRef.current.value
            };
        } catch (event) {
            console.log(event)
        }


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
                </Card.Body>
            </Card>
        </div>        
    )
}

export default MainPage