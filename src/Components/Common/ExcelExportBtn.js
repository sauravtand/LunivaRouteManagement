import { Button } from "antd"
import { CSVLink } from "react-csv"
import { SiMicrosoftexcel } from 'react-icons/si'
import { GrPrint } from 'react-icons/gr'
import PrintButton from "./PrintButton"

export const ExcelExportBtn = (props) => {
    const { dataSource, filename, dataHead, Title, filterData } = props
    return (
        <>
            {
                dataSource.length > 0 &&
                (
                    <div style={{ display: 'flex' }}>
                        <Button type="primary" htmlType="button">
                            <CSVLink
                                data={dataSource}
                                filename={filename}
                                target="_blank"
                            >
                                <SiMicrosoftexcel />&nbsp;Excel Export
                            </CSVLink>
                        </Button>
                        <div style={{ marginLeft: '20px', color: 'white' }}>

                            <PrintButton dataSource={dataSource} dataHead={dataHead} Title={Title} filterData={filterData} />
                        </div>


                    </div>
                )
            }
        </>
    )
}