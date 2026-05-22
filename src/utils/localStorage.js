export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserId = () => {
  const token = getToken();

  // 1. Split the token and grab the payload (middle part)
  const base64Url = token.split(".")[1];

  // 2. Fix base64url padding replacements
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // 3. Decode base64 to string and parse JSON
  const response = JSON.parse(atob(base64));
  return response.user_id;
};
