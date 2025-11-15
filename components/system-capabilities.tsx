'use client';

import { motion } from 'framer-motion';

const capabilities = [
  {
    category: 'AI/ML CORE SYSTEMS',
    modules: [
      { name: 'Python', power: 95, status: 'OPTIMAL' },
      { name: 'PyTorch', power: 90, status: 'OPTIMAL' },
      { name: 'TensorFlow', power: 85, status: 'OPERATIONAL' },
      { name: 'Scikit-learn', power: 92, status: 'OPTIMAL' },
      { name: 'Hugging Face', power: 88, status: 'OPTIMAL' },
      { name: 'LangChain', power: 93, status: 'OPTIMAL' },
      { name: 'RAG Systems', power: 94, status: 'OPTIMAL' },
    ],
  },
  {
    category: 'BACKEND INFRASTRUCTURE',
    modules: [
      { name: 'FastAPI', power: 95, status: 'OPTIMAL' },
      { name: 'Flask', power: 90, status: 'OPTIMAL' },
      { name: 'Django', power: 85, status: 'OPERATIONAL' },
      { name: 'REST APIs', power: 93, status: 'OPTIMAL' },
      { name: 'GraphQL', power: 80, status: 'OPERATIONAL' },
      { name: 'WebSockets', power: 85, status: 'OPERATIONAL' },
      { name: 'gRPC', power: 78, status: 'OPERATIONAL' },
    ],
  },
  {
    category: 'CLOUD & DEPLOYMENT',
    modules: [
      { name: 'GCP', power: 88, status: 'OPTIMAL' },
      { name: 'Docker', power: 92, status: 'OPTIMAL' },
      { name: 'Kubernetes', power: 82, status: 'OPERATIONAL' },
      { name: 'Apache Airflow', power: 90, status: 'OPTIMAL' },
      { name: 'CI/CD', power: 87, status: 'OPTIMAL' },
      { name: 'Git', power: 95, status: 'OPTIMAL' },
      { name: 'Terraform', power: 75, status: 'OPERATIONAL' },
    ],
  },
  {
    category: 'DATA SYSTEMS',
    modules: [
      { name: 'PostgreSQL', power: 90, status: 'OPTIMAL' },
      { name: 'MongoDB', power: 85, status: 'OPERATIONAL' },
      { name: 'Redis', power: 88, status: 'OPTIMAL' },
      { name: 'Vector DBs', power: 92, status: 'OPTIMAL' },
      { name: 'SQL', power: 93, status: 'OPTIMAL' },
      { name: 'Data Engineering', power: 87, status: 'OPTIMAL' },
      { name: 'ETL', power: 85, status: 'OPERATIONAL' },
    ],
  },
];

export default function SystemCapabilities() {
  const getStatusColor = (status: string) => {
    return status === 'OPTIMAL' ? 'text-green-400' : 'text-yellow-400';
  };

  const getPowerColor = (power: number) => {
    if (power >= 90) return 'from-green-400/50 to-green-400';
    if (power >= 75) return 'from-accent/50 to-accent';
    return 'from-yellow-400/50 to-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-mono text-2xl font-bold text-accent mb-2">SYSTEM CAPABILITIES</h2>
        <p className="font-mono text-sm text-accent/60">Active modules and operational systems</p>
      </motion.div>

      {/* Capabilities grid */}
      <div className="grid grid-cols-2 gap-6">
        {capabilities.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-black/60 backdrop-blur-xl border border-accent/30 rounded-lg p-6 hover:border-accent/60 transition-all"
          >
            {/* Category header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-accent/20">
              <h3 className="font-mono text-sm font-bold text-accent uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="font-mono text-xs text-green-400">ACTIVE</span>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              {category.modules.map((module, modIndex) => (
                <div key={modIndex}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-accent/70">{module.name}</span>
                      <span className={`font-mono text-xs ${getStatusColor(module.status)}`}>
                        {module.status}
                      </span>
                    </div>
                    <span className="font-mono text-accent">{module.power}%</span>
                  </div>
                  <div className="relative h-1.5 bg-black/50 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${module.power}%` }}
                      transition={{ duration: 1, delay: catIndex * 0.1 + modIndex * 0.05 }}
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getPowerColor(module.power)} rounded`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Category stats */}
            <div className="mt-6 pt-4 border-t border-accent/20 flex items-center justify-between">
              <div className="font-mono text-xs text-accent/60">
                MODULES: {category.modules.length}
              </div>
              <div className="font-mono text-xs text-accent">
                AVG: {Math.round(category.modules.reduce((acc, m) => acc + m.power, 0) / category.modules.length)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall system health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-400/10 to-transparent border border-green-400/30 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-sm font-bold text-green-400 mb-1">
              ◈ OVERALL SYSTEM HEALTH
            </div>
            <div className="font-mono text-xs text-accent/70">
              All critical systems operational. {capabilities.reduce((acc, cat) => acc + cat.modules.length, 0)} modules active and responding.
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-4xl font-bold text-green-400">98%</div>
            <div className="font-mono text-xs text-green-400/60">OPTIMAL</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
