const Reducer = (
  state: any,
  { type, payload }: { type: string; payload: object | null }
) => {
  switch (type) {
    case "BUYYER":
      return {
        ...state,
        isLogin: true,
        isAdmin: false,
        data: payload,
      };
    case "INVALID_USER":
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        data: null,
      };
    case "ADMIN":
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
