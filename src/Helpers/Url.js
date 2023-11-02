/**
 * @desc: api url
 */

// url for sthaniya yatayat
// const API_URL = `http://lunivacare.ddns.net/LunivaRouteAPI/`

// url for pokhara yatayat

// const API_URL = `http://lunivacare.ddns.net/LunivaRouteAPIUAT/`;
const API_URL = `http://192.168.100.34/LunivaRoutePOKAPI/`;

/**
 * @desc: api base url with route
 */
export const BASE_URL = `${API_URL}LunivarouteManagementApi/`

// Counter Service
/**
 * @desc: Insert Update Counter Details
 * @param: {
  "CId": 1,
  "CounterName": "sample string 2",
  "CounterLocation": "sample string 3",
  "EntryDate": "2022-06-13T11:17:04.4329176+05:45",
  "IsActive": true,
  "CompanyId": 6
  }
 */
export const InsertUpdateCounterDetails = 'InsertUpdateCounterDetails'

/**
 * @desc: get counter details
 */
export const GetCounterDetails = 'GetCounterDetails'
// Counter Service

//Vehicles Service
/**
 * @desc: InsertUpdateVehicleDetails 
 * @param: {
  "VId": 1,
  "VehicleNumber": "sample string 2",
  "VehicleType": 3,
  "CompanyId": 4,
  "EntryDate": "2022-06-13T11:54:34.5111413+05:45",
  "UserId": 6,
  "IsActive": true
  }
 */
export const InsertUpdateVehicleDetails = 'InsertUpdateVehicleDetails'

/**
 * @desc: Get Vehicle Details By VId
 * @param: ?vehicleId=0 (in url)
 */
export const GetVehicleDetailsByVId = 'GetVehicleDetailsByVId'

/**
 * @desc: Get Vehicle Registration By VId
 * @param: ?vehicleId=0 (in url)
 */
export const GetVehicleRegistrationByVehicleId = 'GetVehicleRegistrationByVehicleId'

/**
 * @desc: Insert Update Vehicle Type
 * @param: {
  "VId": 1,
  "VechicleType": "sample string 2",
  "IsActive": true
}
 */
export const InsertUpdateVehicleType = 'InsertUpdateVehicleType'

//Vehicles Service
export const InsertUpdateBillingType = 'InsertUpdateBillingType'
//Vehicle Owner Details
/**
 * @desc: Insert Update Vehicle Owner Details
 * @param: {
  "OId": 1,
  "OwnerName": "sample string 2",
  "OwnerAddress": "sample string 3",
  "OwnerContactNumber": "sample string 4",
  "OwnerMobileNumber": "sample string 5",
  "OwnerEmailId": "sample string 6",
  "VehicleId": 7,
  "UserId": 8,
  "EntryDate": "2022-06-13T11:39:42.1253227+05:45",
  "IsActive": true,
  "CompanyId": 11,
  "Remarks": "sample string 12"
  }
 */
export const InsertUpdateVehicleOwnerDetails = 'InsertUpdateVehicleOwnerDetails'

/**
 * @desc: Get Vehicle Owner Details By Vehicle Id
 * @param: ?vehicleId=0 (in url)
 */
export const GetVehicleOwnerDetailsByVehicleId = 'GetVehicleOwnerDetailsByVehicleId'

/**
 * @desc: Get Vehicle Owner Details By owner Id
 * @param: ?ownerId=0 (in url)
 */
export const GetOwnerDetailsByOwnerId = 'GetOwnerDetailsByOwnerId'
//Vehicle Owner Details

//Vehicle Staff Details
/**
 * @desc: Insert Update Vehicle Staff Details
 * @param: {
  "VsId": 1,
  "VehicleId": 2,
  "StaffName": "sample string 3",
  "StaffContactNumber": "sample string 4",
  "StaffTypeId": 5,
  "EntryDate": "2022-06-13T12:20:59.6294257+05:45",
  "UserId": 7,
  "IsActive": true,
  "CompanyId": 9,
  "Remarks": "sample string 10"
  }
 */
export const InsertUpdateVehicleStaffDetails = 'InsertUpdateVehicleStaffDetails'

/**
 * @desc: Get Staff Details By VehicleId
 * @param: ?vehicleId=0 (in url)
 */
export const GetStaffDetailsByVehicleId = 'GetStaffDetailsByVehicleId'

/**
 * @desc: Get Staff Details By staff Id
 * @param: ?staffId=0 (in url)
 */
export const GetStaffDetailsByStaffId = 'GetStaffDetailsByStaffId'
//Vehicle Staff Details

//Route Details
/**
 * @desc: Insert Update Route Details
 * @param: {
  "DId": 1,
  "VehicleId": 2,
  "RouteId": 3,
  "EntryDate": "2022-06-13T12:26:21.8163383+05:45",
  "RouteDate": "2022-06-13T12:26:21.8163383+05:45",
  "CounterId": 6,
  "UserId": 7,
  "IsActive": true,
  "Remarks": "sample string 9",
  "CompanyId": 10,
  "ReceiptAmt": 11.0
  }
 */
export const InsertUpdateRouteDetails = 'InsertUpdateRouteDetails'

/**
 * @desc: get route details by datewise
 * @param:?companyid=0
 */
export const GetRouteDetailsByCompanyId = 'GetRouteDetailsByCompanyId'

/**
 * @desc: get route details by datewise
 * @param:?routeday= //
 */
export const GetRouteDetailsByDateWise = 'GetRouteDetailsByDateWise'

