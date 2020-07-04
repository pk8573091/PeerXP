const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTicketInput(data) {
  let errors = {};

  data.department = !isEmpty(data.department) ? data.department : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.priority = !isEmpty(data.priority) ? data.priority : '';


  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department field is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(data.priority)) {
    errors.priority = 'Priority field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
