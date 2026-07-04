'use client';

import { motion } from 'framer-motion';
import styles from './AILab.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ModelCard from '../../components/ModelCard';
import ResearchPaperCard from '../../components/ResearchPaperCard';
import CodeSnippet from '../../components/CodeSnippet';

export default function AILab() {
  const models = [
    {
      status: "Released",
      name: "SLM360",
      description: "On-device AI that thinks, learns, and remembers. 50MB, 39ms latency, 100% offline.",
      link: "/models/slm360"
    },
    {
      status: "Released",
      name: "Med360",
      description: "Medical AI models for clinical transcription, diagnosis, and multilingual healthcare. Med360 Lite + Sanad-1.0.",
      link: "/models/med360"
    }
  ];

  const papers = [
    {
      type: "Technical Report",
      year: "2025",
      title: "Med360: A Family of Fine-tuned Multilingual Medical AI Assistants for Indian Healthcare",
      description: "We present Med360, a family of fine-tuned large language models designed specifically for Indian healthcare contexts with native Hinglish support, Indian pharmaceutical nomenclature, and AIIMS/NEET-PG level medical knowledge.",
      tags: ["Medical AI", "Hinglish", "Indian Healthcare"],
      link: "/research/med360-paper"
    },
    {
      type: "Technical Report",
      year: "2025",
      title: "SLM360: Breaking the NLU Trilemma - Accuracy, Latency, and Efficiency On-Device",
      description: "A lightweight NLU engine achieving 98-100% accuracy at 39ms latency in 50MB -4x faster than Rasa, 10x less memory. Hybrid classification with reasoning, memory, and prediction, all on-device.",
      tags: ["Edge AI", "On-Device NLU", "Hybrid Classification"],
      link: "/research/slm360-paper"
    },
    {
      type: "Technical Report",
      year: "2026",
      title: "AgentGuard: Deadlock Prevention for Multi-AI-Agent Systems via Extended Banker’s Algorithm",
      description: "A C++17 library that extends Dijkstra’s Banker’s Algorithm for LLM agent orchestration, with progress monitoring, authority cycle detection, and adaptive demand estimation. 285 tests, LangGraph integration.",
      tags: ["Deadlock Prevention", "Multi-Agent Systems", "LangGraph"],
      link: "/research/agentguard-paper"
    },
    {
      type: "Technical Report",
      year: "2026",
      title: "VAJRA: A Multi-Sensor On-Device Counter-UAS System with Custom-Trained Visual and Acoustic Deep Learning Models",
      description: "A fully on-device, multi-sensor drone detection and neutralization system running on a commercial Android smartphone. Integrates visual (YOLOv8n), acoustic (FFT + CNN), and RF analysis -fused into a unified threat display with countermeasure control. 38MB APK, zero network dependency.",
      tags: ["Counter-UAS", "On-Device ML", "Edge AI"],
      link: "/research/vajra-paper"
    },
    {
      type: "Technical Report",
      year: "2026",
      title: "KAVACH: An On-Device Tactical Intelligence Platform with SLM360-Powered Natural Language C2, Real-Time ISR, and Automated Reporting",
      description: "A tactical intelligence platform running entirely on Android with zero network dependency. Integrates Tactical C2, ISR Processing (YOLOv8n, ~19 FPS), Auto SITREP (SALUTE reports in ~8s), and Patrol Optimization -all powered by SLM360 (577K params, 848KB).",
      tags: ["Tactical AI", "On-Device ML", "SLM360"],
      link: "/research/kavach-paper"
    }
  ];

  const codeSnippet = `from med360 import Model

model = Model("360labs/med360-hindi")

# Generate response
response = model.generate(
    prompt="मुझे बताओ",
    max_tokens=256
)`;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={`container ${styles.heroSection}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={styles.heroBlock}
          >
            <span className={styles.eyebrow}>{'// ai lab'}</span>
            <h1 className={styles.heroTitle}>
              Research and engineering<br />
              as <span className={styles.gradientText}>one discipline.</span>
            </h1>
            <p className={styles.heroSub}>
              We publish what we build. Foundation models, on-device runtimes, and multi-agent systems,
              with the technical reports that explain how they work.
            </p>
            <div className={styles.heroJump}>
              <a href="#models">Models</a>
              <span aria-hidden="true">·</span>
              <a href="#research">Papers</a>
              <span aria-hidden="true">·</span>
              <a href="#writing">Engineering writing</a>
              <span aria-hidden="true">·</span>
              <a href="#sdk">SDK</a>
            </div>
          </motion.div>
        </section>

        <section id="models" className={`container ${styles.modelsSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className={styles.sectionHeader}
          >
            <span className={styles.eyebrow}>Models</span>
            <h2 className={styles.sectionTitle}>Built and shipped in-house.</h2>
            <p className={styles.sectionLede}>
              Foundation and fine-tuned models we own end-to-end, design, training, eval, deployment.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={styles.modelsGrid}
          >
            {models.map(model => (
              <motion.div key={model.name} variants={fadeIn}>
                <ModelCard {...model} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="research" className={`container ${styles.researchSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className={styles.sectionHeader}
          >
            <span className={styles.eyebrow}>Technical reports</span>
            <h2 className={styles.sectionTitle}>How the work was done.</h2>
            <p className={styles.sectionLede}>
              Architecture, training methodology, and benchmarks for the models and systems above.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={styles.researchGrid}
          >
            {papers.map(paper => (
              <motion.div key={paper.title} variants={fadeIn}>
                <ResearchPaperCard {...paper} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="writing" className={`container ${styles.blogSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className={styles.sectionHeader}
          >
            <span className={styles.eyebrow}>Engineering writing</span>
            <h2 className={styles.sectionTitle}>Notes from the work.</h2>
            <p className={styles.sectionLede}>
              Practical write-ups from things we hit while shipping. Less ceremony than a paper,
              more useful than a thread.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <ResearchPaperCard
              type="Blog Post"
              year="February 2026"
              title="Your LangGraph Agents Are Deadlocking. Here&rsquo;s the Fix."
              description="How we applied a 60-year-old OS algorithm to prevent deadlocks in multi-AI-agent systems. A practical guide to using AgentGuard with LangGraph. (12 min read)"
              tags={["LangGraph", "Deadlock Prevention", "Multi-Agent Systems"]}
              link="/ai-lab/blog/agentguard-deadlock-fix"
            />
          </motion.div>
        </section>

        <section id="sdk" className={`container ${styles.codeSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className={styles.sectionHeader}
          >
            <span className={styles.eyebrow}>SDK</span>
            <h2 className={styles.sectionTitle}>Med360, in two lines.</h2>
            <p className={styles.sectionLede}>
              The shipped SDK is small, opinionated, and easy to drop into an existing service.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className={styles.apiPreview}
          >
            <CodeSnippet code={codeSnippet} language="python" />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
