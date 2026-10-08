const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_URL = `${BASE}/get-auth-token/`;
export const DATA_URL = `${BASE}/api/details/`;
export const REGISTER_URL = `${BASE}/api/register/`;