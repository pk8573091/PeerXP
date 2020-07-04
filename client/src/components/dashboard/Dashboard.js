import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import TicketForm from '../tickets/TicketForm';
import Ticket from '../tickets/Ticket';
import Spinner from '../common/Spinner';
import { getTickets } from '../../actions/ticketActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getTickets();
    }

    render() {
        const { tickets, loading } = this.props.ticket;
        let ticketContent;

        if (tickets === null || loading) {
            ticketContent = <Spinner />;
        } else {
            ticketContent = <Ticket tickets={tickets} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Link to="/ticket" className="btn btn-primary mb-3">
                                Add Ticket
                            </Link>
                            {ticketContent}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getTickets: PropTypes.func.isRequired,
    ticket: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ticket: state.ticket
});

export default connect(mapStateToProps, { getTickets })(Dashboard);
