import React, { useState, useEffect } from "react"
import { Translation, Language } from "../types"
import { CONTACT_INFO } from "../constants"
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Type,
  Contrast,
  Eye,
  Mouse,
  Palette,
  RotateCcw,
  FileText,
  Mail,
  Phone,
  CircleDot,
  Sparkles,
  Link as LinkIcon,
  X,
  Check
} from "lucide-react"

interface Props {
  t: Translation;
  lang: Language;
}

// Internal simple UI components to replace Shadcn imports
const Switch = ({ checked, onCheckedChange, id }: { checked: boolean, onCheckedChange: (c: boolean) => void, id?: string }) => (
  <button 
    id={id}
    role="switch" 
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    // Changed: bg-teal-600 -> bg-amber-500
    className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${checked ? 'bg-amber-500' : 'bg-gray-200'}`}
  >
    <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

const Separator = () => <div className="h-px bg-gray-200 w-full my-1" />;

const Button = ({ children, onClick, className, variant = 'default', disabled, title }: any) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    // Changed: Teal styles -> Yellow Background + Dark Text (Construction Theme)
    default: "bg-amber-400 text-slate-900 hover:bg-amber-300 shadow",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
    icon: "h-9 w-9"
  };
  const cls = variant === 'icon' ? variants.default : (variant === 'outline' ? variants.outline : variants.default);
  
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${cls} ${className}`} title={title}>
      {children}
    </button>
  );
};

