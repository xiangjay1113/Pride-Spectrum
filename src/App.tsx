/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, ChevronRight, Info, Share2, Github } from 'lucide-react';
import { GENDERS, Gender, GenderTraits } from './data/genders';
import { QUESTIONS, Question } from './data/questions';

const DEFAULT_TRAITS: GenderTraits = {
  m: 0,
  f: 0,
  n: 0,
  flu: 0,
  c: 0,
  i: 0,
  x: 0,
};

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userTraits, setUserTraits] = useState<GenderTraits>(DEFAULT_TRAITS);
  const [history, setHistory] = useState<GenderTraits[]>([]);

  const handleStart = () => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setUserTraits(DEFAULT_TRAITS);
    setHistory([]);
  };

  const handleAnswer = (traitsDelta: Partial<GenderTraits>) => {
    setHistory([...history, { ...userTraits }]);
    setUserTraits((prev) => {
      const next = { ...prev };
      Object.entries(traitsDelta).forEach(([key, value]) => {
        const k = key as keyof GenderTraits;
        next[k] = (next[k] || 0) + (value || 0);
      });
      return next;
    });

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameState('result');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const prevTraits = history[history.length - 1];
      setUserTraits(prevTraits);
      setHistory(history.slice(0, -1));
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const result = useMemo(() => {
    if (gameState !== 'result') return null;

    // Matching algorithm: Euclidean distance
    let bestMatch: Gender = GENDERS[0];
    let minDistance = Infinity;

    GENDERS.forEach((gender) => {
      let distance = 0;
      Object.keys(gender.traits).forEach((key) => {
        const k = key as keyof GenderTraits;
        const diff = (gender.traits[k] - userTraits[k]);
        distance += diff * diff;
      });
      
      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = gender;
      }
    });

    return bestMatch;
  }, [gameState, userTraits]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-pink-100 selection:text-pink-900">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pink-300 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-300 blur-[130px]" />
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-yellow-200 blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
              id="start-screen"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl shadow-pink-100/50 mb-4">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                  Pride <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">Spectrum</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
                  探索 87 种性别的奥秘，通过自我发现的旅程，寻找最贴近你灵魂的身份表达。
                </p>
              </div>
              
              <div className="flex flex-col gap-4 items-center">
                <button
                  id="start-btn"
                  onClick={handleStart}
                  className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    立即开启测试 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <p className="text-xs text-slate-400">本测试包含 10 个精心设计的问题</p>
              </div>

              <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
                <div className="p-3 bg-white rounded-xl text-xs font-medium">🌈 兼容 87 种性别</div>
                <div className="p-3 bg-white rounded-xl text-xs font-medium">✨ 教育意义</div>
                <div className="p-3 bg-white rounded-xl text-xs font-medium">🤝 尊重与包容</div>
                <div className="p-3 bg-white rounded-xl text-xs font-medium">🛡️ 隐私保护</div>
              </div>
            </motion.div>
          )}

          {gameState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
              id="quiz-screen"
            >
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Question {currentQuestionIndex + 1} of {QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-indigo-600">
                    {Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-slate-800">
                  {QUESTIONS[currentQuestionIndex].text}
                </h2>

                <div className="grid gap-4">
                  {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.traits)}
                      className="w-full text-left p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center justify-between group"
                      id={`option-${idx}`}
                    >
                      <span className="font-medium text-slate-700 group-hover:text-indigo-600">{option.text}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-500 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-top border-slate-100">
                <button
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-all"
                  id="back-btn"
                >
                   ← 返回上一步
                </button>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-10"
              id="result-screen"
            >
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 blur-2xl opacity-50"
                  />
                  <div className="relative text-7xl mb-4">🌈</div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em]">你的普利德光谱结果是</p>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    {result.name}
                  </h1>
                </div>

                <div className="max-w-md mx-auto p-8 rounded-[2rem] bg-white shadow-2xl shadow-indigo-100 border border-slate-50 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-12 h-12 text-indigo-600" />
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    “{result.description}”
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleStart}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    id="restart-btn"
                  >
                    <RotateCcw className="w-5 h-5" /> 重新测试
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=我的Pride光谱测试结果是: ${result.name}! 快来测测你的性别身份。`)}
                    className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 transition-all text-slate-600"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-4 bg-indigo-50/50 rounded-2xl flex gap-3 items-start">
                  <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-indigo-800 leading-snug">
                    请记住，性别是一个流动的光谱，你的身份定义权始终掌握在你自己手中。这个测试仅供参考和娱乐，旨在帮助你了解多样化的性别概念。
                  </p>
                </div>
              </div>

              <footer className="pt-8 text-center text-slate-400 text-xs">
                Pride Spectrum v1.0 • 包容与爱
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
