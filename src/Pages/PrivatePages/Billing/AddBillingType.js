import {
  Button,
  Form,
  Input,
  Switch,
  Row,
  Col,
  Card,
  message,
  InputNumber
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

const AddBillingType = (props) => {
  const [form] = Form.useForm()
  const { forEdit } = props
  const [prevVal, setPrevVal] = useState({})
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  const [butDis, setButDis] = useState(false);
  const [searchParams] = useSearchParams();
  const VId = searchParams.get('q')
  const { i18n } = useTranslation();
  const appDefNep = AppDefaultSettings.removeFromNepali


  const onFinish = (values) => {
    setIsButtonLoad(true)
    setButDis(true)
    let data = {
     "BillingType":values?.BillingType,
      "Amount": values?.Amount,
      "IsActive": values.IsActive === undefined || values.IsActive === true ? true : false,
  }

  console.log(data)
    
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
                        name='BillingType' 
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Billing Type!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name='Amount' 
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