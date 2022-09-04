import React, { useRef, useEffect } from "react";
import {Form, Card} from "react-bootstrap";

const AutoComplete = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();

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

export default AutoComplete;