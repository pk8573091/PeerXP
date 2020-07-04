import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addTicket } from '../../actions/ticketActions';

class TicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: '',
      category: '',
      subject: '',
      description: '',
      name: '',
      email: '',
      mobile: '',
      priority: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const ticketData = {
      department: this.state.department,
      category: this.state.category,
      subject: this.state.subject,
      description: this.state.description,
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      priority: this.state.priority,
      errors: {}
    };

    this.props.addTicket(ticketData, this.props.history);
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const department = [
      { label: '* Select Department', value: 0 },
      { label: 'Department1', value: '7189000000051431' },
      { label: 'Department2', value: '7189000000051431' },
      { label: 'Department3', value: '7189000000051431' }

    ];
    const category = [
      { label: '* Select Category', value: 0 },
      { label: 'category1', value: 'category1' },
      { label: 'category2', value: 'category2' },
      { label: 'category3', value: 'category3' }

    ];
    const priority = [
      { label: '* Select Priority', value: 0 },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' }
    ]

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add Ticket</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <SelectListGroup
                  placeholder="* Department"
                  name="department"
                  value={this.state.department}
                  onChange={this.onChange}
                  options={department}
                  error={errors.department}
                  info="Select Department"
                />
                <SelectListGroup
                  placeholder="* Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  options={category}
                  error={errors.category}
                  info="Select Category"
                />
                <TextFieldGroup
                  placeholder="* Subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.onChange}
                  error={errors.subject}
                  info="Mention your Subject"
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us a little about your Problem"
                />
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Name"
                />
                <TextFieldGroup
                  placeholder="* Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Email"
                />
                <TextFieldGroup
                  placeholder="Mobile"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={this.onChange}
                  error={errors.mobile}
                  info="Mobile"
                />
                <SelectListGroup
                  placeholder="* Priority"
                  name="priority"
                  value={this.state.priority}
                  onChange={this.onChange}
                  options={priority}
                  error={errors.priority}
                  info="Priority"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

TicketForm.propTypes = {
  addTicket: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addTicket })(TicketForm);
