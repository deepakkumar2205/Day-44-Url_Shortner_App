import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("x-Auth-token");
  if (isAuth) {
    return <section>
      {children}
    </section>;
  } else {
    return <Navigate replace to='/' />;
  }
}

export default ProtectedRoute ;