const eventReducer = (
  state: any,
  { type, payload }: { type: string; payload: boolean }
) => {
  switch (type) {
    case "MODAL_LOGIN":
      return {
        ...state,
        login: payload,
        signin: false,
      };
    case "MODAL_SIGNIN":
      return {
        ...state,
        signin: payload,
        login: false,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        klik: false,
      };

    default:
      return state;
  }
};
export default eventReducer;
