//This object purpose lies in eliminating using the wrong string when grabbing the intended values from local storage
//TODO Automate this boilerplate for funsies
const LocalStore = {
    /**The time of when the user's profile data on this machine was last updated */
    get userprofileUpdateTime() { return localStorage.getItem('User Profile Update Timestamp') },
    set userprofileUpdateTime(val) { localStorage.setItem('User Profile Update Timestamp', val)},
    /**The username of the account*/
    get username() { return localStorage.getItem('Username')},
    set username(val) { localStorage.setItem('Username', val)},
    /**Set the user's profile data all together */
    set userprofile(val) { throw "Not Implemented" }
}
Object.freeze(LocalStore)
export default LocalStore