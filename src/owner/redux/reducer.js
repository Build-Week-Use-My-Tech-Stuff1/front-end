import {FETCH_USER_START, FETCH_USER_SUCCESS} from "./actions"


const initialState = {
    isLoadingUser: false,
    user: [],
    fetchedData: [],
    error: "",
};

function OwnerReducer(state = initialState, action) {
  switch (action.type) {
      case FETCH_USER_START:
          return {
              ...state,
              isLoadingUser: true
          }
          case FETCH_USER_SUCCESS:
              return{
                  ...state,
                  isLoadingUser: false,
                user: action.payload
              }
    default:
      return state;
  }
}

export default OwnerReducer;
