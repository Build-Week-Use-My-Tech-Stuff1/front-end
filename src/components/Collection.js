import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../rental/actions";

const Collection = (props) => {
  useEffect(() => {
    props.fetchData();
  }, []);
  return (
    <div>
      {props.isLoading && <p>Loading data...</p>}
      {props.error && <p className="error">Uh-oh, something happened... {props.error}</p>}
      {props.fetchedData.length > 0 && (
        <div>
          {props.fetchedData.map(data => (
            <div className="characterContainer">
              <img className="characterImage" src={data.image}></img>
              <h2 className="characterName">{data.name}</h2>
            </div>
          ))}
        </div>
      )}
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