import { Link } from "react-router";
import MyContainer from "../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

const Signin = () => {
  const [user, setUser] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();

    const email = e.target.email?.value;
    const password = e.target.password?.value;
    console.log("sign-up credentials:", { email, password });

    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed."
      );
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("Signed in Successfully");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("This email is already registered!");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email format!");
        } else if (err.code === "auth/operation-not-allowed") {
          toast.error("Email/password accounts are not enabled!");
        } else if (err.code === "auth/weak-password") {
          toast.error("Password is too weak! Must be at least 6 characters.");
        } else if (err.code === "auth/user-disabled") {
          toast.error("This account has been disabled!");
        } else if (err.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password!");
        } else if (err.code === "auth/missing-password") {
          toast.error("Please enter your password!");
        } else if (err.code === "auth/invalid-credential") {
          toast.error("Invalid login credentials!");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many login attempts. Try again later!");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else if (err.code === "auth/missing-email") {
          toast.error("Please enter your email!");
        } else {
          toast.error("Something went wrong. Please try again!");
          console.error("Firebase Auth Error:", err);
        }
      });
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("Signed in Successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGithubSignin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("Signed in Successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          {/* Left section */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            {user ? (
              <div className="text-center space-y-3">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/88"}
                  className="h-20 w-20 rounded-full mx-auto"
                />
                <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                <p className="text-white/80">{user?.email}</p>
                <button onClick={handleSignOut} className="my-btn">
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignin} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                  Sign In
                </h2>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 bottom-3 cursor-pointer"
                  >
                    {showPass ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>

                <button type="submit" className="my-btn">
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-white/30"></div>
                  <span className="text-sm text-white/70">or</span>
                  <div className="h-px w-16 bg-white/30"></div>
                </div>

                {/* Google Signin */}
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                {/* Github Signin */}
                <button
                  type="button"
                  onClick={handleGithubSignin}
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://www.svgrepo.com/show/448225/github.svg"
                    alt="google"
                    className="h-6"
                  />
                  Continue with GitHub
                </button>

                <p className="text-center text-sm text-white/80 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-pink-300 hover:text-white underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signin;