export const AccessibilityPanel: React.FC<Props> = ({ t, lang }) => {
  const [open, setOpen] = useState(false);
  const isRTL = lang === 'ar' || lang === 'he';

  // Accessibility states
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);
  const [cursorSize, setCursorSize] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Color modes
  const [grayscale, setGrayscale] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [lowSaturation, setLowSaturation] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');
  
  // Text enhancements
  const [letterSpacing, setLetterSpacing] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [textAlignment, setTextAlignment] = useState(false);
  
  // Content controls
  const [hideImages, setHideImages] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setFontSize(prefs.fontSize || 100);
        setHighContrast(prefs.highContrast || false);
        setLargeText(prefs.largeText || false);
        setHighlightLinks(prefs.highlightLinks || false);
        setReadableFont(prefs.readableFont || false);
        setLineSpacing(prefs.lineSpacing || false);
        setCursorSize(prefs.cursorSize || false);
        setReduceMotion(prefs.reduceMotion || false);
        setGrayscale(prefs.grayscale || false);
        setInvertColors(prefs.invertColors || false);
        setLowSaturation(prefs.lowSaturation || false);
        setColorBlindMode(prefs.colorBlindMode || 'none');
        setLetterSpacing(prefs.letterSpacing || false);
        setUnderlineLinks(prefs.underlineLinks || false);
        setTextAlignment(prefs.textAlignment || false);
        setHideImages(prefs.hideImages || false);
        setStopAnimations(prefs.stopAnimations || false);
      } catch (e) {
        console.error("Error parsing accessibility preferences", e);
      }
    }
  }, []);

  // Save preferences
  const savePreferences = () => {
    const prefs = {
      fontSize, highContrast, largeText, highlightLinks, readableFont, lineSpacing,
      cursorSize, reduceMotion, grayscale, invertColors, lowSaturation, colorBlindMode,
      letterSpacing, underlineLinks, textAlignment, hideImages, stopAnimations,
    };
    localStorage.setItem('accessibility-preferences', JSON.stringify(prefs));
  };

  // Apply all effects
  useEffect(() => { document.documentElement.style.fontSize = `${fontSize}%`; savePreferences() }, [fontSize]);
  useEffect(() => { document.documentElement.classList.toggle('high-contrast', highContrast); savePreferences() }, [highContrast]);
  useEffect(() => { document.documentElement.classList.toggle('large-text', largeText); savePreferences() }, [largeText]);
  useEffect(() => { document.documentElement.classList.toggle('highlight-links', highlightLinks); savePreferences() }, [highlightLinks]);
  useEffect(() => { document.documentElement.classList.toggle('readable-font', readableFont); savePreferences() }, [readableFont]);
  useEffect(() => { document.documentElement.classList.toggle('increased-spacing', lineSpacing); savePreferences() }, [lineSpacing]);
  useEffect(() => { document.documentElement.classList.toggle('large-cursor', cursorSize); savePreferences() }, [cursorSize]);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduceMotion); savePreferences() }, [reduceMotion]);
  useEffect(() => { document.documentElement.classList.toggle('grayscale-mode', grayscale); savePreferences() }, [grayscale]);
  useEffect(() => { document.documentElement.classList.toggle('invert-colors', invertColors); savePreferences() }, [invertColors]);
  useEffect(() => { document.documentElement.classList.toggle('low-saturation', lowSaturation); savePreferences() }, [lowSaturation]);
  useEffect(() => {
    document.documentElement.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    if (colorBlindMode !== 'none') document.documentElement.classList.add(colorBlindMode);
    savePreferences();
  }, [colorBlindMode]);
  useEffect(() => { document.documentElement.classList.toggle('letter-spacing', letterSpacing); savePreferences() }, [letterSpacing]);
  useEffect(() => { document.documentElement.classList.toggle('underline-links', underlineLinks); savePreferences() }, [underlineLinks]);
  useEffect(() => { document.documentElement.classList.toggle('text-left-align', textAlignment); savePreferences() }, [textAlignment]);
  useEffect(() => { document.documentElement.classList.toggle('hide-images', hideImages); savePreferences() }, [hideImages]);
  useEffect(() => { document.documentElement.classList.toggle('stop-animations', stopAnimations); savePreferences() }, [stopAnimations]);

  const resetAll = () => {
    setFontSize(100); setHighContrast(false); setLargeText(false); setHighlightLinks(false);
    setReadableFont(false); setLineSpacing(false); setCursorSize(false); setReduceMotion(false);
    setGrayscale(false); setInvertColors(false); setLowSaturation(false); setColorBlindMode('none');
    setLetterSpacing(false); setUnderlineLinks(false); setTextAlignment(false);
    setHideImages(false); setStopAnimations(false);
    localStorage.removeItem('accessibility-preferences');
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        // Changed: Teal -> Amber bg, Slate text
        className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-50 h-14 w-14 rounded-full shadow-lg bg-amber-400 hover:bg-amber-300 text-slate-900 flex items-center justify-center`}
        aria-label={t.accessibility}
        title={t.accessibility}
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end items-end sm:items-center pointer-events-none">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={() => setOpen(false)}></div>
          
          {/* Panel */}
          <div 
            className={`pointer-events-auto bg-white w-full sm:w-[420px] h-[80vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl transition-transform transform ${isRTL ? 'sm:rounded-r-xl left-0' : 'sm:rounded-l-xl right-0'} fixed sm:relative ${isRTL ? 'left-0 top-0 h-full sm:h-auto' : 'right-0 top-0 h-full sm:h-auto'}`}
            style={{ [isRTL ? 'left' : 'right']: 0 }}
          >
             <div className="p-6">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <div>
                    {/* Changed: Text-teal-600 -> Text-amber-600 */}
                    <h2 className="flex items-center gap-3 text-amber-600 text-lg font-bold">
                      <Accessibility className="h-5 w-5" />
                      {t.accessibilityTools}
                    </h2>
                    <p className="text-sm text-gray-500 pt-2">{t.customizeYourExperience}</p>
                  </div>
                  <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-8 py-6">
                  {/* Text Size */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                        <Type className="h-4 w-4" />
                        {t.textSize}
                      </label>
                      <span className="text-sm text-gray-500 font-medium" dir="ltr">{fontSize}%</span>
                    </div>
                    <div className="flex items-center gap-3 px-2">
                      <Button variant="outline" className="p-2 h-8 w-8" onClick={() => setFontSize(Math.max(50, fontSize - 10))} disabled={fontSize <= 50}>
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        {/* Changed: bg-teal-600 -> bg-amber-500 */}
                        <div className="h-full bg-amber-500 transition-all" style={{ width: `${(fontSize - 50) / 1.5}%` }} />
                      </div>
                      <Button variant="outline" className="p-2 h-8 w-8" onClick={() => setFontSize(Math.min(200, fontSize + 10))} disabled={fontSize >= 200}>
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Color Modes */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 px-1 text-gray-700">
                      <Palette className="h-4 w-4" />
                      {t.colorModes}
                    </h3>
                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between gap-4 py-1">
                        <label htmlFor="grayscale" className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                           <CircleDot className="h-4 w-4 flex-shrink-0" />
                           {t.grayscale}
                        </label>
                        <Switch id="grayscale" checked={grayscale} onCheckedChange={setGrayscale} />
                      </div>
                      <div className="flex items-center justify-between gap-4 py-1">
                        <label htmlFor="invert-colors" className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                           <Contrast className="h-4 w-4 flex-shrink-0" />
                           {t.invertColors}
                        </label>
                        <Switch id="invert-colors" checked={invertColors} onCheckedChange={setInvertColors} />
                      </div>
                      <div className="flex items-center justify-between gap-4 py-1">
                        <label htmlFor="low-saturation" className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                           <Sparkles className="h-4 w-4 flex-shrink-0" />
                           {t.lowSaturation}
                        </label>
                        <Switch id="low-saturation" checked={lowSaturation} onCheckedChange={setLowSaturation} />
                      </div>
                      
                      <div className="space-y-3 pt-3">
                        <label className="text-sm font-medium px-1 text-gray-700">{t.colorBlindFilter}</label>
                        <div className="grid grid-cols-2 gap-2.5">
                          <Button variant={colorBlindMode === 'none' ? 'default' : 'outline'} onClick={() => setColorBlindMode('none')} className="text-xs h-10">{t.none}</Button>
                          <Button variant={colorBlindMode === 'deuteranopia' ? 'default' : 'outline'} onClick={() => setColorBlindMode('deuteranopia')} className="text-xs h-10">{t.redGreen}</Button>
                          <Button variant={colorBlindMode === 'protanopia' ? 'default' : 'outline'} onClick={() => setColorBlindMode('protanopia')} className="text-xs h-10">{t.red}</Button>
                          <Button variant={colorBlindMode === 'tritanopia' ? 'default' : 'outline'} onClick={() => setColorBlindMode('tritanopia')} className="text-xs h-10">{t.blueYellow}</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Visual Options */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 px-1 text-gray-700">
                      <Eye className="h-4 w-4" />
                      {t.visualOptions}
                    </h3>
                    <div className="space-y-4 px-2">
                       {[
                         { id: 'high-contrast', label: t.highContrast, state: highContrast, setter: setHighContrast, icon: Contrast },
                         { id: 'large-text', label: t.largeText, state: largeText, setter: setLargeText, icon: Type },
                         { id: 'highlight-links', label: t.highlightLinks, state: highlightLinks, setter: setHighlightLinks, icon: Palette },
                         { id: 'underline-links', label: t.underlineLinks, state: underlineLinks, setter: setUnderlineLinks, icon: LinkIcon },
                         { id: 'hide-images', label: t.hideImages, state: hideImages, setter: setHideImages, icon: Eye },
                       ].map(opt => (
                         <div key={opt.id} className="flex items-center justify-between gap-4 py-1">
                            <label htmlFor={opt.id} className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                               <opt.icon className="h-4 w-4 flex-shrink-0" />
                               {opt.label}
                            </label>
                            <Switch id={opt.id} checked={opt.state} onCheckedChange={opt.setter} />
                         </div>
                       ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Text Options */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 px-1 text-gray-700">
                      <FileText className="h-4 w-4" />
                      {t.textOptions}
                    </h3>
                    <div className="space-y-4 px-2">
                       {[
                         { id: 'readable-font', label: t.readableFont, state: readableFont, setter: setReadableFont, icon: FileText },
                         { id: 'line-spacing', label: t.increaseLineSpacing, state: lineSpacing, setter: setLineSpacing, icon: Type },
                         { id: 'letter-spacing', label: t.letterSpacing, state: letterSpacing, setter: setLetterSpacing, icon: Type },
                         { id: 'text-alignment', label: t.textAlignment, state: textAlignment, setter: setTextAlignment, icon: Type },
                       ].map(opt => (
                         <div key={opt.id} className="flex items-center justify-between gap-4 py-1">
                            <label htmlFor={opt.id} className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                               <opt.icon className="h-4 w-4 flex-shrink-0" />
                               {opt.label}
                            </label>
                            <Switch id={opt.id} checked={opt.state} onCheckedChange={opt.setter} />
                         </div>
                       ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Navigation */}
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 px-1 text-gray-700">
                      <Mouse className="h-4 w-4" />
                      {t.navigationOptions}
                    </h3>
                    <div className="space-y-4 px-2">
                       {[
                         { id: 'cursor-size', label: t.largeCursor, state: cursorSize, setter: setCursorSize, icon: Mouse },
                         { id: 'reduce-motion', label: t.reduceMotion, state: reduceMotion, setter: setReduceMotion, icon: RotateCcw },
                         { id: 'stop-animations', label: t.stopAnimations, state: stopAnimations, setter: setStopAnimations, icon: RotateCcw },
                       ].map(opt => (
                         <div key={opt.id} className="flex items-center justify-between gap-4 py-1">
                            <label htmlFor={opt.id} className="text-sm cursor-pointer flex-1 flex items-center gap-3 text-gray-600">
                               <opt.icon className="h-4 w-4 flex-shrink-0" />
                               {opt.label}
                            </label>
                            <Switch id={opt.id} checked={opt.state} onCheckedChange={opt.setter} />
                         </div>
                       ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="px-2">
                    <Button variant="outline" className="w-full gap-2 h-11" onClick={resetAll}>
                      <RotateCcw className="h-4 w-4" />
                      {t.resetToDefault}
                    </Button>
                  </div>

                  <Separator />

                  {/* Coordinator */}
                  {/* Changed: bg-teal-50 -> bg-amber-50, text-teal-900 -> text-slate-900 */}
                  <div className="space-y-4 p-5 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold text-sm text-slate-900">{t.needHelp}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-gray-600" dir="ltr">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        {/* Changed: hover:text-teal-600 -> hover:text-amber-600 */}
                        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-amber-600 underline break-all">{CONTACT_INFO.email}</a>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600" dir="ltr">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        {/* Changed: hover:text-teal-600 -> hover:text-amber-600 */}
                        <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-amber-600">{CONTACT_INFO.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;