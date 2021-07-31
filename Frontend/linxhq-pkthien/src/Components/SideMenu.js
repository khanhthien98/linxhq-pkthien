import { Layout, Menu, Avatar, Row, Col } from 'antd';
import {
    SolutionOutlined,
    UnorderedListOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
            {/* <div className="logo" /> */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
                    <span>Tạo đơn nghỉ phép</span>
                    <Link to='/request/create' />
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                    <span>Xem đơn nghỉ phép</span>
                    <Link to='/request/view' />
                </Menu.Item>
                <Menu.Item key="3" icon={<SolutionOutlined />}>
                    <span>Duyệt đơn nghỉ phép</span>
                    <Link to='/request/confirm' />
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideMenu;