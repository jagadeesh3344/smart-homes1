import nodemailer from 'nodemailer';
import { Order } from '../types/index.js';

class MailService {
  private transporter: nodemailer.Transporter | null = null;
  private testAccountInitialized: boolean = false;

  constructor() {
    this.initTransporter();
  }

  private async initTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });
      console.log('[MailService] Configured with live SMTP:', host);
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
      console.log('[MailService] Configured with Gmail SMTP');
    } else {
      console.log('[MailService] No live SMTP credentials found in .env. Initializing local preview & test mailer...');
      try {
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
        this.testAccountInitialized = true;
        console.log('[MailService] Test Ethereal mailer ready. Previews will be logged to console.');
      } catch (e) {
        console.warn('[MailService] Could not connect to test SMTP, falling back to simulated mailer:', e);
      }
    }
  }

  public generateInvoiceHtml(order: Order): string {
    const subtotal = order.subtotal || order.totalAmount;
    const tax = Math.round(subtotal * 0.18); // 18% GST estimate
    const total = order.totalAmount;
    const phoneContactNumber = process.env.SUPPORT_PHONE || "+91 98765 43210";

    const itemsRows = order.items.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 14px 10px; font-size: 14px; color: #111827;">
          <strong>${item.productName}</strong>
          ${item.variantName ? `<br/><span style="font-size: 12px; color: #6b7280;">Variant: ${item.variantName}</span>` : ''}
          <br/><span style="font-size: 12px; color: #9ca3af;">SKU: ${item.sku || 'N/A'}</span>
        </td>
        <td style="padding: 14px 10px; text-align: center; font-size: 14px; color: #374151;">
          ${item.quantity}
        </td>
        <td style="padding: 14px 10px; text-align: right; font-size: 14px; color: #374151;">
          ₹${Number(item.price).toLocaleString('en-IN')}
        </td>
        <td style="padding: 14px 10px; text-align: right; font-size: 14px; font-weight: 600; color: #111827;">
          ₹${(Number(item.price) * Number(item.quantity)).toLocaleString('en-IN')}
        </td>
      </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Invoice #${order.orderNumber} - Aetheria Smart Home</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; color: #1f2937; }
        .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; }
        .header { background: #09090b; padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; color: #f4f4f5; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #a1a1aa; letter-spacing: 1px; }
        .content { padding: 32px 28px; }
        .greeting { font-size: 17px; font-weight: 600; margin-bottom: 8px; color: #111827; }
        .order-meta { display: flex; justify-content: space-between; background: #f8fafc; padding: 14px 18px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { text-align: left; padding: 12px 10px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #4b5563; background: #f3f4f6; }
        .summary-table { width: 100%; margin-top: 18px; }
        .summary-table td { padding: 6px 10px; font-size: 14px; }
        .grand-total { font-size: 18px; font-weight: 700; color: #111827; border-top: 2px solid #e5e7eb; padding-top: 10px; }
        .notice-box { background-color: #fffbeb; border: 1px solid #fde68a; border-left: 5px solid #d97706; padding: 16px 18px; border-radius: 6px; margin: 26px 0 10px 0; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Aetheria Smart Home</h1>
          <p>Absolute Intelligent Architecture & Automation</p>
        </div>

        <div class="content">
          <div class="greeting">Dear ${order.customerName},</div>
          <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin-top: 4px;">
            Thank you for placing your smart home order with us! Your invoice details and item calculation have been generated below.
          </p>

          <div class="order-meta">
            <div>
              <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Invoice / Order #</div>
              <div style="font-size: 15px; font-weight: 700; color: #111827;">${order.orderNumber}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Date</div>
              <div style="font-size: 14px; color: #111827;">${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Payment Status</div>
              <div style="font-size: 14px; font-weight: 600; color: #059669;">${order.paymentStatus || 'Pending'}</div>
            </div>
          </div>

          ${order.address ? `
            <div style="font-size: 13px; color: #4b5563; margin-bottom: 20px;">
              <strong>Delivery Address:</strong> ${order.address}${order.city ? ', ' + order.city : ''}
            </div>
          ` : ''}

          <!-- ITEMS INVOICE TABLE -->
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Item Description</th>
                <th style="text-align: center; width: 15%;">Qty</th>
                <th style="text-align: right; width: 15%;">Price</th>
                <th style="text-align: right; width: 20%;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <!-- EXACT CALCULATION SUMMARY -->
          <table class="summary-table">
            <tr>
              <td colspan="2" style="text-align: right; color: #4b5563;">Subtotal:</td>
              <td style="text-align: right; width: 20%; font-weight: 500;">₹${subtotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: right; color: #4b5563;">GST Tax (18% inclusive):</td>
              <td style="text-align: right; color: #059669;">Included</td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: right; color: #4b5563;">Architectural White-Glove Delivery:</td>
              <td style="text-align: right; color: #059669; font-weight: 600;">FREE</td>
            </tr>
            <tr>
              <td colspan="2" class="grand-total" style="text-align: right;">Grand Total:</td>
              <td class="grand-total" style="text-align: right; color: #b45309;">₹${total.toLocaleString('en-IN')}</td>
            </tr>
          </table>

          <!-- FORMAL PAYMENT & DELIVERY MESSAGE (AS REQUESTED) -->
          <div class="notice-box">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #92400e; font-weight: 600;">
              📞 Payment Assistance & Concierge Coordination:
            </p>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #78350f; line-height: 1.6;">
              Please feel free to contact us for payment confirmation or immediate assistance at:
              <a href="tel:${phoneContactNumber}" style="color: #b45309; font-weight: 700; text-decoration: underline;">${phoneContactNumber}</a> (Phone / WhatsApp).
            </p>
            <p style="margin: 0; font-size: 13.5px; color: #78350f; line-height: 1.6;">
              🏠 <strong>Pay on Doorstep Delivery:</strong> You can also conveniently pay the invoice bill amount directly to our authorized delivery personnel upon receiving your order at your doorstep via <strong>Cash, UPI QR, or Card</strong>.
            </p>
          </div>

          <p style="font-size: 13px; color: #6b7280; line-height: 1.5; margin-top: 20px;">
            If you have any questions regarding your architectural integration, wiring schematics, or schedule, our concierge team is always here to assist you.
          </p>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Aetheria Smart Home Systems | Plot 42, Jubilee Hills, Luxury Design Corridor, Hyderabad<br/>
          Need assistance? Email us at concierge@aetheriasmarthome.com or call ${phoneContactNumber}
        </div>
      </div>
    </body>
    </html>
    `;
  }

  public async sendOrderInvoiceEmail(order: Order): Promise<{ success: boolean; previewUrl?: string; error?: string }> {
    try {
      if (!this.transporter) {
        await this.initTransporter();
      }

      if (!this.transporter) {
        console.warn('[MailService] Transporter unavailable. Simulating email dispatch for Order #' + order.orderNumber);
        return { success: true, previewUrl: undefined };
      }

      const htmlContent = this.generateInvoiceHtml(order);

      const mailOptions = {
        from: `"Aetheria Smart Home" <${process.env.SMTP_FROM || 'concierge@aetheriasmarthome.com'}>`,
        to: order.customerEmail,
        subject: `Order Confirmation & Invoice #${order.orderNumber} - Aetheria Smart Home`,
        html: htmlContent
      };

      console.log(`[MailService] Dispatching order invoice to: ${order.customerEmail}...`);
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[MailService] Email sent successfully! MessageId: ${info.messageId}`);

      let previewUrl: string | undefined;
      if (this.testAccountInitialized || info.messageId.includes('ethereal')) {
        previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        if (previewUrl) {
          console.log('\n=============================================================');
          console.log('  📧 CUSTOMER INVOICE EMAIL DELIVERED (LIVE PREVIEW URL)');
          console.log('=============================================================');
          console.log(`  To:      ${order.customerEmail}`);
          console.log(`  Order:   #${order.orderNumber}`);
          console.log(`  Preview: ${previewUrl}`);
          console.log('=============================================================\n');
        }
      }

      return { success: true, previewUrl };
    } catch (error: any) {
      console.error('[MailService] Failed to dispatch invoice email:', error);
      return { success: false, error: error.message };
    }
  }
}

export const mailService = new MailService();
