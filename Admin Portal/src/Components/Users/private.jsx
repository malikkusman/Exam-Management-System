import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const PrivateUser = ({ component: Component, ...rest }) => {
  const [check, setCheck] = useState(true);
  const [valid, setValid] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function checker() {
      try {
        // const response = await fetch(
        //   `http://localhost:4000/useruuid?seshuser=${Cookies.get("seshU")}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "api-key": process.env.REACT_APP_API_KEY,
        //     },
        //   }
        // );

        // if (!response.ok) {
        //   console.log("error");
        // }

        // const data = await response.json();
        const data = {
          message:"user"
        }

        if (data.message === "user") {
          setCheck(false);
          setValid(true);
        } else if (data.message === "invalid") {
          setCheck(false);
          setValid(false);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    checker();
  }, []);

  if (loading) {
    return (
      <div className="centered-container">
        <TailSpin color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        valid ? <Component {...props} /> : <Redirect to="/404" />
      }
    />
  );
};

export default PrivateUser;
