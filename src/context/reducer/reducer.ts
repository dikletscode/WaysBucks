const Reducer = (
  state: any,
  { type, payload }: { type: string; payload: string | null }
) => {
  switch (type) {
    case "BUYYER_LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAdmin: false,
        avatar: payload,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        avatar: null,
      };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAdmin: true,
        avatar: payload,
      };
    default:
      return state;
  }
};

export default Reducer;
