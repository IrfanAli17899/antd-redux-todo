import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import axios from '../api/axios';
import { Spin } from 'antd';
import { userActions } from '../store/slices/userSlice';

const withAuthGuard = (WrappedComponent: any) => {
    return function WithAuthGuard(props: any) {
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const token = useAppSelector((store) => store.user.token)
        const dispatch = useAppDispatch();

        const verifyToken = async () => {
            try {
                // If token exists, authenticate it
                if (token) {
                    // Replace 'verify-api' with the actual endpoint to verify the token
                    await axios.get('verify-token', { params: { token } })
                } else {
                    throw new Error('Token not found');
                }
            } catch (error) {
                localStorage.removeItem('token');
                dispatch(userActions.clear());
                navigate('/login');
            } finally {
                setLoading(false);
            }
        }
        useEffect(() => {
            verifyToken();
        }, [pathname, token]);

        if (loading) {
            return <div style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        }

        // Render the wrapped component if the authentication is successful
        return <WrappedComponent {...props} />;
    };
};

export default withAuthGuard;