import React, {useRef, useState, useEffect} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import Header from './Header';
import {Link} from "react-router-dom";

function AddTrip() {

    
    const timeRef = useRef()
    const dateRef = useRef()
    const inputRef = useRef()

    
    const handleSubmit = (event) => {
        event.preventDefault()

        // Write to database
        const jsonData = {
            time: timeRef.current.value,
            date: dateRef.current.value,
            address: inputRef.current.value
        };
        
        fetch('http://placeholder', {
            method: 'POST',
            body: JSON.stringify(jsonData)
        })

    }

    // Autocomplete feature
    const AutoComplete = () => {
        const autoCompleteRef = useRef();
        // const inputRef = useRef();
    
        const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
        };
    
        useEffect(() => {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
             inputRef.current,
             options
            );
            autoCompleteRef.current.addListener("place_changed", async function () {
             const place = await autoCompleteRef.current.getPlace();
             console.log({ place });
            });
           });
           return (
            <Form>
                <Form.Control type="text" ref={inputRef} />
            </Form>
                
    
           );
          };

    return (
        <div className="mainpage">
            <Header />

            <Card>
                <Card.Header as="h5"> Add Journey</Card.Header>
                <Card.Body>
                    <Card.Title>Select time and date for your journey</Card.Title>
                    <Form>
                        <Form.Group controlId="formEnterTime">
                            <Form.Control className = "m1" type="time" name="time" ref={timeRef}/>
                            <Form.Control className = "m1" type="date" name="date" ref={dateRef}/>
                        </Form.Group>
                    </Form>

                    {/* <Card.Title>Select Starting Location</Card.Title>
                    <Form>
                        <Form.Group controlId="formEnterLocation">
                            <AutoComplete/>
                        </Form.Group>
                    </Form> */}

                    <Card.Title>Select Destination</Card.Title>
                    <Form>
                        <Form.Group controlId="formEnterLocation">
                            <AutoComplete/>
                        </Form.Group>
                    </Form>

                {/* <AlertDismissible /> */}
                <Button type="Submit" onSubmit={handleSubmit}>
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