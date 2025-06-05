const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || !role) {
  window.location.href = 'login.html';
}

async function loadProfile() {
  try {
    const res = await fetch(`http://localhost:5000/api/${role === 'patient' ? 'patients' : 'doctors'}/profile`, {
      headers: { 'Authorization': token }
    });
    if (!res.ok) throw new Error('Failed to load profile');

    const profile = await res.json();
    const contentDiv = document.getElementById('content');

    if (role === 'patient') {
      contentDiv.innerHTML = `
        <h3>Patient Profile</h3>
        <p>Name: ${profile.first_name} ${profile.last_name}</p>
        <p>Email: ${profile.email}</p>
        <p>Phone: ${profile.phone || 'N/A'}</p>
        <p>Address: ${profile.address || 'N/A'}</p>
      `;
    } else {
      contentDiv.innerHTML = `
        <h3>Doctor Profile</h3>
        <p>Name: ${profile.name}</p>
        <p>Email: ${profile.email}</p>
        <p>Specialization: ${profile.specialization || 'N/A'}</p>
      `;
    }
  } catch (err) {
    alert('Error loading profile');
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
});

loadProfile();
