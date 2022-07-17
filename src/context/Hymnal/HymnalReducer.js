import { GET_HYMNAL, GET_ANTHEM, GET_SUNSET } from '../types';

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_HYMNAL:
      return {
        ...state,
        hymnal: payload,
      };
    case GET_ANTHEM:
      return {
        ...state,
        selectedAnthem: payload,
      };
      case GET_SUNSET:
      return {
        ...state,
        sunset: payload,
      };
    default:
      return state;
  }
};
