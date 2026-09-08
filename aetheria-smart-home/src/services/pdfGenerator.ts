/**
 * Aetheria Smart Home Systems - Professional PDF Proposal Generator
 * Built using jsPDF for high-precision luxury architectural proposals
 */

import { jsPDF } from 'jspdf';
import { ProposalData } from '../types';
import { StorageService } from './storage';

export function formatCurrencyINR(amount: number): string {
  if (!amount || isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

export function generateProposalPDF(data: ProposalData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const siteContent = StorageService.getSiteContent();
  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const darkNavy = [15, 23, 42]; // #0f172a
  const tealAccent = [13, 148, 136]; // #0d9488
  const lightGray = [248, 250, 252]; // #f8fafc
  const textDark = [30, 41, 59]; // #1e293b
  const textMuted = [100, 116, 139]; // #64748b
  const borderGray = [226, 232, 240]; // #e2e8f0

  const checkAddPage = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - 22) {
      drawFooter();
      doc.addPage();
      y = margin;
      drawHeaderSmall();
    }
  };

  const drawHeader = () => {
    // Top luxury accent band
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Teal highlight bar
    doc.setFillColor(tealAccent[0], tealAccent[1], tealAccent[2]);
    doc.rect(0, 28, pageWidth, 1.5, 'F');

    // Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('AETHERIA', margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(tealAccent[0], tealAccent[1] + 60, tealAccent[2] + 60);
    doc.text('SMART HOME SYSTEMS • ARCHITECTURAL INTELLIGENCE', margin, 20);

    // Document Title (Right)
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SMART HOME PROJECT PROPOSAL', pageWidth - margin, 14, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text(`Ref: ${data.referenceNumber}`, pageWidth - margin, 20, { align: 'right' });

    y = 38;
  };

  const drawHeaderSmall = () => {
    // Header for subsequent pages
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('AETHERIA SMART HOME SYSTEMS', margin, 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    doc.text(`Proposal Ref: ${data.referenceNumber} • Confidential`, pageWidth - margin, 8, { align: 'right' });

    y = 20;
  };

  const drawFooter = () => {
    const footerY = pageHeight - 12;
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`${siteContent.businessName} • ${siteContent.phone} • ${siteContent.email}`, margin, footerY);

    const pageCount = (doc as any).internal.getNumberOfPages();
    doc.text(`Page ${(doc as any).internal.getCurrentPageInfo().pageNumber} of ${pageCount}`, pageWidth - margin, footerY, { align: 'right' });
  };

  // 1. Initial Page Header
  drawHeader();

  // 2. Client & Project Details Card (Two columns)
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'S');

  // Left Column - Client Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(tealAccent[0], tealAccent[1], tealAccent[2]);
  doc.text('CLIENT SPECIFICATIONS', margin + 6, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(data.customerName || 'Valued Client', margin + 6, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Phone: ${data.customerPhone || 'Not provided'}`, margin + 6, y + 20);
  doc.text(`Email: ${data.customerEmail || 'Not provided'}`, margin + 6, y + 25);
  if (data.location) {
    doc.text(`Location: ${data.location}`, margin + 6, y + 30);
  }

  // Right Column - Project / Property Info
  const rightColX = margin + contentWidth / 2 + 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(tealAccent[0], tealAccent[1], tealAccent[2]);
  doc.text('PROJECT PARAMETERS', rightColX, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Date Issued: ${data.date || new Date().toLocaleDateString('en-IN')}`, rightColX, y + 14);
  doc.text(`Property Type: ${data.propertyType || 'Residential Space'}`, rightColX, y + 19);
  doc.text(`Approx. Size: ${data.propertySize || 'Custom Scope'}`, rightColX, y + 24);
  if (data.automationTier) {
    doc.setFont('helvetica', 'bold');
    doc.text(`Automation Tier: ${data.automationTier}`, rightColX, y + 29);
  } else if (data.consultationType) {
    doc.text(`Consultation: ${data.consultationType}`, rightColX, y + 29);
  }

  y += 42;

  // 3. Project Overview / Requirements
  if (data.notes || data.consultationType || (data.roomsBreakdown && data.roomsBreakdown.length > 0)) {
    checkAddPage(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text('PROJECT OVERVIEW & REQUIREMENTS', margin, y);
    y += 5;

    let overviewText = data.notes || 'Integrated smart automation concept customized for optimal architectural aesthetics, energy efficiency, and reliable daily convenience.';
    if (data.roomsBreakdown && data.roomsBreakdown.length > 0) {
      const roomStr = data.roomsBreakdown.map(r => `${r.count}x ${r.name}`).join(', ');
      overviewText += `\nConfigured Zones: ${roomStr}`;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const splitNotes = doc.splitTextToSize(overviewText, contentWidth);
    doc.text(splitNotes, margin, y);
    y += splitNotes.length * 4.5 + 6;
  }

  // 4. Selected Systems & Hardware Table
  checkAddPage(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('SELECTED SYSTEMS & HARDWARE SCOPE', margin, y);
  y += 6;

  // Table Header
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(margin, y, contentWidth, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('SYSTEM / HARDWARE DESCRIPTION', margin + 3, y + 4.8);
  doc.text('QTY', margin + contentWidth - 55, y + 4.8, { align: 'center' });
  doc.text('ESTIMATED PRICING', margin + contentWidth - 3, y + 4.8, { align: 'right' });
  y += 7;

  // Items Rows
  const items = data.items && data.items.length > 0 ? data.items : (data.systemsIncluded || []).map(s => ({
    name: s,
    category: 'System Zone',
    specifications: 'Integrated protocol with Matter & HomeKit support',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0
  }));

  items.forEach((item, index) => {
    checkAddPage(14);
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(margin, y, contentWidth, 10, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(item.name, margin + 3, y + 4.5);

    if (item.category || item.specifications) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      const sub = item.category ? `[${item.category}] ${item.specifications || ''}` : (item.specifications || '');
      doc.text(sub.substring(0, 75), margin + 3, y + 8.5);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(String(item.quantity || 1), margin + contentWidth - 55, y + 5.5, { align: 'center' });

    const priceLabel = item.totalPrice && item.totalPrice > 0 ? formatCurrencyINR(item.totalPrice) : 'Included in Scope';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(priceLabel, margin + contentWidth - 3, y + 5.5, { align: 'right' });

    y += 10;
  });

  y += 6;

  // 5. Investment Summary
  checkAddPage(40);
  const summaryBoxWidth = 85;
  const summaryX = margin + contentWidth - summaryBoxWidth;

  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(summaryX, y, summaryBoxWidth, 34, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(summaryX, y, summaryBoxWidth, 34, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('INVESTMENT SUMMARY', summaryX + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Hardware / Scope Subtotal:', summaryX + 4, y + 13);
  doc.text('White-Glove Installation & Setup:', summaryX + 4, y + 19);

  const subtotalStr = data.subtotal > 0 ? formatCurrencyINR(data.subtotal) : (data.estimatedTotalMin ? `${formatCurrencyINR(data.estimatedTotalMin)}` : 'To be assessed');
  const installStr = data.installationEstimate > 0 ? formatCurrencyINR(data.installationEstimate) : (data.subtotal > 0 ? 'Included' : 'Based on site walk');

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(subtotalStr, summaryX + summaryBoxWidth - 4, y + 13, { align: 'right' });
  doc.text(installStr, summaryX + summaryBoxWidth - 4, y + 19, { align: 'right' });

  // Total Line
  doc.setDrawColor(tealAccent[0], tealAccent[1], tealAccent[2]);
  doc.setLineWidth(0.4);
  doc.line(summaryX + 4, y + 23, summaryX + summaryBoxWidth - 4, y + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(tealAccent[0], tealAccent[1], tealAccent[2]);
  doc.text('Estimated Total Investment:', summaryX + 4, y + 29);

  let totalStr = '';
  if (data.totalAmount > 0) {
    totalStr = formatCurrencyINR(data.totalAmount);
  } else if (data.estimatedTotalMin && data.estimatedTotalMax) {
    totalStr = `${formatCurrencyINR(data.estimatedTotalMin)} – ${formatCurrencyINR(data.estimatedTotalMax)}`;
  } else {
    totalStr = 'Pricing after consultation';
  }
  doc.text(totalStr, summaryX + summaryBoxWidth - 4, y + 29, { align: 'right' });

  y += 42;

  // 6. Important Disclaimer Note (Mandatory requirement)
  checkAddPage(25);
  doc.setFillColor(254, 243, 199); // Light amber
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text('IMPORTANT PROPOSAL NOTICE', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(120, 53, 15);
  const notice = 'This proposal is an estimate and does not constitute a final quotation. Final pricing is subject to site assessment, system design, hardware availability, installation requirements and client approval.';
  const splitNotice = doc.splitTextToSize(notice, contentWidth - 8);
  doc.text(splitNotice, margin + 4, y + 9.5);

  y += 22;

  // 7. Warranty & Standards
  checkAddPage(22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('WARRANTY & ARCHITECTURAL STANDARDS', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const termsText = [
    '• 3-Year Advanced Replacement Warranty on all active smart hubs, wall switches, actuators, and biometric controllers.',
    '• 24/7 Priority Remote Network Health Monitoring and certified Automation Engineer telephone support.',
    '• Zero Cloud Dependency: All facial biometric data and local room automation triggers are hosted securely on-premise.'
  ];
  termsText.forEach(t => {
    doc.text(t, margin, y);
    y += 4;
  });

  y += 5;

  // 8. Contact & Company Info
  checkAddPage(20);
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(margin, y, contentWidth, 15, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('AETHERIA SMART HOME SYSTEMS', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(tealAccent[0] + 70, tealAccent[1] + 70, tealAccent[2] + 70);
  doc.text(`Phone: ${siteContent.phone}  |  WhatsApp: ${siteContent.whatsappNumber}  |  Email: ${siteContent.email}`, margin + 5, y + 11);

  // Finalize all footers
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const footerY = pageHeight - 10;
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`${siteContent.businessName} • Architectural Intelligence`, margin, footerY + 1);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, footerY + 1, { align: 'right' });
  }

  // Save / Download
  const filename = `Aetheria_Proposal_${data.referenceNumber || 'Concept'}.pdf`;
  doc.save(filename);
}
