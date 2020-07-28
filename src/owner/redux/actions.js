import { axiosWithAuth } from "../../utils/axiosWithAuth"

export const FETCH_USER_START= "FETCH_USER_START"

export const fetchUsers = () => {
    return (dispatch) => {
      dispatch({ type: FETCH_USERS_START });
  
      axiosWithAuth()
        .get("/api/users")
        .then((res) => {
          dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data.users });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };