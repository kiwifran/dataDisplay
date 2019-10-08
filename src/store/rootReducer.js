import {
	ADD_HOUSELIST,
	FOCUS_ONEPROPERTY,
	ADD_POPUPINFO
} from "./actionCreators";

const initialState = {
	propertyList: [],
	mapCenterLon: null,
	mapCenterLat: null,
	popupInfo: null,
	index: null,
	propertyDetails: null
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_HOUSELIST:
			var newState = JSON.parse(JSON.stringify(state));
			return {
				...newState,
				propertyList: action.propertyList,
				mapCenterLon: action.mapCenterLon,
				mapCenterLat: action.mapCenterLat
			};
		case FOCUS_ONEPROPERTY:
			var newState = JSON.parse(JSON.stringify(state));
			return {
				...newState,
				index: action.index,
				propertyDetails: action.propertyDetails
			};
		case ADD_POPUPINFO:
			var newState = JSON.parse(JSON.stringify(state));
			return {
				...newState,
				popupInfo: action.popupInfo
			};
		default:
			return state;
	}
}
