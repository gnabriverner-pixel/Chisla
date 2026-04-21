import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { motion } from "motion/react";

export function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gold-400 mb-6 tracking-tight">
            Архитектура вашей личности
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Структурированный метод самопознания «Цифровой Код». 
            Раскройте свои сильные стороны и зоны напряжения через точный анализ даты рождения.
          </p>
          <Link to="/onboarding">
            <Button variant="gold" size="lg" className="text-lg px-10">
              Рассчитать свой код
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-dark-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-gray-100 mb-4">Что вы узнаете</h2>
            <p className="text-gray-400">Практичный подход без мистики и эзотерики</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-dark-900 border-dark-700">
              <CardHeader>
                <CardTitle className="text-gold-400">Базовый разбор</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p>Бесплатный доступ к основе вашего кода:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Число Души: ваш внутренний стержень</li>
                  <li>Число Пути: вектор развития</li>
                  <li>Число Направления: способ взаимодействия</li>
                  <li>Число Результата: итог усилий</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-dark-900 border-gold-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full" />
              <CardHeader>
                <CardTitle className="text-gold-400">Большое исследование</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300 relative z-10">
                <p>Глубокий анализ для тех, кто готов к трансформации:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Детальный синтез всех элементов кода</li>
                  <li>Практические рекомендации по зонам напряжения</li>
                  <li>Анализ профессионального потенциала</li>
                  <li>Персональная стратегия развития</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
