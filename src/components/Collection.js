import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../rental/actions";
import "./styles/collection.css";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";

const Collection = (props) => {
  const user = window.localStorage.getItem("id");

  useEffect(() => {
    props.fetchData();
  }, []);

  function rentItem(item) {
    axiosWithAuth()
    .put(`api/items/${item.id}`, {
      ...item,
      renterId: user
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <div className="parentDiv">
      {props.isLoading && <p>Loading data...</p>}
      {props.error && <p className="error">Uh-oh, something happened... {props.error}</p>}
      {props.fetchedData.length > 0 && (
        <div className="items">
          {props.fetchedData.map((data, list) => (data.renterId === null) && (
            <div key={list} className="mappedItem">
              <h2 className="itemH2">{data.name}</h2>
              <p>{`${data.description}`}</p>
              <p>Condition: {`${data.condition}`}</p>
              <p>Period: {`${data.period}`} months</p>
              <p>${`${data.price}`}</p>
              <button onClick={() => rentItem(data)} className="rentButton">Rent Item</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/dashboard/collection/userCollection" className="linkButton">View Rented Items</Link>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    fetchedData: state.fetchedData,
    error: state.error
  };
};

export default connect(
    mapStateToProps,
    { fetchData }
  )(Collection);