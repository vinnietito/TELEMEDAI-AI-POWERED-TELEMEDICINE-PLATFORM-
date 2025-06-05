const API = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || !role) window.location.href = 'login.html';

document.getElementById('welcome').innerText = `Welcome, ${role}`;

fetch(`${API}/${role}s/profile`, {
  headers: { 'Authorization': token }
})
  .then(res => res.json())
  .then(data => {
    document.getElementById('content').innerHTML = `
      <h3>Your Profile</h3>
      <p>Name: ${data.first_name || data.name} ${data.last_name || ''}</p>
      <p>Email: ${data.email}</p>
    `;
  });

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
