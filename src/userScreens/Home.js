import { Button } from "@mui/material"

const Home = (prop) => {
console.log(prop)
    return (
        <div>
        <h1>Hello User</h1>
        <Button variant="contained" onClick={()=>prop.SIGNOUT()} >Sign Out</Button>
        </div>
    )
}
export default Home
