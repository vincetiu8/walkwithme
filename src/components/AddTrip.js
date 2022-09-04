import React, {useRef} from "react";
import Map from './Map';
import { withScriptjs } from "react-google-maps";


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

    const MapLoader = withScriptjs(Map);

    return (
        <div className="mainpage">
            <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbp2hrU3Jw2fXd9zHGsz8CaFozb7XKgV0"
                loadingElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default AddTrip
