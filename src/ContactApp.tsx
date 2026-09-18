import { useEffect, useState } from 'react';
import { SiteConfig } from './types';
import { Download } from 'lucide-react';

export default function ContactApp() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load config:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0c67d6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black">
        <p>Error loading configuration. Please check public/config.json.</p>
      </div>
    );
  }

  const primaryStyle = { color: config.theme.primaryColor };
  const bgPrimaryStyle = { backgroundColor: config.theme.primaryColor };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={config.logo.url} alt={config.logo.alt} className="w-8 h-8" />
            <a href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">{config.appName}</a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</a>
            <a href="/#privacy" className="text-sm font-medium hover:text-gray-600 transition-colors">Privacy</a>
            <a href="/#templates" className="text-sm font-medium hover:text-gray-600 transition-colors">Templates</a>
            <a href="/contact" className="text-sm font-medium hover:text-gray-600 transition-colors">Contact</a>
          </nav>
          <a 
            href={config.marketplaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white rounded-full transition-all hover:shadow-lg"
            style={bgPrimaryStyle}
          >
            <Download className="w-4 h-4 mr-2" />
            Install Free
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Need Help?</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We're here to help you get the most out of {config.appName}. If you have any questions, feature requests, or run into issues, please reach out to our support team.
          </p>
          <div className="inline-flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm w-full max-w-md hover:shadow-lg transition-all mx-auto">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm" style={{ backgroundColor: `${config.theme.primaryColor}15`, color: config.theme.primaryColor }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
            <a 
              href={`mailto:${config.supportEmail}`} 
              className="text-xl font-semibold hover:underline"
              style={primaryStyle}
            >
              {config.supportEmail}
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-xs text-gray-500 leading-relaxed max-w-4xl text-left">
            <p className="mb-4">
              <span>* Google services impose daily quotas and hard limitations on some features - </span>
              <a href="https://developers.google.com/apps-script/guides/services/quotas" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline underline-offset-2">https://developers.google.com/apps-script/guides/services/quotas</a>
            </p>
            <p>
              <span>{config.appName}</span>
              <span> use and transfer of information received from Google APIs to any other app will adhere to </span>
              <a href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline underline-offset-2">Workspace API User Data and Developer Policy</a>
              <span>, including the </span>
              <a href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy#limited-use" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 underline underline-offset-2">Limited use of user data</a>
              <span>.</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <img src={config.footer.companyLogoUrl} alt={config.footer.copyrightOwner} className="h-10 w-auto object-contain" />
              <span className="font-semibold text-gray-900">
                © {new Date().getFullYear()} {config.footer.copyrightOwner}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {config.footer.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : ""}
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
