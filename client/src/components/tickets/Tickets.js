import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TicketForm from './TicketForm';
import { getTickets } from '../../actions/ticketActions';

class Tickets extends Component {
  componentDidMount() {
    this.props.getTickets();
    
  }

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <TicketForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Tickets.propTypes = {
  getTickets: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  ticket: state.ticket
});

export default connect(mapStateToProps, { getTickets })(Tickets);
