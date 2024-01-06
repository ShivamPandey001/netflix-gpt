import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path : "/browse",
            element: <Browse/>
        }
    ])

    // I don't want to call this api again and again, I want to call this api only once after my component renders
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            // i can get alot more things from user, like uid, displayName, emailId
                const {uid, displayName, email, photoURL} = user;
              // after getting the required infos. just update the store
                dispatch(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}));
            } else {
              // User is signed out
                dispatch(removeUser()); // not passing anything bcoz it doesn't take care of any action
            }
          });
    },[])
/**
 * Recap
 * why did we useEffect,bcoz I want to do this once i want to setup this kind of event listner only once, so using useEffect along with []
 * one more Imp thing, whenever any user signIn or signUp,the below part will be executed 
 * if (user) {
        const {uid, displayName, email} = user;
        dispatch(addUser({uid: uid, email:email, displayName:displayName}))
    }
 * and if user signed out the below part will be executed
    else {
        dispatch(removeUser()); // not passing anything bcoz it doesn't take care of any action
    }
 *   I can control everything from one place 
 *   So as soon as my userSignIn or signOut, we want to reDirect that user to browser page, so can use UseNavigate() hook 
*/
    return <div>
           <RouterProvider router = {appRouter}/>
        </div>
}

export default Body;