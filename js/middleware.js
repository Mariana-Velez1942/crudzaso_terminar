// middleware.js

(function () {
    const user = sessionStorage.getItem('activeUser');
  
    if (!user) {
      // Si no hay sesión, redirige al login
      alert('Debes iniciar sesión para acceder a esta página.');
      window.location.href = 'login.html';
    }
  })();
  