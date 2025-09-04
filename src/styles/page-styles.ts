import { CSSProperties } from 'react';

export const pageStyles = {
  gradientBox: (gradient: string): CSSProperties => ({
    background: gradient,
    width: '100%',
    height: '120px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2rem'
  }),

  gradientBoxLight: (gradient: string): CSSProperties => ({
    background: gradient,
    width: '100%',
    height: '120px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    fontSize: '2rem'
  }),

  upcomingFeaturesSection: {
    backgroundColor: '#f8f9fa'
  },

  upcomingFeaturesSubtitle: {
    color: '#ff6b6b',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    fontSize: '14px',
    letterSpacing: '2px'
  },

  upcomingFeaturesTitle: {
    color: '#333',
    fontWeight: '700' as const,
    marginTop: '10px',
    marginBottom: '20px'
  },

  upcomingFeaturesDescription: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.6'
  },

  upcomingFeatureCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px 20px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #f0f0f0',
    minHeight: '280px'
  },

  comingSoonBadge: {
    top: '15px',
    right: '15px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold' as const
  },

  featureIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    filter: 'grayscale(50%) opacity(0.8)'
  },

  featureTitle: {
    color: '#333',
    marginBottom: '15px',
    fontSize: '1.3rem',
    fontWeight: '600' as const
  },

  featureDescription: {
    color: '#666',
    lineHeight: '1.6',
    fontSize: '14px',
    margin: '0'
  },

  decorativeElement: {
    bottom: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    opacity: '0.3'
  }
};

export const gradients = {
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  orange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  light: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
};