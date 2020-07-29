import React, { useState, useEffect } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import axios from "axios";
import { COLORS } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 7rem);
  width: 100%;
  .item-container {
    min-width: 50%;
    min-height: 50%;
    padding: 10rem;
    box-shadow: 0rem 0rem 0.5rem 0rem green;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.color ? props.color : "green")};
    h1 {
      width: 100%;
      text-align: center;
      padding: 0rem 2rem;
      border-bottom: thin solid green;
      margin-bottom: 2rem;
    }
    .item {
      display: grid;
      width: 100%;
      grid-template-columns: 35%, 75%;
      .label {
        grid-column: 1;
      }
      .value {
        grid-column: 2;
      }
      .label,
      .value {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }
  }
`;

export default function Home(props) {
  const [itemOfTheDay, setItemOfTheDay] = useState({});

  useEffect(() => {
    axios
      .get("https://bw-usemytechstuff.herokuapp.com/api/random")
      .then((res) => setItemOfTheDay(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container color={COLORS.secondary} background={COLORS.primary}>
      <div className="item-container">
        <h1>Item of the day</h1>
        <div className="item">
          <p className="label">Item:</p>
          <p className="value">{itemOfTheDay.name}</p>
          <p className="label">Description:</p>
          <p className="value">{itemOfTheDay.description}</p>
          <p className="label">Price:</p>
          <p className="value">${itemOfTheDay.price}</p>
        </div>
      </div>
    </Container>
  );
}
