import { DatePicker } from 'antd'
// import moment from 'moment'
import { dateFormat } from '../../Helpers/TodayDate'

export const DefaultTodayPicker = () => {
    return (
        <DatePicker
            // defaultValue={moment()}
            format={dateFormat}
            style={{ width: '100%' }}
        />
    )
}