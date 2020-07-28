import React, {useEffect, useState}  from "react";
import { useTimeMessage } from "../../hooks/useTimeMessage";
import {axiosWithAuth } from '../../utils/axiosWithAuth'

import '../styles/dashboard.css'
import { Card } from '@material-ui/core'



const Dashboard = (props) => {
  const [greet] = useTimeMessage("Good Morning", "Good Afternoon");
  const [userDetails, setUserDetails] = useState("")

  useEffect(() => {
    const loggedID = localStorage.getItem("id");
        axiosWithAuth()
            .get(`https://bw-usemytechstuff.herokuapp.com/api/users/${loggedID}`)
            .then(res => {
                console.log(res);
                setUserDetails(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    

}, [])

  return (
    <div className="dashboard">
      <Card className="welcome">
        <h2>{`${greet}, ${userDetails.firstName}`}</h2>
      </Card>
      <div>DIV FOR ADDING TO RENTAL</div>
      <div>DIV FOR DISPLAYING CURRENT RENTALS</div>
    </div>
  );
};

export default Dashboard;
