import React from 'react'
import { Form, Input } from 'antd'
import { BsSearch } from "react-icons/bs"

const Filter = () => {
  return (
    <>
      <Form.Item
        name="search"
      >
        <Input
          suffix={<BsSearch className="site-form-item-icon" />}
          // type="password"
          placeholder="search"
        />
      </Form.Item>
    </>
  )
}

export default Filter