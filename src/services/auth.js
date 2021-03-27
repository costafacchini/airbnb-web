const TOKEN_KEY = "@airbnb-Token";

export function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function login(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

export function logout () {
  return localStorage.removeItem(TOKEN_KEY);
}
