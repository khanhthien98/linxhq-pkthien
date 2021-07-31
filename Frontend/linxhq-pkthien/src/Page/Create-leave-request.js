import { message, Form, Input, DatePicker, Button, Breadcrumb, Layout } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

const { RangePicker } = DatePicker;

const validateMessages = {
    required: 'Thiếu thông tin ${label}!',
};

const success = () => {
    message.success('Tạo mới đơn nghỉ thành công!');
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

const CreateLeaveRequest = (props) => {
    const onFinish = (values) => {
        console.log(values);

        axios.post("/new", {
            name: values.name,
            email: props.currentUser.email,
            start_leave: values.fromDate[0].format("DD/MM/YYYY HH:mm:ss"),
            end_leave: values.fromDate[1].format("DD/MM/YYYY HH:mm:ss"),
            reason: values.reason,
            confirm_person: values.confirm_person,
            created_date: getDatetimeNow()
        }).then(res => {
            props.getAllLeaveRequest();
            success();
        })
    };

    useEffect(() => {
        // alert(getDatetimeNow());
    })

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Đơn xin nghỉ phép</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
            </Breadcrumb>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={'name'}
                    label="Họ tên người gửi"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'fromDate'}
                    label="Thời gian nghỉ phép"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <RangePicker showTime format="DD/MM/YYYY HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    name={'reason'}
                    label="Lí do nghỉ phép"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name={'confirm_person'}
                    label="Người duyệt đơn"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" htmlType="submit" size="large" style={{ width: "150px" }}>
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateLeaveRequest;

