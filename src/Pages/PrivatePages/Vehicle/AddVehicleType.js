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
import { getVehicleTypeDetailsApi } from '../../../Services/MiscService';
import { setVehicleTypeDetailsApi } from '../../../Services/VehicleService';
import nepalify from 'nepalify';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddVehicleType = (props) => {
    const [form] = Form.useForm()
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const VId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            getVehicleTypeDetails(VId)
        }
    }, [forEdit, VId])

    const getVehicleTypeDetails = (counterId) => {
        setIsButtonLoad(true)
        getVehicleTypeDetailsApi(res => {
            let edData = {}
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.VId === Number(counterId)) {
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
            "VId": forEdit ? VId : 0,
            "VechicleType": values.VechicleType,
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setVehicleTypeDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate(`/admin/vehicletype`)
            } else {
                message.error('Something went wrong. Please try again')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    };

    const onValuesChange = (res) => {
        if(i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
        form.setFieldsValue({
            [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Add'} Vehicle Type`} bordered={false} extra={<GoBack />}>
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
                                label="Vehicle Type"
                                name='VechicleType' 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Vehicle Type!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

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

export default AddVehicleType;