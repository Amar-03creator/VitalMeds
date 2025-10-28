import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="w-full border-t mt-16" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">VitalMEDS</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Trusted distributor for pharmacies & clinics. 20+ years industry experience delivering quality medicines
              across India.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
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

          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Compliance
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
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
              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-xs text-gray-400">© 2025 VitalMEDS. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
