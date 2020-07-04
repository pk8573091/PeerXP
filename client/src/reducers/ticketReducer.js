import {
  ADD_TICKET,
  GET_TICKETS,
  GET_TICKET,
  DELETE_TICKET,
  TICKET_LOADING
} from '../actions/types';

const initialState = {
  tickets: [],
  ticket: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TICKET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case GET_TICKET:
      return {
        ...state,
        ticket: action.payload,
        loading: false
      };
    case ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets]
      };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload)
      };
    default:
      return state;
  }
}
