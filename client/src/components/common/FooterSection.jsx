import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="w-full bg-slate-800 dark:bg-slate-950 border-t border-slate-700 dark:border-slate-800 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* VitalMEDS Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">VitalMEDS</h3>
            <p className="text-sm text-gray-300 dark:text-gray-400 leading-relaxed">
              Trusted distributor for pharmacies & clinics. 20+ years industry
              experience delivering quality medicines across India.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>orders@vitalmeds.example</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Compliance Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Compliance
            </h4>
            <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <p className="flex items-start">
                <span className="font-medium text-gray-200 mr-2">GSTIN:</span>
                <span>29ABCDE1234F2Z5</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium text-gray-200 mr-2">Drug License:</span>
                <span>DL-123456</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium text-gray-200 mr-2">FSSAI:</span>
                <span>12345678901234</span>
              </p>
              <div className="mt-6 pt-4 border-t border-slate-700 dark:border-slate-800">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  © 2025 VitalMEDS. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
