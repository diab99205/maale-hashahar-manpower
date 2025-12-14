import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, SERVICES_LIST, PROJECTS_LIST, CONTACT_INFO } from './constants';
import { Language } from './types';
import AccessibilityPanel from './components/AccessibilityPanel';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Phone, Mail, Menu, X, CheckCircle, ArrowRight, Instagram, Facebook, ChevronDown, FileCheck, Forklift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [lang, setLang] = useState<Language>('he');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fileName, setFileName] = useState<string>(''); // State for uploaded file

  const t = TRANSLATIONS[lang];
  const dir = lang === 'en' ? 'ltr' : 'rtl';

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply language direction
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  // Styling constants - Yellow Theme
  const theme = {
    bg: 'bg-gray-50',
    text: 'text-slate-800',
    primary: 'bg-slate-900',
    primaryText: 'text-slate-900',
    accent: 'bg-amber-400', 
    accentHover: 'hover:bg-amber-300',
    accentText: 'text-amber-500', 
    accentBorder: 'border-amber-400',
    cardBg: 'bg-white',
    muted: 'text-slate-500',
  };

  const containerClasses = `
    min-h-screen transition-all duration-300
    ${theme.bg} ${theme.text}
  `;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: t.nav_home },
    { id: 'about', label: t.nav_about },
    { id: 'services', label: t.nav_services },
    { id: 'projects', label: t.nav_projects },
  ];

  return (
    <div className={containerClasses}>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent
        ${scrolled || mobileMenuOpen 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-slate-800'
          : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-4 cursor-pointer h-full py-2 select-none group" onClick={() => scrollTo('home')}>
             {/* Main Logo Image */}
             <div className="relative z-10 transition-transform group-hover:scale-105 duration-300">
                <img 
                  src="/logo-main.png" 
                  alt="Company Logo" 
                  className="h-14 w-auto md:h-16 object-contain drop-shadow-lg" 
                />
             </div>
             
             {/* Company Name Text */}
             <div className="flex flex-col justify-center">
               <span className={`font-black text-xl md:text-2xl tracking-wide uppercase leading-none mb-1 transition-colors ${scrolled || mobileMenuOpen ? 'text-white' : 'text-white drop-shadow-md'}`}>
                 {lang === 'en' ? 'A. Maale Hashahar' : 'א. מעלה השחר'}
               </span>
               <span className={`text-xs md:text-sm font-bold tracking-widest uppercase ${scrolled || mobileMenuOpen ? 'text-amber-400' : 'text-amber-400 drop-shadow-md'}`}>
                 {lang === 'en' ? 'MANPOWER SERVICES' : 'שירותי כוח אדם'}
               </span>
             </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)} 
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:text-amber-400 ${scrolled ? 'text-slate-200' : 'text-white drop-shadow-md'}`}
              >
                {link.label}
              </button>
            ))}
            
            <button 
              onClick={() => scrollTo('contact')} 
              className={`px-6 py-2.5 rounded-sm font-bold uppercase tracking-wide text-sm transition-all shadow-md text-slate-900
                ${theme.accent} ${theme.accentHover} hover:shadow-lg hover:-translate-y-0.5
              `}
            >
              {t.nav_contact}
            </button>
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white p-2 hover:text-amber-400 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-28 px-4 bg-slate-900"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-bold text-white">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </button>
              ))}
              <button onClick={() => scrollTo('contact')} className="text-amber-400 hover:text-amber-300">
                {t.nav_contact}
              </button>
              <div className="mt-8 transform scale-125">
                 <LanguageSwitcher currentLang={lang} setLang={setLang} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden bg-slate-900">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
            alt="Construction Site" 
            className="w-full h-full object-cover transition-opacity duration-1000 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/50"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="container mx-auto relative z-10 pt-20 text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
             <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 text-amber-400 text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
               {lang === 'en' ? 'Professional Manpower Solutions' : 'פתרונות כוח אדם מקצועיים'}
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
               {t.hero_title}
             </h1>
             <p className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto font-light leading-relaxed text-slate-100">
               {t.hero_subtitle}
             </p>
             
             <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => scrollTo('contact')}
                 className={`group relative overflow-hidden px-10 py-5 rounded-sm font-bold text-xl uppercase tracking-wide shadow-xl ${theme.accent} text-slate-900`}
               >
                 <span className="relative z-10 flex items-center gap-2">
                   {t.hero_cta} <ArrowRight size={24} className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                 </span>
                 <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
               </motion.button>
               
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollTo('services')}
                  className="px-10 py-5 rounded-sm font-bold text-xl uppercase tracking-wide border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
               >
                  {lang === 'en' ? 'Our Services' : 'השירותים שלנו'}
               </motion.button>
             </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-amber-400 hidden md:block">
           <ChevronDown size={40} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-4 ${theme.bg}`}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             {/* Text Content */}
             <div className={`order-2 lg:order-1 ${dir === 'rtl' ? 'lg:pl-12' : 'lg:pr-12'}`}>
               <div className="flex items-center gap-3 mb-4">
                  <div className={`h-1.5 w-16 ${theme.accent}`}></div>
                  <span className={`font-bold uppercase tracking-widest text-sm ${theme.accentText}`}>{t.nav_about}</span>
               </div>
               <h2 className={`text-4xl md:text-5xl font-black mb-8 ${theme.primaryText}`}>{t.about_title}</h2>
               <p className={`text-lg mb-8 leading-relaxed ${theme.muted}`}>
                 {t.about_desc}
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   lang === 'he' || lang === 'ar' ? 'תגובה מהירה' : 'Fast Response',
                   lang === 'he' || lang === 'ar' ? 'בטיחות מעל הכל' : 'Safety First',
                   lang === 'he' || lang === 'ar' ? 'צוותים מיומנים' : 'Skilled Teams',
                   lang === 'he' || lang === 'ar' ? 'פריסה ארצית' : 'Nationwide',
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                      <CheckCircle size={24} className="text-amber-400" />
                      <span className="font-bold text-lg">{item}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Image Composition */}
             <div className="order-1 lg:order-2 relative">
                <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl -translate-y-6 translate-x-6 z-0 ${theme.accent} opacity-30`}></div>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                   <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" alt="Construction Worker" className="w-full h-full object-cover" />
                   
                   {/* Floating Stats Card */}
                   <div className="absolute bottom-6 left-6 p-6 rounded-lg shadow-xl max-w-[200px] bg-slate-900 border-b-4 border-amber-400">
                      <div className="text-4xl font-black mb-1 text-amber-400">10+</div>
                      <div className="text-sm font-medium leading-tight text-white">
                        {lang === 'he' ? 'שנות מצוינות בבנייה' : lang === 'ar' ? 'سنوات من التميز' : 'Years of Excellence'}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 relative bg-slate-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`font-bold uppercase tracking-widest text-sm ${theme.accentText}`}>{t.nav_services}</span>
            <h2 className={`text-4xl md:text-5xl font-black mt-3 mb-6 ${theme.primaryText}`}>{t.services_title}</h2>
            <div className={`h-1.5 w-24 mx-auto rounded-full ${theme.accent}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SERVICES_LIST.map((service, idx) => {
               const label = lang === 'he' ? service.label_he : lang === 'ar' ? service.label_ar : service.label_en;
               const Icon = service.icon;
               return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -8 }}
                    className={`group p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-6 text-center border bg-white hover:border-amber-400 border-slate-200`}
                  >
                    <div className="p-5 rounded-full transition-colors duration-300 bg-slate-50 group-hover:bg-amber-400 group-hover:text-slate-900 text-slate-700 border border-slate-100 group-hover:border-amber-400">
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className={`font-bold text-xl leading-tight ${theme.primaryText}`}>{label}</h3>
                  </motion.div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-4 ${theme.bg}`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
                <span className={`font-bold uppercase tracking-widest text-sm ${theme.accentText}`}>{t.nav_projects}</span>
                <h2 className={`text-4xl md:text-5xl font-black mt-3 ${theme.primaryText}`}>{t.projects_title}</h2>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROJECTS_LIST.map((project, idx) => {
              // Get the correct language fields
              const pName = lang === 'he' ? project.name_he : (lang === 'ar' ? project.name_ar : project.name_en);
              const pLoc = lang === 'he' ? project.location_he : (lang === 'ar' ? project.location_ar : project.location_en);
              const pDesc = lang === 'he' ? project.description_he : (lang === 'ar' ? project.description_ar : project.description_en);

              return (
                <motion.div 
                   key={idx} 
                   whileHover={{ y: -5 }}
                   className="group rounded-xl overflow-hidden shadow-lg transition-all bg-white border border-slate-100 flex flex-col h-full"
                >
                   {/* Image Container */}
                   <div className="h-56 bg-white relative overflow-hidden flex items-center justify-center p-8 border-b border-slate-100">
                      <img 
                        src={project.image} 
                        alt={pName} 
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if(parent) {
                            parent.classList.add('bg-slate-50');
                            const div = document.createElement('div');
                            div.className = 'text-center font-bold text-slate-400 uppercase tracking-widest';
                            div.innerText = 'Logo';
                            parent.appendChild(div);
                          }
                        }}
                      />
                      {/* Location Badge (Translated) */}
                      <div className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-sm shadow-md bg-amber-400 text-slate-900 uppercase tracking-wider">
                         {pLoc}
                      </div>
                   </div>
                   
                   {/* Content Container */}
                   <div className="p-6 flex flex-col flex-grow">
                      <h3 className={`font-bold text-xl mb-3 leading-tight ${theme.primaryText}`}>{pName}</h3>
                      <div className="h-1 w-12 mb-4 bg-amber-400"></div>
                      <p className={`text-sm leading-relaxed ${theme.muted}`}>{pDesc}</p>
                   </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Info Side */}
            <div className="flex flex-col justify-center">
              <span className={`font-bold uppercase tracking-widest text-sm mb-2 text-amber-400`}>{t.nav_contact}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">{t.contact_title}</h2>
              <p className="text-xl mb-10 text-slate-300">
                 {lang === 'he' ? 'מוכנים להתחיל לעבוד? צרו איתנו קשר עוד היום וקבלו הצעת מחיר מותאמת אישית.' : 'Ready to start? Contact us today for a custom quote.'}
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider mb-1 text-slate-400">{t.contact_phone}</p>
                    {/* FIXED: Added dir="ltr" and block text-left to prevent flipping */}
                    <a 
                      href={`tel:${CONTACT_INFO.phone}`} 
                      className="text-2xl font-bold hover:text-amber-400 transition-colors block text-left"
                      dir="ltr"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider mb-1 text-slate-400">{t.contact_email}</p>
                    {/* FIXED: Added dir="ltr" and block text-left to prevent flipping */}
                    <a 
                      href={`mailto:${CONTACT_INFO.email}`} 
                      className="text-xl font-bold hover:text-amber-400 transition-colors block text-left"
                      dir="ltr"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                   <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="p-4 rounded-full transition-all hover:scale-110 bg-white/5 hover:bg-amber-400 hover:text-slate-900 text-white"><Instagram size={28} /></a>
                   <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" className="p-4 rounded-full transition-all hover:scale-110 bg-white/5 hover:bg-amber-400 hover:text-slate-900 text-white"><Facebook size={28} /></a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-10 rounded-2xl shadow-2xl bg-white text-slate-800 border-t-8 border-amber-400">
               <h3 className="text-2xl font-bold mb-6 text-slate-900">{t.contact_info_title}</h3>
               
               <form 
                  action={CONTACT_INFO.formAction} 
                  method="POST" 
                  encType="multipart/form-data"
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">{t.contact_name}</label>
                    <input required type="text" name="fullname" className="w-full px-4 py-3 rounded-md border-2 font-medium focus:ring-0 outline-none transition-all bg-slate-50 border-slate-200 focus:border-amber-400 focus:bg-white" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">{t.contact_phone}</label>
                        <input required type="tel" name="phone" className="w-full px-4 py-3 rounded-md border-2 font-medium focus:ring-0 outline-none transition-all bg-slate-50 border-slate-200 focus:border-amber-400 focus:bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">{t.contact_city}</label>
                        <input required type="text" name="city" className="w-full px-4 py-3 rounded-md border-2 font-medium focus:ring-0 outline-none transition-all bg-slate-50 border-slate-200 focus:border-amber-400 focus:bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">{t.contact_email}</label>
                    <input required type="email" name="email" className="w-full px-4 py-3 rounded-md border-2 font-medium focus:ring-0 outline-none transition-all bg-slate-50 border-slate-200 focus:border-amber-400 focus:bg-white" />
                  </div>

                  {/* Updated CV Upload Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">{t.contact_cv}</label>
                    
                    <div className={`relative border-2 rounded-md p-8 text-center cursor-pointer transition-colors group 
                      ${fileName ? 'border-amber-400 bg-amber-50 border-solid' : 'border-dashed border-slate-300 hover:border-amber-400 hover:bg-yellow-50'}
                    `}>
                        {/* The Actual Input */}
                        <input 
                          required 
                          type="file" 
                          name="cv" 
                          onChange={handleFileChange} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        
                        {/* The Visual Part */}
                        <div className="pointer-events-none flex flex-col items-center justify-center">
                           <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center transition-colors
                             ${fileName ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-400 group-hover:bg-amber-400 group-hover:text-white'}
                           `}>
                              {/* Show Checkmark if uploaded, Mail icon if not */}
                              {fileName ? <FileCheck size={24} /> : <Mail size={24} />}
                           </div>
                           
                           {/* Show Filename if uploaded, Instructions if not */}
                           {fileName ? (
                              <span className="text-sm font-bold text-slate-900 break-all px-4">{fileName}</span>
                           ) : (
                              <span className="text-sm font-medium text-slate-500">PDF / Word / Image</span>
                           )}
                        </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mt-4 bg-amber-400 text-slate-900 hover:bg-amber-300">
                    {t.contact_submit}
                  </button>
                  
                  <div className="pt-4 border-t border-gray-100 mt-6">
                     <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors font-bold shadow-md uppercase tracking-wide text-sm">
                        <Phone size={18} />
                        WhatsApp Quick Chat
                     </a>
                  </div>
                </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center px-4 border-t bg-slate-950 text-slate-400 border-slate-900">
         <div className="container mx-auto">
            {/* Footer Logo */}
            <div className="flex flex-col items-center justify-center mb-6 gap-3">
               <img src="/logo-main.png" alt="Logo" className="h-16 w-auto object-contain" />
               <div className="flex flex-col leading-tight">
                  <span className="font-bold text-lg text-white">א. מעלה השחר</span>
                  <span className="text-xs text-amber-400 tracking-wider">שירותי כוח אדם</span>
               </div>
            </div>
            <p className="font-medium">{t.footer_rights}</p>
         </div>
      </footer>

      {/* Accessibility Fab */}
      <AccessibilityPanel t={t} lang={lang} />
      
      {/* WhatsApp Sticky Button (Mobile) */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
        className="fixed bottom-5 left-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <Phone size={28} fill="currentColor" className="text-white" />
      </a>
    </div>
  );
}

export default App;