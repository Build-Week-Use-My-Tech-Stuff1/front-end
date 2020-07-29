import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import propTypes from "prop-types";
import { listCreationSchema } from "../schemas";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { fetchUser } from "../../owner/redux/actions";
import { connect } from "react-redux";

//   Start of styling section
const ListingContainer = styled.div`
  height: calc(
    100vh - ${(props) => (props.navbarHeight ? props.navbarHeight : "7rem")}
  );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: grid;
    grid-template-columns: 50%, 50%;
    box-shadow: 0rem 0rem 0.5rem 0rem
      ${(props) => (props.color ? props.color : "green")};
    grid-gap: 2rem;
    min-width: 50%;
    min-height: 50%;
    padding: 10rem;
    color: ${(props) => (props.color ? props.color : "green")};
    border-radius: 1.25rem;
    label {
      grid-column: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }
    input,
    textArea,
    select,
    option {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-column: 2;
      background: ${(props) => (props.background ? props.background : "black")};
      color: ${(props) => (props.color ? props.color : "green")};
      text-align: center;
      padding: 0.25rem 0rem;
    }
    button {
      margin-top: 2rem;
      grid-column: 1 / span 2;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${(props) => (props.color ? props.color : "green")};
      border: none;
      font-size: 2rem;
      padding: 0.25rem 0rem;
      color: ${(props) => (props.background ? props.background : "black")};
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        background: ${(props) =>
          props.background ? props.background : "black"};
        color: ${(props) => (props.color ? props.color : "green")};
        text-decoration: line-through;
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    div.errors{
        text-align: center;
        grid-column: 1 / span 2;
    }
  }
`;

/* --Previous styling-- */
const ListingContainerBk = styled.div`
  background-color: ${COLORS.primary};
  color: ${COLORS.secondary};
  width: 100%;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    label {
      font-size: 2.2rem;
      width: 60%;
    }
    button {
      width: 60%;
      font-size: 2.6rem;
      border-radius: 5px;
      background-color: grey;
    }
    input,
    textarea {
      margin-left: 2%;
      background-color: lightgrey;
      font-weight: bold;
      color: black;
      font-size: 1.8rem;
      ::placeholder {
        color: black;
      }
    }
    select {
      margin-left: 2%;
      background-color: lightgrey;
      font-weight: bold;
      color: black;
      font-size: 1.8rem;
    }
    .errors {
      font-size: 3rem;
    }
  }
`;
// End of styling section

function CreateListing(props) {
  const { navbarHeight } = props;
  const initialValues = {
    name: "",
    description: "",
    condition: "",
    price: 0.01,
    period: 1,
  };
  const [newListing, setNewListing] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  // Placeholder state for testing
  const [PHState, setPHState] = useState([]);
  const loggedId = localStorage.getItem("id");

  useEffect(() => {
    props.fetchUser();
  }, []);

  const postNewItem = (newItem) => {
    axiosWithAuth()
      .post(
        `https://bw-usemytechstuff.herokuapp.com/api/users/${loggedId}`,
        newItem
      )
      .then((res) => {
        console.log(res);
        //setNewListing([...newListing, res.data])
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setNewListing(initialValues);
      });
  };

  const onInputChange = (e) => {
    setNewListing({
      ...newListing,
      [e.target.name]: e.target.value,
    });
  };
  const onPriceChange = (e) => {
    setNewListing({
      ...newListing,
      [e.target.name]: parseFloat(e.target.value).toFixed(2),
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    listCreationSchema
      .validate(newListing, { abortEarly: false })
      .then((_) => {
        if (errors.length > 0) {
          setErrors([]);
        }
        setPHState([...PHState, newListing]);
        //setNewListing(initialValues)
      })
      .catch((err) => {
        console.dir(err);
        setErrors([...err.inner]);
      });

    const newItem = {
      name: newListing.name.trim(),
      description: newListing.description,
      condition: newListing.condition,
      price: newListing.price,
      period: newListing.period,
    };
    postNewItem(newItem);
    console.log(newListing);
    console.log(PHState);
  };

  return (
    <ListingContainer
      navbarHeight={navbarHeight}
      color={COLORS.secondary}
      background={COLORS.primary}
    >
      <form>
        <label>Item Name</label>
        <input
          type="text"
          name="name"
          placeholder="Item Listing Name"
          value={newListing.name}
          onChange={onInputChange}
        />
        <label>Description</label>
        <textarea
          type="text"
          name="description"
          rows="4"
          cols="40"
          placeholder="Item Description"
          value={newListing.description}
          onChange={onInputChange}
        />
        <label>Condition</label>
        <select
          name="condition"
          value={newListing.condition}
          onChange={onInputChange}
        >
          <option value=""></option>
          <option value="bad">bad</option>
          <option value="fair">fair</option>
          <option value="great">great</option>
          <option value="new">new</option>
        </select>
        <label>Rent Price</label>
        <input
          type="number"
          step="0.01"
          name="price"
          min="0.01"
          value={newListing.price}
          onChange={onPriceChange}
        />
        <label>Rent Period (in months)</label>
        <input
          type="number"
          name="period"
          placeholder="Months to Rent"
          value={newListing.period}
          onChange={onInputChange}
        />
        <button onClick={onSubmitForm}>Add to Listings</button>
        <div className='errors'>
          {errors.map((err, i) => (
            <p key={i} className="error" style={{ color: "red" }}>
              {err.message}
            </p>
          ))}
        </div>
      </form>
    </ListingContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoadingUser: state.isLoadingUser,
    user: state.user,
  };
};

CreateListing.propTypes = {
  navbarHeight: propTypes.string,
};

export default connect(mapStateToProps, { fetchUser })(CreateListing);
