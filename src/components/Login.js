import { useRef, useState } from "react";
import checkValidateData from "../utils/checkValidData";
import Header from "./Header";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  // useRef to create a reference
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef("");

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () =>{

    if(name.current.value ===null) {
        name.current.value = "";
    }
    const message = checkValidateData(email.current.value, password.current.value, name.current.value);

    setErrorMessage(message);

    // if there is any error just return no need to go further
    if(message) return;

    // signIn SignUp Logic
    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value, name.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            // hard coding photo url
            updateProfile(user, {
                displayName: name.current.value, 
                photoURL: "https://avatars.githubusercontent.com/u/54200130?v=4"
              }).then(() => {
                // Profile updated!
                //solving the Bug
                // uid, email, displayName, photoUrl shouldNot come from user, as it is not the updated user, it should come from auth
                // if you extract it from user, user shouldnot have the updated value, so from auth we can get from auth.currentUser as auth is coming from getAuth()
                const {uid, displayName, email, photoURL} = user;
                // after getting the required infos. just update the store
                dispatch(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}));              
                
            }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message)
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });    
    } else {
        // Sign In logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value, name.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+ "-" +errorMessage);
          });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="backGroundImage"
        />
      </div>
      <form onSubmit={(e) => {e.preventDefault()}} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        { !isSignInForm && (<input
          type="text"
          ref={name}
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />)}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <p className="text-red-500 font-bold text-lg py-2">
            {errorMessage}
        </p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg rounded-md" onClick={handleButtonClick}>
        {isSignInForm ? "Sign in" : "Sign up"}
        </button>

        <p onClick={toggleSignInForm} className="cursor-pointer">
        {isSignInForm ? "New to Netflix? Sign up Now" : "Already registered?, Sign in Now"}
            </p>
      </form>
    </div>
  );
};

export default Login;
