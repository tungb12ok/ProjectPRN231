import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const shipmentPersistConfig = {
    key: "shipment",
    storage,
};

const initialState = {
  shipment: [],
  selectedShipments: null,
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {
        setShipment: (state, action) => {
            state.shipment = action.payload;
        },
        selectShipments: (state, action) => {
            state.selectedShipments = action.payload;
        },
        updateShipment: (state, action) => {
            const index = state.shipment.findIndex(shipment => shipment.id === action.payload.id);
            if (index !== -1) {
                state.shipment[index] = action.payload;
            }
        },
    },
});

export const { setShipment, selectShipments, updateShipment } = shipmentSlice.actions;

export const selectShipment = (state) => state.shipment?.shipment || [];
export const selectedShipment = (state) => state.shipment.selectedShipments;

export default persistReducer(shipmentPersistConfig, shipmentSlice.reducer);
