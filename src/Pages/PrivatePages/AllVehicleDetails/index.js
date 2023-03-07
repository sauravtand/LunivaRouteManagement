import { useCallback, useState } from "react"
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings"
import useSingleCompany from "../../../Helpers/SetDefaultCompany"
import VehicleDetails1 from "./VehicleDetails1"
import VehicleOwner2 from "./VehicleOwner2"
import VehicleStaff3 from "./VehicleStaff3"
import { useNavigate } from 'react-router-dom';
import { dateFormat } from "../../../Helpers/TodayDate"
import moment from 'moment'
import useToken from "../../../CustomHooks/useToken"

const AllVehicleInsert = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [step, setStep] = useState(1)
    const [vehicleDetailsNumberPrev, setVehicleDetailsNumberPrev] = useState(0)
    const [ownerDetailsNumberPrev, setOwnerDetailsNumberPrev] = useState(0)
    const [staffDetailsNumberPrev, setStaffDetailsNumberPrev] = useState(0)
    const appDefSet = AppDefaultSettings.showSingleCompany
    const appDefDate = AppDefaultSettings.showEntryDate
    const appDefNep = AppDefaultSettings.removeFromNepali
    const defaultCompany = useSingleCompany(0, appDefSet)
    const forEditEntryDate = moment().format(dateFormat);
    const {token} = useToken()
    
    const handleNextStep = useCallback(
        (data) => {
            setData(data);
            setStep(step + 1);
        },
        [step]
    );

    const handlePrevStep = useCallback(
        (data) => {
            setData(data);
            setStep(step - 1);
        },
        [step]
    );

    const handleFinalSubmit = useCallback((data) => {
        setData(data);
        navigate('/admin/vehicle')
    }, [navigate]);

    const vehicleDetailsNumber = useCallback((data) => {
        setVehicleDetailsNumberPrev(data);
    }, [])

    const ownerDetailsNumber = useCallback((data) => {
        setOwnerDetailsNumberPrev(data);
    }, [])

    const staffDetailsNumber = useCallback((data) => {
        setStaffDetailsNumberPrev(data);
    }, [])

    return (
        <>
            <div className="text-center">
                <h2>Step {step} of 3</h2>
            </div>
            {
                step === 1 &&
                <VehicleDetails1
                    data={data}
                    onSuccess={handleNextStep}
                    vehicleDetailsNumber={vehicleDetailsNumber}
                    prevVal={vehicleDetailsNumberPrev}
                    appDefSet={appDefSet}
                    appDefDate={appDefDate}
                    defaultCompany={defaultCompany}
                    forEditEntryDate={forEditEntryDate}
                    forEdit={vehicleDetailsNumberPrev !== 0 ? true : false}
                    token={token.Um}
                    appDefNep={appDefNep}
                />
            }
            {
                step === 2 &&
                <VehicleOwner2
                    data={data}
                    onBack={handlePrevStep}
                    onSuccess={handleNextStep}
                    vehicleDetailsNumberPrev={vehicleDetailsNumberPrev}
                    ownerDetailsNumber={ownerDetailsNumber}
                    appDefSet={appDefSet}
                    appDefDate={appDefDate}
                    defaultCompany={defaultCompany}
                    forEditEntryDate={forEditEntryDate}
                    ownerDetailsNumberPrev={ownerDetailsNumberPrev}
                    forEdit={ownerDetailsNumberPrev !== 0 && vehicleDetailsNumberPrev !== 0 ? true : false}
                    token={token.Um}
                    appDefNep={appDefNep}
                />
            }
            {
                step === 3 &&
                <VehicleStaff3
                    data={data}
                    onBack={handlePrevStep}
                    onSuccess={handleFinalSubmit}
                    vehicleDetailsNumberPrev={vehicleDetailsNumberPrev}
                    staffDetailsNumber={staffDetailsNumber}
                    appDefSet={appDefSet}
                    appDefDate={appDefDate}
                    defaultCompany={defaultCompany}
                    forEditEntryDate={forEditEntryDate}
                    staffDetailsNumberPrev={staffDetailsNumberPrev}
                    token={token.Um}
                    appDefNep={appDefNep}
                />
            }
        </>
    )

}

export default AllVehicleInsert