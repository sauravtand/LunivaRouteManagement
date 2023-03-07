import { Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import useToken from '../../CustomHooks/useToken';
import { setResetUserPasswordApi } from '../../Services/UserService';

const ResetPasswordModal = (props) => {
    const { showModal, hideModal, resetOfUserId } = props
    const { TextArea } = Input
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()
    const { token } = useToken()

    const handleSubmit = (res) => {
        if (res.password !== res.RePassword) {
            message.warning('Password doesnt match. Please try again')
            return
        }
        setConfirmLoading(true);
        let data = {
            password: res.password,
            userId: resetOfUserId,
            resetBy: token.Um, //login user id
            remarks: res.remarks
        }
        setResetUserPasswordApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res.Message)
                form.resetFields()
                hideModal(false);
            } else {
                message.error('Something went wrong. Please try again')
            }
            setConfirmLoading(false);
        })
    };

    const handleCancel = () => {
        hideModal(false);
        setConfirmLoading(false);
    };

    const handleFail = () => {
        setConfirmLoading(false)
    }

    return (
        <>
            <Modal
                title="Reset Password"
                visible={showModal}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="reset_password"
                    autoComplete="off"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFail}
                    layout={'vertical'}
                >
                    <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please enter password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="RePassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid Password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="remarks"
                        label="Remarks"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter remarks!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ResetPasswordModal;