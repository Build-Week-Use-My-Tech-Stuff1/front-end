import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../rental/actions";
import "./styles/collection.css";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link, useHistory } from "react-router-dom";

const ItemsOverview = (props) => {
  const user = window.localStorage.getItem("id");
  const { push } = useHistory()


  useEffect(() => {
    props.fetchData();
  }, []);

  // function unRentItem(item) {

  //   axiosWithAuth()
  //   .delete(`app/items/${item.id}`)
  //   .then((res) => {
  //     console.log(res)
  //     axiosWithAuth()
  //     .put(`api/items/${item.id}`, {
  //       ...item,
  //       renterId: null
  //     })
  //     .then(res => {
  //       console.log(res)
  //     })
  //   })
  // }

  function unRentItem(item) {
    axiosWithAuth()
    .put(`api/items/${item.id}`, {
      ...item,
      renterId: null
    })
    .then((res) => {
      console.log(res)
      push('/dashboard/collection')
    })
    .catch(error => console.log(error))
  }


  return (
    <div className="parentDiv">
      {props.isLoading && <p>Loading data...</p>}
      {props.error && <p className="error">Uh-oh, something happened... {props.error}</p>}
      {props.fetchedData.length > 0 && (
        <div className="items">
          {props.fetchedData.map((data, item) => (data.renterId !== null) && (
            <div key={item} className="mappedItem">
              <h2 className="itemH2">{data.name}</h2>
              <p>{`${data.description}`}</p>
              <p>Condition: {`${data.condition}`}</p>
              <p>Period: {`${data.period}`} months</p>
              <p>${`${data.price}`}</p>
              <button onClick={() => unRentItem(data)} className="rentButton">Return Item</button>
            </div>
          ))}
        </div>
      )}
      <Link to={`/dashboard/collection`} className="linkButton">Return to Collection</Link>
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