/**
 * Centralized White-Label Branding Configuration
 *
 * Configures customer-facing brand identity across checkout-portal,
 * payment-api, and banking observers.
 */
export const BRANDING_CONFIG = Object.freeze({
  businessName: 'StandaloneCoders',
  poweredBy: 'StandaloneCoders',
  appName: 'StandaloneCoders',
  supportEmail: 'Roastcoder@gmail.com',
  supportEmails: Object.freeze(['Roastcoder@gmail.com']),
  supportPhone: '+91 6378110608',
  supportMobiles: Object.freeze(['+91 6378110608']),
  logoUrl: 'https://standalonecoders.com/logo-mark-sc.svg',
  primaryColor: '#101211',
  sidebarNotice: 'Fast & Secure 256-Bit Bank Encryption',
  trustBadgeText: 'Verified Business · Powered by StandaloneCoders',
  counterInstructions: 'Please visit the billing counter and present this screen to the cashier.',
  cardCounterInstructions: 'Please swipe, insert, or tap your credit or debit card on the store POS terminal at the billing desk.',
});
