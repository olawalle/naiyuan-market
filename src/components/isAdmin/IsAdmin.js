import React, { useContext, useEffect } from "react";
import { appContext } from "../../store/appContext";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

export default withRouter(function IsAdmin({ history, children }) {
  const context = useContext(appContext);
  const { user } = context;
  const isAdmin = user.rolevalue === "superadmin";
  useEffect(() => {
    !isAdmin && history.push("/dashboard/");
  }, []);

  return <div>{isAdmin && { ...children }}</div>;
});
