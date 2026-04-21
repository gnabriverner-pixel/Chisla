import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const saveReportId = searchParams.get("saveReport");
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const attachGuestData = async (userId: string) => {
    const guestSessionId = sessionStorage.getItem("guestSessionId");
    if (!guestSessionId) return;

    try {
      // Update guest session
      await updateDoc(doc(db, "guest_sessions", guestSessionId), {
        attachedUserId: userId,
        lastSeenAt: new Date().toISOString()
      });

      // Update all reports for this guest session
      const q = query(collection(db, "reports"), where("guestSessionId", "==", guestSessionId));
      const querySnapshot = await getDocs(q);
      
      const updatePromises = querySnapshot.docs.map(reportDoc => 
        updateDoc(doc(db, "reports", reportDoc.id), {
          userId: userId,
          updatedAt: new Date().toISOString()
        })
      );
      
      await Promise.all(updatePromises);
      
      // Clear guest session
      sessionStorage.removeItem("guestSessionId");
    } catch (err) {
      console.error("Error attaching guest data:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userCred;
      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          email: userCred.user.email,
          displayName: name,
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      await attachGuestData(userCred.user.uid);

      if (saveReportId) {
        // Just in case it wasn't caught by the guest session logic
        await updateDoc(doc(db, "reports", saveReportId), {
          userId: userCred.user.uid,
          updatedAt: new Date().toISOString()
        });
        navigate(`/result/${saveReportId}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-gold-400">
            {isLogin ? "Вход в кабинет" : "Регистрация"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-400/10 rounded-md border border-red-400/20">
                {error}
              </div>
            )}
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Имя</label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" variant="gold" className="w-full mt-6" disabled={loading}>
              {loading ? "Подождите..." : isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Создать" : "Войти"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
