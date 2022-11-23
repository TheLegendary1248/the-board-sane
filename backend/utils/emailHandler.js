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
    creationTime: null,
}
//Function to get token 
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

//Exported functions
async function SendMail(recipient, subject, html) {
    console.log("Sending mail")
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
        console.log(error);
        return null;
    }
}

module.exports = { SendMail };