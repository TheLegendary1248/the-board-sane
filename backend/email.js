//Courtesy aspirin by Fusebit 
//https://fusebit.io/blog/gmail-api-node-tutorial/
const axios = require("axios");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const googleApiUrl = 'https://gmail.googleapis.com/gmail/v1/users';
//CONFIGURATION
//Instantiate client
const oAuth2Client = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });
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
    //Get a new transport if it's been longer than a minute
    console.log(new Date() - transport.creationTime)
    if (!transport.creationTime ? true : (new Date() - transport.creationTime > 60000)) {
        console.log("Generating new token");
        let token = await oAuth2Client.getAccessToken();
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
        return;
        const result = await transporter.sendMail(options);
        console.log(result)
    } catch (error) {
        console.log(error);
    }
}
module.exports = { SendMail };
//Unused
async function General() {
    console.log("HELLO!")
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${process.env.MAIL_EMAIL}/profile`;
        const { token } = await oAuth2Client.getAccessToken();
        //const token = await getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
}
const generateConfig = (url, token) => {
    return {
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${token} `,
            "Content-type": "application/json",
        },
    };
};