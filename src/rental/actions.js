import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const fetchData = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });

    axiosWithAuth()
      .get("/api/items")
      .then(response => {
        console.log(response);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data.results})
      }) 
      .catch(error => console.log(error))
  };
};