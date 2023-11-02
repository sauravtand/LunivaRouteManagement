import { MdAssignment, MdDashboard, MdDateRange } from 'react-icons/md'
import { IoDocument } from 'react-icons/io5'
import { BsGearFill, BsCommand, BsCashCoin } from 'react-icons/bs'
import { FaUserAlt, FaBusAlt, FaUserCheck, FaUserFriends, FaUserEdit, FaCarAlt, FaScroll, FaUserTie } from 'react-icons/fa'
import { TbRoute, TbRouteOff } from 'react-icons/tb'
import { GiBusStop } from 'react-icons/gi'
import { useRoleRights } from './GetRoleRightsHook'

export const useNavData = () => {
    const roleAndRights = useRoleRights()

    const registerNav = [
        {
            id: 5,
            name: 'Vehicle',
            icon: FaBusAlt,
            pathname: '/vehicle',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 6,
            name: 'Vehicle Owner',
            icon: FaUserCheck,
            pathname: '/vehicleowner',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 7,
            name: 'Vehicle Staff',
            icon: FaUserFriends,
            pathname: '/vehiclestaff',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
    ]

    const settingsNav = [
        {
            id: 8,
            name: 'Counter',
            icon: GiBusStop,
            pathname: '/counter',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 9,
            name: 'Route Details',
            icon: TbRoute,
            pathname: '/croutedetails',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 10,
            name: 'User',
            icon: FaUserAlt,
            pathname: '/user',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 15,
            name: 'Company',
            icon: BsCommand,
            pathname: '/company',
            exact: 'true',
            showTab: roleAndRights.showOnlySuperAdmin,
        },
        {
            id: 16,
            name: 'Vehicle Type',
            icon: FaCarAlt,
            pathname: '/vehicletype',
            exact: 'true',
            showTab: roleAndRights.showOnlySuperAdmin,
        },
        {
            id: 17,
            name: 'Staff Type',
            icon: FaUserTie,
            pathname: '/stafftype',
            exact: 'true',
            showTab: roleAndRights.showOnlySuperAdmin,
        },
        {
            id: 18,
            name: 'Role Type',
            icon: FaScroll,
            pathname: '/roletype',
            exact: 'true',
            showTab: roleAndRights.showOnlySuperAdmin,
        },
        {
            id: 19,
            name: 'Cancel Route',
            icon: TbRouteOff,
            pathname: '/droutedetails',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 20,
            name: 'Cancel Reservation',
            icon: TbRouteOff,
            pathname: '/cancelReservation',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
        },
        {
            id: 21,
            name: 'Billing Type',
            icon: FaCarAlt,
            pathname: '/billingtype',
            exact: 'true',
            showTab: roleAndRights.showOnlySuperAdmin,
        },
    ]

    const reportNav = [
        {
            id: 11,
            name: 'Date wise Collection',
            icon: MdDateRange,
            pathname: '/collectiondetail',
            exact: 'true',
            showTab: true,
        },
        {
            id: 12,
            name: 'Registered Vehicle',
            icon: FaBusAlt,
            pathname: '/vehicledetail',
            exact: 'true',
            showTab: true,
        },
        {
            id: 13,
            name: 'Counter Collection',
            icon: GiBusStop,
            pathname: '/counterdetail',
            exact: 'true',
            showTab: true,
        },
        {
            id: 14,
            name: 'Counter Total Amount',
            icon: GiBusStop,
            pathname: '/countertotaldetail',
            exact: 'true',
            showTab: true,
        },
        {
            id: 15,
            name: 'User Total Amount',
            icon: BsCashCoin,
            pathname: '/totalAmount',
            exact: 'true',
            showTab: true
        },
        {
            id: 16,
            name: 'Reservation Details',
            icon: MdAssignment,
            pathname: '/reservationDetails',
            exact: 'true',
            showTab: true

        }
    ]


    const navData = [
        {
            id: 1,
            name: 'Dashboard',
            icon: MdDashboard,
            pathname: '/',
            exact: 'true',
            showTab: true,
            hasSubMenu: false
        },
        {
            id: 2,
            name: 'Registration',
            icon: FaUserEdit,
            pathname: '/registration',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
            hasSubMenu: true,
            subData: registerNav
        },
        {
            id: 3,
            name: 'Reports',
            icon: IoDocument,
            pathname: '/reports',
            exact: 'true',
            showTab: true,
            hasSubMenu: true,
            subData: reportNav
        },
        {
            id: 4,
            name: 'Settings',
            icon: BsGearFill,
            pathname: '/settings',
            exact: 'true',
            showTab: roleAndRights.showSuperAdminAndAdmin,
            hasSubMenu: true,
            subData: settingsNav
        },
    ]

    return {
        navData: navData,
        settingsNav: settingsNav,
        reportNav: reportNav,
        registerNav: registerNav
    }

}