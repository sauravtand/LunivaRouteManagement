import { Form, Input, message, Modal } from 'antd';
import nepalify from 'nepalify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDefaultSettings } from '../../Config/AppDefaultSettings';
import { InsertUpdateReserveDetail, setCancelRouteByAdminApi } from '../../Services/RouteService';
import { nepaliOptions } from './ChangeText';

const CancelModal = (props) => {
    const { reserveCancelData, showModal, hideModal, sendCancelData, shouldTableRefresh, isReservation } = props
    const { TextArea } = Input
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();

    // console.log('reserveCancelData', reserveCancelData);
    // console.log(sendCancelData, 'sendCancelData');

    const handleSubmit = (res) => {

        // console.log(res, 'this is res');
        setConfirmLoading(true);
        if (isReservation) {



            const data = {
                RId: reserveCancelData.RId,
                VehicleId: reserveCancelData.vehicleId
                ,
                ReserverLocation: reserveCancelData.ReserverLocation,

                ReservationDate: reserveCancelData.ReservationDate,
                ReserveNepaliDate: reserveCancelData.ReserveNepalidate
                ,
                Charge: reserveCancelData.Charge
                ,
                UserId: reserveCancelData.UserId,
                ReserveDays: reserveCancelData.ReserveDays
                ,
                ReserveRemarks: res.remarks


            };
            // console.log("datasdfsdfsdfsdfsdf", data);

            InsertUpdateReserveDetail(data, (res) => {
                // console.log(res, 'this is the res');
                if (res?.SuccessMsg === true) {
                    message.success("Reservation Cancelled Successfully")
                    // form.resetFields()
                    hideModal(false);
                    shouldTableRefresh(true)
                } else {
                    message.error('Something went wrong')
                }
                setConfirmLoading(false);
            })

        }
        else {
            console.log("not inside");
            const data = {
                vehicleid: sendCancelData.VehicleId,
                receiptid: sendCancelData.DId,
                remarks: res.remarks
            }
            setCancelRouteByAdminApi(data, (res) => {
                if (res?.SuccessMsg === true) {
                    message.success(res.Message)
                    form.resetFields()
                    hideModal(false);
                    shouldTableRefresh(true)
                } else {
                    message.error('Something went wrong')
                }
                setConfirmLoading(false);
            })
        }
    }

    const handleCancel = () => {
        hideModal(false);
        setConfirmLoading(false);
    };

    const handleFail = () => {
        setConfirmLoading(false)
    }

    const onValuesChange = (res) => {
        if (i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
            form.setFieldsValue({
                [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
            })
    }

    return (
        <>
            <Modal
                title={"Cancel for Vehicle " + sendCancelData.VehicleNumber}
                visible={showModal}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="cancel_receipt"
                    autoComplete="off"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFail}
                    layout={'vertical'}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        name="remarks"
                        label="Remarks"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter remarks!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default CancelModal;