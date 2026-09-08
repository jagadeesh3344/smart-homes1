/**
 * PolicyPage Component - Privacy, Shipping, Terms, and Returns Policies
 * Elegant Architectural Luxury Redesign for light-mode.
 */

import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Truck, FileText, RotateCcw } from 'lucide-react';

interface PolicyPageProps {
  type: 'privacy' | 'shipping' | 'terms' | 'returns';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const getPolicyContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy & Data Security Policy',
          icon: ShieldCheck,
          sections: [
            {
              heading: 'Local Neural Privacy Guarantee',
              body: 'Aetheria Smart Home is dedicated to absolute homeowner privacy. Our smart hubs execute scene processing and device automations locally on-premise. Your biometric access logs, room activity data, and video telemetry never leave your private network without explicit user command.'
            },
            {
              heading: 'Data Collection & Enquiry Handling',
              body: 'We collect customer contact information (Name, Phone Number, Email, Delivery Address) strictly for generating hardware quotes, dispatching technicians, and servicing warranties. We do not monetize or share your information with third-party advertising brokers.'
            },
            {
              heading: 'Encryption Standards',
              body: 'All communications between mobile applications, local Neural Hubs, and cloud support telemetry are secured using AES-256 bit end-to-end encryption and TLS 1.3 cryptographic protocols.'
            }
          ]
        };
      case 'shipping':
        return {
          title: 'White-Glove Shipping & Delivery Policy',
          icon: Truck,
          sections: [
            {
              heading: 'White-Glove Delivery & Dispatch',
              body: 'All Aetheria smart hardware packages are shipped via insured white-glove courier services in shock-resistant protective casing. Direct tracking numbers and estimated delivery windows are provided upon dispatch.'
            },
            {
              heading: 'Integrated On-Site Technicians',
              body: 'For complete smart home packages, hardware is delivered directly by our certified automation engineers during your scheduled installation appointment.'
            },
            {
              heading: 'Inspection & Sign-Off',
              body: 'Customers must inspect all packaging upon arrival. Any freight damage must be reported within 48 hours for immediate replacement under our Advanced Replacement Program.'
            }
          ]
        };
      case 'terms':
        return {
          title: 'Terms & Conditions of Service',
          icon: FileText,
          sections: [
            {
              heading: 'Quotations & Non-Binding Enquiries',
              body: 'All prices displayed on this website represent estimated quote values. Formal architectural binding quotes are issued following an on-site or floorplan technical assessment.'
            },
            {
              heading: 'Intellectual Property',
              body: 'Aetheria, Neural Core, and associated logos, firmware blueprints, and software interfaces are registered trademarks of Aetheria Smart Home Systems Inc.'
            },
            {
              heading: 'System Installation & Electrical Compliance',
              body: 'Customers are responsible for ensuring their property meets local municipal electrical codes prior to high-voltage smart switch and panel installation.'
            }
          ]
        };
      case 'returns':
        return {
          title: 'Returns & Replacement Policy',
          icon: RotateCcw,
          sections: [
            {
              heading: '30-Day Satisfaction Guarantee',
              body: 'If you are not completely satisfied with your smart hardware, you may request a return or exchange within 30 days of installation, provided hardware remains undamaged.'
            },
            {
              heading: '3-Year Advanced Replacement Warranty',
              body: 'All smart hubs, switches, and biometric locks include a 3-Year Advanced Replacement Guarantee. If a hardware fault occurs, a replacement unit is dispatched immediately before receiving the defective item.'
            },
            {
              heading: 'RMA Process',
              body: 'To initiate a return or warranty claim, contact support@aetheriasmarthome.com or launch an enquiry through your My Account dashboard.'
            }
          ]
        };
    }
  };

  const content = getPolicyContent();
  const IconComp = content.icon;

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: content.title }]} />

        <div className="bg-white rounded-xl p-8 sm:p-12 border border-zinc-200 shadow-sm my-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-150">
            <div className="w-12 h-12 rounded bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
              <IconComp className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight font-serif">
              {content.title}
            </h1>
          </div>

          <div className="space-y-8">
            {(content?.sections || []).map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-900 font-serif">{sec.heading}</h3>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-light">{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
