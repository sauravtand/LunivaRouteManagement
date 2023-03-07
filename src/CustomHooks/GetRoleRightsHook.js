import { AppDefaultSettings } from "../Config/AppDefaultSettings"
import useToken from "./useToken"

export const useRoleRights = () => {
    const { token } = useToken()
    const appSettings = AppDefaultSettings

    return {
        showOnlySuperAdmin: token.Hm === appSettings.superAdminId,
        showOnlyAdmin: token.Hm === appSettings.adminId,
        showOnlyStaff: token.Hm === appSettings.staffId,
        showSuperAdminAndAdmin: token.Hm === appSettings.superAdminId || token.Hm === appSettings.adminId,
    }
}