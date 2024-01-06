import { useRef, useState } from "react";
import checkValidateData from "../utils/checkValidData";
import Header from "./Header";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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
       
        /**
         * SignUp logic
         *  const auth = getAuth(); to call in once inside our our app, just pasted it in firebase.js    
         * createUserWithEmailAndPassword will take auth, emailId, and Password, 
         * once you called the api it create the user if the response is success and also give the userId and signIn automatically, it not success it will throw the error
         */
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value, name.current.value)
          .then((userCredential) => {
            // Signed In -> it will signedIn me automatically
            const user = userCredential.user;
            console.log(user);
            // ...
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
            // Signed in
            const user = userCredential.user;
            console.log(user)
            // ...
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
