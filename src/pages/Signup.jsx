import { Link, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

import MyContainer from "../components/MyContainer";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signOutFunc,
    setUser,
  } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault();

    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed."
      );
      return;
    }

    // create User
    createUserWithEmailAndPasswordFunc(email, password)
      .then(() => {
        // update profile
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            // email varification
            sendEmailVerificationFunc()
              .then(() => {
                setLoading(false);
                signOutFunc()
                  .then(() => {
                    toast.success("Check your email to varify your account.");
                    setUser(null);
                    navigate('/signin')
                  })
                  .catch((e) => {
                    toast.error(e.message);
                  });
              })
              .catch((e) => {
                toast.error(e.message);
              });
          })
          .catch((e) => {
            toast.error(e.message);
          });
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

  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="enter your photo url"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 bottom-3 cursor-pointer"
                >
                  {showPass ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signup;
