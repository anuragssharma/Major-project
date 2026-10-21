import api from '../api/axios';

// Toggle user status (Option B: Suspend / Activate)
export const toggleUserStatus = async (id, status) => {
  return await api.patch(`/users/${id}/status`, { status });
};
export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const fetchUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};