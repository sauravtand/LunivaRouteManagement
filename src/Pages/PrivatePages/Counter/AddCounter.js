import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
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
import useSingleCompany from '../../../Helpers/SetDefaultCompany';
import { dateFormat } from '../../../Helpers/TodayDate';
import { getCounterDetailsApi, setCounterDetailsApi } from '../../../Services/CounterService';
import moment from 'moment'
import { GoBack } from '../../../Components/Common/GoBack';
import nepalify from "nepalify";
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddCounter = (props) => {
    const [form] = Form.useForm()
    const { Option } = Select
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const CId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const defaultCompany = useSingleCompany(0, appDefSet)
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();  

    useEffect(() => {
        if (forEdit) {
            getCounterDetails(CId)
        }
    }, [forEdit, CId])

    const getCounterDetails = (counterId) => {
        setIsButtonLoad(true)
        getCounterDetailsApi(res => {
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
            "CounterName": values.CounterName,
            "CounterLocation": values.CounterLocation,
            // "EntryDate": values.EntryDate.format(dateFormat),
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
        }
        setCounterDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res.Message)
                navigate('/admin/counter')
            } else {
                message.error('Something went wrong.')
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
            <Card title={`${forEdit ? 'Edit' : 'Add'} Counter`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_counter"
                            autoComplete="off"
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                        >
                            {
                                appDefSet &&
                                <Form.Item
                                    name="CompanyId"
                                    label="Company"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select company!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        placeholder="Select Company"
                                        filterOption={(input, option) => {
                                            return (
                                                option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                        allowClear>
                                        {defaultCompany?.map(cList => (
                                            cList?.IsActive === true &&
                                            <Option
                                                title={cList?.CompanyName}
                                                key={cList?.CId}
                                                value={cList?.CId}>
                                                {cList?.CompanyName}
                                            </Option>
                                        )
                                        )
                                        }
                                    </Select>
                                </Form.Item>
                            }
                            <Form.Item
                                name="CounterName"
                                label="Counter Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter counter name!',
                                    },
                                ]}
                            >
                                <Input
                                    // onChange={(res) => {
                                    //     form.setFieldsValue({
                                    //         [res.target.id]: nepalify.format(res.target.value, nepaliOptions)
                                    //     })
                                    // }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="CounterLocation"
                                label="Counter Location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter counter location!',
                                    },
                                ]}
                            >
                                <Input
                                    // onChange={(res) => {
                                    //     form.setFieldsValue({
                                    //         [res.target.id]: nepalify.format(res.target.value, nepaliOptions)
                                    //     })
                                    // }}
                                />
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

export default AddCounter;