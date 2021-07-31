import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Breadcrumb, Tag, Space, message, Row, Col, Modal } from 'antd';
import 'antd/dist/antd.css';
import { CheckCircleTwoTone, CloseCircleTwoTone, ProfileTwoTone } from '@ant-design/icons';

const getTags = (status) => {
    let color;
    if (status === 'Phê duyệt') {
        color = 'green'
    } else if (status === 'Từ chối') {
        color = 'volcano'
    } else color = 'geekblue'
    return (
        <Tag color={color} key={status}>
            {status}
        </Tag>
    )
}

const successConfirm = () => {
    message.success('Phê duyệt đơn thành công!');
};

const successReject = () => {
    message.success('Từ chối đơn thành công!');
};

const ConfirmLeaveRequest = (props) => {
    const [visibleView, setVisibleView] = React.useState(false);
    const [selectedInfo, setSelectedInfo] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '6%',
            align: 'center',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: '12%',
            align: 'center'
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_leave',
            key: 'start_leave',
            width: '15%',
            align: 'center'
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'start_leave',
            key: 'start_leave',
            width: '15%',
            align: 'center'
        },
        {
            title: 'Người phê duyệt',
            dataIndex: 'confirm_person',
            key: 'confirm_person',
            width: '15%',
            align: 'center'
        },
        {
            title: 'Thời gian gửi',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Phê duyệt', value: 'Phê duyệt' },
                { text: 'Chờ phê duyệt', value: 'Chờ phê duyệt' },
                { text: 'Từ chối', value: 'Từ chối' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: status => (
                getTags(status)
            ),
            width: '10%',
            align: 'center'
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <ProfileTwoTone onClick={() => viewLeaveRequest(record.id)} className="iconButton" />
                    <CheckCircleTwoTone className="iconButton" twoToneColor="#52c41a" onClick={() => confirmLeaveRequest(record.id)} style={{ display: isConfirm(record.status) }} />
                    <CloseCircleTwoTone className="iconButton" twoToneColor="#eb2f96" onClick={() => rejectLeaveRequest(record.id)} style={{ display: isConfirm(record.status) }} />
                </Space>
            ),
            width: '10%',
            align: 'center'
        }
    ];

    const handleCancel = () => {
        setVisibleView(false);
    };

    const isConfirm = (status) => {
        if (status !== "Chờ phê duyệt") {
            return "none"
        } else return "inline"
    }

    const viewLeaveRequest = (id) => {
        setVisibleView(true);
        axios.get("/getLeaveRequest", {
            params: {
                id: id
            }
        })
            .then(res => {
                setSelectedInfo([
                    res.data.name,
                    res.data.email,
                    res.data.start_leave,
                    res.data.end_leave,
                    res.data.confirm_person,
                    res.data.status,
                    res.data.created_date,
                    res.data.reason
                ])
                // console.log(res);
            })
    }

    const confirmLeaveRequest = (id, status) => {
        var params = new URLSearchParams();

        params.append("id", id);
        params.append("status", "Phê duyệt");
        axios.post("/updateStatus", params)
            .then(res => {
                props.getAllLeaveRequest();
                successConfirm();
            })
    }

    const rejectLeaveRequest = (id) => {
        var params = new URLSearchParams();

        params.append("id", id);
        params.append("status", "Từ chối");
        axios.post("/updateStatus", params)
            .then(res => {
                props.getAllLeaveRequest();
                successReject();
            })
    }

    useEffect(() => {
    }, []);

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Đơn xin nghỉ phép</Breadcrumb.Item>
                <Breadcrumb.Item>Duyệt đơn</Breadcrumb.Item>
            </Breadcrumb>
            <Modal
                title="Xem thông tin đơn nghỉ phép"
                visible={visibleView}
                width={1000}
                onCancel={handleCancel}
                style={{ marginLeft: "320px" }}
                footer={null}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <label><b>Họ tên người gửi:</b>&nbsp;&nbsp;{selectedInfo[0]}</label>
                        <br />
                    </Col>
                    <Col span={12}>
                        <label><b>Email:</b>&nbsp;&nbsp;{selectedInfo[1]}</label>
                    </Col>
                    <Col span={12} style={{ marginTop: "10px" }}>
                        <label><b>Thời gian nghỉ phép:</b>&nbsp;&nbsp;{selectedInfo[2]} đến {selectedInfo[3]}</label>
                    </Col>
                    <Col span={12} style={{ marginTop: "10px" }}>
                        <label><b>Người duyệt đơn:</b>&nbsp;&nbsp;{selectedInfo[4]}</label>
                    </Col>
                    <Col span={12} style={{ marginTop: "10px" }}>
                        <label><b>Trạng thái:</b>&nbsp;&nbsp;{selectedInfo[5]}</label>
                    </Col>
                    <Col span={12} style={{ marginTop: "10px" }}>
                        <label><b>Ngày tạo đơn:</b>&nbsp;&nbsp;{selectedInfo[6]}</label>
                    </Col>
                    <Col span={24} style={{ marginTop: "10px" }}>
                        <label><b>Lý do:</b>&nbsp;&nbsp;{selectedInfo[7]}</label>
                    </Col>
                </Row>
            </Modal>
            <Table columns={columns} dataSource={props.dataSource} bordered style={{ textAlign: "center" }} />
        </div>

    );
}

export default ConfirmLeaveRequest;