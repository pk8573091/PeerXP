import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TicketItem from '../tickets/TicketItem';
import Spinner from '../common/Spinner';
import { getTicket } from '../../actions/ticketActions';

class Ticket extends Component {
  componentDidMount() {
    this.props.getTicket(this.props.match.params.id);
  }

  render() {
    const { ticket, loading } = this.props.ticket;
    let ticketContent;

    if (ticket === null || loading || Object.keys(ticket).length === 0) {
      ticketContent = <Spinner />;
    } else {
      ticketContent = (
        <div>
          <TicketItem ticket={ticket} showActions={false} />
        </div>
      );
    }

    return (
      <div className="ticket">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/ticket" className="btn btn-light mb-3">
                Back To Ticket
              </Link>
              {ticketContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Ticket.propTypes = {
  getTicket: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ticket: state.ticket
});

export default connect(mapStateToProps, { getTicket })(Ticket);
