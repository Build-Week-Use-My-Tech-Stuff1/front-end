import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../rental/actions";
import "./styles/collection.css";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";

const ItemsOverview = (props) => {
  const user = window.localStorage.getItem("id");

  useEffect(() => {
    props.fetchData();
  }, []);

  function unRentItem(item) {
    axiosWithAuth()
    .put(`api/items/${item.id}`, {
      ...item,
      renterId: null
    })
    .then(response => {
      console.log(response)
      window.location.reload(true)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="parentDiv">
      {props.isLoading && <p>Loading data...</p>}
      {props.error && <p className="error">Uh-oh, something happened... {props.error}</p>}
      {props.fetchedData.length > 0 && (
        <div className="items">
          {props.fetchedData.map(data => (data.renterId !== null) && (
            <div className="mappedItem">
              <h2 className="itemH2">{data.name}</h2>
              <p>{`${data.description}`}</p>
              <p>Condition: {`${data.condition}`}</p>
              <p>${`${data.price}`}</p>
              <button onClick={() => unRentItem(data)} className="rentButton">Return Item</button>
            </div>
          ))}
        </div>
      )}
      <Link to={`/collection`} className="linkButton">Return to Collection</Link>
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
  )(ItemsOverview);