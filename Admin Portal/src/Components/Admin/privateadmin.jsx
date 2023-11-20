import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const PrivateAdmin = ({ component: Component, ...rest }) => {
  const [check, setCheck] = useState(true);
  const [valid, setValid] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(Cookies.get("seshR"),process.env.REACT_APP_SUPER_ROLE)
    if (Cookies.get("seshR")==process.env.REACT_APP_SUPER_ROLE) {
        setCheck(false);
        setValid(true);
        setLoading(false);
      } else {
        setCheck(false);
        setValid(false);
        setLoading(false);
      }
  }, []);

  if (loading) {
    // Render the TailSpin loader here
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

export default PrivateAdmin;