/**
 * @desc: Get Vehiclewise Route Details By RouteId 
 * @param: ?routeId=0 (in url)
 */
export const GetVehiclewiseRouteDetailsByRouteId = 'GetVehiclewiseRouteDetailsByRouteId'
//Route Details

//User Details
/**
 * @desc: Insert Update User Details
 * @param: {
  "UId": 1,
  "UserFullName": "sample string 2",
  "UserName": "sample string 3",
  "UserPassword": "sample string 4",
  "UserContactNumber": "sample string 5",
  "UserEmail": "sample string 6",
  "RoleId": 7,
  "EntryDate": "2022-06-13T12:28:10.7791748+05:45",
  "UserId": 9,
  "IsActive": true,
  "CompanyId": 11
  }
 */
export const InsertUpdateUserDetails = 'InsertUpdateUserDetails'

/**
 * @desc: Get User Details
 * @param: ?userId={userId}
 */
export const GetUserDetails = 'GetUserDetails'

/**
 * @desc: Check Duplicate User name
 * @param: ?username={username}
 */
export const CheckDuplicateUserNameorNot = 'CheckDuplicateUserNameorNot'

/**
 * @desc: Check Duplicate User name
 * @param: ?password={password}&userId={userId}&resetBy={resetBy}&remarks={remarks}
 */
export const ResetUserPasswordbyUserorAdmin = 'ResetUserPasswordbyUserorAdmin'
//User Details

//Misc Service
/**
 * @desc: Get Staff Type
 */
export const GetStaffType = 'GetStaffType'

/**
 * @desc: Get Role Details
 */
export const GetRoleDetails = 'GetRoleDetails'

/**
 * @desc: Get Company Details
 */
export const GetCompanyDetails = 'GetCompanyDetails'

/**
 * @desc: Get Vehicle Type
 */
export const GetVehicleType = 'GetVehicleType'
export const GetBillingType = 'GetBillingType'


/**
 * @desc: Get Datewise Collection Details
 * @param: ?fromdate={fromdate}&todate={todate} (in url)
 */
export const GetDatewiseCollectionDetails = 'GetDatewiseCollectionDetails'

/**
 * @desc: Get Datewise Registered Vehicle Details
 * @param: ?fromdate={fromdate}&todate={todate}&companyId= (in url)
 */
export const GetRegisteredVehicleDetailsBydate = 'GetRegisteredVehicleDetailsBydate'

/**
 * @desc: Get Date wise Collection Details By Counter
 * @param: ?fromdate={fromdate}&todate={todate}&counterid={counterid}&comapnyid={comapnyid} (in url)
 */
export const GetDatewiseCollectionDetailsByCounter = 'GetDatewiseCollectionDetailsByCounter'

/**
* @desc: Get Counter Wise Total Collection Amt
* @param: ?fromdate={fromdate}&todate={todate}&comapnyid={comapnyid} (in url)
*/
export const GetCounterWiseTotalCollectionAmt = 'GetCounterWiseTotalCollectionAmt'

/**
* @desc: Get Route Wise Assigned Vehicle Count By Date
* @param: ?routeDate={routeDate}&companyId={companyId}
*/
export const GetRouteWiseAssignedVehicleCountByDate = 'GetRouteWiseAssignedVehicleCountByDate'

/**
 * @desc: Check Valid Login
 * @param: ?username={username}&password={password} (in url)
 */
export const CheckValidLogin = 'CheckValidLogin'
//Misc Service

//company service
/**
 * @desc: insert update company // only for super admin
 * @param: {
  "CId": 1,
  "CompanyName": "sample string 2",
  "CompanyAddress": "sample string 3",
  "CompanyPhoneNumber": "sample string 4",
  "CompanyEmailId": "sample string 5",
  "CompanyPanId": "sample string 6",
  "CompanyWebsite": "sample string 7",
  "UserId": 8,
  "EntryDate": "2022-06-26T11:26:23.2450243+05:45",
  "IsActive": true
}
 */
export const InsertUpdateCompanyDetails = 'InsertUpdateCompanyDetails'

//staff service
/**
 * @desc: Insert Update Staff Type
 * @param: {
  "StId": 1,
  "StaffType": "sample string 2",
  "IsActive": true
}
 */
export const InsertUpdateStaffType = 'InsertUpdateStaffType'

//role service
/**
 * @desc: Insert Update role
 * @param: {
  "RId": 1,
  "RoleType": "sample string 2",
  "IsActive": true
}
 */
export const InsertUpdateRole = 'InsertUpdateRole'

/**
 * @desc: Cancel Assigned Route Of Vehicle By Admin
 * @param: ?vehicleid={vehicleid}&receiptid={receiptid}&remarks={remarks}
 */
export const CancelAssignedRouteOfVehicleByAdmin = 'CancelAssignedRouteOfVehicleByAdmin'

export const getRouteAssignedDetailsByDateandUserId = 'GetRouteAssignedDetailsByDateandUserId'

// @desc: GetRouteAssignedDetailsByDateandUserId

export const getRouteAssignedTotalAmountByDateandUserId = 'GetRouteAssignedTotalAmountByDateandUserId'

// @desc: GetRouteAssignedTotalAmountByDateandUserId
// @param: fromdate={fromdate}&todate={todate}&companyId={companyId}&userId={userId}


export const getReservationDetailsByDateForWeb = 'GetAllReservationDetailsByDateForWeb';

// @desc: GetReservationDetailsByDate
// @param: ?fromdate={fromdate}&todate={todate}



export const InsertUpdateReserveDetails = 'InsertUpdateReserveDetails';