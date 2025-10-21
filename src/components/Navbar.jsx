import { Link } from "react-router";
import logo from "../assets/img/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const Navbar = () => {
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("Signed out successfully");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-[55px]" />
        </figure>
        <ul className="flex items-center gap-2">
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/about-us"}>About US</MyLink>
          </li>
          {user && (
            <li>
              <MyLink to={"/profile"}>Profile</MyLink>
            </li>
          )}
        </ul>

        {loading ? (
          <FadeLoader color="violet" />
        ) : user ? (
          <div>
            <button
              className="cursor-pointer hover:scale-105 transition"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" }}
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/88"}
                className="h-12 rounded"
              />
            </button>

            <ul
              className="dropdown dropdown-end bg-base-100 shadow-sm p-2 rounded-lg space-y-1 text-right"
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
              }
            >
              <li>
                <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
              </li>
              <li>
                <p className="text-white/80">{user?.email}</p>
              </li>
              <li>
                <button onClick={handleSignOut} className="my-btn">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            <Link to={"/signin"}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
