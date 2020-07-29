import { axiosWithAuth } from "../../utils/axiosWithAuth"

export const FETCH_USER_START= "FETCH_USER_START"
export const FETCH_USER_SUCCESS= "FETCH_USER_SUCCESS"

export const fetchUser = () => {
    return (dispatch) => {
      dispatch({ type: FETCH_USER_START });
  
      axiosWithAuth()
        .get("/api/users")
        .then((res) => {
          dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.users });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };