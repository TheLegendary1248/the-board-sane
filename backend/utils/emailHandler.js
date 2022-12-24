//Courtesy aspirin by Fusebit 
//https://fusebit.io/blog/gmail-api-node-tutorial/
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

//CONFIGURATION
//Instantiate OAuth2 Client
const authClient = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.REDIRECT_URI
);
authClient.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

//Auth used for sending mail
const auth = {
    type: 'OAuth2',
    user: process.env.MAIL_EMAIL,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
}

//Create a global transporter object, refreshed every minute for a new access token
const transport = {
    value: null,
    creationTime: new Date(0),
}

/**
 * Gets a transport, whether an old one or a fresh one as needed
 * @returns {nodemailer.Transporter<SMTPTransport.SentMessageInfo>} The transporter object
 */
async function GetTransport() {
    //Create a new transport if it's been longer than a minute
    if (!transport.creationTime ? true : (new Date() - transport.creationTime > 60000)) {
        let token = await authClient.getAccessToken();
        let newTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...auth,
                accessToken: token,
            },
        })
        transport.value = newTransport;
        transport.creationTime = new Date()
        return newTransport;
    }
    //Else return the existing one
    else return transport.value;
};

/**
 * Sends mail to the recipient with the given subject and html. 
 * Environment variable SENDMAIL determines if this function runs it's logic.
 * @param {string} recipient The recipient's email
 * @param {string} subject The subject of the email
 * @param {string} html The HTML file sent as the email body
 * @returns {Promise<SMTPTransport.SentMessageInfo>} Nodemailer sent message info
 */
async function SendMail(recipient, subject, html) {
    if(process.env.SENDMAIL)
    {
        console.log("Email Handler / Sending Email to:".cyan, recipient)
        try {
            const options = {
                from: "The Board",
                subject,
                html,
                to: recipient,
            }
            let transporter = await GetTransport();
            return await transporter.sendMail(options);
        } catch (error) {
            if(error.message === "invalid_grant") console.log("REFRESH MAILER TOKEN".bold.brightRed)
            else console.log("Email Handler / Error Sending Email:".red, error.message);
            return null;
        }
    }
    else {
        console.log("Email Handler / NOT Sending Email to:".yellow, recipient)
    }
    
}

module.exports = { SendMail };