import {
    Row,
    Col,
    Select,
    Button,
    Form,
    DatePicker,
} from 'antd';
import styled from 'styled-components';
import useGetAllVehicleDetails from '../../CustomHooks/GetAllVehicleHook';
import { dateFormat } from '../../Helpers/TodayDate';
import moment from 'moment'
import useSingleCompany from '../../Helpers/SetDefaultCompany';
import useGetAllCounterDetails from '../../CustomHooks/GetAllCounterHook';
import GetAllUsersHook from '../../CustomHooks/GetAllUsersHook';

const Filter = (props) => {
    const { returnFilterData, showVehicleList, showSingleDatePicker, showCompanyList, showAll, showFromToDate, showCounter, showUsers } = props
    const { Option } = Select
    const [form] = Form.useForm()
    const allVehicleList = useGetAllVehicleDetails(0, showVehicleList)
    const defaultCompany = useSingleCompany(0, showCompanyList)
    const allCounterList = useGetAllCounterDetails(0, showCounter)
    const allUsers = GetAllUsersHook(0, showUsers)
    // console.log('aaaaaaa', allUsers);
    const { RangePicker } = DatePicker;

    const initialValues = {
        // VehicleListId: 'All',
        SingleDate: moment(),
        // FromTo: moment()
    }

    const onFilterReturn = (res) => {
        // console.log(res, 'resmoney');
        returnFilterData(res)
    }

    return (
        <FilterContainer>
            <Form
                form={form}
                autoComplete="off"
                onFinish={onFilterReturn}
                layout={'vertical'}
                initialValues={initialValues}
            >
                <Row justify='space-between' align='bottom'>
                    <Col lg={24} md={24} sm={24}>
                        <Row className="filterRow" align='bottom'>
                            {
                                showFromToDate &&
                                <Col lg={6} md={12} sm={12} xs={24}>
                                    <Form.Item
                                        name="FromTo"
                                        label="From - To"
                                    >
                                        <RangePicker
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>

                                </Col>
                            }
                            {
                                showUsers &&
                                <Col lg={6} md={12} sm={12} xs={24}>

                                    <Form.Item
                                        name="User"
                                        label="Users"
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            placeholder="Select Users"
                                            filterOption={(input, option) => {
                                                return (
                                                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                            allowClear
                                        >

                                            {
                                                // showAll !== false &&
                                                <Option
                                                    title={'All'}
                                                    key={0}
                                                    value="0"
                                                >
                                                    All
                                                </Option>
                                            }
                                            {
                                                allUsers && (

                                                    allUsers.map(cList => {
                                                        // console.log('clist', cList);

                                                        return (
                                                            // cList?.IsActive === true &&
                                                            <Option
                                                                title={cList?.UserFullName}
                                                                key={cList?.UId}
                                                                value={cList?.UId}
                                                            >
                                                                {cList?.UserFullName}
                                                            </Option>
                                                        )
                                                    }
                                                    )
                                                )
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            }
                            {
                                showVehicleList &&
                                <Col lg={6} md={12} sm={12} xs={24}>
                                    <Form.Item
                                        name="VehicleListId"
                                        label="Vehicle List"
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
                                            allowClear
                                        >
                                            {
                                                showAll !== false &&
                                                <Option
                                                    title={'All'}
                                                    key={0}
                                                    value="0"
                                                >
                                                    All
                                                </Option>
                                            }
                                            {
                                                allVehicleList.map(cList => (
                                                    cList?.IsActive === true &&
                                                    <Option
                                                        title={cList?.VehicleNumber}
                                                        key={cList?.VId}
                                                        value={cList?.VId}
                                                    >
                                                        {cList?.VehicleNumber}
                                                    </Option>
                                                )
                                                )
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            }

                            {
                                showSingleDatePicker &&
                                <Col lg={6} md={12} sm={12} xs={24}>
                                    <Form.Item
                                        name="SingleDate"
                                        label="Select Date"
                                    >
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                </Col>
                            }

                            {
                                showCompanyList &&
                                <Col lg={6} md={12} sm={12} xs={24}>
                                    <Form.Item
                                        name="CompanyId"
                                        label="Company"
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
                                            allowClear
                                        >
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
                                </Col>
                            }
                            {
                                showCounter &&
                                <Col lg={6} md={12} sm={12} xs={24}>
                                    <Form.Item
                                        name="CounterId"
                                        label="Counter"
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            placeholder="Select Counter"
                                            filterOption={(input, option) => {
                                                return (
                                                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                            allowClear
                                        >
                                            {
                                                showAll !== false &&
                                                <Option
                                                    title={'All'}
                                                    key={0}
                                                    value="0"
                                                >
                                                    All
                                                </Option>
                                            }
                                            {allCounterList?.map(cList => (
                                                cList?.IsActive === true &&
                                                <Option
                                                    title={cList?.CounterName}
                                                    key={cList?.CId}
                                                    value={cList?.CId}>
                                                    {cList?.CounterName}
                                                </Option>
                                            )
                                            )
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            }
                            <Col>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                    >
                                        Load
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </FilterContainer>
    )
}

export default Filter

const FilterContainer = styled.div`
  padding: 5px;

  .filterRow > div {
    padding: 4px;
  }

  .labelTop{
    display: block;
  }
`