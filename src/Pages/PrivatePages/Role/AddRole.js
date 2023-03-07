import {
    Button,
    Form,
    Input,
    Switch,
    Row,
    Col,
    Card,
    message
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { GoBack } from '../../../Components/Common/GoBack';
import { getRoleDetailsApi } from '../../../Services/MiscService';
import { setRoleTypeDetailsApi } from '../../../Services/RoleService';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';

const AddRole = (props) => {
    const [form] = Form.useForm()
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const RId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)

    useEffect(() => {
        if (forEdit) {
            getRoleTypeDetails(RId)
        }
    }, [forEdit, RId])

    const getRoleTypeDetails = (counterId) => {
        setIsButtonLoad(true)
        getRoleDetailsApi(res => {
            let edData = {}
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.RId === Number(counterId)) {
                    let newData = {
                        ...element,
                    }
                    edData = newData
                    break
                }
            }
            setPrevVal(edData)
            setIsButtonLoad(false)
        })
    }

    useEffect(() => {
        if (prevVal !== {})
            form.resetFields()
    }, [prevVal, form])

    const onFinish = (values) => {
        setIsButtonLoad(true)
        setButDis(true)
        let data = {
            "RId": forEdit ? RId : 0,
            "RoleType": values.RoleType,
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setRoleTypeDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate(`/admin/roletype`)
            } else {
                message.error('Something went wrong. Please try again')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    };

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Add'} Role Type`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_company"
                            autoComplete="off"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Role Type"
                                name='RoleType'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Role Type!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item >

                            <Form.Item
                                name="IsActive"
                                label="Is Active"
                                valuePropName="checked"
                            >
                                <Switch
                                    defaultChecked
                                />
                            </Form.Item>
                            <Form.Item
                                {...buttonTailLayout}
                            >
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    disabled={butDis}
                                    loading={isButtonLoad}
                                >
                                    {
                                        forEdit ? 'Edit' : 'Save'
                                    }
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>

                </Row>
            </Card>
        </div>
    );
};

export default AddRole;