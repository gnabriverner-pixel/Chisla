import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { calculateDigitalCode } from "../services/calculationService";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { motion } from "motion/react";

export function CalculatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    name: "",
    gender: "",
    placeOfBirth: "",
    intention: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dateOfBirth) return;

    setLoading(true);
    try {
      const report = calculateDigitalCode(formData);
      
      let guestSessionId = sessionStorage.getItem('guestSessionId');
      if (!auth.currentUser && !guestSessionId) {
        guestSessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('guestSessionId', guestSessionId);
        await setDoc(doc(db, "guest_sessions", guestSessionId), {
          sessionId: guestSessionId,
          createdAt: new Date().toISOString()
        });
      }

      const docRef = await addDoc(collection(db, "reports"), {
        userId: auth.currentUser?.uid || null,
        guestSessionId: auth.currentUser ? null : guestSessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputData: report.inputData,
        numbers: report.numbers,
        synthesis: report.synthesis,
        premiumUnlocked: false,
        status: "active"
      });

      navigate(`/result/${docRef.id}`);
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Произошла ошибка при расчете. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-gold-400">Расчет Цифрового Кода</CardTitle>
            <p className="text-sm text-gray-400 mt-2">Введите данные для построения вашей архитектуры</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Дата рождения *
                </label>
                <Input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Имя (необязательно)
                </label>
                <Input
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Пол (необязательно)
                </label>
                <select
                  className="flex h-12 w-full rounded-md border border-dark-700 bg-dark-800/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500/50"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Не указан</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Запрос / Намерение (необязательно)
                </label>
                <Input
                  type="text"
                  placeholder="Что вы хотите прояснить?"
                  value={formData.intention}
                  onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
                />
              </div>

              <Button 
                type="submit" 
                variant="gold" 
                className="w-full mt-6"
                disabled={loading || !formData.dateOfBirth}
              >
                {loading ? "Анализ данных..." : "Рассчитать"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
