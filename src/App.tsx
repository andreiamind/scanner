/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, AlertCircle, Activity, ArrowRight, Instagram } from 'lucide-react';

type Screen = 'start' | 'quiz' | 'result' | 'next_steps';
type Pattern = 'MECÂNICA' | 'FUNCIONAL' | 'SISTÊMICA';

interface Question {
  id: number;
  text: string;
  options: { text: string; type: Pattern }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Sua dor começou após um evento específico (queda, esforço, movimento errado)?",
    options: [
      { text: "Sim, claramente", type: "MECÂNICA" },
      { text: "Foi surgindo aos poucos", type: "FUNCIONAL" },
      { text: "Começou de repente mas não sei como machuquei", type: "SISTÊMICA" },
    ],
  },
  {
    id: 2,
    text: "Sua dor muda ao longo do dia ou dependendo do que você faz?",
    options: [
      { text: "Quase não muda", type: "MECÂNICA" },
      { text: "Piora ao longo do dia", type: "FUNCIONAL" },
      { text: "Não entendo o padrão dela", type: "SISTÊMICA" },
    ],
  },
  {
    id: 3,
    text: "Você percebe que estresse, ansiedade ou noites mal dormidas pioram sua dor?",
    options: [
      { text: "Nunca percebi", type: "MECÂNICA" },
      { text: "Às vezes", type: "FUNCIONAL" },
      { text: "Frequentemente", type: "SISTÊMICA" },
    ],
  },
  {
    id: 4,
    text: "Mesmo após descanso ou tratamento, sua dor tende a voltar?",
    options: [
      { text: "Raramente", type: "MECÂNICA" },
      { text: "Às vezes", type: "FUNCIONAL" },
      { text: "Frequentemente", type: "SISTÊMICA" },
    ],
  },
  {
    id: 5,
    text: "Você sente que seu corpo acumula tensão no dia a dia (ombros, pescoço, costas)?",
    options: [
      { text: "Não", type: "MECÂNICA" },
      { text: "Um pouco", type: "FUNCIONAL" },
      { text: "Bastante", type: "SISTÊMICA" },
    ],
  },
  {
    id: 6,
    text: "Você sente que sua dor 'migra' ou muda de lugar às vezes, ou ela está sempre exatamente no mesmo ponto?",
    options: [
      { text: "Sempre no mesmo ponto exato.", type: "MECÂNICA" },
      { text: "Muda um pouco de lugar dependendo da posição que fico.", type: "FUNCIONAL" },
      { text: "Parece que 'anda' pelo corpo ou muda de lado sem motivo claro.", type: "SISTÊMICA" },
    ],
  },
  {
    id: 7,
    text: "Como sua dor se comporta logo ao acordar ou após passar muito tempo em repouso?",
    options: [
      { text: "Sinto uma pontada ou trava logo no primeiro movimento.", type: "MECÂNICA" },
      { text: "O repouso ajuda, a dor só volta depois de um tempo em pé ou sentado.", type: "FUNCIONAL" },
      { text: "Acordo já com dor ou me sinto rígido(a) e 'travado' o tempo todo.", type: "SISTÊMICA" },
    ],
  },
  {
    id: 8,
    text: "Você percebe que sua dor costuma aparecer ou piorar em períodos de maior sobrecarga mental ou decisões importantes?",
    options: [
      { text: "Não vejo relação, a dor é puramente física.", type: "MECÂNICA" },
      { text: "Sinto que fico mais tenso(a) e isso acaba gerando o incômodo.", type: "FUNCIONAL" },
      { text: "Sim, minha dor explode ou fica muito mais sensível sob pressão.", type: "SISTÊMICA" },
    ],
  },
  {
    id: 9,
    text: "Além da dor, você sente outros sinais frequentes, como cansaço que não passa com o sono, dores de cabeça ou má digestão?",
    options: [
      { text: "Não, sinto apenas a dor no local específico.", type: "MECÂNICA" },
      { text: "Sinto cansaço muscular e peso no corpo no final do dia.", type: "FUNCIONAL" },
      { text: "Sim, sinto vários desses sinais juntos com frequência.", type: "SISTÊMICA" },
    ],
  },
];

