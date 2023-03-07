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
import { getVehicleRegistrationDetailsApi, setVehicleDetailsApi } from '../../../Services/VehicleService';
import moment from 'moment'
import useGetVehicleType from '../../../CustomHooks/GetVehicleTypeHook';
import useToken from '../../../CustomHooks/useToken';
import { GoBack } from '../../../Components/Common/GoBack';
import nepalify from 'nepalify';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddRegisterVehicle = (props) => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const VId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const defaultCompany = useSingleCompany(0, appDefSet)
    const vehicleList = useGetVehicleType()
    const {token} = useToken()
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();




    useEffect(() => {
        if (forEdit)
            getVehicleDetails(VId)
    }, [VId, forEdit])

    const getVehicleDetails = (vehId) => {
        setIsButtonLoad(true)
        const prevData = {
            vId: vehId
        }
        getVehicleRegistrationDetailsApi(prevData, (res) => {
            let editedData = {
                ...res[0],
                EntryDate: moment(res[0].EntryDate)
            }
            setForEditEntryDate(editedData.EntryDate.format(dateFormat))
            setPrevVal(editedData)
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
            "VehicleNumber": values.VehicleNumber,
            "VehicleType": values.VehicleType,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            // "EntryDate": values.EntryDate.format(dateFormat),
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "UserId": token.Um, //dynamic login userid needed
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
        }
        setVehicleDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate('/admin/vehicle')
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
            <Card title={`${forEdit ? 'Edit' : 'Register'} Vehicle Details`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_vehicledetails"
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
                                name="VehicleNumber"
                                label="Vehicle Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter vehicle number!',
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
                                    placeholder="Select Company"
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
    );
};

export default AddRegisterVehicle;