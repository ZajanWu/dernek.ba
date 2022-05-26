import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "lib/constants";
import { useAuth } from "lib/contexts/AuthContext";

function Navigation() {
  const { userData, isLoggedIn } = useAuth();

  return (
    <div className="">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
        }}
        className="bg-yellow-500 text-right text-xl    font-mono px-4"
      >
        <div>{userData?.user?.email && `Hello, ${userData?.user?.email}`}</div>
        <div>
          {!isLoggedIn && (
            <>
              <Link to={ROUTE_PATHS.SIGN_IN}>Sign In</Link> /{" "}
              <Link to={ROUTE_PATHS.SIGN_IN}>Register</Link>
            </>
          )}
          {isLoggedIn && <Link to={ROUTE_PATHS.LOGOUT}>Logout</Link>}
        </div>
      </div>
      <div className="bg-slate-100 items-center justify-center text-2xl font-mono p-4 flex flex-row">
        <div className="navbar-item px-5 py-1 mx-2 flex">
          <Link to={ROUTE_PATHS.HOME}>
            <h3 className="">Home</h3>
          </Link>
        </div>

        <div className="navbar-item px-5 py-1 mx-2 flex">
          <Link to={ROUTE_PATHS.FAVORITES}>
            <h3 className="">Favorites</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
