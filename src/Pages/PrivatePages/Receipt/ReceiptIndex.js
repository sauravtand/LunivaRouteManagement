import { Space, Table, Button, Modal, Input, Form, Badge, DatePicker, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ReceiptIndex = () => {
    const [counter, setCounter] = useState([]);
    const [cancel, setOnCancel] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [remarks, setRemarks] = useState("");
    const { TextArea } = Input;

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://lunivacare.ddns.net/LunivaRouteAPI/LunivarouteManagementApi/GetRouteDetailsByDateWise?routeday=2022-06-23')
            .then(response => response.json())
            .then(json => setCounter(json.DatewiseRouteDetails));
    }

    const columns = [
        {
            title: 'Vehicle Id',
            dataIndex: 'VehicleId',
            key: 'CounterName'
        },
        {
            title: 'Route ID',
            dataIndex: 'RouteId',
            key: 'RouteId',
        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Badge
                        count={record.IsActive ? "Assigned" : "Canceled"}
                        style={record.IsActive ? {
                            backgroundColor: '#52c41a'
                        } : { backgroundColor: '#ff4d4f' }}
                    />

                    <Button danger onClick={() => onCancelVehicle(record)}>Cancel</Button>

                </Space>
            ),
        },
    ];

    const onCancelVehicle = (record) => {
        setOnCancel(true)
        setEditingRecord({ ...record })

    }

    const handleChange = (event) => {
        setRemarks(event.target.value);
    }

    const handleInputs = async (vehicleid, receiptid, Remarks) => {
        const url2 = `https://lunivacare.ddns.net/LunivaRouteAPI/LunivarouteManagementApi/CancelAssignedRouteOfVehicleByAdmin?vehicleid=${vehicleid}&receiptid=${receiptid}&remarks=${Remarks}`;
        // const baseData = {
        //    'RId': 0,
        //    'RoleType': e.RoleType,
        //    'IsActive': e.IsActive,
        // }
        // let newData = generateUrlEncodedData(baseData);

        console.log(vehicleid, receiptid, Remarks);

        try {
            const response1 = await axios.post(url2)
            console.log(response1);

        } catch (error) {
            console.log(error.response);
        }

    }
    return (
        <>
            <Table columns={columns} dataSource={counter} />
            <Modal title='Edit Data'
                visible={cancel}
                okText="Save"
                onCancel={() => {
                    setOnCancel(false);
                }}
                onOk={() => {
                    handleInputs(editingRecord.VehicleId, editingRecord.DId, remarks);
                    setOnCancel(false);
                    setRemarks("");
                    fetchData();
                }}
            >
                <Form>
                    <Form.Item label="Remarks" name="Remarks">
                        <TextArea rows={6} onChange={handleChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ReceiptIndex;