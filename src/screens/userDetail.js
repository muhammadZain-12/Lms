import { useLocation } from "react-router-dom"

function UserDetail () {

    const Location = useLocation()
const data = Location.state
console.log(data)

let Emails = data.map((e,i)=>{
     return  <div>
        {e.email}
    </div>
})

    return (
        <div>
        <h1>Hello User Detail</h1>
        {Emails}
        </div>
    )
}

export {UserDetail}