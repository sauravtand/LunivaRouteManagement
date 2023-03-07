import { MdDashboard, MdDateRange, MdAssignment } from 'react-icons/md'
import { IoDocument } from 'react-icons/io5'
import { BsGearFill, BsCashCoin } from 'react-icons/bs'
import { FaUserAlt, FaBusAlt, FaUserCheck, FaUserFriends, FaUserEdit } from 'react-icons/fa'
import { TbRoute } from 'react-icons/tb'
import { GiBusStop } from 'react-icons/gi'

export const registerNav = [
    {
        id: 5,
        name: 'Vehicle',
        icon: FaBusAlt,
        pathname: '/vehicle',
        exact: 'true'
    },
    {
        id: 6,
        name: 'Vehicle Owner',
        icon: FaUserCheck,
        pathname: '/vehicleowner',
        exact: 'true'
    },
    {
        id: 7,
        name: 'Vehicle Staff',
        icon: FaUserFriends,
        pathname: '/vehiclestaff',
        exact: 'true'
    },
]

export const settingsNav = [
    {
        id: 8,
        name: 'Counter',
        icon: GiBusStop,
        pathname: '/counter',
        exact: 'true'
    },
    {
        id: 9,
        name: 'Route Details',
        icon: TbRoute,
        pathname: '/croutedetails',
        exact: 'true'
    },
    {
        id: 10,
        name: 'User',
        icon: FaUserAlt,
        pathname: '/user',
        exact: 'true'
    },
    {
        id: 15,
        name: 'Company',
        icon: FaUserAlt,
        pathname: '/company',
        exact: 'true',
        isSuper: true
    },
    {
        id: 16,
        name: 'Vehicle Type',
        icon: FaUserAlt,
        pathname: '/vehicletype',
        exact: 'true',
        isSuper: true
    },
    {
        id: 17,
        name: 'Staff Type',
        icon: FaUserAlt,
        pathname: '/stafftype',
        exact: 'true',
        isSuper: true
    },
    {
        id: 17,
        name: 'Role Type',
        icon: FaUserAlt,
        pathname: '/roletype',
        exact: 'true',
        isSuper: true
    },
    {
        id: 18,
        name: 'Cancel Route',
        icon: TbRoute,
        pathname: '/droutedetails',
        exact: 'true',
    },
    {
        id: 19,
        name: 'Cancel Reservation',
        icon: TbRoute,
        pathname: '/cancelReservation',
        exact: 'true',
    },
]

export const reportNav = [
    {
        id: 11,
        name: 'Date Collection',
        icon: MdDateRange,
        pathname: '/collectiondetail',
        exact: 'true'
    },
    {
        id: 12,
        name: 'Registered Vehicle',
        icon: FaBusAlt,
        pathname: '/vehicledetail',
        exact: 'true'
    },
    {
        id: 13,
        name: 'Counter Collection',
        icon: GiBusStop,
        pathname: '/counterdetail',
        exact: 'true'
    },
    {
        id: 14,
        name: 'Counter Total',
        icon: GiBusStop,
        pathname: '/countertotaldetail',
        exact: 'true'
    },
    {
        id: 15,
        name: 'Total Amount',
        icon: BsCashCoin,
        pathname: '/totalAmount',
        exact: 'true'
    },
    {
        id: 16,
        name: 'Reservation Details',
        icon: MdAssignment,
        pathname: '/reservationDetails',
        exact: 'true'
    }
]

export const navData = [
    {
        id: 1,
        name: 'Dashboard',
        icon: MdDashboard,
        pathname: '/',
        exact: 'true',
        hasSubMenu: false
    },
    {
        id: 2,
        name: 'Registration',
        icon: FaUserEdit,
        pathname: '/registration',
        exact: 'true',
        hasSubMenu: true,
        subData: registerNav
    },
    {
        id: 3,
        name: 'Reports',
        icon: IoDocument,
        pathname: '/reports',
        exact: 'true',
        hasSubMenu: true,
        subData: reportNav
    },
    {
        id: 4,
        name: 'Settings',
        icon: BsGearFill,
        pathname: '/settings',
        exact: 'true',
        hasSubMenu: true,
        subData: settingsNav
    },
]