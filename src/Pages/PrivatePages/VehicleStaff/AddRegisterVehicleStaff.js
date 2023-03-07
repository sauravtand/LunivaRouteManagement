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
    InputNumber,
    message
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import useGetStaffType from '../../../CustomHooks/GetStaffHook';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import useSingleCompany from '../../../Helpers/SetDefaultCompany';
import { dateFormat } from '../../../Helpers/TodayDate';
import { getVehicleStaffDetailsByStaffIdApi, setVehicleStaffDetailsApi } from '../../../Services/VehicleStaffService';
import moment from 'moment'
import useGetAllVehicleDetails from '../../../CustomHooks/GetAllVehicleHook';
import useToken from '../../../CustomHooks/useToken';
import { GoBack } from '../../../Components/Common/GoBack';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import nepalify from 'nepalify';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddRegisterVehicleStaff = (props) => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const { TextArea } = Input;
    const { forEdit } = props
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    // const VId = searchParams.get('q')
    const StaffId = searchParams.get('s')
    const [butDis, setButDis] = useState(false);
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const staffList = useGetStaffType()
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const appDefNep = AppDefaultSettings.removeFromNepali
    const defaultCompany = useSingleCompany(0, appDefSet)
    const [prevVal, setPrevVal] = useState({})
    const allVehicleList = useGetAllVehicleDetails()
    const {token} = useToken()
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            const prevData = {
                staffId: StaffId
            }
            getVehicleStaffDetailsByStaffIdApi(prevData, (res) => {
                if (res.length > 0) {
                    let editedData = {
                        ...res[0],
                        EntryDate: moment(res[0].EntryDate)
                    }
                    setForEditEntryDate(editedData.EntryDate.format(dateFormat))
                    setPrevVal(editedData);
                }
            })
        }
    }, [forEdit, StaffId])

    useEffect(() => {
        if (prevVal !== {})
            form.resetFields()
    }, [prevVal, form])

    const processStep3Data = (values) => {
        setButDis(true)
        setIsButtonLoad(true)
        let newData = {
            "VsId": forEdit ? StaffId : 0,
            "VehicleId": values.VehicleId,
            "StaffName": values.StaffName,
            "StaffContactNumber": values.StaffContactNumber,
            "StaffTypeId": values.StaffTypeId,
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "UserId": token.Um,
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            "Remarks": values.Remarks,
        }
        setVehicleStaffDetailsApi(newData, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res.Message)
                navigate('/admin/vehiclestaff')
            } else {
                message.error('Something went wrong.')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    }

    const onValuesChange = (res) => {
        if(i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
        form.setFieldsValue({
            [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Register'} Vehicle Staff`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_vehiclestaff"
                            autoComplete="off"
                            onFinish={processStep3Data}
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
                                name="StaffName"
                                label="Staff Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Staff Name is required'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="StaffContactNumber"
                                label="Contact No."
                            >
                                <InputNumber
                                    maxLength={10}
                                    style={{ width: '100%' }}
                                    keyboard={false}
                                />
                            </Form.Item>
                            <Form.Item
                                name="StaffTypeId"
                                label="Staff Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select staff!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Select Staff"
                                    filterOption={(input, option) => {
                                        return (
                                            option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                    allowClear>
                                    {staffList?.map(cList => (
                                        cList?.IsActive === true &&
                                        <Option
                                            title={cList?.StaffType}
                                            key={cList?.StId}
                                            value={cList?.StId}>
                                            {cList?.StaffType}
                                        </Option>
                                    )
                                    )
                                    }
                                </Select>
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
                                    type="primary"
                                    htmlType="submit"
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

export default AddRegisterVehicleStaff