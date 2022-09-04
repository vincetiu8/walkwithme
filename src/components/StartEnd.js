import React, { useRef, useState } from "react"
import {Button, Card, Form } from "react-bootstrap"

export default function StartEnd() {
  const startRef = useRef()
  const endRef = useRef()
  const [loading, setLoading] = useState(false)
  var [start, end] = [null, null]

    async function findPlaces(start){

   }

  async function handleStart(e){
    e.preventDefault()
    setLoading(true)
    await findPlaces(startRef.current.value).then(
        (val) => {start = val}
    )
    setLoading(false)
  }
  async function handleEnd(e){
    e.preventDefault()
    setLoading(true)
    await findPlaces(startRef.current.value).then(
        (val) => {end = val}
    )
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Select a Starting Point</h2>
          <Form onSubmit={handleStart}>
            <Form.Group id="start">
              <Form.Label>Search for a location:</Form.Label>
              <Form.Control type="text" ref={startRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Search
            </Button>
            </Form>
        </Card.Body>
        <Card.Body>
        <h2 className="text-center mb-4">Select an Ending Point</h2>
          <Form onSubmit={handleEnd}>
            <Form.Group id="end">
              <Form.Label>Search for a location:</Form.Label>
              <Form.Control type="text" ref={endRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Search
            </Button>
            </Form>
        </Card.Body>
      </Card>
    </>
  )
}
