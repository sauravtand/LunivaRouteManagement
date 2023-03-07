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
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { dateFormat } from '../../../Helpers/TodayDate';
import { getVehicleOwnerByOwnerIdDetailsApi, setVehicleOwnerDetailsApi } from '../../../Services/VehicleOwnerService';
import moment from 'moment'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import useSingleCompany from '../../../Helpers/SetDefaultCompany';
import useGetAllVehicleDetails from '../../../CustomHooks/GetAllVehicleHook';
import useToken from '../../../CustomHooks/useToken';
import { GoBack } from '../../../Components/Common/GoBack';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import nepalify from 'nepalify';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddRegisterOwner = (props) => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const { TextArea } = Input;
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    // const VId = searchParams.get('q')
    const OId = searchParams.get('o')
    const [butDis, setButDis] = useState(false);
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [serPrevVal, setSerPrevVal] = useState({})
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const appDefNep = AppDefaultSettings.removeFromNepali
    const defaultCompany = useSingleCompany(0, appDefSet)
    const allVehicleList = useGetAllVehicleDetails()
    const { token } = useToken()
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            // console.log(OId, 'oId');
            setIsButtonLoad(true)
            const prevData = {
                vId: OId
            }
            getVehicleOwnerByOwnerIdDetailsApi(prevData, (res) => {
                if (res.length > 0) {
                    let editedData = {
                        ...res[0],
                        EntryDate: moment(res[0].EntryDate)
                    }
                    setForEditEntryDate(editedData.EntryDate.format(dateFormat))
                    setSerPrevVal(editedData);
                }
                setIsButtonLoad(false)
            })
        }
    }, [forEdit, OId])

    useEffect(() => {
        if (serPrevVal !== {})
            form.resetFields()
    }, [serPrevVal, form])

    const processStep2Data = (values) => {
        // console.log(values);
        if (values.OwnerMobileNumber !== undefined && values.OwnerMobileNumber !== '' && isNaN(Number(values.OwnerMobileNumber))) {
            form.setFields([
                {
                    name: 'OwnerMobileNumber',
                    errors: ['Mobile No. is not a valid number'],
                },
            ]);
            return
        }
        if (values.OwnerContactNumber !== undefined && values.OwnerContactNumber !== '' && isNaN(Number(values.OwnerContactNumber))) {
            form.setFields([
                {
                    name: 'OwnerContactNumber',
                    errors: ['Contact is not a valid number'],
                },
            ]);
            return
        }
        setButDis(true)
        setIsButtonLoad(true)
        let newData = {
            "OId": forEdit ? OId : 0,
            "OwnerName": values.OwnerName,
            "OwnerAddress": values.OwnerAddress,
            "OwnerContactNumber": values.OwnerContactNumber !== undefined ? values.OwnerContactNumber : '',
            "OwnerMobileNumber": values.OwnerMobileNumber !== undefined ? values.OwnerMobileNumber : '',
            "OwnerEmailId": values.OwnerEmailId !== undefined ? values.OwnerEmailId : '',
            "VehicleId": values.VehicleId,
            "UserId": token.Um, //dynamic login userid needed
            // "EntryDate": values.EntryDate.format(dateFormat),
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            "Remarks": values.Remarks !== undefined ? values.Remarks : 'n/a',
        }
        setVehicleOwnerDetailsApi(newData, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(forEdit ? "Owner Details Updated" : "New Owner Added");
                navigate(`/admin/vehicleowner`)
            } else {
                message.error('Something went wrong. Please try again')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    }

    const processStep2DataFail = (value) => {

    }

    const onValuesChange = (res) => {
        if (i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
            form.setFieldsValue({
                [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
            })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Register'} Vehicle Owner`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={serPrevVal}
                            name="add_vehicleowner"
                            autoComplete="off"
                            onFinish={processStep2Data}
                            onFinishFailed={processStep2DataFail}
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
                                name="VehicleId"
                                label="Vehicle"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Vehicle!',
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
                                    {allVehicleList?.map(cList => (
                                        cList?.IsActive === true &&
                                        <Option
                                            title={cList?.VehicleNumber}
                                            key={cList?.VId}
                                            value={cList?.VId}>
                                            {cList?.VehicleNumber}
                                        </Option>
                                    )
                                    )
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="OwnerName"
                                label="Owner Name"
                                onc
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Owner Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="OwnerAddress"
                                label="Owner Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Owner Address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="OwnerMobileNumber"
                                label="Mobile No."
                                dependencies={['OwnerContactNumber']}
                                rules={[
                                    {
                                        // required: true,
                                        // type: 'number',
                                        message: 'Please enter Owner Mobile No!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value || (getFieldValue('OwnerContactNumber') !== '' && getFieldValue('OwnerContactNumber') !== undefined)) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Please enter either mobile number or contact no'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    maxLength={10}
                                />
                            </Form.Item>
                            <Form.Item
                                name="OwnerContactNumber"
                                label="Contact No."
                                dependencies={['OwnerMobileNumber']}
                                rules={[
                                    {
                                        // type: 'number',
                                        message: 'Please enter Owner Contact No!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value || (getFieldValue('OwnerMobileNumber') !== '' && getFieldValue('OwnerMobileNumber') !== undefined)) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Please enter either mobile number or contact no'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    maxLength={10}
                                />
                            </Form.Item>
                            <Form.Item
                                name="OwnerEmailId"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Please enter valid Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="Remarks"
                                label="Remarks"
                            >
                                <TextArea />
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
                                        forEdit ? 'Edit' : 'Register'
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

export default AddRegisterOwner