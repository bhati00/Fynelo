export const DESIGN_TOKENS = {
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px'
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px'
  },
  borderRadius: {
    sm: '6px',
    default: '8px',
    md: '12px',
    lg: '16px'
  }
} as const;

export const COMPONENT_VARIANTS = {
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    brand: 'btn-brand'
  },
  text: {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    body: 'text-body',
    bodySecondary: 'text-body-secondary',
    small: 'text-small'
  },
  card: {
    default: 'card',
    elevated: 'card-elevated'
  }
} as const;