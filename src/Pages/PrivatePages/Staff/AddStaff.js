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
import { getStaffTypeApi } from '../../../Services/MiscService';
import { setStaffTypeDetailsApi } from '../../../Services/StaffService';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import nepalify from 'nepalify';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddStaff = (props) => {
    const [form] = Form.useForm()
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const StId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            getStaffTypeDetails(StId)
        }
    }, [forEdit, StId])

    const getStaffTypeDetails = (counterId) => {
        setIsButtonLoad(true)
        getStaffTypeApi(res => {
            let edData = {}
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.StId === Number(counterId)) {
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
            "StId": forEdit ? StId : 0,
            "StaffType": values.StaffType,
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setStaffTypeDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate(`/admin/stafftype`)
            } else {
                message.error('Something went wrong. Please try again')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    };

    const onValuesChange = (res) => {
        if(i18n.language && !appDefNep.includes(Object.keys(res)[0]))
        form.setFieldsValue({
            [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Add'} Staff type`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_company"
                            autoComplete="off"
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                        >
                            <Form.Item
                                label="Staff Type"
                                name='StaffType'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Staff Type!',
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

export default AddStaff;