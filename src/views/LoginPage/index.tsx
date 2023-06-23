import React from 'react';
import { Form, Input, Button } from 'antd';
import { IUser } from '../../types';
import { useAppDispatch } from '../../hooks/useStore';
import { login } from '../../api/user';
import { setAxiosToken } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = async (values: IUser) => {
        try {
            console.log('Received values:', values);
            const { payload } = await dispatch(login(values))
            setAxiosToken(payload.token);
            navigate('/dashboard');
        } catch (error) {
            //   
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Logo</h1>
            <Form
                name="login"
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your username',
                        },
                    ]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;