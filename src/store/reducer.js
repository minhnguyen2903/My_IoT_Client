import {combineReducers} from 'redux';

const initState = {
  responseData: {
    output0: false,
    output1: false,
    output2: false,
    ledMode: "case1",
  },
  clientData: {
    output0: false,
    output1: false,
    output2: false,
    sensor: [{
      name: "KHÍ GAS",
      value: 0,
      unit: "%",
    },
    {
      name: "NHIỆT DỘ",
      value: 0,
      unit: "°C",
    }],
    sensorData: [
      {
        name: "KHÍ GAS",
      data: [
        {
          value: 0,
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          value: 10,
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          value: 32,
          createdAt: "2020-02-01T00:00:00.000Z",
        },
        {
          value: 20,
          createdAt: "2020-03-01T00:00:00.000Z",
        }
      ]
      },
      {
        name: "NHIỆT DỘ",
        data: [
        {
          value: 0,
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          value: 23,
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          value: 50,
          createdAt: "2020-02-01T00:00:00.000Z",
        },
        {
          value: 10,
          createdAt: "2020-03-01T00:00:00.000Z",
        }
        ]
      }
    ],
    ledMode: "case1",
    lastRequest: 0
  },
}

const initialDrawer = {
  open: true,
  active: 1,
}

export const DataReduer = (state = initState, action) => {
  switch (action.type) {
    case "INIT_DATA":
      return {
        ...state,
        responseData: action.payload.responseData,
        clientData: action.payload.clientData,
      }
    default:
      return state;
  }
}

export const DrawerReduer = (state = initialDrawer, action) => {
  switch (action.type) {
    case "HANDLE_DRAWER":
      return {
        ...state,
        open: !state.open,
      }
    case "HANDLE_DRAWER_ACTIVE":
      return {
        ...state,
        active: action.payload,
      }
    default:
      return state;
  }
}

const reducer = combineReducers({data: DataReduer, drawer: DrawerReduer});

export default reducer;