import axios from 'axios';

import {
  ADD_TICKET,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TICKETS,
  GET_TICKET,
  TICKET_LOADING,
  DELETE_TICKET
} from './types';

// Add ticket
export const addTicket = ticketData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/tickets', ticketData)
    .then(res =>
      dispatch({
        type: ADD_TICKET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Tickets
export const getTickets = () => dispatch => {
  dispatch(setTicketLoading());
  axios
    .get('/api/tickets')
    .then(res =>
      dispatch({
        type: GET_TICKETS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TICKETS,
        payload: null
      })
    );
};

// Get Ticket
export const getTicket = id => dispatch => {
  dispatch(setTicketLoading());
  axios
    .get(`/api/tickets/${id}`)
    .then(res =>
      dispatch({
        type: GET_TICKET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TICKET,
        payload: null
      })
    );
};

// Delete TICKET
export const deleteTicket = id => dispatch => {
  axios
    .delete(`/api/tickets/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TICKET,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setTicketLoading = () => {
  return {
    type: TICKET_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
