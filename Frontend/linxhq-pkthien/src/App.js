import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { React, useState } from 'react';
import { useEffect } from 'react';
import SignIn from './Page/SignIn';
import firebase from 'firebase';
import Sidebar from './Components/Sidebar'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

const App = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={SignIn}></Route>
                <Route path="/request" component={() => <Sidebar currentUser={currentUser} />}></Route>
            </Switch>
        </Router>
    );
}

export default App;