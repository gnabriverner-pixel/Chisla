import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "@/src/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "@/src/hooks/useAuthState";
import { Button } from "./ui/Button";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-dark-800 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl text-gold-400 tracking-wide">
            Дом Самопознания
          </Link>
          <nav className="flex items-center gap-4">
            {!loading && user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Кабинет</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Войти</Button>
                </Link>
                <Link to="/calculate">
                  <Button variant="gold" size="sm">Рассчитать код</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer className="border-t border-dark-800 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Дом Самопознания. Метод «Цифровой Код».</p>
        <p className="mt-2 text-xs">Не является медицинской или психологической диагностикой.</p>
      </footer>
    </div>
  );
}
