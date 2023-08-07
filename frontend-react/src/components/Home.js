import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  let imageUrl = null;

  if (user && user.profilePic) {
    imageUrl = `data:image/png;base64,${user.profilePic}`;
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <h1 className="text-center p-2"> Welcome to Dashboard </h1>
        <div className="text-center">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
      <div>
        {user && (
          <div>
            <div className="user-card">
              <div>
                {" "}
                {imageUrl && (
                  <img
                    className="user-img"
                    src={imageUrl}
                    alt="ProfilePicture"
                  />
                )}
              </div>
              <div>
                <h2 className="user-name text-center">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="user-email text-center">{user.email}</p>
                <p className="user-mobile text-center"> {user.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
