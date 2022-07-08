import { GET_HYMNAL, GET_ANTHEM } from '../types';

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
    default:
      return state;
  }
};