const RESULTS_CONTENT = {
  MECÂNICA: {
    title: "Seu padrão de dor sugere influência MECÂNICA",
    description: "Isso significa que sua dor parece estar diretamente ligada a uma estrutura física específica — como um músculo, tendão ou articulação que sofreu um impacto ou sobrecarga.",
    emotional: "Nós validamos o que você sente. É frustrante quando o corpo parece 'travar' após um movimento. A boa notícia é que, por ter um gatilho físico claro, o caminho para o alívio costuma ser mais direto, focando em devolver a função para aquela região.",
    curiosity: "Mas sabia que, às vezes, o local onde dói não é onde o problema realmente começou? O corpo compensa movimentos e isso pode criar um ciclo vicioso."
  },
  FUNCIONAL: {
    title: "Seu padrão de dor sugere influência FUNCIONAL",
    description: "Sua dor parece estar ligada ao modo como seu corpo se organiza no dia a dia. Ela varia, cansa e muitas vezes 'pesa' conforme as horas passam.",
    emotional: "Sentir que o corpo vai ficando 'pesado' ao longo do dia é exaustivo. Não é apenas uma lesão, é um sinal de que sua musculatura e postura estão sendo sobrecarregadas além do que conseguem suportar no momento.",
    curiosity: "O interessante é que pequenas mudanças na forma como você se move ou se posiciona podem mudar completamente esse jogo. Seu corpo está pedindo uma nova estratégia."
  },
  SISTÊMICA: {
    title: "Seu padrão de dor sugere influência SISTÊMICA",
    description: "Sua dor parece ser um reflexo de como seu sistema nervoso e seu organismo como um todo estão reagindo. Fatores como sono, estresse e recorrência são peças-chave aqui.",
    emotional: "É exaustivo sentir uma dor que parece não ter lógica ou que volta mesmo quando você descansa. Validamos sua jornada; essa dor é real e seu corpo está em um estado de alerta constante, tentando te proteger de algo que ele interpreta como ameaça.",
    curiosity: "O segredo aqui não está apenas em 'tratar o lugar que dói', mas em acalmar o sistema e entender o que está mantendo esse alerta ligado por tanto tempo."
  }
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Pattern[]>([]);
  const [resultPattern, setResultPattern] = useState<Pattern | null>(null);

  const handleStart = () => setScreen('quiz');

  const handleAnswer = (type: Pattern) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Pattern[]) => {
    const counts = finalAnswers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<Pattern, number>);

    let maxType: Pattern = 'MECÂNICA';
    let maxCount = 0;

    (Object.keys(counts) as Pattern[]).forEach(type => {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        maxType = type;
      }
    });

    setResultPattern(maxType);
    setScreen('result');
  };

  const restart = () => {
    setScreen('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setResultPattern(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100">
      <div className="max-w-md mx-auto min-h-screen flex flex-col px-6 py-12">
        
        <AnimatePresence mode="wait">
          {screen === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center text-center space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-emerald-100 rounded-2xl text-emerald-700 mb-2">
                  <Activity size={32} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-stone-900 leading-tight">
                    Scanner da <span className="text-emerald-600">Dor Oculta</span>
                  </h1>
                  <p className="text-emerald-700 font-bold italic">
                    “Você trata sua dor… mas ela sempre volta?”
                  </p>
                </div>
                <p className="text-lg text-stone-600 font-medium">
                  Descubra em 3 minutos se sua dor pode ser mais do que uma simples lesão.
                </p>
              </div>

              <div className="grid gap-4 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  <span>Sem enrolação</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  <span>Sem termos técnicos</span>
                </div>
                <div className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  <span>Resultado imediato</span>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 px-6 bg-stone-900 text-white rounded-2xl font-semibold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-stone-200"
              >
                Começar agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {screen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Pergunta {currentQuestion + 1} de {QUESTIONS.length}</span>
                  <span className="text-xs text-stone-400 font-mono">{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-8">
                <h2 className="text-2xl font-bold text-stone-900 leading-tight">
                  {QUESTIONS[currentQuestion].text}
                </h2>

                <div className="space-y-3">
                  {QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full p-5 text-left bg-white border border-stone-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group flex items-center justify-between"
                    >
                      <span className="text-stone-700 font-medium group-hover:text-emerald-700">{option.text}</span>
                      <ChevronRight size={18} className="text-stone-300 group-hover:text-emerald-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'result' && resultPattern && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col space-y-8 pb-12"
            >
              <div className="space-y-6">
                <div className="inline-flex p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                  <Activity size={24} />
                </div>
                
                <h2 className="text-3xl font-bold text-stone-900 leading-tight">
                  {RESULTS_CONTENT[resultPattern].title}
                </h2>

                <div className="space-y-4 text-stone-700 leading-relaxed">
                  <p className="font-medium text-stone-900">
                    {RESULTS_CONTENT[resultPattern].description}
                  </p>
                  <p>
                    {RESULTS_CONTENT[resultPattern].emotional}
                  </p>
                  <div className="p-4 bg-stone-100 rounded-xl border-l-4 border-emerald-500 italic text-stone-600">
                    {RESULTS_CONTENT[resultPattern].curiosity}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setScreen('next_steps')}
                  className="w-full py-4 px-6 bg-emerald-600 text-white rounded-2xl font-semibold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-100"
                >
                  Entender o próximo passo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'next_steps' && (
            <motion.div
              key="next_steps"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col space-y-8 pb-12"
            >
              <div className="space-y-6">
                <div className="inline-flex p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                  <Activity size={24} />
                </div>
                
                <div className="space-y-6 text-stone-700 leading-relaxed">
                  <p className="text-lg">
                    <span className="font-bold">Um ponto fundamental:</span> na prática, esses três padrões (Mecânico, Funcional e Sistêmico) raramente aparecem isolados. Na maioria dos casos, eles se misturam em diferentes proporções. O segredo para um tratamento que realmente funciona é identificar exatamente o quanto cada um desses fatores está influenciando sua dor hoje para direcionar as ações exatas de alívio.
                  </p>
                  
                  <p className="text-stone-600 italic font-medium border-l-4 border-stone-300 pl-4">
                    “Esse resultado é apenas um indício inicial. Para entender o padrão real da sua dor ao longo do tempo, é necessário um mapeamento mais profundo.”
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="p-6 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-100 space-y-4">
                  <p className="font-medium leading-snug">
                    👉 Se quiser aprofundar e mapear sua dor com mais precisão, me chama no direct com a palavra <span className="font-bold underline">RADAR</span>.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold bg-white/20 px-4 py-2 rounded-full w-fit">
                    <Instagram size={16} />
                    @andreia_osteopatia
                  </div>
                </div>

                <button
                  onClick={restart}
                  className="w-full py-4 text-stone-500 font-semibold hover:text-stone-800 transition-colors"
                >
                  Refazer o scanner
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-8 text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
            Scanner da Dor Oculta • 2024
          </p>
        </footer>
      </div>
    </div>
  );
}
