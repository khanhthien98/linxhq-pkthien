import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, DatePicker, Form, Input, Button, Modal, message, Table, Breadcrumb, Space, Tag, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import { EditTwoTone, DeleteTwoTone, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

const validateMessages = {
    required: 'Thiếu thông tin ${label}!',
};

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 16,
    },
};

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

const success = () => {
    message.success('Xoá đơn nghỉ thành công!');
};

const successEdit = () => {
    message.success('Sửa thông tin đơn thành công!');
};

const getDatetimeNow = () => {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var hour = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
    var time = hour + ":" + minute + ":" + second;
    return date + ' ' + time;
}

const ViewLeaveRequest = (props) => {
    const [dataSource, setDataSource] = useState([{}]);
    const [idSelect, setIdSelect] = useState();
    const [formEdit] = Form.useForm();
    const [selectedInfo, setSelectedInfo] = useState([]);
    const [visibleEdit, setVisibleEdit] = React.useState(false);

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
            // sorter: (a, b) => a.active - b.active,
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
            align: 'center'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                getTags(status)
            ),
            width: '10%',
            align: 'center'
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EditTwoTone onClick={() => editLeaveRequest(record.id)} className="iconButton" />
                    <Popconfirm title="Bạn có thực sự muốn xoá?" onConfirm={() => handleDelete(record.id)} okText="Xác nhận" cancelText="Huỷ">
                        <DeleteTwoTone twoToneColor="#eb2f96" className="iconButton" />
                    </Popconfirm>
                </Space>
            ),
            width: '10%',
            align: 'center'
        }
    ];

    const handleCancel = () => {
        setVisibleEdit(false);
    };

    const handleDelete = (id) => {
        var params = new URLSearchParams();

        params.append("id", id);
        axios.post("/delete", params)
            .then(res => {
                props.getAllLeaveRequest();
                success();
            })

    };

    const getAllPersonalLeaveRequest = () => {
        axios.get("/getPersonalList", {
            params: {
                email: props.currentUser.email
            }
        })
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

    const editLeaveRequest = (id) => {
        setVisibleEdit(true);
        setIdSelect(id);
        axios.get("/getLeaveRequest", {
            params: {
                id: id
            }
        })
            .then(res => {
                formEdit.setFieldsValue({
                    nameEdit: res.data.name,
                    formDateEdit: [moment(res.data.start_leave, "DD/MM/YYYY HH:mm:ss"), moment(res.data.end_leave, "DD/MM/YYYY HH:mm:ss")],
                    confirmPersonEdit: res.data.confirm_person,
                    reasonEdit: res.data.reason
                });

                setSelectedInfo([res.data.email, res.data.status, res.data.created_date])
            })


    }

    const onFinishEdit = (values) => {
        console.log(values.formDateEdit[0]._i);
        var params = new URLSearchParams();

        params.append("id", idSelect);
        params.append("name", values.nameEdit);
        params.append("start_leave", values.formDateEdit[0]._i);
        params.append("end_leave", values.formDateEdit[1]._i);
        params.append("reason", values.reasonEdit);
        params.append("confirm_person", values.confirmPersonEdit);
        params.append("created_date", getDatetimeNow());

        axios.post("/updateLeaveRequest", params).then(res => {
            getAllPersonalLeaveRequest();
            props.getAllLeaveRequest();
            successEdit();
            setVisibleEdit(false);
        })
    };

    useEffect(() => {
        getAllPersonalLeaveRequest();
    }, []);

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Đơn xin nghỉ phép</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
            </Breadcrumb>
            <Modal
                title="Sửa thông tin đơn nghỉ phép"
                visible={visibleEdit}
                width={1100}
                onCancel={handleCancel}
                style={{ marginLeft: "320px" }}
                footer={null}
            >
                <Form
                    form={formEdit}
                    onFinish={onFinishEdit}
                    validateMessages={validateMessages}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name={'nameEdit'}
                                label="Họ tên người gửi"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <label>Email:&nbsp;&nbsp;{selectedInfo[0]}</label>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={'formDateEdit'}
                                label="Thời gian nghỉ phép"
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <RangePicker
                                    showTime={{ format: "HH:mm:ss" }}
                                    format="DD/MM/YYYY HH:mm:ss"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={'confirmPersonEdit'}
                                label="Người duyệt đơn"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <label>Trạng thái:&nbsp;&nbsp;{selectedInfo[1]}</label>
                        </Col>
                        <Col span={12}>
                            <label>Ngày tạo đơn:&nbsp;&nbsp;{selectedInfo[2]}</label>
                        </Col>
                        <Col span={24} style={{ marginTop: "25px" }}>
                            <Form.Item
                                name={'reasonEdit'}
                                label="Lí do nghỉ phép"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" disabled={selectedInfo[1] === "Chờ phê duyệt" ? false : true}>
                                <SaveOutlined />Lưu
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={dataSource} bordered style={{ textAlign: "center" }} />
        </div >

    );
}

export default ViewLeaveRequest;