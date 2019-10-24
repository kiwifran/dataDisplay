export const ADD_HOUSELIST = "ADD_HOUSELIST";
export const FOCUS_ONEPROPERTY = "FOCUS_ONEPROPERTY";
// export const ADD_POPUPINFO = "ADD_POPUPINFO";

export function addHouselist(propertyList, mapCenterLon, mapCenterLat) {
	return {
		type: ADD_HOUSELIST,
		propertyList,
		mapCenterLat,
		mapCenterLon
	};
}
// export function addPopupInfo(popupInfo) {
// 	return {
// 		type: ADD_POPUPINFO,
// 		popupInfo
// 	};
// }
export function focusOneProperty(propertyDetails, index) {
	return {
		type: FOCUS_ONEPROPERTY,
		index,
		propertyDetails
	};
}
