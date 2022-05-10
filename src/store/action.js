import dispatch from "redux";


export const InitData = (payload) => {
  return {
    type: "INIT_DATA",
    payload,
  }
}

export const handleDrawer = () => {
  return {
    type: "HANDLE_DRAWER",
  }
}

// handleDrawerActive
export const handleDrawerActive = (payload) => {
  return {
    type: "HANDLE_DRAWER_ACTIVE",
    payload,
  }
}