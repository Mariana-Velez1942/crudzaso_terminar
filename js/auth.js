
// REGISTRO DE USUARIO

const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!fullName || !username || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();

      const userExists = users.find(
        u => u.username === username || u.email === email
      );

      if (userExists) {
        alert("El usuario o correo ya está en uso.");
        return;
      }

      const newUser = {
        fullName,
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      };

      const createRes = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (createRes.ok) {
        alert("¡Registro exitoso! Serás redirigido al login.");
        window.location.href = 'login.html';
      } else {
        alert("Error al registrar el usuario.");
      }

    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  });
}


// INICIO DE SESIÓN
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const identifier = document.getElementById('identifier').value.trim(); // username o email
    const password = document.getElementById('login-password').value;

    if (!identifier || !password) {
      alert("Debes completar todos los campos.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/users');
      const users = await res.json();

      // Buscar por username o email
      const user = users.find(
        u =>
          (u.username === identifier || u.email === identifier) &&
          u.password === password
      );

      if (user) {
        // Guardar sesión en sessionStorage
        sessionStorage.setItem('activeUser', JSON.stringify(user));
        alert("Inicio de sesión exitoso.");
        window.location.href = 'dashboard.html';
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  });
}
