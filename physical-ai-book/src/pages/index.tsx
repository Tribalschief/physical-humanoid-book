import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// Icons as simple SVG components
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

// Styles
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
    padding: '2rem',
  },
  heroBackground: {
    position: 'absolute' as const,
    inset: 0,
    background: `
      radial-gradient(ellipse at 20% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)
    `,
  },
  heroContent: {
    maxWidth: '1100px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    zIndex: 10,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(236, 72, 153, 0.15)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    borderRadius: '50px',
    fontSize: '0.875rem',
    color: '#f472b6',
    marginBottom: '2rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #ec4899 50%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    color: '#94a3b8',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    lineHeight: 1.7,
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    justifyContent: 'center',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    color: '#ffffff',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 8px 30px rgba(236, 72, 153, 0.4)',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  section: {
    padding: '6rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#94a3b8',
    textAlign: 'center' as const,
    maxWidth: '600px',
    margin: '0 auto 4rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))',
    borderRadius: '16px',
    marginBottom: '1.5rem',
    color: '#ec4899',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#ffffff',
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    lineHeight: 1.7,
  },
  statsSection: {
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.02)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '3rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#94a3b8',
    marginTop: '0.5rem',
  },
  ctaSection: {
    padding: '6rem 2rem',
    textAlign: 'center' as const,
  },
  ctaBox: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '4rem',
    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '32px',
  },
  footer: {
    padding: '3rem 2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center' as const,
    color: '#64748b',
    fontSize: '0.9rem',
  },
};

const features = [
  {
    icon: <BrainIcon />,
    title: 'LLM-Powered Robotics',
    description: 'Learn to integrate GPT-4 and other LLMs as reasoning engines for autonomous robot behavior and decision making.',
  },
  {
    icon: <CpuIcon />,
    title: 'Isaac Sim Integration',
    description: 'Master high-fidelity physics simulation for safe, repeatable robot training before real-world deployment.',
  },
  {
    icon: <CodeIcon />,
    title: 'ROS 2 Expertise',
    description: 'Build production-ready robotics applications with hands-on projects using the Robot Operating System.',
  },
  {
    icon: <BookIcon />,
    title: 'Comprehensive Curriculum',
    description: 'From fundamentals to advanced topics, our structured modules guide you through the complete learning journey.',
  },
  {
    icon: <RocketIcon />,
    title: 'Real Deployment',
    description: 'Graduate from simulation to physical robots with step-by-step deployment guides and best practices.',
  },
  {
    icon: <UsersIcon />,
    title: 'AI Tutor Assistant',
    description: 'Get instant help debugging URDF files, optimizing control loops, and understanding complex concepts.',
  },
];

const stats = [
  { value: '50+', label: 'Interactive Modules' },
  { value: '10k+', label: 'Active Learners' },
  { value: 'ROS 2', label: 'Framework' },
  { value: '24/7', label: 'AI Support' },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="The definitive curriculum bridging Large Language Models with embodied robotics"
    >
      <div style={styles.page}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroBackground} />
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <SparklesIcon />
              <span>Now featuring Isaac Sim Integration</span>
            </div>
            <h1 style={styles.title}>
              Master Physical AI &<br />Humanoid Robotics
            </h1>
            <p style={styles.subtitle}>
              The definitive curriculum bridging Large Language Models with embodied robotics.
              Build digital twins in simulation before deploying to real humanoid robots.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/docs/intro" style={styles.primaryButton}>
                Start Learning
                <ArrowRightIcon />
              </Link>
              <Link to="/docs/intro" style={styles.secondaryButton}>
                View Curriculum
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Everything You Need</h2>
          <p style={styles.sectionSubtitle}>
            A comprehensive toolkit from simulation to deployment, designed by experts.
          </p>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaBox}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: '1rem' }}>
              Ready to Build the Future?
            </h2>
            <p style={{ ...styles.sectionSubtitle, marginBottom: '2rem' }}>
              Join thousands of engineers and researchers mastering Physical AI.
              Start with simulation, graduate to real robots.
            </p>
            <Link to="/docs/intro" style={styles.primaryButton}>
              Get Started Free
              <ArrowRightIcon />
            </Link>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
              No credit card required • Full access to first 5 modules
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} Physical AI Textbook. Built with Docusaurus.</p>
        </footer>
      </div>
    </Layout>
  );
}
