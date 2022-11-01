import app from "./FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase,ref,set,push,update, onValue } from "firebase/database";
const database = getDatabase(app);
const auth = getAuth(app)



const signUpUser = (obj) => {
    let {email,password,firstName,lastName} = obj
    console.log(email,password)
 return new Promise ( (resolve,reject)=>
    createUserWithEmailAndPassword(auth, email, password).then((success)=>{
    console.log(success,"success")
    const {user} = success
    if(user.email=="bilal@gmail.com"){
        const reference = ref(database,`users/${user.uid}`)
        obj.isCAdmin = true
        delete obj.password
         set(reference,obj).then(()=>{
             resolve("data is successfully submitted")
         })
         .catch(()=>{
             reject("data is successfully submitted")
         })    
    }
    else{
        const reference = ref(database,`users/${user.uid}`)
        delete obj.password
         set(reference,obj).then(()=>{
             resolve("data is successfully submitted")
         })
         .catch(()=>{
             reject("data is successfully submitted")
         })
    }
    
 })
 .catch((error)=>{
    console.log(error)
 })
 )
}

const signInUser = (obj) => {
    
    let {email,password} = obj
    
   return new Promise ((resolve,reject)=>
   signInWithEmailAndPassword(auth, email, password).then((success)=>{
    const {user} = success
    const reference = ref(database,`users/${user.uid}`)
    onValue(reference,(e)=>{
        const status = e.exists()
    
        if(status){
            
        resolve({...e.val(),uid:user.uid})
            
        }
        else{
            reject("Data Not Found")
        }
        
    }

    )

    


   })
   .catch((error)=>{
    console.log(error)
   })
   )
}  


export {signUpUser,signInUser}

