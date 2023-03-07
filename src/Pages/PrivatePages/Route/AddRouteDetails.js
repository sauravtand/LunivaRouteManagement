import moment from 'moment';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
    message,
    Card,
    Row,
    Col,
    Select
} from 'antd';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { useEffect, useState } from 'react';
import { dateFormat } from '../../../Helpers/TodayDate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import useSingleCompany from '../../../Helpers/SetDefaultCompany';
import { getRouteDetailsByCompanyIdApi, setRouteDetailsApi } from '../../../Services/RouteService';
import { GoBack } from '../../../Components/Common/GoBack';
import nepalify from "nepalify";
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

const AddRouteDetails = (props) => {
    const { forEdit } = props
    const { Option } = Select
    const [prevVal, setPrevVal] = useState({})
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const RId = searchParams.get('q')
    const CId = searchParams.get('o')
    const [butDis, setButDis] = useState(false);
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const appDefNep = AppDefaultSettings.removeFromNepali
    const defaultCompany = useSingleCompany(0, appDefSet)
    const { i18n } = useTranslation();

    useEffect(() => {
        if (forEdit) {
            setIsButtonLoad(true)
            const data = {
                companyid: CId
            }
            getRouteDetailsByCompanyIdApi(data, (res) => {
                let edData = {}
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    if (element.RId === Number(RId)) {
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
                setForEditEntryDate(moment().format(dateFormat))
                setIsButtonLoad(false)
            })
        }
    }, [CId, RId, forEdit])

    useEffect(() => {
        if (prevVal !== {})
            form.resetFields()
    }, [prevVal, form])

    const handleInputs = (values) => {
        setButDis(true)
        setIsButtonLoad(true)
        let baseData = {
            "RId": forEdit ? RId : 0,
            "RouteName": values.RouteName,
            "SourceLocation": values.SourceLocation,
            "DestinationLocation": values.DestinationLocation,
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
            "Charge": values.Charge
        }
        setRouteDetailsApi(baseData, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res?.Message);
                navigate(`/admin/croutedetails`)
            } else {
                message.error('Something went wrong. Please try again')
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
            <Card title={`${forEdit ? 'Edit' : 'Register'} Route Details`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_routedetails"
                            autoComplete="off"
                            onFinish={handleInputs}
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
                                label="Route Name"
                                name='RouteName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Route name!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item >
                            <Form.Item
                                label="Source Location"
                                name='SourceLocation'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input The Source Location!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Destination Location"
                                name="DestinationLocation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Destination Location!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Charge"
                                name="Charge"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the Charge Amount',
                                    },
                                ]}>
                                <InputNumber
                                    keyboard={false}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            {
                                appDefDate &&
                                <Form.Item
                                    label="Entry Date"
                                    name="EntryDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the Entry Date!',
                                        },
                                    ]}>
                                    <DatePicker
                                        format={dateFormat}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            }
                            <Form.Item
                                label="Is Active"
                                name='IsActive'
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
                                    loading={isButtonLoad}
                                    disabled={butDis}
                                >
                                    {
                                        forEdit ?
                                            'Edit'
                                            :
                                            'Register'
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
export default AddRouteDetails;