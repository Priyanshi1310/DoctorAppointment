const react_base_url = import.meta.env.REACT_APP_BASE_URL;

export const BASE_URL = react_base_url || "http://localhost:3000/api/v1";
export const token = localStorage.getItem('token')