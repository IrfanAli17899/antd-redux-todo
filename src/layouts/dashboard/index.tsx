import React from 'react'
import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import './index.css';
import withAuthGuard from '../../guards/AuthGuard';

const { Header, Content, Footer, Sider } = Layout;

function DashboardLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const routes = [
        {
            icon: <HomeOutlined />,
            label: "Home",
            key: '/dashboard',
            onClick: () => {
                navigate('/dashboard');
            }
        },
        {
            icon: <EditOutlined />,
            label: "Todos",
            key: '/dashboard/todos',
            onClick: () => {
                navigate('/dashboard/todos');
            }
        }
    ]
    const selectedRoute = routes.find(route => route.key === pathname);

    return (
        <Layout style={{ height: '100%' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selectedRoute?.key || '']}
                    items={routes}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default withAuthGuard(DashboardLayout);