import { useEffect, useState } from 'react';
import { Link, useParams } from '../router';
import { Camera, MapPin, MessageSquare, Phone, CheckCircle2, ArrowRight, Award, Users, ShieldCheck, ChevronDown, AlertTriangle, Wrench, Check, Mail } from 'lucide-react';
import useSeo, { buildFaqSchema } from '../useSeo';
import SanierungskostenRechner from '../components/SanierungskostenRechner';
import { getCityBySlug } from '../data/citiesData';
const serviceNavCards = [
  { to: "/badsanierung-rhein-main", title: "Badsanierung", desc: "Komplette Bädermodernisierung, barrierefreie Umbauten und Wellnessoasen.", cta: "Badsanierung planen", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800" },
  { to: "/sanierung/wohnungssanierung", title: "Wohnungssanierung", desc: "Modernisierung von Wohnungen inklusive Innenausbau und Bodengestaltung.", cta: "Wohnung sanieren", img: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&q=80&w=800" },
  { to: "/sanierung/haussanierung", title: "Haussanierung", desc: "Ganzheitliche Sanierung von Einfamilienhäusern und Mehrfamilienhäusern.", cta: "Haussanierung entdecken", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" },
  { to: "/sanierung/altbausanierung", title: "Altbausanierung", desc: "Fachgerechte Modernisierung von denkmalgeschützten Gebäuden und Altbauten.", cta: "Mehr zur Altbausanierung", img: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=800" },
  { to: "/heizung-sanitaer-rhein-main", title: "Heizung & Sanitär", desc: "Heizungsmodernisierung, Wärmepumpen und Sanitärinstallationen.", cta: "Heizung & Sanitär modernisieren", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800" },
  { to: "/elektroinstallation-rhein-main", title: "Elektrotechnik", desc: "Erneuerung von Stromleitungen und moderner Gebäudetechnik.", cta: "Elektrik aufrüsten", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800" },
  { to: "/schadstoffsanierung-rhein-main", title: "Schimmel- & Schadstoffsanierung", desc: "Professionelle Beseitigung von Schimmel und Gefahrstoffen (Asbest).", cta: "Befundung anfragen", img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=800" },
  { to: "/gewerbe-objektsanierung-rhein-main", title: "Gewerbesanierung", desc: "Büroumbau, Mieterausbau und Sanierung von Gewerbeflächen.", cta: "Gewerbeprojekt besprechen", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" }
];

export default function CityPage2() {
  const { slug } = useParams();
  const city = getCityBySlug(slug) || {
    name: "Rhein-Main-Gebiet",
    heroImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600",
    districts: []
  };

  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    telefon: '',
    email: '',
    nachricht: '',
    dsgvo: false
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const faqsData = [
    { q: `Sind Sie auch in ${city.name} und Umgebung tätig?`, a: `Ja, Radex betreut Sanierungs- und Modernisierungsprojekte in ganz ${city.name} sowie den umliegenden Stadtteilen und Gemeinden.` },
    { q: `Bieten Sie eine Festpreisgarantie in ${city.name} an?`, a: `Ja, alle unsere Angebote sind Festpreise. Wir garantieren Ihnen absolute Kostentransparenz ohne versteckte Zusatzkosten für Ihr Sanierungsprojekt in ${city.name}.` },
    { q: `Wie läuft der erste Besichtigungstermin in ${city.name} ab?`, a: `Nach Ihrer Kontaktaufnahme vereinbaren wir einen kostenlosen Vor-Ort-Termin an Ihrer Immobilie in ${city.name}. Wir nehmen alle Maße auf, besprechen Ihre Wünsche und erstellen daraufhin ein detailliertes Angebot.` },
    { q: `Koordinieren Sie alle Gewerke für mein Projekt in ${city.name}?`, a: `Ja, als zertifizierter Generalunternehmer übernimmt Radex die komplette Koordination aller Gewerke (Heizung, Sanitär, Elektro, Trockenbau, Fliesen). Sie haben für das gesamte Projekt in ${city.name} nur einen Ansprechpartner.` },
    { q: `Wie schnell erhalte ich ein Angebot für mein Vorhaben in ${city.name}?`, a: `Nach der Vor-Ort-Begehung erhalten Sie in der Regel innerhalb weniger Werktage ein detailliertes und unverbindliches Festpreisangebot.` }
  ];

  useSeo({
    title: `Sanierung ${city.name} | Bad, Wohnung & Haus modernisieren | Radex`,
    description: `Sanierung & Badsanierung in ${city.name} aus einer Hand: Wohnungs-, Haus- & Altbausanierung, Heizung, Elektro & mehr vom SHK-Meisterbetrieb. Festpreis. Jetzt Beratung sichern!`,
    path: `/${city.slug || slug}`,
    image: city.heroImg,
    jsonLd: [buildFaqSchema(faqsData)]
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.vorname.trim()) errors.vorname = "Vorname ist erforderlich.";
    if (!formData.nachname.trim()) errors.nachname = "Nachname ist erforderlich.";
    if (!formData.email.trim()) {
      errors.email = "E-Mail ist erforderlich.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Ungültige E-Mail-Adresse.";
    }
    if (!formData.nachricht.trim()) errors.nachricht = "Nachricht ist erforderlich.";
    if (!formData.dsgvo) errors.dsgvo = "Zustimmung zum Datenschutz erforderlich.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
  };

  const usps = [
    { title: "SHK-meistergeführt", desc: "Fachliche Kompetenz & Bauleitung durch erfahrene Meister" },
    { title: "Generalunternehmer", desc: "Gesamte Abwicklung aller Handwerksgewerke aus einer Hand" },
    { title: "Schimmel- & Asbest-Sachkunde", desc: "Zertifiziert nach TRGS 519 für sicheren Rückbau" },
    { title: "Sanierung aus einer Hand", desc: "Von der ersten Bestandsaufnahme bis zur schlüsselfertigen Übergabe" },
    { title: "Fester Ansprechpartner", desc: "Persönliche Baubetreuung & ständige Erreichbarkeit" }
  ];

  const localIntroText = `${city.name} gehört zu den gefragten Wohn- und Gewerbestandorten im Rhein-Main-Gebiet. Die hohe Lebensqualität, die hervorragende Verkehrsanbindung und die Mischung aus historischen Altbauten und modernen Wohnsiedlungen machen die Region besonders attraktiv für Eigentümer. Ob Sie ein frisch erworbenes Haus modernisieren, eine Eigentumswohnung kernsanieren oder Ihr Badezimmer in eine barrierefreie Wellnessoase verwandeln möchten – als meistergeführter Generalunternehmer realisiert Radex Ihr Vorhaben direkt vor Ort in ${city.name} und den umliegenden Stadtteilen.`;

  const detailedServices = [
    {
      title: "Badsanierung",
      heading: `Badsanierung in ${city.name} – Hochwertiger Komfort braucht saubere Technik`,
      desc: `Ein modernes Badezimmer ist heute weit mehr als nur ein funktionaler Raum. Es ist eine Oase der Ruhe und Entspannung. Radex plant und realisiert Ihre Badsanierung in ${city.name} schlüsselfertig. Vom Gäste-WC über das Familienbad bis zum altersgerechten, barrierefreien Umbau koordinieren wir alle Schritte: Abbruch, Sanitär-Rohinstallation, Trockenbau, Abdichtung nach DIN 18534 und Fliesenarbeiten. Als eingetragener SHK-Meisterbetrieb garantieren wir höchste Qualität und Langlebigkeit bei allen Installationen.`,
      bullets: ["Modernes Baddesign & 3D-Vorplanung", "Altersgerechte & barrierefreie Badkonzepte", "Sanitärinstallationen nach neuesten Standards", "Hochwertige Fliesen- und Verlegearbeiten"]
    },
    {
      title: "Haussanierung",
      heading: `Haussanierung in ${city.name} – Substanz sichern & Wohnwert steigern`,
      desc: `Die Kernsanierung eines Einfamilienhauses oder Mehrfamilienhauses ist ein komplexes Großprojekt. Radex übernimmt für Sie die komplette Haussanierung in ${city.name} als Generalunternehmer. Wir sichern die Bausubstanz, optimieren auf Wunsch Grundrisse durch Wanddurchbrüche und sorgen für eine zeitgemäße Haustechnik. Durch unsere meisterübergreifende Koordination greifen alle Rädchen nahtlos ineinander: Rohbau, Elektro- und Sanitärinstallationen, Innenausbau und abschließende Malerarbeiten. Das spart Zeit, schont Ihre Nerven und sichert den vereinbarten Festpreis.`,
      bullets: ["Komplette Baukörper-Entkernung", "Grundrissänderungen & statische Eingriffe", "Sanierung nach Hauskauf oder Erbschaft", "Wertsteigerung & zeitgemäße Modernisierung"]
    },
    {
      title: "Wohnungssanierung",
      heading: `Wohnungssanierung in ${city.name} – Perfekter Innenausbau für Eigentümer & Vermieter`,
      desc: `Egal ob Eigennutzung oder Kapitalanlage: Eine fachgerechte Wohnungssanierung steigert die Wohnqualität und den Mietwert nachhaltig. Wir modernisieren Ihre Wohnung in ${city.name} sauber und effizient. Unser Leistungsspektrum umfasst das Entfernen alter Beläge, Spachtel- und Malerarbeiten in Q3/Q4-Qualität, das Verlegen hochwertiger Bodenbeläge wie Parkett, Vinyl oder Designböden sowie die Erneuerung der kompletten Elektrik und Heizkörper. Dank professioneller Staubschutzsysteme saniert Radex extrem staubarm und schont angrenzende Gemeinschaftsflächen.`,
      bullets: ["Schlüsselfertiger Wohnungs-Innenausbau", "Maler- und Spachtelarbeiten auf Premium-Niveau", "Parkett, Vinyl und hochwertige Bodenbeläge", "Vermieter-Sanierungen für schnelle Neuvermietung"]
    },
    {
      title: "Altbausanierung",
      heading: `Altbausanierung in ${city.name} – Historischen Charme modern erleben`,
      desc: `Altbauten besitzen einen einzigartigen Charakter, stellen Bauherren aber oft vor technische Herausforderungen wie feuchte Keller, mangelnde Dämmung oder veraltete Leitungsnetze. Radex vereint bei der Altbausanierung in ${city.name} traditionelles Handwerk mit moderner Gebäudetechnik. Wir erneuern marode Rohr- und Stromnetze, führen energetische Ertüchtigungen durch und verhelfen Ihren Räumen zu neuem Glanz, ohne den typischen Altbaucharme zu zerstören. Dabei achten wir stets auf eine atmungsaktive Bauweise für ein gesundes Raumklima.`,
      bullets: ["Sanierung von Fachwerk- & Denkmalbauten", "Austausch alter Rohrleitungs- & Kanalnetze", "Fachgerechte energetische Sanierungsmaßnahmen", "Kombination aus altem Charme & moderner Technik"]
    },
    {
      title: "Haustechnik (SHK & Elektro)",
      heading: `Heizung, Sanitär & Elektro in ${city.name} – Zukunftsfähige Systeme`,
      desc: `Das Herzstück jeder modernen Immobilie ist eine effiziente Haustechnik. Als eingetragener SHK-Meisterbetrieb planen und installieren wir zukunftsfähige Heizungssysteme wie moderne Wärmepumpen, Fußbodenheizungen und kontrollierte Wohnraumlüftungen in ${city.name}. Gleichzeitig koordinieren wir die komplette Erneuerung der Elektroinstallation. Vom modernen Zählerschrank nach aktuellen VDE-Richtlinien über Wallboxen für E-Mobilität bis hin zu intelligenten Smart-Home-Lösungen machen wir Ihre Immobilie fit für die Zukunft.`,
      bullets: ["Zukunftssichere Heizsysteme & Wärmepumpen", "Meistergeführte Sanitärinstallationen", "Elektro-Komplettsanierung & Zählerschränke", "Smart-Home & moderne Netzwerktechnik"]
    },
    {
      title: "Schadstoffe & Schimmel",
      heading: `Schadstoff- & Schimmelsanierung in ${city.name} – Für ein gesundes Zuhause`,
      desc: `Schimmelpilzbefall oder Gefahrstoffe wie Asbest (z.B. in alten Fliesenklebern oder Bodenbelägen) erfordern fachgerechtes und zertifiziertes Handeln. Radex verfügt über die notwendigen Sachkundenachweise nach TRGS 519 (Asbest) und führt Schimmelpilzsanierungen nach den strengen Richtlinien des Umweltbundesamtes durch. Wir analysieren die Ursachen, dämmen den Befall ein, bauen betroffene Materialien unter Unterdruck- und Schleusenbedingungen sicher aus und sorgen für eine nachhaltige Desinfektion. Schützen Sie Ihre Gesundheit mit einer professionellen Schadstoffsanierung in ${city.name}.`,
      bullets: ["Zertifizierter Asbestrückbau nach TRGS 519", "Ursachenanalyse bei Schimmelpilzbefall", "Sicherer Gefahrstoffausbau unter Schleusenbedingungen", "Nachhaltige Schimmelbeseitigung & Desinfektion"]
    }
  ];

  const ablaufSteps = [
    { title: "Erstgespräch & Beratung", desc: "Wir besprechen Ihr Vorhaben telefonisch oder per E-Mail und klären erste Fragen ab." },
    { title: "Vor-Ort-Termin vor Ort", desc: `Kostenlose Besichtigung Ihrer Immobilie in ${city.name} zur exakten Bestandsaufnahme.` },
    { title: "Festpreisangebot", desc: "Sie erhalten ein detailliertes Angebot mit transparenter Kostenaufstellung aller Gewerke." },
    { title: "Planung & Materialauswahl", desc: "Gemeinsam legen wir den Zeitplan fest und wählen Sanitärobjekte, Fliesen und Farben aus." },
    { title: "Staubschutz & Baubeginn", desc: "Vor Arbeitsbeginn installieren wir effektive Staubschutzwände und decken alle Laufwege ab." },
    { title: "Fachgerechte Ausführung", desc: "Unsere qualifizierten Fachhandwerker setzen alle Arbeiten termingerecht und sauber um." },
    { title: "Abnahme & Übergabe", desc: "Gemeinsame Begehung und schlüsselfertige Übergabe Ihres fertig sanierten Objekts." }
  ];

  return (
    <div className="city-page-2-wrapper">
      {/* Dynamic Inline CSS replicating production styles */}
      <style>{`
        .city-page-2-wrapper {
          --gold: #F97316;
          --gold-dark: #EA580C;
          --gold-pale: rgba(249, 115, 22, 0.05);
          font-family: var(--font-body), sans-serif;
          color: var(--text);
          line-height: 1.6;
          background-color: var(--bg-light);
        }

        /* Hero Split Section */
        .radex-city-hero {
          position: relative;
          background-image: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('${city.heroImg}');
          background-size: cover;
          background-position: center;
          padding: clamp(80px, 10vw, 120px) 24px;
          color: var(--white);
          display: flex;
          justify-content: center;
        }

        .radex-city-hero-inner {
          max-width: var(--container-width);
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .radex-city-hero-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .radex-city-hero-content h1 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          color: var(--white);
        }

        .radex-city-hero-content h1 span {
          color: var(--gold);
        }

        .radex-city-hero-content p.subtitle {
          font-size: clamp(15px, 2vw, 18px);
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 28px 0;
          font-weight: 500;
        }

        .radex-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-gold {
          background-color: var(--gold);
          color: var(--white);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease, transform 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .btn-gold:hover {
          background-color: var(--gold-dark);
          color: var(--white);
        }

        .btn-outline-white {
          background-color: transparent;
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.4);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-outline-white:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--white);
        }

        .radex-city-usp-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .radex-city-usp-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .radex-city-usp-check {
          background-color: rgba(249, 115, 22, 0.15);
          color: var(--gold);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }

        .radex-city-usp-title {
          font-weight: 600;
          font-size: 15px;
          color: #ffffff;
        }

        .radex-city-usp-desc {
          font-size: 14px;
          color: #9ca3af;
          margin-left: 4px;
        }

        /* Hero Badge Overlay */
        .radex-city-hero-badge {
          background-color: rgba(var(--navy-rgb), 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 4px solid var(--gold);
          padding: 24px;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .radex-city-hero-badge h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .radex-city-hero-badge p {
          font-size: 14px;
          color: #9ca3af;
          margin: 0;
        }

        /* Service Nav list */
        .radex-city-nav-section {
          background-color: var(--bg-light);
          border-bottom: 1px solid var(--border);
          padding: 24px 0;
        }

        .radex-city-nav-container {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .radex-city-nav-btn {
          background-color: #ffffff;
          color: var(--text);
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .radex-city-nav-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-1px);
        }

        /* Local Intro Section */
        .radex-city-intro-section {
          max-width: 900px;
          margin: 80px auto 40px auto;
          padding: 0 24px;
          text-align: center;
        }

        .radex-city-intro-section h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .radex-city-intro-section p {
          font-size: 16px;
          color: var(--text-light);
          line-height: 1.8;
        }

        /* Detailed Services Section */
        .radex-city-services-section {
          max-width: var(--container-width);
          margin: 0 auto 80px auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .service-detail-block {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 40px;
          box-shadow: var(--shadow-sm);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          scroll-margin-top: 100px;
        }

        .service-detail-block:nth-child(even) {
          grid-template-columns: 0.8fr 1.2fr;
        }

        @media (max-width: 991px) {
          .service-detail-block, .service-detail-block:nth-child(even) {
            grid-template-columns: 1fr;
            padding: 30px;
            gap: 24px;
          }
        }

        .service-detail-info h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(20px, 3.5vw, 24px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        .service-detail-info p {
          font-size: 15px;
          color: var(--text-light);
          margin-bottom: 24px;
          line-height: 1.7;
        }

        .service-detail-bullets {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 575px) {
          .service-detail-bullets {
            grid-template-columns: 1fr;
          }
        }

        .service-bullet-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--navy);
        }

        .service-bullet-check {
          color: var(--gold);
          flex-shrink: 0;
        }

        .service-detail-image-box {
          position: relative;
          height: 280px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.04);
        }

        @media (max-width: 575px) {
          .service-detail-block, .service-detail-block:nth-child(even) {
            padding: 20px;
            gap: 20px;
          }
          .service-detail-image-box {
            height: 200px;
          }
        }

        .service-detail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Ablauf Timeline Section */
        .radex-city-ablauf-section {
          background-color: var(--bg-section);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
        }

        .radex-city-ablauf-container {
          max-width: var(--container-width);
          margin: 0 auto;
        }

        .radex-ablauf-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .radex-ablauf-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }

        .radex-ablauf-header p {
          font-size: 16px;
          color: var(--text-light);
          margin: 0;
        }

        .radex-ablauf-timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .radex-ablauf-timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background-color: var(--border);
          z-index: 1;
        }

        .radex-timeline-item {
          display: flex;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .radex-timeline-number {
          background-color: var(--gold);
          color: var(--white);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          border: 4px solid var(--bg-section);
          flex-shrink: 0;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .radex-timeline-content {
          background-color: #ffffff;
          border: 1px solid var(--border);
          padding: 20px 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          width: 100%;
        }

        .radex-timeline-content h4 {
          font-family: var(--font-heading), sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 6px 0;
        }

        .radex-timeline-content p {
          font-size: 14px;
          color: var(--text-light);
          margin: 0;
        }

        /* why choose us */
        .radex-city-why-section {
          max-width: var(--container-width);
          margin: 80px auto;
          padding: 0 24px;
          text-align: center;
        }

        .radex-city-why-section h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 40px;
          letter-spacing: -0.5px;
        }

        .radex-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .radex-why-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          padding: 32px 24px;
          border-radius: 8px;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .radex-why-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .radex-why-icon-box {
          background-color: var(--gold-pale);
          color: var(--gold);
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .radex-why-card h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 10px 0;
        }

        .radex-why-card p {
          font-size: 14px;
          color: var(--text-light);
          margin: 0;
          line-height: 1.6;
        }

        /* Accordion FAQ */
        .radex-city-faq-section {
          background-color: var(--bg-section);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
        }

        .radex-city-faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .radex-city-faq-section h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--navy);
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: -0.5px;
        }

        .radex-faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .radex-faq-item {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.01);
        }

        .radex-faq-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 20px 24px;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 700;
          font-size: 16px;
          color: var(--navy);
          transition: color 0.2s;
        }

        .radex-faq-btn:hover {
          color: var(--gold);
        }

        .radex-faq-answer {
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), padding 0.3s;
          max-height: 0;
          padding: 0 24px;
          color: var(--text);
          font-size: 15px;
          line-height: 1.7;
          border-top: 1px solid transparent;
        }

        .radex-faq-answer.open {
          max-height: 1000px; /* high value for auto-transition */
          padding: 0 24px 20px 24px;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 575px) {
          .radex-faq-btn {
            padding: 16px;
            font-size: 15px;
          }
          .radex-faq-answer {
            padding: 0 16px;
          }
          .radex-faq-answer.open {
            padding: 0 16px 16px 16px;
          }
          .radex-city-faq-section h2 {
            font-size: clamp(24px, 4.5vw, 32px);
            margin-bottom: 24px;
          }
        }

        /* Contact Section */
        .radex-city-contact-section {
          background-color: var(--navy-dark);
          color: #ffffff;
          padding: 80px 24px;
          display: flex;
          justify-content: center;
          border-bottom: 4px solid var(--gold);
        }

        .radex-city-contact-inner {
          max-width: var(--container-width);
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }

        @media (max-width: 991px) {
          .radex-city-contact-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .radex-city-contact-info h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4.5vw, 36px);
          font-weight: 800;
          margin: 0 0 20px 0;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .radex-city-contact-info p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .radex-city-cta-box {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 4px solid var(--gold);
          padding: 24px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 32px;
        }

        .radex-city-cta-box h3 {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px 0;
        }

        .radex-city-cta-box p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .radex-city-contact-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .radex-city-link-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: color 0.2s ease;
        }

        .radex-city-link-item:hover {
          color: var(--gold);
        }

        /* Lead Form */
        .radex-city-form-panel {
          background-color: var(--navy-dark);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        @media (max-width: 575px) {
          .radex-city-contact-section {
            padding: 50px 16px;
          }
          .radex-city-form-panel {
            padding: 24px 16px;
          }
        }

        .radex-city-form-panel h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 24px 0;
          color: #ffffff;
        }

        .radex-city-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 575px) {
          .radex-city-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .radex-city-form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .radex-city-form-field label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .radex-city-input {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .radex-city-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.25);
        }

        .radex-city-form-full {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .radex-city-form-full label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .radex-city-textarea {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 15px;
          min-height: 120px;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .radex-city-textarea:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.25);
        }

        .radex-city-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 24px;
        }

        .radex-city-checkbox {
          accent-color: var(--gold);
          margin-top: 3px;
          cursor: pointer;
        }

        .radex-city-checkbox-label {
          font-size: 13px;
          color: #9ca3af;
          line-height: 1.4;
          cursor: pointer;
        }

        .radex-city-checkbox-label a {
          color: var(--gold);
          text-decoration: underline;
        }

        .error-message {
          color: #ef4444;
          font-size: 12px;
          margin-top: 2px;
        }

        .success-box {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-container {
          background-color: rgba(249, 115, 22, 0.1);
          color: var(--gold);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 1px solid rgba(249, 115, 22, 0.25);
        }

        .success-box h4 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .success-box p {
          font-size: 15px;
          color: #9ca3af;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>

      {/* 1. HERO SPLIT SECTION */}
      <section className="radex-city-hero">
        <div className="radex-city-hero-inner">
          <div className="radex-city-hero-content">
            <h1>Sanierung & Modernisierung in <span>{city.name}</span></h1>
            <p className="subtitle">Hochwertiger Komfort für Bad, Haus, Wohnung & Gewerbe</p>
            
            <div className="radex-city-usp-list">
              {usps.map((usp, idx) => (
                <div key={idx} className="radex-city-usp-item">
                  <div className="radex-city-usp-check">
                    <Check size={14} />
                  </div>
                  <div>
                    <span className="radex-city-usp-title">{usp.title}</span>
                    <span className="radex-city-usp-desc">– {usp.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="radex-hero-ctas">
              <a href="#kontakt-formular" className="btn-gold">Beratung anfragen</a>
              <a href="tel:+496074960620" className="btn-outline-white">
                <Phone size={18} /> 06074 960620
              </a>
            </div>
          </div>

          <div className="radex-city-hero-badge-col">
            <div className="radex-city-hero-badge">
              <h3>
                <MapPin size={22} color="#F97316" /> Radex in {city.name}
              </h3>
              <p>
                Als meistergeführter Generalunternehmer saniert und modernisiert Radex Wohnungen, Bäder und Komplettgebäude schlüsselfertig in {city.name} und Umgebung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE FAST NAVIGATOR */}
      <section className="radex-city-nav-section">
        <div className="radex-city-nav-container">
          {detailedServices.map((service, idx) => (
            <a key={idx} href={`#service-${idx}`} className="radex-city-nav-btn">
              {service.title}
            </a>
          ))}
        </div>
      </section>

      {/* 3. LOCAL CONTEXT INTRO */}
      <section className="radex-city-intro-section">
        <h2>Sanierung & Modernisierung aus einer Hand</h2>
        <p>{localIntroText}</p>
      </section>

      {/* 4. SERVICES DETAIL LIST */}
      <section className="radex-city-services-section">
        {detailedServices.map((service, idx) => (
          <div key={idx} id={`service-${idx}`} className="service-detail-block">
            {idx % 2 === 0 ? (
              <>
                <div className="service-detail-info">
                  <h3>{service.heading}</h3>
                  <p>{service.desc}</p>
                  <div className="service-detail-bullets">
                    {service.bullets.map((b, i) => (
                      <div key={i} className="service-bullet-item">
                        <CheckCircle2 size={16} className="service-bullet-check" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="service-detail-image-box">
                  <img
                    className="service-detail-image"
                    src={serviceNavCards[idx % serviceNavCards.length].img}
                    alt={service.title}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="service-detail-image-box">
                  <img
                    className="service-detail-image"
                    src={serviceNavCards[idx % serviceNavCards.length].img}
                    alt={service.title}
                  />
                </div>
                <div className="service-detail-info">
                  <h3>{service.heading}</h3>
                  <p>{service.desc}</p>
                  <div className="service-detail-bullets">
                    {service.bullets.map((b, i) => (
                      <div key={i} className="service-bullet-item">
                        <CheckCircle2 size={16} className="service-bullet-check" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* 5. ABLAUF TIMELINE SECTION */}
      <section className="radex-city-ablauf-section">
        <div className="radex-city-ablauf-container">
          <div className="radex-ablauf-header">
            <h2>Projekt-Ablauf Ihrer Sanierung</h2>
            <p>Schritt für Schritt zu Ihrem sanierten Objekt in {city.name}</p>
          </div>

          <div className="radex-ablauf-timeline">
            {ablaufSteps.map((step, idx) => (
              <div key={idx} className="radex-timeline-item">
                <div className="radex-timeline-number">{idx + 1}</div>
                <div className="radex-timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE RADEX */}
      <section className="radex-city-why-section">
        <h2>Warum Radex die richtige Wahl in {city.name} ist</h2>
        
        <div className="radex-why-grid">
          <div className="radex-why-card">
            <div className="radex-why-icon-box">
              <Award size={24} />
            </div>
            <h3>SHK-Meisterbetrieb</h3>
            <p>Als eingetragener SHK-Meisterbetrieb sichern wir Ihnen höchste fachliche Kompetenz und Arbeiten nach deutschen Qualitätsstandards.</p>
          </div>
          <div className="radex-why-card">
            <div className="radex-why-icon-box">
              <Users size={24} />
            </div>
            <h3>Alles aus einer Hand</h3>
            <p>Wir übernehmen die Gesamtverantwortung, planen und steuern alle Gewerke von Elektro bis Sanitär – Sie haben nur einen Vertragspartner.</p>
          </div>
          <div className="radex-why-card">
            <div className="radex-why-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3>Verlässliche Festpreise</h3>
            <p>Keine finanziellen Überraschungen: Wir kalkulieren sorgfältig vorab und garantieren Ihnen vertraglich vereinbarte Festpreise.</p>
          </div>
        </div>
      </section>

      {/* 7. CALCULATOR SECTION */}
      <SanierungskostenRechner defaultType="bad" compact />

      {/* 8. FAQS SECTION */}
      <section className="radex-city-faq-section">
        <div className="radex-city-faq-container">
          <h2>Häufig gestellte Fragen zu Sanierung in {city.name}</h2>
          
          <div className="radex-faq-list">
            {faqsData.map((faq, i) => (
              <div key={i} className="radex-faq-item">
                <button
                  className="radex-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                    color="#9ca3af"
                    size={18}
                  />
                </button>
                <div className={`radex-faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <div>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT & CONSULTATION FORM */}
      <section id="kontakt-formular" className="radex-city-contact-section">
        <div className="radex-city-contact-inner">
          <div className="radex-city-contact-info">
            <span className="radex-section-label">Kontakt</span>
            <h2>Ihr Projekt in {city.name} anfragen</h2>
            <p>
              Haben Sie Fragen zu unseren Leistungen oder möchten Sie einen Besichtigungstermin vereinbaren? Schreiben Sie uns oder rufen Sie uns direkt an.
            </p>
            <div className="radex-city-cta-box">
              <h3>Kostenloser Beratungstermin</h3>
              <p>Unverbindliche Erstberatung & Angebotserstellung vor Ort.</p>
            </div>
            <div className="radex-city-contact-links">
              <a href="tel:+496074960620" className="radex-city-link-item">
                <Phone size={20} color="#F97316" /> +49 6074 960620
              </a>
              <a href="mailto:info@radex-objektmanagement.de" className="radex-city-link-item">
                <Mail size={20} color="#F97316" /> info@radex-objektmanagement.de
              </a>
            </div>
          </div>

          <div className="radex-city-form-panel">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <h3>Kostenlose Beratung sichern</h3>

                <div className="radex-city-form-grid">
                  <div className="radex-city-form-field">
                    <label htmlFor="vorname">Vorname *</label>
                    <input
                      type="text"
                      id="vorname"
                      name="vorname"
                      className="radex-city-input"
                      placeholder="Ihr Vorname"
                      value={formData.vorname}
                      onChange={handleInputChange}
                    />
                    {formErrors.vorname && <span className="error-message">{formErrors.vorname}</span>}
                  </div>
                  <div className="radex-city-form-field">
                    <label htmlFor="nachname">Nachname *</label>
                    <input
                      type="text"
                      id="nachname"
                      name="nachname"
                      className="radex-city-input"
                      placeholder="Ihr Nachname"
                      value={formData.nachname}
                      onChange={handleInputChange}
                    />
                    {formErrors.nachname && <span className="error-message">{formErrors.nachname}</span>}
                  </div>
                </div>

                <div className="radex-city-form-grid">
                  <div className="radex-city-form-field">
                    <label htmlFor="telefon">Telefon</label>
                    <input
                      type="tel"
                      id="telefon"
                      name="telefon"
                      className="radex-city-input"
                      placeholder="Ihre Telefonnummer"
                      value={formData.telefon}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="radex-city-form-field">
                    <label htmlFor="email">E-Mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="radex-city-input"
                      placeholder="Ihre E-Mail"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="radex-city-form-full">
                  <label htmlFor="nachricht">Nachricht *</label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    className="radex-city-textarea"
                    placeholder="Kurze Beschreibung Ihres Projekts ..."
                    value={formData.nachricht}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.nachricht && <span className="error-message">{formErrors.nachricht}</span>}
                </div>

                <div className="radex-city-checkbox-field">
                  <input
                    type="checkbox"
                    id="dsgvo"
                    name="dsgvo"
                    className="radex-city-checkbox"
                    checked={formData.dsgvo}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="dsgvo" className="radex-city-checkbox-label">
                    Ich willige ein, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden. Hinweis: Diese Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie eine E-Mail an info@radex-objektmanagement.de senden. *
                  </label>
                </div>
                {formErrors.dsgvo && <div className="error-message" style={{ marginTop: '-16px', marginBottom: '16px' }}>{formErrors.dsgvo}</div>}

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Projekt jetzt unverbindlich anfragen &rarr;
                </button>
              </form>
            ) : (
              <div className="success-box animate-fade-in">
                <div className="success-icon-container">
                  <Check size={36} />
                </div>
                <h4>Anfrage erfolgreich gesendet!</h4>
                <p>
                  Vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns in Kürze mit Ihnen in Verbindung setzen.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}