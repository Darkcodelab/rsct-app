const tcReducer = (state, action) => {
  switch (action.type) {
    case "SET_TC":
      return action.payload;
  }
};

export default tcReducer;
