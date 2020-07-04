const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const https = require('https');

// Ticket model
const Ticket = require('../../models/Ticket');


// Validation
const validateTicketInput = require('../../validation/ticket');



// "https://desk.zoho.in/api/v1/tickets"; for GET request.
// const optionsget = {
//   host: "desk.zoho.in",
//   port: 443,
//   path: "/api/v1/tickets",
//   method: "GET",
//   headers: {
//     orgId: 60001280952,
//     Authorization: "aa8cd2f4d25aa3418e47f953ad9fe323"
//   }
// };

// const req = https.request(optionsget, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
// req.end();


// @route   GET api/tickets
// @desc    Get tickets
// @access  Public
router.get('/', (req, res) => {
  Ticket.find()
    .sort({ date: -1 })
    .then(tickets => res.json(tickets))
    .catch(err => res.status(404).json({ noticketsfound: 'No tickets found' }));
});

// @route   GET api/tickets/:id
// @desc    Get ticket by id
// @access  Public
router.get('/:id', (req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(err =>
      res.status(404).json({ noticketfound: 'No ticket found with that ID' })
    );
});


// "https:/ / desk.zoho.in / api / v1 / tickets"; for POST request.
// jsonObject = JSON.stringify({
//   "department": "7189000000051431",
//   "contactId": "7189000001742107",
//   "category": "category",
//   "subject": "Some tests with node.js",
//   "description": "this is a description",
//   "email": "omy@gmail.com",
//   "priority": "high"
  
// });
// const optionsget = {
//   host: "desk.zoho.in",
//   port: 443,
//   path: "/api/v1/tickets",
//   method: "POST",
//   headers: {
//     orgId: 60001280952,
//     Authorization: "aa8cd2f4d25aa3418e47f953ad9fe323",
//     'Content-Type': "application/json",
//     'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
//   }
// };

// const reqPost = https.request(optionsget, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//   res.on('data', function (d) {
//     console.info('POST result:\n');
//     process.stdout.write(d);
//     console.info('\n\nPOST completed');
//   });
// });

// // write the json data
// reqPost.write(jsonObject);
// reqPost.end();
// reqPost.on('error', function (e) {
//   console.error(e);
// });

// @route   Post api/tickets
// @desc    Create ticket
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTicketInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTicket = new Ticket({
      department: req.body.department,
      category: req.body.category,
      subject: req.body.subject,
      description: req.body.description,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      priority: req.body.priority,
      user: req.user.id
    });

    newTicket.save().then(ticket => res.json(ticket));
  }
);

// @route   DELETE api/tickets/:id
// @desc    Delete ticket
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Ticket.findById(req.params.id)
        .then(ticket => {
          // Check for ticket owner
          if (ticket.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          ticket.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ ticketnotfound: 'No ticket found' }));
  }
);



module.exports = router;
