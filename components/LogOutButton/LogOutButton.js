
const LogoutButton = () => {

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('jwtToken');
   
    
    // Redirect or update UI
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;