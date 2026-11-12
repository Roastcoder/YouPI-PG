import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { CheckoutServer } from '../server.js';
import { BRANDING_CONFIG } from '../config/branding.js';

describe('White-Label Branding & Checkout Identity Tests', () => {
  const server = new CheckoutServer();

  test('renderHtml defaults to StandaloneCoders branding when state is minimal/demo', () => {
    const html = server.renderHtml('test-payment-123', {
      orderId: 'ORD-999',
      amount: '500.00'
    });

    // 1. Page title must feature StandaloneCoders and StandaloneCoders
    assert.ok(html.includes('<title>StandaloneCoders · StandaloneCoders Checkout</title>'), 'Title must have StandaloneCoders and StandaloneCoders');

    // 2. Header and Sidebar merchant name
    assert.ok(html.includes('<div class="ypg-merchant-name" id="headerMerchantName">StandaloneCoders</div>'), 'Header merchant name must be StandaloneCoders');
    assert.ok(html.includes('<div class="ypg-pc-merchant-name" id="pcMerchantName">StandaloneCoders</div>'), 'Sidebar merchant name must be StandaloneCoders');

    // 3. Trust badge must state "Powered by StandaloneCoders"
    assert.ok(html.includes('Verified Business · Powered by StandaloneCoders'), 'Trust badge must be Powered by StandaloneCoders');

    // 4. Logo URL must match official V-Visa asset
    assert.ok(html.includes(BRANDING_CONFIG.logoUrl), 'Rendered HTML must contain configured logo URL');

    // 5. Customer support details must match V-Visa support
    assert.ok(html.includes(BRANDING_CONFIG.supportEmail), 'Rendered HTML must contain the configured support email');
    assert.ok(html.includes(BRANDING_CONFIG.supportPhone), 'Rendered HTML must contain the configured support phone');

    // 6. Splash screen and footer powered by text
    assert.ok(html.includes('<strong id="splashSecuredByText" style="color:var(--ypg-blue); font-size:15px; letter-spacing:-0.2px;">StandaloneCoders</strong>'), 'Splash footer must say StandaloneCoders');
    assert.ok(html.includes('Secured by StandaloneCoders & 256-Bit Bank Encryption'), 'Footer must say Secured by StandaloneCoders');

    // 7. Success & Processing wording
    assert.ok(html.includes('Processing payment securely with StandaloneCoders'), 'Processing modal must state StandaloneCoders');

    // 8. No customer-facing YouPI strings in rendered badges/titles
    assert.ok(!html.includes('YouPI PG Verified Business'), 'No YouPI PG Verified Business allowed');
    assert.ok(!html.includes('YouPI PG Trusted Business'), 'No YouPI PG Trusted Business allowed');
    assert.ok(!html.includes('YouPI PG Help &amp; Support'), 'No YouPI PG Help & Support allowed');
  });

  test('renderHtml preserves custom merchant branding when merchant supplies their own brand', () => {
    const html = server.renderHtml('custom-payment-456', {
      merchantName: 'Acme Corp',
      branding: {
        appName: 'Acme Gateway',
        logoUrl: 'https://example.com/logo.png',
        primaryColor: '#ff0000',
        supportEmails: ['help@acme.com'],
        supportMobiles: ['+91 9999999999']
      }
    });

    assert.ok(html.includes('<title>Acme Corp · Acme Gateway Checkout</title>'));
    assert.ok(html.includes('Acme Corp'));
    assert.ok(html.includes('https://example.com/logo.png'));
    assert.ok(html.includes('help@acme.com'));
  });
});
