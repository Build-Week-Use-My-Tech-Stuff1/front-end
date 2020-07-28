import React from "react";
import { useTimeMessage } from "../../hooks/useTimeMessage";
import '../styles/dashboard.css'
import { Card } from '@material-ui/core'

const Dashboard = (props) => {
  const [greet] = useTimeMessage("Good Morning", "Good Afternoon");

  return (
    <div className="dashboard">
      <Card className="welcome">
        <h2>{greet}</h2>
      </Card>
      <div>DIV FOR ADDING TO RENTAL</div>
      <div>DIV FOR DISPLAYING CURRENT RENTALS</div>
    </div>
  );
};

export default Dashboard;
