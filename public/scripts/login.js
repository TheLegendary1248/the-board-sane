//Placeholder js file for the login page
//Add small delay

const usernameChecker = {
    userField: document.getElementById("username"),
    ok: document.getElementById("user_ok"),
    warn: document.getElementById("user_warn"),
    delayedCall: null,
    async checkUser()
    {
        if(this.userField.value === "") //If the field is empty
        {
            this.ok.stlye = "display: none"; this.warn.style = "display: none";
        }
        else
        {
            let get = await fetch("/api/checkUser/" + this.userField.value);
            let res = await get.json()
            console.log(res)
            if ( !res ) //If available
            {
                this.ok.style = ""
                this.warn.style = "display: none"
            }
            else //Otherwise not
            {
                this.ok.style = "display: none"
                this.warn.style = ""
            }
        }
    },
}

usernameChecker.userField.oninput = 
() => 
{
    clearTimeout(usernameChecker.delayedCall)
    usernameChecker.delayedCall = setTimeout(() => usernameChecker.checkUser(), 350);
}

//Password Checker
const passwordChecker = {
    passField: document.getElementById("password"),
    retypeField: document.getElementById("")
}

//Email Checker
/* */

