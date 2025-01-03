export const getAuthData = () => {
    if (typeof window !== 'undefined') {
      const authDataString = localStorage.getItem('authUser');
      return authDataString ? JSON.parse(authDataString) : null;
    }
    return null;
};

export const setAuthData = (data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authUser", JSON.stringify(data));
  }
};