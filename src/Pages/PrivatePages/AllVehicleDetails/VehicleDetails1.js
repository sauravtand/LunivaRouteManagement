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
import nepalify from 'nepalify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import useGetVehicleType from '../../../CustomHooks/GetVehicleTypeHook';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { dateFormat } from '../../../Helpers/TodayDate';
import { getVehicleDetailsApi, setVehicleDetailsApi } from '../../../Services/VehicleService';
// import moment from 'moment'
// import { DefaultTodayPicker } from '../../../Components/Common/DefaultTodayPicker';

const VehicleDetails1 = (props) => {
    const { onSuccess, forEdit, prevVal, vehicleDetailsNumber, defaultCompany, appDefSet, appDefDate, forEditEntryDate, token, appDefNep } = props
    const [form] = Form.useForm()
    const { Option } = Select;
    const [butDis, setButDis] = useState(false);
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const vehicleList = useGetVehicleType()
    const [serPrevVal, setSerPrevVal] = useState([])
    const [insideEntryDate, setInsideEntryDate] = useState('')
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            const prevData = {
                vId: prevVal
            }
            getVehicleDetailsApi(prevData, (res) => {
                form.resetFields()
                let editedData = {
                    ...res[0],
                    // EntryDate: 
                }
                setInsideEntryDate(editedData.EntryDate.format(dateFormat))
                setSerPrevVal(editedData);
            })
        }
    }, [forEdit, prevVal, form])

    const processStep1Data = (values) => {
        setButDis(true)
        setIsButtonLoad(true)
        let newData = {
            "VId": forEdit ? prevVal : 0,
            "VehicleNumber": values.VehicleNumber,
            "VehicleType": values.VehicleType,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            "EntryDate": forEdit ? insideEntryDate : forEditEntryDate,
            "UserId": token, //dynamic login userid needed
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setVehicleDetailsApi(newData, (res) => {
            if (res?.SuccessMsg === true) {
                vehicleDetailsNumber(res.CreatedId)
                message.success(res.Message)
                onSuccess(true)
            } else {
                message.error('Something went wrong.')
            }
            setIsButtonLoad(false)
            setButDis(false)
        })
    }

    const processStep1DataFail = (value) => {
        vehicleDetailsNumber(prevVal)
    }

    const onValuesChange = (res) => {
        if (i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
            form.setFieldsValue({
                [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
            })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Register'} Vehicle Details`} bordered={false}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={serPrevVal}
                            name="add_vehicledetails"
                            autoComplete="off"
                            onFinish={processStep1Data}
                            onFinishFailed={processStep1DataFail}
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
                                            message: 'Please enter company!',
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
                                name="VehicleNumber"
                                label="Vehicle No."
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter vehicle No!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="VehicleType"
                                label="Vehicle Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Vehicle Type!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Select Vehicle"
                                    filterOption={(input, option) => {
                                        return (
                                            option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                    allowClear>
                                    {
                                        vehicleList.length !== 0 && vehicleList.map(cList => (
                                            cList?.IsActive === true &&
                                            <Option
                                                title={cList?.VechicleType}
                                                key={cList?.VId}
                                                value={cList?.VId}>
                                                {cList?.VechicleType}
                                            </Option>
                                        )
                                        )
                                    }
                                </Select>
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
                                    {/* <DefaultTodayPicker /> */}
                                    <DatePicker
                                        // defaultValue={moment()}
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
                                        forEdit ? 'Edit' : 'Next'
                                    }
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>

                </Row>
            </Card>
        </div>
    )

}

export default VehicleDetails1