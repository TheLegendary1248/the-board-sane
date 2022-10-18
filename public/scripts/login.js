//Placeholder js file for the login page
//TODO Make submit button reflect login or sign up
//TODO Remove name attr on email if logging in.
//FIXME Use consistent coding style
//Just read(and accidental discovery), lack of name attribute does not pass the input into the form
//Naming here could be better
const submitInput = document.getElementById("submit_form")
const header = document.getElementById("header")
const form = document.getElementById("form")
const userShow = document.getElementById("userShow")
let userAvailable = true;

const usernameChecker = {
    userField: document.getElementById("username"),
    //Message boxes
    ok: document.getElementById("user_ok"),
    warn: document.getElementById("user_warn"),
    //Used to cancel API calls if the user has not finished typing
    delayedCall: null,
    //Modifies the message box depending on username availability
    async checkUser()
    {
        //If the field is empty, remove the message box
        if(this.userField.value === "") this.ok.stlye = this.warn.style = "display: none";
        //Otherwise, tell if the username is available
        else
        {
            let get = await fetch("/api/checkUser/" + this.userField.value);
            let res = await get.json()
            console.log(res)
            //TODO Combine warn and ok, they both start with "That username is..."
            if ( !res ) //If available
            {
                this.ok.style = ""
                this.warn.style = "display: none"
                submitInput.disabled = userAvailable = false
            }
            else //Otherwise not
            {
                this.ok.style = "display: none"
                this.warn.style = ""
                submitInput.disabled = userAvailable = true
            }
        }
    },
}

//Add call cancel if user has not finished typing
usernameChecker.userField.oninput = 
() => 
{
    /*
    let val = usernameChecker.userField.value
    if(val !== "") userShow.textContent = " as " + val;
    else userShow.textContent = "" */
    clearTimeout(usernameChecker.delayedCall)
    usernameChecker.delayedCall = setTimeout(() => usernameChecker.checkUser(), 350);
}

//Password Checker
//TODO Warn the user of using weak password(but not required to make it weak)
const passwordChecker = {
    passField: document.getElementById("password"),
    showField: document.getElementById("show_pass"),
    //TODO Create utility toggler function for things like this
    toggleShow() {
        this.passField.type = (this.passField.type == "password" ? "text" : "password")
        this.showField.textContent = (this.passField.type == "password" ? "Show" : "Hide")
    },
    //Not implemented
    //retypeField: document.getElementById("password_re")
}
passwordChecker.showField.onclick = () => passwordChecker.toggleShow()

//Email Checker
const emailChecker = {
    emailField: document.getElementById("email"),
    correctForm() {
        //If Email is empty, hence this is a login
        if(this.emailField.value == "")
        {
            submitInput.value = header.textContent = "Login"
            submitInput.disabled = false 
            form.action = "/api/login"
        }
        //Otherwise, this is a sign up
        else 
        {
            submitInput.value = header.textContent = "Sign Up"
            submitInput.disabled = userAvailable
            form.action = "/api/login/new"
        }
    }
}
emailChecker.emailField.oninput = () => emailChecker.correctForm()