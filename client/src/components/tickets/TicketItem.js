import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTicket } from '../../actions/ticketActions';

class TicketItem extends Component {
  onDeleteClick(id) {
    this.props.deleteTicket(id);
  }

  render() {
    const { ticket, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
           
            <p className="lead">{ticket.name}</p>
            <p >{ticket.department}      {ticket.category}      {ticket.subject}</p>
          </div>
          <div className="col-md-2">
            
            {showActions ? (
              <span>
                {ticket.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, ticket._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

TicketItem.defaultProps = {
  showActions: true
};

TicketItem.propTypes = {
  deleteTicket: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteTicket })(
  TicketItem
);
