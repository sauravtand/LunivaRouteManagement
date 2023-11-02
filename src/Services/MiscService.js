import { fetch } from "../Helpers/HttpUtil";
import { GetBillingType, GetCompanyDetails, GetRoleDetails, GetStaffType, GetVehicleType } from "../Helpers/Url";

export const getStaffTypeApi = async (successCallback) => {
    try {
        const response = await fetch(GetStaffType);
        if (response?.status === 200) {
            successCallback(response?.data?.StaffType)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getRoleDetailsApi = async (successCallback) => {
    try {
        const response = await fetch(GetRoleDetails);
        if (response?.status === 200) {
            successCallback(response?.data?.GetRoleDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getCompanyDetailsApi = async (successCallback) => {
    try {
        const response = await fetch(GetCompanyDetails);
        if (response?.status === 200) {
            successCallback(response?.data?.GetCompanyDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getVehicleTypeDetailsApi = async (successCallback) => {
    try {
        const response = await fetch(GetVehicleType);
        if (response?.status === 200) {
            successCallback(response?.data?.GetVehicleType)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getBillingTypeDetailsApi = async (successCallback) => {
    try {
        const response = await fetch(GetBillingType);
        if (response?.status === 200) {
             successCallback(response?.data?.BillingType)
            //successCallback(["aayo"])
        } else
            successCallback(["aayena"])
    } catch (error) {
        successCallback([])
    }
}


