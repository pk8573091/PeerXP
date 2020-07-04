import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';

class Ticket extends Component {
  render() {
    const { tickets } = this.props;

    return tickets.map(ticket => <TicketItem key={ticket._id} ticket={ticket} />);
  }
}

Ticket.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default Ticket;
