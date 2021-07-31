import { SET_DATA } from "./userDataTypes";

export const setData = (fullName, email, permission) => {
  return {
    type: SET_DATA,
    payload: {
      fullName: fullName,
      email: email,
      permission: permission,
    },
  };
};
