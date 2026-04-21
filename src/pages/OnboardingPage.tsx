import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "motion/react";

const steps = [
  {
    title: "Архитектура личности",
    description: "Метод «Цифровой Код» — это структурированный подход к пониманию своих сильных сторон и зон напряжения. Никакой мистики, только точный расчет на основе даты рождения."
  },
  {
    title: "Элементы кода",
    description: "Мы рассчитаем четыре ключевых показателя: Число Души (внутренний стержень), Число Пути (вектор развития), Число Направления (способ взаимодействия) и Число Результата (итог усилий)."
  },
  {
    title: "Практическое применение",
    description: "Вы получите не просто описание, а прикладную информацию для принятия решений, выбора профессионального пути и понимания своих реакций."
  }
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/calculate");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8 gap-2">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? "w-8 bg-gold-500" : "w-4 bg-dark-700"}`}
            />
          ))}
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-serif text-gold-400 mb-4">{steps[currentStep].title}</h2>
              <p className="text-gray-300 leading-relaxed">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-end">
            <Button variant="gold" onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Перейти к расчету" : "Далее"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
