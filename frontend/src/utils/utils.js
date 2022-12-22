export const getTokenHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};
