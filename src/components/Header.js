import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
        const user = useSelector(store => store.user);

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
 * 
 *  I don't want to call this api again and again, I want to call this api only once after my component renders
    why we are doing this? we are doing this to check authentication and setting up our store
 * Also, now header is inside my route Provider, so useNavigate will work now.. my auth State change will take care of everything now
 * It will check auth everytime, when will the auth status change it will automatically redirect us accordingly
*/
    
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // i can get alot more things from user, like uid, displayName, emailId
      const { uid, displayName, email, photoURL } = user;
      // after getting the required infos. just update the store
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );
      navigate("/browse");
    } else {
      // User is signed out
      dispatch(removeUser()); // not passing anything bcoz it doesn't take care of any action
      navigate("/");
    }
  });
}, []);

    const handleSignOut =()=>{
        signOut(auth).then(() => {
          }).catch((error) => {
            navigate("/error");
          });
    }
    return <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between"> 
        <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
        alt="logo" />
        {user && (<div className="p-2">
            {/* <img
                className="w-12 h-12"
                src="https://occ-0-6502-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                alt="signInLogo"
            /> */}
            <img 
                className="w-16 h-16"
                src={user.photoURL} alt="photoUrl"
            />
            <label>{console.log(user)}</label>
            <button className="font-bold text-white" onClick={handleSignOut}>
                Sign out
            </button>
        </div>)
        }   
    </div>
}

export default Header;