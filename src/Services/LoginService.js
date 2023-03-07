import { fetch } from "../Helpers/HttpUtil";
import { CheckValidLogin } from "../Helpers/Url";

export const getValidLoginApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${CheckValidLogin}?username=${data.username}&password=${data.password}`);
        if (response?.status === 200) {
            successCallback(response?.data?.UserDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}