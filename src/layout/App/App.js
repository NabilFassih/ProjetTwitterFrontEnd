import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "../../components/Home";
import AdminPage from "../../components/Admin";
import Signup from '../../components/Signup';
import User from '../../components/User';
import Profile from '../../components/Profile';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/admin">
                        <AdminPage />
                    </Route>
                    <Route exact path="/user">
                        <User />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
