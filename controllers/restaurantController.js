"use strict";

const RestaurantsDB = require('../models/RestaurantsDB');
const sgMail = require('@sendgrid/mail')
var restaurantsDB = new RestaurantsDB();


function sendEmail(request, respond) {

    var email = request.body.email;
    var content = request.body.content

    sgMail.setApiKey("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")
    const msg = {
        to: email, // Change to your recipient
        from: 'officialcibideliziosi@gmail.com', // Change to your verified sender
        subject: 'Your feedback was sent successfuly! We will get back to you shortly.',
        text: content,
        html: '<strong> '+ content +' </strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            respond.json({result: "Success!"});
        })
        .catch((error) => {
            console.error(error)
            respond.json({result: "Fail!"});
        })
    }

    function getAllRestaurants(request, respond) {

        restaurantsDB.getAllRestaurants(function (error, result) {

            if (error) {

                respond.json(error);

            }

            else {

                respond.json(result);

            }

        });

    }




    module.exports = { getAllRestaurants, sendEmail };