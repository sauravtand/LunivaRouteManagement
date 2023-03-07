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
    Select,
    message
} from 'antd';
import { useEffect, useState } from 'react';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import useGetRole from '../../../CustomHooks/GetRoleHook';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import useSingleCompany from '../../../Helpers/SetDefaultCompany';
import { dateFormat } from '../../../Helpers/TodayDate';
import moment from 'moment'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUserDetailsApi, getUserNameCheckApi, setUserDetailsApi } from "../../../Services/UserService";
import useToken from '../../../CustomHooks/useToken';
import { GoBack } from '../../../Components/Common/GoBack';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';

const AddUser = (props) => {
    const [form] = Form.useForm()
    const [butDis, setButDis] = useState(false);
    const { forEdit } = props
    const appDefSet = AppDefaultSettings
    const defaultCompany = useSingleCompany(0, appDefSet.showSingleCompany)
    const appDefDate = AppDefaultSettings.showEntryDate
    const allRoleList = useGetRole()
    const { Option } = Select;
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const UUId = searchParams.get('q')
    const [prevVal, setPrevVal] = useState({})
    const [isButtonLoad, setIsButtonLoad] = useState(false)
    const [forEditEntryDate, setForEditEntryDate] = useState('');
    const [forEditUsername, setForEditUsername] = useState('')
    const { token } = useToken()

    useEffect(() => {
        if (forEdit)
            getUserDetails(UUId)
    }, [forEdit, UUId])

    const getUserDetails = (counterId) => {
        setIsButtonLoad(true)
        const data = {
            userId: counterId
        }
        getUserDetailsApi(data, (res) => {
            // let edData = {}
            // for (let index = 0; index < res.length; index++) {
            //     const element = res[index];
            //     if (element.UId === Number(counterId)) {
            let newData = {
                ...res[0],
                EntryDate: moment(res[0].EntryDate),
                RePassword: res[0].UserPassword,
            }
            setForEditUsername(newData.UserName)
            setForEditEntryDate(newData.EntryDate.format(dateFormat))
            //         edData = newData
            //         break
            //     }
            // }
            setPrevVal(newData)
            setIsButtonLoad(false)
        })
    }

    useEffect(() => {
        if (prevVal !== {})
            form.resetFields()
    }, [prevVal, form])

    const onFinish = (values) => {
        setButDis(true)

        // !forEdit && 
        if (values.UserPassword !== values.RePassword) {
            message.warning('Password doesnt match. Please try again')
            setButDis(false)
            return
        }
        setIsButtonLoad(true)

        let data = {
            "UId": forEdit ? UUId : 0,
            "UserFullName": values.UserFullName,
            "UserName": forEdit ? forEditUsername : values.UserName,
            "UserPassword": values.UserPassword,
            "UserContactNumber": values.UserContactNumber,
            "UserEmail": values.UserEmail,
            "RoleId": values.RoleId,
            "EntryDate": forEdit ? forEditEntryDate : moment().format(dateFormat),
            "UserId": token.Um, //dynamic login id
            "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
            "CompanyId": values.CompanyId !== undefined ? values.CompanyId : defaultCompany.CId,
        }
        setUserDetailsApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res.Message)
                navigate('/admin/user')
            } else {
                message.error('Something went wrong.')
            }
        })
        setButDis(false)
        setIsButtonLoad(false)
    };

    const onFinishFailed = () => {
        setButDis(false)
    }

    const checkUsernameExists = (res) => {
        const userNameValue = {
            username: res.target.value
        }
        getUserNameCheckApi(userNameValue, (response) => {
            const newRes = response[0]
            if (newRes.Result.toLowerCase() !== 'ok')
                form.setFields([
                    {
                        name: 'UserName',
                        errors: [newRes.Result],
                    },
                ]);
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={`${forEdit ? 'Edit' : 'Add'} User`} bordered={false} extra={<GoBack />}>
                <Row justify='center'>
                    <Col xs={24} sm={16}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            initialValues={prevVal}
                            name="add_userdetails"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        // onFieldsChange={checkUsernameExists}
                        >
                            <Form.Item
                                name="UserName"
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter username!',
                                    },
                                ]}
                            >
                                <Input onBlur={checkUsernameExists} readOnly={forEdit ? true : false} />
                            </Form.Item>
                            <Form.Item
                                name="UserFullName"
                                label="Full Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Full Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {
                                !forEdit &&
                                <>
                                    <Form.Item
                                        name="UserPassword"
                                        label="Password"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter Password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Enter Password"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="RePassword"
                                        label="Confirm Password"
                                        dependencies={['UserPassword']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter valid Password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('UserPassword') === value) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject(new Error('Password do not match'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Confirm Password"
                                        />
                                    </Form.Item>
                                </>
                            }
                            <Form.Item
                                name="UserContactNumber"
                                label="Contact No"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter contact no!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    keyboard={false}
                                    style={{ width: '100%' }}
                                    maxLength={10}
                                />
                            </Form.Item>
                            <Form.Item
                                name="UserEmail"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Please enter valid email address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="RoleId"
                                label="Role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Role!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Select Role"
                                    filterOption={(input, option) => {
                                        return (
                                            option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        );
                                    }}
                                    allowClear>
                                    {allRoleList?.map(cList => (
                                        cList?.IsActive === true && (cList?.RoleType.toLowerCase() !== 'superadmin') &&
                                        <Option
                                            title={cList?.RoleType}
                                            key={cList?.RId}
                                            value={cList?.RId}>
                                            {cList?.RoleType}
                                        </Option>
                                    )
                                    )
                                    }
                                </Select>
                            </Form.Item>
                            {
                                appDefSet.showSingleCompany &&
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

export default AddUser;