import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
    Row,
    Col,
    Card,
    message
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { dateFormat } from '../../../Helpers/TodayDate';
import moment from 'moment'
import { GoBack } from '../../../Components/Common/GoBack';
import useToken from '../../../CustomHooks/useToken';
import { setCompanyDetailsApi } from '../../../Services/CompanyService';
import { getCompanyDetailsApi } from '../../../Services/MiscService';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import nepalify from 'nepalify';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddCompany = (props) => {
    const [form] = Form.useForm()
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const CId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const { token } = useToken()
    const appDefDate = AppDefaultSettings.showEntryDate
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            getCompanyDetails(CId)
        }
    }, [forEdit, CId])

    const getCompanyDetails = (counterId) => {
        setIsButtonLoad(true)
        getCompanyDetailsApi(res => {
            let edData = {}
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.CId === Number(counterId)) {
                    let newData = {
                        ...element,
                        EntryDate: moment(element.EntryDate)
                    }
                    setForEditEntryDate(newData.EntryDate.format(dateFormat))
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
            "CId": forEdit ? CId : 0,
            'CompanyName': values.CompanyName,
            'CompanyAddress': values.CompanyAddress,
            'CompanyPhoneNumber': values.CompanyPhoneNumber,
            'CompanyEmailId': values.CompanyEmailId,
            'CompanyPanId': values.CompanyPanId,
            'CompanyWebsite': values.CompanyWebsite,
            'UserId': token.Um,
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setCompanyDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate(`/admin/company`)
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
            <Card title={`${forEdit ? 'Edit' : 'Add'} Company`} bordered={false} extra={<GoBack />}>
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
                                label="Company Name"
                                name='CompanyName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Company name!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item >
                            <Form.Item
                                label="Address"
                                name='CompanyAddress'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input The Company Address!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone No."
                                name='CompanyPhoneNumber'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input The Company Phone!',
                                    },
                                ]}>
                                <InputNumber
                                    maxLength={10}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name='CompanyEmailId'
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Please input valid Email!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Pan"
                                name='CompanyPanId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Company PanID!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Website"
                                name='CompanyWebsite'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Company Website!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            {
                                appDefDate &&
                                <Form.Item
                                    name="EntryDate"
                                    label="Entry Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter entry date!',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        format={dateFormat}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            }
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

export default AddCompany;