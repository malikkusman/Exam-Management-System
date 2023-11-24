import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [check, setCheck] = useState(true);
  const [valid, setValid] = useState();

  useEffect(() => {
    async function checker() {
      try {
        const tokenData={
          token:Cookies.get("token")
        }
        const response = await fetch(`http://localhost:4000/user/authentication?token=${Cookies.get("token")}`, {
          method: "GET",
        });

        if (!response.ok) {
          window.location.href = "/";
        }

        const data = await response.json();

        if (data.message === "valid") {
          setCheck(false);
          setValid(true);
        } else if(data.message=="invalid") {
          setCheck(false);
          setValid(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checker();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        check ? null : valid ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;