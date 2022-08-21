export default (state, action) => {
  switch (action.type) {
    case "SET_SERVER":
      return {
        ...state,
        server: action.payload,
      };
    case "SET_SERVER_DATA":
      return {
        ...state,
        serverData: action.payload,
      };
    default:
      return state;
  }
};
