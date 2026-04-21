import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuthState } from "../hooks/useAuthState";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function DashboardPage() {
  const { user, profile, loading } = useAuthState();
  const [reports, setReports] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      if (!user) return;
      try {
        const q = query(
          collection(db, "reports"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchReports();
  }, [user]);

  if (loading || fetching) {
    return <div className="flex-1 flex items-center justify-center">Загрузка...</div>;
  }

  if (!user) {
    return <div className="flex-1 flex items-center justify-center">Пожалуйста, войдите в систему.</div>;
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-gold-400 mb-2">Личный кабинет</h1>
          <p className="text-gray-400">Добро пожаловать, {profile?.displayName || user.email}</p>
        </div>
        <Link to="/calculate">
          <Button variant="gold">Новый расчет</Button>
        </Link>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serif text-gray-200">Мои разборы</h2>
          
          {reports.length === 0 ? (
            <Card className="bg-dark-800/40 border-dark-700 text-center py-12">
              <CardContent>
                <p className="text-gray-400 mb-4">У вас пока нет сохраненных разборов.</p>
                <Link to="/calculate">
                  <Button variant="outline">Сделать первый расчет</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-dark-800/60 border-dark-700 hover:border-gold-500/30 transition-colors">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-200 text-lg mb-1">
                        Разбор: {report.inputData?.name || "Без имени"} ({report.inputData?.dateOfBirth})
                      </h3>
                      <p className="text-sm text-gray-500">
                        Создан: {format(new Date(report.createdAt), "d MMMM yyyy", { locale: ru })}
                      </p>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${report.premiumUnlocked ? 'bg-gold-500/20 text-gold-400' : 'bg-dark-700 text-gray-300'}`}>
                          {report.premiumUnlocked ? 'Полный доступ' : 'Базовый доступ'}
                        </span>
                      </div>
                    </div>
                    <Link to={`/result/${report.id}`}>
                      <Button variant="outline" size="sm">Открыть</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-dark-800/40 border-dark-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-200">Профиль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-400">
              <div>
                <strong className="block text-gray-300 mb-1">Email</strong>
                {user.email}
              </div>
              <div>
                <strong className="block text-gray-300 mb-1">Статус аккаунта</strong>
                Базовый
              </div>
              {profile?.role === 'admin' && (
                <div className="pt-4 border-t border-dark-700">
                  <Link to="/admin">
                    <Button variant="outline" className="w-full">Панель администратора</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
