import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import propTypes from "prop-types";
import { listCreationSchema } from "../schemas"

export default function CreateListing(props) {
  const { navbarHeight } = props;
  const initialValues = {
    name: "",
    description: "",
    condition: "",
    price: 0.01,
    period: 1
  }
  const [ newListing, setNewListing ] = useState(initialValues)
  const [ errors, setErrors ] = useState([])
  // Placeholder state for testing
  const [ PHState, setPHState ] = useState([])

  const onInputChange = e => {
      setNewListing({
          ...newListing,
          [e.target.name]: e.target.value
      })
  }
  const onPriceChange = e => {
      setNewListing({
          ...newListing,
          [e.target.name]: parseFloat(e.target.value).toFixed(2)
      })
  }

  const onSubmitForm = e => {
      e.preventDefault()
      listCreationSchema.validate(newListing, { abortEarly: false })
      .then( _ => {
          if(errors.length > 0){
              setErrors([])}
      setPHState([...PHState, newListing])
      setNewListing(initialValues)
      })
      .catch(err => {
          console.dir(err)
          setErrors([...err.inner])
      })
      console.log(newListing)
      console.log(PHState)
  }

  return (
      <form>
          <label>Item Name
              <input type="text"
              name="name"
              placeholder="Item Listing Name"
              value={newListing.name}
              onChange={onInputChange}
              />
          </label><br/>
          <label>Description
              <input type="text"
              name="description"
              placeholder="Item Description"
              value={newListing.description}
              onChange={onInputChange}
              />
          </label>
          <label>Condition
              <select name="condition"
              value={newListing.condition}
              onChange={onInputChange}>
                  <option value=""></option>
                  <option value="bad">bad</option>
                  <option value="fair">fair</option>
                  <option value="great">great</option>
                  <option value="new">new</option>
              </select>
          </label>
          <label>Rent Price
              <input type="number"
              step="0.01"
              name="price"
              value={newListing.price}
              onChange={onPriceChange}
              />
          </label>
          <label>Rent Period
              <input type="number"
              name="period"
              placeholder="Months to Rent"
              value={newListing.period}
              onChange={onInputChange}
              />
          </label>

          <button onClick={onSubmitForm} >Add to Listings</button>
          <div>
              {errors.map( err => (  
                  <p style={{color: "red"}}>{err.message}</p>
              ))}
          </div>
      </form>
  )
  }

CreateListing.propTypes = {
  navbarHeight: propTypes.string,
};
