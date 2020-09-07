const client = require("@sendgrid/mail");

function sendEmail(client, message, emailSender, senderName) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: emailSender,
        name: senderName,
      },
      subject: "Rosco serwis - strona, prośba o kontakt",
      to: "adriantest@roscoserwis.pl",
      html: `<br/>Wiadomość: ${message}`,
    };
    console.log("sending email");
    client
      .send(data)
      .then(([response, body]) => {
        console.log("email sent sucessfully");
        fulfill(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

exports.handler = function(event, context, callback) {
  const { SENDGRID_API_KEY } = process.env;

  const body = JSON.parse(event.body);
  const emailSender = "RoscoStrona@em2257.roscoserwis.pl";
  const message =
    `Prośba o kontakt z maila: ${body.emailSender} ` + body.message;
  const senderName = body.senderName;

  client.setApiKey(SENDGRID_API_KEY);

  sendEmail(client, message, emailSender, senderName)
    .then((response) => callback(null, { statusCode: response.statusCode }))
    .catch((err) => callback(err, null));

  sendEmail(client, message, "RoscoStrona@.roscoserwis.pl", senderName)
    .then((response) => callback(null, { statusCode: response.statusCode }))
    .catch((err) => callback(err, null));
};
