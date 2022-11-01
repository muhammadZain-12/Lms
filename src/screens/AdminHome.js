import { getAuth } from "firebase/auth";
import app from "../config/FirebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
const auth = getAuth(app)

function AdminHome () {

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log("sign Out")

            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }


    return (
        <div>
        <h1>
        Hello Admin
    </h1>
    <Button onClick={SignOut} variant="contained" >SignOut </Button>
    </div>
    )
}
export default AdminHome

