import { SET_DATA } from "./userDataTypes";

const initialState = {
  fullName: "",
  email: "",
  permission: false,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        fullName: action.payload.fullName,
        email: action.payload.email,
        permission: action.payload.permission,
      };
    default:
      return state;
  }
};

export default userDataReducer;
