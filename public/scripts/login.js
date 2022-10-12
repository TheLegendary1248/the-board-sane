//Placeholder js file for the login page

async function checkUser()
{
    console.log("Run")
    console.log(await fetch(window.location.hostname + "/api/login/checkUser"))
}