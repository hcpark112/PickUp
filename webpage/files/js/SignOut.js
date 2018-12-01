/**
 * JAVASCRIPT FOR LogIn.html PAGE
 *
 * @author Alec Martin, A01059594
 */
/**
 * FireBase config
 */

/**
 * On load of page make the user sign out
 * used for log in page
 */
window.onload = function(e) {
    firebase.auth().signOut();
    console.log("Signing out...")
};
