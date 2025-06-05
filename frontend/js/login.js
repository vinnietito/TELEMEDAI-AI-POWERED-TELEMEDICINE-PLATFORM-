document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const role = document.getElementById('role').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('message').textContent = data.error || 'Login failed';
    }
  } catch (err) {
    document.getElementById('message').textContent = 'Error connecting to server';
  }
});
