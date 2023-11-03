import {
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
} from 'antd';
import useToken from '../../CustomHooks/useToken';
import { useNavigate } from "react-router-dom";
import { getValidLoginApi } from '../../Services/LoginService';
import logoImg from '../../Assets/Images/logo4.png'
import styled from 'styled-components';
import { getCompanyDetailsApi } from '../../Services/MiscService';

const Login = () => {
    const { setToken } = useToken();
    const navigate = useNavigate()

    const onFinish = (values) => {
        getValidLoginApi(values, (res) => {
            getCompanyDetailsApi(comRes => {
                const companyName = comRes.length > 0 ? comRes[0]?.CompanyName : ''

                if (res.length !== 0 && res[0].UId > 0) {
                    const newRes = res[0]
                    const tokenData = {
                        Um: newRes.UId,
                        Hm: newRes.RoleId,
                        UserName: newRes.UserName,
                        CName: companyName
                    }
                    setToken(tokenData)
                    navigate('/admin')
                } else {
                    message.error('Username or password is incorrect!')
                }
            })
            return
        })
    }

    return (
        <LoginContainer>
            <Row type='flex' align='center'>
                <Col>
                    <div className="site-card-border-less-wrapper text-center login_content">

                        <Card bordered={false} className='buttonRadius'>
                            <div className='text-center'>
                                <img src={logoImg} alt="" className='logoImg' />
                            </div>
                            <h2>Login</h2>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Username"
                                        autoFocus={true}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        block
                                    >
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
.ant-row-center {
    position: relative;
}
  
.buttonRadius{
    background: rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2.2px);
    -webkit-backdrop-filter: blur(2.2px);
    border: 1px solid rgba(255, 255, 255, 0.43);
}

.ant-row-center:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.1;
    background: url(${logoImg}) no-repeat center / contain;
}
  
.ant-col {
    position: relative;
}
`