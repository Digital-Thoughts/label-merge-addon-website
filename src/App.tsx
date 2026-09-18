import { useEffect, useState } from 'react';
import { SiteConfig } from './types';
import { ArrowRight, Download, ShieldCheck, Lock, Grid, Gift, Sliders, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';
import WorkflowImage from './assets/images/workflow_sheets_to_docs_ui_1788936707237.jpg';

const iconMap: Record<string, React.FC<any>> = {
  Grid,
  ShieldCheck,
  Lock,
  Gift,
  Sliders,
  Layers
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
        if (data.appName) {
          document.title = data.appName;
        }
        setTimeout(() => {
          if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
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
  const borderPrimaryStyle = { borderColor: config.theme.primaryColor };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={config.logo.url} alt={config.logo.alt} className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight">{config.appName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</a>
            <a href="#privacy" className="text-sm font-medium hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#templates" className="text-sm font-medium hover:text-gray-600 transition-colors">Templates</a>
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

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4" style={primaryStyle} />
            {config.badgeText}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            {config.tagline}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {config.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={config.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white rounded-full transition-all hover:shadow-xl w-full sm:w-auto"
              style={bgPrimaryStyle}
            >
              Install from Google Workspace
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a 
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white border-2 border-black rounded-full transition-all hover:bg-gray-50 w-full sm:w-auto"
            >
              How it works
            </a>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-gray-100 pt-10">
            {Object.entries(config.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-black mb-1">{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-gray-600">Merge your data into perfect labels in four simple steps.</p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <img src={WorkflowImage} alt="Data Merge Workflow Illustration" className="rounded-2xl shadow-lg border border-gray-100 w-full" />
          </div>
          
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {config.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg mb-6 shadow-md"
                    style={bgPrimaryStyle}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                  {step.tip && (
                    <div className="text-xs bg-gray-50 text-gray-500 p-3 rounded-lg text-left border border-gray-100">
                      <strong>Tip:</strong> {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need, nothing you don't.</h2>
            <p className="text-lg text-gray-600">Built for speed, accuracy, and absolute privacy within Google Docs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.features.map(feature => {
              const Icon = iconMap[feature.icon] || CheckCircle2;
              return (
                <div key={feature.id} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${config.theme.primaryColor}15`, color: config.theme.primaryColor }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Deep Dive */}
      <section id="privacy" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-6">
                <Lock className="w-4 h-4" />
                Data Stays With You
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {config.privacyGuarantees.title}
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {config.privacyGuarantees.description}
              </p>
              
              <div className="space-y-6">
                {config.privacyGuarantees.scopes.map((scope, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[#0c67d6]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-white bg-white/10 px-2 py-1 rounded inline-block mb-2 break-all border border-white/20">{scope.scope}</div>
                      <p className="text-sm text-gray-300 leading-relaxed">{scope.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">The Privacy Difference</h3>
              <div className="space-y-6">
                {config.privacyGuarantees.competitorComparison.map((comp, idx) => (
                  <div key={idx}>
                    <div className="text-sm text-gray-400 mb-2">{comp.feature}</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#0c67d6] font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        {comp.averyLabelMerge}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm pl-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                        Other Add-ons: {comp.otherAddons}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Catalogs</h2>
            <p className="text-lg text-gray-600">Over 2,000 exact-match templates built in. Find yours instantly.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {config.catalogs.map(catalog => (
              <div key={catalog.id} className="p-6 rounded-2xl border border-gray-200 hover:border-black transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: catalog.color }}>
                    {catalog.initial}
                  </div>
                  <h3 className="text-xl font-bold">{catalog.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{catalog.description}</p>
                <div className="flex flex-wrap gap-2">
                  {catalog.sampleSkus.slice(0, 4).map(sku => (
                    <span key={sku} className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-md text-gray-600">
                      {sku}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-gray-50 text-xs font-medium rounded-md text-gray-400">
                    + more
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Ready to start merging?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Install the add-on today and generate your first batch of labels in under a minute. No signup required.
            </p>
            <a 
              href={config.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white rounded-full transition-all hover:shadow-xl"
              style={bgPrimaryStyle}
            >
              Get {config.appName}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer Section */}
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
