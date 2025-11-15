'use client';

import { useEffect, useState } from 'react';

interface DetailedContentProps {
  sectionId: string;
}

const sectionData: Record<string, any> = {
  about: {
    type: 'text',
    items: [
      'Aspiring Generative AI Engineer with strong foundation in Deep Learning, Machine Learning, and NLP.',
      'Passionate about solving real-world problems with AI.',
      'Experienced in building scalable AI-powered applications and backend systems.',
      'Strong focus on MLOps, deployment, and production-ready AI solutions.',
    ],
  },
  skills: {
    type: 'grid',
    categories: [
      {
        title: 'AI/ML',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'LangChain', 'RAG Systems'],
      },
      {
        title: 'Backend & APIs',
        skills: ['FastAPI', 'Flask', 'Django', 'REST APIs', 'GraphQL', 'WebSockets'],
      },
      {
        title: 'Cloud & DevOps',
        skills: ['GCP', 'Docker', 'Kubernetes', 'Apache Airflow', 'CI/CD', 'Git'],
      },
      {
        title: 'Data & Databases',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Vector DBs', 'SQL', 'Data Engineering'],
      },
    ],
  },
  experience: {
    type: 'timeline',
    items: [
      {
        title: 'Lead AI & Backend Engineering',
        company: 'AIVision21',
        period: 'Current',
        points: [
          'Leading development of AI-powered applications',
          'Architecting scalable backend systems',
          'Implementing LLM integration and RAG systems',
        ],
      },
      {
        title: 'AI Software Developer',
        company: 'T&M Services',
        period: '2023-2024',
        points: [
          'Developed custom ML models for business solutions',
          'Built intelligent automation systems',
          'Optimized AI model performance and deployment',
        ],
      },
      {
        title: 'Junior AI Developer',
        company: 'Tecstaq',
        period: '2022-2023',
        points: [
          'Worked on NLP and computer vision projects',
          'Developed data preprocessing pipelines',
          'Contributed to ML model training and evaluation',
        ],
      },
    ],
  },
  projects: {
    type: 'cards',
    items: [
      {
        title: 'LLM Integration System',
        description: 'Built enterprise-grade LLM integration with RAG capabilities',
        tech: ['LangChain', 'OpenAI', 'Vector DB', 'FastAPI'],
      },
      {
        title: 'AI-Powered Backend Platform',
        description: 'Scalable backend system with ML model serving',
        tech: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      },
      {
        title: 'Custom ML Models',
        description: 'Developed domain-specific ML models for production',
        tech: ['PyTorch', 'Scikit-learn', 'MLflow', 'GCP'],
      },
      {
        title: 'Intelligent Automation Suite',
        description: 'End-to-end automation with AI decision-making',
        tech: ['Python', 'Apache Airflow', 'NLP', 'APIs'],
      },
    ],
  },
  contact: {
    type: 'contact',
    items: [
      { label: 'Email', value: 'bhavikramina99@gmail.com', icon: '📧' },
      { label: 'Location', value: 'Mumbai, Maharashtra', icon: '📍' },
      { label: 'LinkedIn', value: 'bhavik-ramina-161076211', icon: '💼' },
      { label: 'GitHub', value: 'Available on request', icon: '💻' },
    ],
  },
};

export default function DetailedContent({ sectionId }: DetailedContentProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const data = sectionData[sectionId];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, [sectionId]);

  if (!data) return null;

  const renderContent = () => {
    switch (data.type) {
      case 'text':
        return (
          <div className="space-y-3">
            {data.items.map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-start space-x-3 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="text-accent mt-1">▹</span>
                <p className="font-mono text-sm text-accent/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        );

      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-4">
            {data.categories.map((category: any, index: number) => (
              <div
                key={index}
                className="border border-accent/30 p-4 hover:border-accent/60 transition-all duration-300 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <h3 className="font-mono text-xs font-bold text-accent mb-3 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 text-xs font-mono bg-accent/10 border border-accent/30 text-accent/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            {data.items.map((item: any, index: number) => (
              <div
                key={index}
                className="border-l-2 border-accent/30 pl-4 pb-4 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-accent">{item.title}</h3>
                    <p className="font-mono text-xs text-accent/60">{item.company}</p>
                  </div>
                  <span className="font-mono text-xs text-accent/60 bg-accent/10 px-2 py-1">
                    {item.period}
                  </span>
                </div>
                <ul className="space-y-1 mt-2">
                  {item.points.map((point: string, pointIndex: number) => (
                    <li key={pointIndex} className="font-mono text-xs text-accent/70 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'cards':
        return (
          <div className="grid grid-cols-2 gap-4">
            {data.items.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-accent/30 p-4 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <h3 className="font-mono text-sm font-bold text-accent mb-2">{item.title}</h3>
                <p className="font-mono text-xs text-accent/70 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-2 py-0.5 text-xs font-mono bg-accent/10 border border-accent/30 text-accent/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-3">
            {data.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 border border-accent/30 hover:border-accent/60 transition-all duration-300 opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-mono text-xs text-accent/60">{item.label}</p>
                  <p className="font-mono text-sm text-accent">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderContent()}
    </div>
  );
}
