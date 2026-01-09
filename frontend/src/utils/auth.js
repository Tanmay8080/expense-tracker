// Save users in localStorage (for interview demo purpose)

export const signup = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    alert("User already exists");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("token", "dummy-jwt-token");
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
