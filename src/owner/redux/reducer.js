import {FETCH_USER_START} from "./actions"


const initialState = {
    isLoading: false,
    fetchedData: [],
    error: ""
};

function OwnerReducer(state = initialState, action) {
  switch (action.type) {
      case FETCH_USER_START:
          return {
              ...state,
              isLoading: true
          }
    default:
      return state;
  }
}

export default OwnerReducer;
