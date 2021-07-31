import React, { useEffect, useState } from 'react'
import '../style/style.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'antd/dist/antd.css';

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/request',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

const SignIn = () => {
    return (
        <div className="login-form">
            <img className="login-element" src="https://i.pinimg.com/originals/e5/6b/84/e56b841924ac729935e858cb59535fb7.png" width="100px"></img>
            <h3 style={{ marginBottom: "40px" }}>Đăng nhập bằng tài khoản Google</h3>

            <StyledFirebaseAuth className={firebase} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}

export default SignIn;