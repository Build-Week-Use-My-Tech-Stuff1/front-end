import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { useTimeMessage } from "../../hooks/useTimeMessage";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import PrivateRoute from "../../utils/PrivateRoute";

import Collection from "../Collection";
import ItemsOverview from "../ItemsOverview"
import CreateListing from '../createListing'
import DashNav from "./DashNav";
import "../styles/dashboard.css";
import { Card } from "@material-ui/core";

const Dashboard = (props) => {
  const [greet] = useTimeMessage("Good Morning", "Good Afternoon");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const loggedID = localStorage.getItem("id");
    //grabs users info
    axiosWithAuth()
      .get(`https://bw-usemytechstuff.herokuapp.com/api/users/${loggedID}`)
      .then((res) => {
        console.log(res);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard">
      <DashNav />
      <Router>
        <PrivateRoute>
          <Card className="welcome">
            <h2>{`${greet}, ${userDetails.firstName}`}</h2>
          </Card>
        </PrivateRoute>
        <PrivateRoute path="/dashboard/collection">
          <Collection />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/collection/overview">
          <ItemsOverview />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/list">
          <CreateListing />
        </PrivateRoute>
      </Router>
    </div>
  );
};

export default Dashboard;
