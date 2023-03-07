import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Table,
} from 'antd';
import { getRouteDetailsByCompanyIdApi } from "../../../Services/RouteService";
import { useNavigate } from "react-router-dom";
// import Filter from "../../../Components/Common/Filter";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";

const CompanyWiseRouteDetails = () => {
    const [dataSource, setDataSource] = useState([])
    const [inCompanyId, setInCompanyId] = useState(0)
    const navigate = useNavigate()
    const appDefSet = AppDefaultSettings.showSingleCompany
    const defaultCompany = useSingleCompany(0, appDefSet)

    const columns = [
        {
            title: 'RouteName',
            dataIndex: 'RouteName',
            key: 'RouteName',
        },
        {
            title: 'Source Location',
            dataIndex: 'SourceLocation',
            key: 'SourceLocation',
        },
        {
            title: 'Destination Location',
            dataIndex: 'DestinationLocation',
            key: 'DestinationLocation',
        },
        {
            title: 'Charge',
            dataIndex: 'Charge',
            key: 'Charge',
        },
        {
            title: 'Action',
            dataIndex: 'RId',
            key: 'RId',
            render: (text, record) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editroutedetails`,
                            search: `?q=${text}&o=${inCompanyId}`
                        })}
                    >
                        Edit
                    </Button>
                )
            }
        },
    ]

    const getTableData = (coId) => {
        let data = {
            companyid: coId.CompanyId
        }
        setInCompanyId(data.companyid)
        getRouteDetailsByCompanyIdApi(data, (res) => {
            setDataSource(res)
        })
    }

    // const returnFilterData = (res) => {
    //     getTableData(res)
    // }

    useEffect(() => {
        const res = {
            CompanyId: defaultCompany.CId
        }
        getTableData(res)
    }, [defaultCompany])

    return (
        <div className="contentContainer">
            <Card title={`Route Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addroutedetails')
                    }}>
                    Add New Route
                </Button>
                {/* <Filter
                    returnFilterData={returnFilterData}
                    showCompanyList={appDefSet}
                /> */}
            </Card>
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
        </div>
    )
}

export default CompanyWiseRouteDetails