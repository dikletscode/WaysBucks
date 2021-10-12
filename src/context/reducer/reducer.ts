const Reducer = (
  state: any,
  { type, payload }: { type: string; payload: object | null }
) => {
  switch (type) {
    case "BUYYER_LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAdmin: false,
        data: payload,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        data: null,
      };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAdmin: true,
        data: payload,
      };
    default:
      return state;
  }
};

export default Reducer;
