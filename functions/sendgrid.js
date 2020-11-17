const client = require("@sendgrid/mail");
const axios = require("axios");
const { RECAPTCHA_SECRET_KEY, SENDGRID_API_KEY } = process.env;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

function sendEmail(client, message, emailSender, senderName) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: emailSender,
        name: senderName,
      },
      subject: "Rosco serwis - strona, prośba o kontakt",
      to: "k.igielski@roscoserwis.pl",
      html: `${message}`,
    };
    client
      .send(data)
      .then(([response, body]) => {
        fulfill(response);
        console.log("Email sent to sendgrid");
      })
      .catch((error) => {
        console.log("Email couldnt be sent to sendgrid: " + error);
        reject(error);
      });
  });
}

function isHuman(recaptchaToken) {
  return axios
    .post(
      `${RECAPTCHA_VERIFY_URL}?response=${recaptchaToken}&secret=${RECAPTCHA_SECRET_KEY}`
    )
    .then(({ data }) => {
      console.log(data);
      return data.score >= 0.5;
    });
}

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  const recaptchaToken = body.recaptchaToken;
  const emailSender = "RoscoStrona@em2257.roscoserwis.pl";
  const message = `Prośba o kontakt z maila: ${
    body.emailSender
  } <br/> Treść wiadomości: ${body.message}`;
  const senderName = body.senderName;

  console.log(SENDGRID_API_KEY);
  client.setApiKey(SENDGRID_API_KEY);
  console.log(body)
  console.log("Token:" + recaptchaToken);
  if (isHuman(recaptchaToken)) {
    console.log("is human");
    sendEmail(client, message, emailSender, senderName)
      .then((response) => callback(null, { statusCode: response.statusCode }))
      .catch((err) => callback(err, null));
  } else {
    console.log("is bot");
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ status: "Bot detected" }),
    });
  }
};
