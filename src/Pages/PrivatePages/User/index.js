import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Space,
    Table, Tag,
} from 'antd';
import { getUserDetailsApi } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import useToken from "../../../CustomHooks/useToken";
import ResetPasswordModal from "../../../Components/Common/ResetPasswordModal";
import { useRoleRights } from "../../../CustomHooks/GetRoleRightsHook";

const User = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    const { token } = useToken()
    const [showModal, setShowModal] = useState(false)
    const [resetOfUserId, setResetOfUserId] = useState(0)
    const roleAndRights = useRoleRights()

    const columns = [
        {
            title: 'Username',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Full Name',
            dataIndex: 'UserFullName',
            key: 'UserFullName',
        },
        {
            title: 'Contact No',
            dataIndex: 'UserContactNumber',
            key: 'UserContactNumber',
        },
        {
            title: 'Email',
            dataIndex: 'UserEmail',
            key: 'UserEmail',
        },
        {
            title: 'Active',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: (text) => (
                text === true ?
                    <Tag color="#87d068">Active</Tag>
                    :
                    <Tag color="#f50">Inactive</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'UId',
            key: 'UId',
            render: (text) => {
                return (
                    <Space>
                        {
                            (token.Um === text || roleAndRights.showSuperAdminAndAdmin) &&
                            <>
                                <Button
                                    className="buttonRadius"
                                    type="primary"
                                    onClick={() => navigate({
                                        pathname: `/admin/userprofile`,
                                        search: `?q=${text}`
                                    })}
                                >
                                    View
                                </Button>
                                <Button
                                    className="buttonRadius"
                                    type="secondary"
                                    onClick={() => {
                                        setShowModal(true)
                                        setResetOfUserId(text)
                                    }
                                    }
                                >
                                    Reset Password
                                </Button>
                            </>
                        }
                    </Space>
                )
            }
        },
    ]

    const hideModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = () => {
        let data = {
            userId: 0
        }
        getUserDetailsApi(data, (res) => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`User Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/adduser')
                    }}>
                    Add New User
                </Button>
            </Card>
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
            <ResetPasswordModal
                showModal={showModal}
                hideModal={hideModal}
                resetOfUserId={resetOfUserId}
            />
        </div>
    )
}

export default User