import {
  Button,
  Form,
  Input,
  Switch,
  Row,
  Col,
  Card,
InputNumber,
  message
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formItemLayout } from '../../../Helpers/AntdFormLayout';
import { GoBack } from '../../../Components/Common/GoBack';
import nepalify from 'nepalify';
import { nepaliOptions } from '../../../Components/Common/ChangeText';
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings';
import { buttonTailLayout } from '../../../Helpers/AntdTailLayout';
import { useTranslation } from 'react-i18next';

import { getBillingTypeDetailsApi } from '../../../Services/MiscService';
import { setBillingTypeDetailsApi } from '../../../Services/BillingService';

const AddBillingType = (props) => {
  const [form] = Form.useForm()
  const [butDis, setButDis] = useState(false);
  const { forEdit } = props
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const TId = searchParams.get('q')
  const [prevVal, setPrevVal] = useState({})
  const [isButtonLoad, setIsButtonLoad] = useState(false);
   const { i18n } = useTranslation();
  const appDefNep = AppDefaultSettings.removeFromNepali

  useEffect(() => {
    if (forEdit) {
        getBillingTypeDetails(TId)
    }
}, [forEdit, TId])

  const getBillingTypeDetails = (counterId) => {
    setIsButtonLoad(true)
    getBillingTypeDetailsApi(res => {
        let edData = {}
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.TId === Number(counterId)) {
                let newData = {
                    ...element,
                }
                edData = newData
                break
            }
        }
        setPrevVal(edData)
        setIsButtonLoad(false)
    })
}

useEffect(() => {
    if (prevVal !== "")
        form.resetFields()
}, [prevVal, form])

  const onFinish = (values) => {
    setIsButtonLoad(true)
    setButDis(true)
    let data = {
    TId:forEdit?TId:0,
     "BillType":values?.BillType,
      "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
      "Charge": values?.Charge,
  }
  console.log(data);

  setBillingTypeDetailsApi(data, (res) => {
    if (res?.SuccessMsg === true) {
        message.success(res?.Message);
        navigate(`/admin/billingtype`)
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
    <Card title={`${forEdit ? 'Edit' : 'Add'} Billing Type`} bordered={false} extra={<GoBack />}>
        <Row justify='center'>
            <Col xs={24} sm={16}>
                <Form
                    form={form}
                    {...formItemLayout}
                    initialValues={prevVal}
                    name="add_company"
                    autoComplete="off"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label="Billing Type"
                        name='BillType' 
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Billing Type!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Charge"
                        name='Charge' 
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Amount!',
                            },
                        ]}>
                        <InputNumber />
                    </Form.Item>

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
  )
}

export default AddBillingType