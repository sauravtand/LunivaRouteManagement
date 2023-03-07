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
import nepalify from 'nepalify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import useGetStaffType from '../../../CustomHooks/GetStaffHook';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { tailLayout } from '../../../Helpers/AntdTailLayout';
import { dateFormat } from '../../../Helpers/TodayDate';
import { setVehicleStaffDetailsApi } from '../../../Services/VehicleStaffService';

const VehicleStaff3 = (props) => {
    const { forEdit, prevVal, onBack, onSuccess, vehicleDetailsNumberPrev, defaultCompany, appDefSet, staffDetailsNumber, appDefDate, forEditEntryDate, token, appDefNep } = props
    const [form] = Form.useForm()
    const { Option } = Select;
    const { TextArea } = Input;
    const [butDis, setButDis] = useState(false);
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const staffList = useGetStaffType()
    const { i18n } = useTranslation();

    const processStep3Data = (values) => {
        setButDis(true)
        setIsButtonLoad(true)
        let newData = {
            "VsId": 0,
            "VehicleId": vehicleDetailsNumberPrev,
            "StaffName": values.StaffName,
            "StaffContactNumber": values.StaffContactNumber,
            "StaffTypeId": values.StaffTypeId,
            "EntryDate": forEditEntryDate,
            "UserId": token,
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            "Remarks": values.Remarks,
        }
        // onSuccess(true)
        // setButDis(false)
        // setIsButtonLoad(false)
        // return
        setVehicleStaffDetailsApi(newData, (res) => {
            if (res?.SuccessMsg === true) {
                staffDetailsNumber(res.CreatedId)
                message.success(res.Message)
                onSuccess(true)
            } else {
                message.error('Something went wrong.')
            }
            setButDis(false)
            setIsButtonLoad(false)
        })
    }

    const goToStep2 = (re) => {
        onBack(true)
    }

    const onValuesChange = (res) => {
        if(i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
        form.setFieldsValue({
            [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Register'} Vehicle Staff`} bordered={false}>
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
                                {...tailLayout}
                            >
                                <Button
                                    htmlType="button"
                                    onClick={goToStep2}
                                    className="allMarginBtn"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={butDis}
                                    loading={isButtonLoad}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    )

}

export default VehicleStaff3