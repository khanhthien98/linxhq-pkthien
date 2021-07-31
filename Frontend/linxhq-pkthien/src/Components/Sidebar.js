import { Layout, Menu, Avatar, Row, Col } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import CreateLeaveRequest from '../Page/Create-leave-request';
import ViewLeaveRequest from '../Page/View-leave-request';
import ConfirmLeaveRequest from '../Page/Confirm-leave-request';
import { useEffect } from 'react';
import SideMenu from './SideMenu';
import firebase from 'firebase';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const Sidebar = (props) => {
    const history = useHistory();
    const [dataSource, setDataSource] = useState([{}]);

    const logOut = () => {
        firebase.auth().signOut();
        history.push("/login")
    }

    const getAllLeaveRequest = () => {
        axios.get("/list")
            .then(res => {
                let dt = res.data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        start_leave: item.start_leave,
                        end_leave: item.end_leave,
                        reason: item.reason,
                        status: item.status,
                        confirm_person: item.confirm_person,
                        created_date: item.created_date,
                    }
                });
                setDataSource(dt);
            })
    }

    useEffect(() => {
        getAllLeaveRequest();
    }, [])

    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row>
                    <Col span={22} style={{ color: "#fff", textAlign: "right" }}>
                        {props.currentUser && props.currentUser.displayName}
                    </Col>
                    <Col span={1} style={{ textAlign: "center" }}>
                        <Avatar
                            className="avatar"
                            size="large"
                            src={props.currentUser && props.currentUser.photoURL}
                            onClick={logOut} />
                    </Col>
                </Row>
            </Header>
            <Layout style={{ minHeight: "100vh" }}>
                <Router>
                    <SideMenu />
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Redirect exact from="/request" to="/request/create" />
                            <Route
                                path="/request/create"
                                component={() => <CreateLeaveRequest
                                    currentUser={props.currentUser}
                                    getAllLeaveRequest={getAllLeaveRequest}
                                />}>
                            </Route>
                            <Route
                                path="/request/view"
                                component={() => <ViewLeaveRequest
                                    currentUser={props.currentUser}
                                    getAllLeaveRequest={getAllLeaveRequest}
                                />}>
                            </Route>
                            <Route
                                path="/request/confirm"
                                component={() => <ConfirmLeaveRequest
                                    dataSource={dataSource}
                                    getAllLeaveRequest={getAllLeaveRequest}
                                />}>
                            </Route>
                        </Switch>
                    </Content>
                </Router>
            </Layout >
        </Layout>
    );
}

export default Sidebar;