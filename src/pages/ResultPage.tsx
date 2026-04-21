import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion } from "motion/react";
import { FullReport, NumberResult } from "../services/calculationService";

export function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<FullReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      if (!id) return;
      try {
        const docRef = doc(db, "reports", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setReport(docSnap.data() as FullReport);
        } else {
          setError("Отчет не найден");
        }
      } catch (err) {
        console.error(err);
        setError("Нет доступа к отчету");
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Загрузка архитектуры...</div>;
  }

  if (error || !report) {
    return <div className="flex-1 flex items-center justify-center text-red-400">{error}</div>;
  }

  const handleSaveClick = () => {
    navigate(`/login?saveReport=${id}`);
  };

  const renderNumberCard = (title: string, data: NumberResult) => {
    const voiceText = data.masteryVoiceMedium || data.masteryVoice;
    
    return (
      <Card className="bg-dark-800/40 border-dark-700 flex flex-col h-full">
        <CardHeader className="pb-4 border-b border-dark-700/50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-gray-200">{title}</CardTitle>
              <div className="text-xs text-gray-500 mt-1 font-mono tracking-wider">{data.chain}</div>
            </div>
            <span className="text-4xl font-serif text-gold-400">{data.reduced}</span>
          </div>
          <p className="text-sm font-medium text-gold-500/80 mt-3">{data.essence}</p>
        </CardHeader>
        <CardContent className="pt-4 space-y-5 text-sm text-gray-400 flex-1 flex flex-col">
          
          <div className="space-y-3">
            <div>
              <strong className="text-gray-300 block mb-1">Светлая сторона:</strong>
              {data.light}
            </div>
            <div>
              <strong className="text-gray-300 block mb-1">Зона напряжения:</strong>
              {data.tension}
            </div>
            <div>
              <strong className="text-gray-300 block mb-1">Практическое применение:</strong>
              {data.practical}
            </div>
          </div>

          {voiceText && (
            <div className="bg-dark-900/40 p-4 rounded-lg border border-dark-700/50 mt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-500/50 block mb-2">Голос мастера</span>
              <p className="italic text-gray-300 leading-relaxed">
                {voiceText}
              </p>
            </div>
          )}

          {data.compoundNuance && (
            <div className="mt-auto pt-4 border-t border-dark-700/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-500/70 block mb-3">Оттенок числа</span>
              <div className="space-y-3">
                {data.compoundNuance.addedGift && (
                  <div>
                    <strong className="text-gray-300 block mb-1">Дар:</strong>
                    {data.compoundNuance.addedGift}
                  </div>
                )}
                {data.compoundNuance.addedTension && (
                  <div>
                    <strong className="text-gray-300 block mb-1">Риск:</strong>
                    {data.compoundNuance.addedTension}
                  </div>
                )}
                {data.compoundNuance.practicalShift && (
                  <div>
                    <strong className="text-gray-300 block mb-1">Сдвиг:</strong>
                    {data.compoundNuance.practicalShift}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-gold-400 mb-4">
            Архитектура личности
          </h1>
          <p className="text-gray-400">
            {report.inputData?.name ? `${report.inputData.name}, ваш` : "Ваш"} базовый разбор на основе даты {report.inputData?.dateOfBirth}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {renderNumberCard("Число Души", report.numbers.soul)}
          {renderNumberCard("Число Пути", report.numbers.path)}
          {renderNumberCard("Число Направления", report.numbers.direction)}
          {renderNumberCard("Число Результата", report.numbers.result)}
          {/* Число Выражения is optional and disabled in public UI by default */}
          {/* report.numbers.expression && renderNumberCard("Число Выражения", report.numbers.expression) */}
        </div>

        <Card className="mb-12 border-gold-500/20 bg-dark-800/60">
          <CardHeader>
            <CardTitle className="text-gold-400">Синтез архитектуры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-300">
            <div className="bg-dark-900/50 p-6 rounded-lg border border-dark-700">
              <h4 className="font-medium text-gold-400 mb-2">Ключевой вектор</h4>
              <p className="leading-relaxed">{report.synthesis.keyVector}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-200 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                  Сильные стороны
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {report.synthesis.strongSides.map((side, i) => (
                    <li key={i} className="pl-4 border-l border-dark-700">{side}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-200 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                  Зоны напряжения
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {report.synthesis.tensionZones.map((zone, i) => (
                    <li key={i} className="pl-4 border-l border-dark-700">{zone}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-dark-700">
              <h4 className="font-medium text-gray-200 mb-4">Практические ориентиры</h4>
              <ul className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400">
                {report.synthesis.practicalRecommendations.map((rec, i) => (
                  <li key={i} className="bg-dark-800/40 p-4 rounded-md border border-dark-700">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {!report.premiumUnlocked && (
          <Card className="bg-gradient-to-br from-dark-800 to-dark-900 border-gold-500/40 text-center py-8">
            <CardContent className="space-y-6">
              <h3 className="text-2xl font-serif text-gold-400">Большое исследование</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Вы увидели структуру. Большое исследование в Доме Самопознания открывает полный узор личности: 
                детальные взаимосвязи, профессиональный вектор и стратегии преодоления внутренних конфликтов.
              </p>
              <Button variant="gold" size="lg">
                Открыть полный доступ
              </Button>
              
              {(!auth.currentUser && !report.userId) && (
                <div className="mt-8 pt-6 border-t border-dark-700">
                  <p className="text-sm text-gray-400 mb-4">
                    Сохраните этот разбор, чтобы не потерять результаты и вернуться к ним позже.
                  </p>
                  <Button variant="outline" onClick={handleSaveClick}>
                    Сохранить в личный кабинет
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
