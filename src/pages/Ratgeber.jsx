import { useState, useEffect } from 'react';
import { ArrowRight, Phone, MessageSquare, Camera } from 'lucide-react';
import { Link } from '../router';
import useSeo from '../useSeo';

export default function Ratgeber() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: "Ratgeber – Sanierung & Modernisierung Rhein-Main | Radex",
    description: "Ratgeber zu Sanierung und Modernisierung im Rhein-Main-Gebiet – Tipps zu Badsanierung, energetischer Sanierung, Heizung & Sanitär von Radex Objektmanagement.",
    path: "/ratgeber",
    image: "https://www.radex-objektmanagement.de/img/bad_hero.webp"
  });

  // State to manage showing all articles vs. first 4
  const [showAllArticles, setShowAllArticles] = useState(false);

  const themen = [
    {
      to: "/badsanierung-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l1-4h4l1 4" />
          <rect x="2" y="6" width="20" height="4" rx="2" />
          <path d="M4 10v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <line x1="7" y1="14" x2="7" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="17" y1="14" x2="17" y2="17" />
        </svg>
      ),
      title: "Badsanierung",
      desc: "Planung, Kosten, Ablauf und typische Fehler bei der Badsanierung."
    },
    {
      to: "/sanierung-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: "Generalunternehmer & Sanierung",
      desc: "Koordination, Bauleitung und Gesamtablauf bei Sanierungsprojekten."
    },
    {
      to: "/elektroinstallation-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: "Elektrotechnik & Gebäudetechnik",
      desc: "Wann die Elektroinstallation erneuert werden sollte und was zu beachten ist."
    },
    {
      to: "/energetische-sanierung-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      title: "Energie & Förderung",
      desc: "Energetische Sanierung, Fördermittel und Einsparmaßnahmen sinnvoll planen."
    },
    {
      to: "/gewerbe-objektsanierung-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      ),
      title: "Gewerbe & Objektsanierung",
      desc: "Planung und Umsetzung von Umbauten in Gewerbe- und Büroflächen."
    },
    {
      to: "/heizung-sanitaer-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2c0 6-6 6-6 12a6 6 0 0012 0c0-6-6-6-6-12z" />
          <path d="M12 12c0 3-2 4-2 6a2 2 0 004 0c0-2-2-3-2-6z" />
        </svg>
      ),
      title: "Heizung & Sanitär",
      desc: "Wann Leitungen, Heizungsanlage und Sanitärtechnik geprüft werden sollten."
    },
    {
      to: "/innenausbau-umbau-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Innenausbau & Umbau",
      desc: "Raumaufteilung ändern, Wände entfernen, Trockenbau – was zu beachten ist."
    },
    {
      to: "/schimmelsanierung-rhein-main",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      title: "Schimmel & Asbest",
      desc: "Ursachen erkennen, fachgerecht sanieren und dauerhaft beheben."
    }
  ];

  const artikel = [
    {
      to: "/badsanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/badsanierung-planen-rhein-main-radex.webp",
      alt: "Badsanierung planen: Ablauf, Reihenfolge & Fehler vermeiden",
      title: "Badsanierung planen: Ablauf, Reihenfolge & Fehler vermeiden",
      desc: "Welche Reihenfolge sinnvoll ist, welche Fehler häufig passieren und warum Leitungen, Abdichtung und Elektro früh geklärt werden sollten."
    },
    {
      to: "/badsanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/badsanierung-kosten-rhein-main-radex.webp",
      alt: "Badsanierung Kosten: Welche Faktoren den Preis beeinflussen",
      title: "Badsanierung Kosten: Welche Faktoren den Preis beeinflussen",
      desc: "Größe, Leitungen, Abdichtung, Dusche, Fliesen und Ausstattung – die wichtigsten Kostenfaktoren einer Badsanierung im Überblick."
    },
    {
      to: "/wohnungssanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/wohnung-sanieren-nach-kauf-rhein-main-radex.webp",
      alt: "Wohnung sanieren nach Kauf – Was vor dem Einzug wichtig ist",
      title: "Wohnung sanieren nach Kauf – Was vor dem Einzug wichtig ist",
      desc: "Was Eigentümer vor dem Einzug prüfen sollten – Bad, Böden, Heizung, Sanitär, Elektrokoordination und Ablauf."
    },
    {
      to: "/altbausanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/haus-modernisieren-nach-kauf-erbschaft-radex.webp",
      alt: "Haus modernisieren nach Kauf oder Erbschaft",
      title: "Haus modernisieren nach Kauf oder Erbschaft",
      desc: "Welche Arbeiten zuerst sinnvoll sind – Bad, Heizung, Sanitär, Elektro, Innenausbau, Energie und Schadstoffe."
    },
    {
      to: "/badsanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/kleines-bad-sanieren-rhein-main-radex.webp",
      alt: "Kleines Bad sanieren – Mehr Komfort auf wenig Fläche",
      title: "Kleines Bad sanieren – Mehr Komfort auf wenig Fläche",
      desc: "Tipps zu Dusche, WC, Waschtisch, Stauraum, Licht und Lüftung für mehr Komfort auf kleiner Fläche."
    },
    {
      to: "/wohnungssanierung-kosten",
      img: "https://www.radex-objektmanagement.de/img/wohnung-renovieren-oder-sanieren-radex.webp",
      alt: "Wohnung renovieren oder sanieren – Unterschied erklärt",
      title: "Wohnung renovieren oder sanieren – Unterschied erklärt",
      desc: "Wann Renovierung reicht und wann Bad, Elektro, Heizung, Böden oder Leitungen saniert werden sollten."
    },
    {
      to: "/komplettsanierung-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/komplettsanierung-oder-teilsanierung-radex.webp",
      alt: "Komplettsanierung oder Teilsanierung – Was passt besser?",
      title: "Komplettsanierung oder Teilsanierung – Was passt besser?",
      desc: "Wann eine umfassende Sanierung sinnvoll ist und wann einzelne Maßnahmen bei Bad, Heizung und Innenausbau ausreichen."
    },
    {
      to: "/generalunternehmer-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/sanierung-generalunternehmer-rhein-main-radex.webp",
      alt: "Sanierung mit Generalunternehmer – Wann ein Ansprechpartner sinnvoll ist",
      title: "Sanierung mit Generalunternehmer – Wann ein Ansprechpartner sinnvoll ist",
      desc: "Warum ein zentraler Ansprechpartner bei Badsanierung, Wohnungssanierung, Heizung, Sanitär und Elektrokoordination hilft."
    },
    {
      to: "/generalunternehmer-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/bauleitung-sanierung-rhein-main-radex.webp",
      alt: "Bauleitung bei Sanierung – Koordination spart Zeit & Kosten",
      title: "Bauleitung bei Sanierung – Koordination spart Zeit & Kosten",
      desc: "Warum Koordination bei Bad, Wohnung, Haus, Heizung, Sanitär, Elektro und Innenausbau Zeit spart und Nacharbeiten vermeidet."
    },
    {
      to: "/schimmelsanierung-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/schimmel-bei-sanierung-ursache-pruefen-radex.webp",
      alt: "Schimmel bei Sanierung – Ursache prüfen statt überstreichen",
      title: "Schimmel bei Sanierung – Ursache prüfen statt überstreichen",
      desc: "Warum Ursache, Feuchtigkeit, Lüftung und Wärmebrücken vor neuen Oberflächen fachlich geprüft werden sollten."
    },
    {
      to: "/energetische-sanierung-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/energetische-sanierung-bestand-radex.webp",
      alt: "Energetische Sanierung im Bestand – Sinnvolle Maßnahmen planen",
      title: "Energetische Sanierung im Bestand – Sinnvolle Maßnahmen planen",
      desc: "Welche Maßnahmen bei Haus, Wohnung, Heizung, Dämmung, Fenstern und Lüftung sinnvoll sind."
    },
    {
      to: "/energetische-sanierung-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/energieeffizienz-verbessern-heizung-daemmung-lueftung-radex.webp",
      alt: "Energieeffizienz verbessern – Heizung, Dämmung & Lüftung verbinden",
      title: "Energieeffizienz verbessern – Heizung, Dämmung & Lüftung verbinden",
      desc: "Warum Heizung, Dämmung, Fenster, Lüftung und Warmwasser gemeinsam geplant werden sollten."
    },
    {
      to: "/energetische-sanierung-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/sanierung-foerderung-vor-baustart-radex.webp",
      alt: "Sanierung Förderung vor Baustart prüfen",
      title: "Sanierung Förderung vor Baustart prüfen",
      desc: "Was Eigentümer vor Baustart zu Antragstellung, Energieberatung, Heizung, Dämmung und Fördermitteln wissen sollten."
    },
    {
      to: "/heizung-sanitaer-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/waermepumpe-im-bestand-pruefen-radex.webp",
      alt: "Wärmepumpe im Bestand – Was vorher geprüft werden sollte",
      title: "Wärmepumpe im Bestand – Was vorher geprüft werden sollte",
      desc: "Was Eigentümer vor der Entscheidung prüfen sollten – Gebäudezustand, Heizkörper, Vorlauftemperatur, Dämmung und Sanierung."
    },
    {
      to: "/heizung-sanitaer-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/heizung-modernisieren-bei-sanierung-radex.webp",
      alt: "Heizung modernisieren bei Sanierung – Wann ist der richtige Zeitpunkt?",
      title: "Heizung modernisieren bei Sanierung – Wann ist der richtige Zeitpunkt?",
      desc: "Wann Heizungsanlage, Heizkörper, Warmwasser, Leitungen, Bad und Energieeffizienz gemeinsam geprüft werden sollten."
    },
    {
      to: "/heizung-sanitaer-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/sanitaerleitungen-erneuern-wasserleitungen-radex.webp",
      alt: "Sanitärleitungen erneuern – Alte Wasserleitungen prüfen",
      title: "Sanitärleitungen erneuern – Alte Wasserleitungen prüfen",
      desc: "Wann alte Wasserleitungen, Abwasserleitungen, Anschlüsse, Bad, Küche und Hausinstallation fachlich geprüft werden sollten."
    },
    {
      to: "/elektroinstallation-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/elektroinstallation-erneuern-wohnung-haus-radex.webp",
      alt: "Elektroinstallation erneuern – Wohnung & Haus richtig planen",
      title: "Elektroinstallation erneuern – Wohnung & Haus richtig planen",
      desc: "Was Eigentümer bei Sanierung, Sicherungskasten, Steckdosen, Licht, Küche, Bad und Netzwerk beachten sollten."
    },
    {
      to: "/innenausbau-umbau-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/raumaufteilung-aendern-trockenbau-radex.webp",
      alt: "Raumaufteilung ändern – Wann Trockenbau sinnvoll ist",
      title: "Raumaufteilung ändern – Wann Trockenbau sinnvoll ist",
      desc: "Wann neue Wände, Decken, Nischen, Schallschutz, Elektro, Licht und Innenausbau bei Sanierung sinnvoll geplant werden sollten."
    },
    {
      to: "/innenausbau-umbau-rhein-main",
      img: "https://www.radex-objektmanagement.de/img/wand-entfernen-durchbruch-sanierung-radex.webp",
      alt: "Wand entfernen bei Sanierung – Durchbruch richtig prüfen",
      title: "Wand entfernen bei Sanierung – Durchbruch richtig prüfen",
      desc: "Was vor Umbau und Innenausbau bei Statik, Leitungen, Elektro, Heizung, Boden und Genehmigung geprüft werden sollte."
    }
  ];

  return (
    <div className="ratgeber-hub-wrapper">
      <style>{`
        /* Dynamic Inline CSS matching exact EinsatzgebieteHub2 colors and styles */
        .ratgeber-hub-wrapper {
          --gold: #F97316;
          --gold-dark: #EA580C;
          --gold-pale: rgba(249, 115, 22, 0.05);
          font-family: var(--font-body), sans-serif;
          color: var(--text);
          line-height: 1.6;
          background-color: var(--bg-light);
        }
        
        /* Hero Section matching Einsatzgebiete light hero */
        .radex-ratgeber-hero {
          position: relative;
          background-image: linear-gradient(rgba(250, 251, 253, 0.88), rgba(250, 251, 253, 0.92)), url('https://www.radex-objektmanagement.de/img/ratgeber_banner.webp');
          background-size: cover;
          background-position: center;
          padding: clamp(80px, 10vw, 120px) 24px;
          text-align: left;
          color: var(--text);
          display: flex;
          justify-content: center;
        }

        .radex-ratgeber-hero-inner {
          max-width: var(--container-width);
          width: 100%;
        }

        .radex-hero-label {
          color: var(--gold);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .radex-ratgeber-hero h1 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 800;
          margin: 0 0 20px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          color: var(--navy);
        }

        .radex-ratgeber-hero p {
          font-size: clamp(16px, 2vw, 18px);
          max-width: 800px;
          margin: 0 0 32px 0;
          color: var(--text-light);
          line-height: 1.7;
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
          transform: translateY(-2px);
        }
        
        .btn-outline-navy {
          background-color: transparent;
          color: var(--navy);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          border: 2px solid var(--navy);
        }
        
        .btn-outline-navy:hover {
          background-color: var(--navy);
          color: var(--white);
          transform: translateY(-2px);
        }

        /* Intro Section */
        .radex-intro-section {
          max-width: var(--container-width);
          margin: 80px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .radex-intro-section {
            grid-template-columns: 1fr;
            gap: 32px;
            margin: 60px auto;
          }
        }

        .radex-section-label {
          color: var(--gold);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .radex-intro-section h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .radex-intro-section p {
          font-size: 16px;
          color: var(--text-light);
          margin-bottom: 24px;
          line-height: 1.7;
        }

        .radex-cta-card-highlight {
          background-color: var(--gold-pale);
          border: 1px solid rgba(249, 115, 22, 0.15);
          border-left: 4px solid var(--gold);
          padding: 28px;
          border-radius: 0 8px 8px 0;
        }

        .radex-cta-card-highlight p {
          font-size: 15px;
          color: var(--navy);
          font-weight: 600;
          line-height: 1.6;
          margin: 0;
        }

        /* Sanierungswissen Text Blocks */
        .radex-wissen-section {
          background-color: var(--white);
          padding: 80px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .radex-wissen-inner {
          max-width: 820px;
          margin: 0 auto;
        }

        .radex-wissen-inner h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(22px, 3.5vw, 28px);
          color: var(--navy);
          margin-bottom: 20px;
          font-weight: 800;
        }

        .radex-wissen-inner p {
          font-size: 16px;
          color: var(--text-light);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .radex-wissen-inner p:last-child {
          margin-bottom: 0;
        }

        /* Themen Grid Section */
        .radex-themen-section {
          background-color: var(--bg-light);
          padding: 80px 24px;
          text-align: center;
        }

        .radex-themen-header {
          max-width: 800px;
          margin: 0 auto 50px auto;
        }

        .radex-themen-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .ratgeber-themen-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: var(--container-width);
          margin: 0 auto;
        }

        @media (max-width: 1100px) {
          .ratgeber-themen-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ratgeber-themen-grid { grid-template-columns: 1fr; }
        }

        .ratgeber-thema-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px 24px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          text-align: left;
          box-shadow: var(--shadow-sm);
        }

        .ratgeber-thema-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
          transform: translateY(-4px);
        }

        .ratgeber-thema-icon {
          width: 48px;
          height: 48px;
          background: var(--gold-pale);
          color: var(--gold);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .ratgeber-thema-card h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 10px 0;
          line-height: 1.35;
        }

        .ratgeber-thema-card p {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
          margin: 0 0 20px 0;
          flex: 1;
        }

        .ratgeber-thema-link {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--gold);
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: transform 0.2s;
        }

        .ratgeber-thema-card:hover .ratgeber-thema-link {
          transform: translateX(4px);
        }

        /* Artikel Grid Section */
        .radex-artikel-section {
          background-color: var(--white);
          padding: 80px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .radex-artikel-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 50px auto;
        }

        .radex-artikel-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .ratgeber-artikel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: var(--container-width);
          margin: 0 auto;
        }

        @media (max-width: 1100px) {
          .ratgeber-artikel-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ratgeber-artikel-grid { grid-template-columns: 1fr; }
        }

        .ratgeber-artikel-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, transform 0.2s;
          box-shadow: var(--shadow-sm);
        }

        .ratgeber-artikel-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .ratgeber-artikel-card-img {
          width: 100%;
          height: 180px;
          overflow: hidden;
          position: relative;
        }

        .ratgeber-artikel-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .ratgeber-artikel-card:hover .ratgeber-artikel-card-img img {
          transform: scale(1.05);
        }

        .ratgeber-artikel-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .ratgeber-artikel-card-body h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 10px 0;
          line-height: 1.4;
        }

        .ratgeber-artikel-card-body p {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
          margin: 0 0 20px 0;
          flex: 1;
        }

        .ratgeber-artikel-link {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--gold);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .ratgeber-artikel-card:hover .ratgeber-artikel-link {
          color: var(--gold-dark);
        }

        .btn-show-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background-color: var(--white);
          border: 2px solid var(--navy);
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s, transform 0.2s;
        }

        .btn-show-more:hover {
          background-color: var(--navy);
          color: var(--white);
          transform: translateY(-2px);
        }

        /* Warum Radex Section */
        .radex-warum-section {
          background-color: var(--bg-light);
          padding: 80px 24px;
          text-align: center;
        }

        .radex-warum-header {
          max-width: 800px;
          margin: 0 auto 50px auto;
        }

        .radex-warum-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .warum-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: var(--container-width);
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .warum-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .warum-grid { grid-template-columns: 1fr; }
        }

        .warum-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .warum-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .warum-icon-box {
          width: 52px;
          height: 52px;
          background: var(--gold-pale);
          color: var(--gold);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        .warum-card h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 10px 0;
        }

        .warum-card p {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
          margin: 0;
        }

        /* Contact Section */
        .radex-cta-section {
          background-color: var(--white);
          padding: 80px 24px;
          display: flex;
          justify-content: center;
          border-bottom: 4px solid var(--gold);
        }

        .cta-strip {
          max-width: var(--container-width);
          width: 100%;
          background-color: var(--navy-dark);
          color: var(--white);
          padding: 60px 40px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 575px) {
          .cta-strip {
            padding: 40px 20px;
          }
        }

        .cta-strip h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(24px, 4vw, 32px);
          color: var(--white);
          margin: 0 0 12px 0;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .cta-strip p {
          font-size: clamp(15px, 2vw, 16px);
          opacity: 0.9;
          margin: 0 0 32px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-strip-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .cta-strip-actions .btn-gold {
          background-color: var(--gold);
          color: var(--white);
        }

        .cta-strip-actions .btn-gold:hover {
          background-color: var(--gold-dark);
        }

        .cta-strip-actions .btn-outline-white {
          background-color: transparent;
          color: var(--white);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          border: 2px solid var(--white);
        }

        .cta-strip-actions .btn-outline-white:hover {
          background-color: var(--white);
          color: var(--navy-dark);
          transform: translateY(-2px);
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="radex-ratgeber-hero">
        <div className="radex-ratgeber-hero-inner">
          <div className="radex-hero-label">Ratgeber</div>
          <h1>Ratgeber –<br />Sanierung &amp; Modernisierung</h1>
          <p>Praxiswissen, Tipps und Orientierung rund um Renovierung, Sanierung und Modernisierung im Rhein-Main-Gebiet.</p>
          <p style={{ marginTop: '14px', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-light)', maxWidth: '800px' }}>
            Der Radex-Ratgeber richtet sich an Eigentümer und Käufer, die ein Sanierungsprojekt planen oder sich vorab informieren möchten. Die Artikel behandeln Themen wie Badsanierung, Wohnungssanierung, Heizung &amp; Sanitär, energetische Sanierung, Elektroinstallation, Innenausbau und Gewerbeumbau. Jeder Beitrag erklärt verständlich, worauf es ankommt, welche Fragen man stellen sollte und was vor dem ersten Handwerkergespräch bedacht werden sollte – damit Sie gut vorbereitet in Ihr Projekt starten.
          </p>
          <div className="radex-hero-ctas" style={{ marginTop: '32px' }}>
            <Link to="/kontakt" className="btn-gold">Sanierung anfragen</Link>
            <a href="tel:+496074960620" className="btn-outline-navy">
              <Phone size={18} /> Direkt anrufen: 06074 960620
            </a>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="radex-intro-section">
        <div className="radex-intro-text-col">
          <span className="radex-section-label">Fachwissen für Ihr nächstes Projekt</span>
          <h2>Praxisnahe Tipps &amp; Erklärungen</h2>
          <p>Hier finden Sie praxisnahes Wissen zu Sanierung, Modernisierung und Ausbau – strukturiert nach Themenbereichen und speziell zugeschnitten auf Immobilien im Rhein-Main-Gebiet.</p>
          <p>Wählen Sie ein Thema und erfahren Sie mehr zu Leistungen, Abläufen und Möglichkeiten.</p>
        </div>
        <div className="radex-intro-card-col">
          <div className="radex-cta-card-highlight">
            <p>
              Hilfreich für Eigentümer, die Energieeffizienz, Wohnkomfort und Sanierung sinnvoll verbinden möchten.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SANIERUNGSWISSEN SECTION */}
      <section className="radex-wissen-section">
        <div className="radex-wissen-inner">
          <h2>Sanierungswissen für Eigentümer im Rhein-Main-Gebiet</h2>
          <p>
            Wer eine Wohnung, ein Haus, einen Altbau oder eine Gewerbeimmobilie modernisieren möchte, steht oft vor vielen Fragen. Welche Arbeiten sind sinnvoll? In welcher Reihenfolge sollten Sanierungsmaßnahmen erfolgen? Welche Kosten können entstehen? Und worauf sollte man bei der Auswahl von Handwerkern und Fachbetrieben achten?
          </p>
          <p>
            Im Radex-Ratgeber finden Sie praxisnahe Informationen rund um Badsanierung, Wohnungssanierung, Haussanierung, Altbausanierung, Heizung &amp; Sanitär, Elektrotechnik, Innenausbau, energetische Sanierung, Schimmel- und Asbestsanierung sowie Gewerbe- und Objektsanierung. Die Inhalte richten sich an Eigentümer, Käufer, Vermieter und Hausverwaltungen im Rhein-Main-Gebiet und helfen dabei, Sanierungsprojekte besser zu verstehen und fundierte Entscheidungen zu treffen.
          </p>
        </div>
      </section>

      {/* 4. THEMEN GRID SECTION */}
      <section className="radex-themen-section">
        <div className="radex-themen-header">
          <span className="radex-section-label">Themen</span>
          <h2>Alle Themenbereiche</h2>
        </div>

        <div className="ratgeber-themen-grid">
          {themen.map((thema, idx) => (
            <Link key={idx} to={thema.to} className="ratgeber-thema-card">
              <div className="ratgeber-thema-icon">
                {thema.icon}
              </div>
              <h3>{thema.title}</h3>
              <p>{thema.desc}</p>
              <span className="ratgeber-thema-link">
                Mehr erfahren <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. VON DER PLANUNG BIS ZUR UMSETZUNG SECTION */}
      <section className="section" style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-heading), sans-serif', fontSize: 'clamp(22px, 3.5vw, 28px)', color: 'var(--navy)', marginBottom: '20px', fontWeight: 800 }}>
            Von der Planung bis zur Umsetzung
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: 1.75 }}>
            Viele Sanierungsprojekte beginnen mit einer einzelnen Maßnahme und entwickeln sich später zu einem größeren Modernisierungsvorhaben. Deshalb behandelt der Radex-Ratgeber nicht nur einzelne Leistungen, sondern auch typische Abläufe, Planungsfehler, technische Zusammenhänge und wichtige Entscheidungen vor Beginn einer Sanierung. So erhalten Sie einen realistischen Überblick über Möglichkeiten, Herausforderungen und sinnvolle Vorgehensweisen bei Modernisierungsprojekten im Rhein-Main-Gebiet.
          </p>
        </div>
      </section>

      {/* 6. AKTUELLE ARTIKEL SECTION */}
      <section className="radex-artikel-section">
        <div className="radex-artikel-header">
          <span className="radex-section-label">Artikel</span>
          <h2>Aktuelle Ratgeber-Artikel</h2>
        </div>

        <div className="ratgeber-artikel-grid">
          {(showAllArticles ? artikel : artikel.slice(0, 4)).map((art, idx) => (
            <Link key={idx} to={art.to} className="ratgeber-artikel-card">
              <div className="ratgeber-artikel-card-img">
                <img src={art.img} alt={art.alt} loading="lazy" />
              </div>
              <div className="ratgeber-artikel-card-body">
                <h3>{art.title}</h3>
                <p>{art.desc}</p>
                <span className="ratgeber-artikel-link">
                  Artikel lesen <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {!showAllArticles && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button onClick={() => setShowAllArticles(true)} className="btn-show-more">
              Alle Artikel anzeigen &darr;
            </button>
          </div>
        )}
      </section>

      {/* 7. WARUM RADEX SECTION */}
      <section className="radex-warum-section">
        <div className="radex-warum-header">
          <span className="radex-section-label">Warum Radex</span>
          <h2>Warum Radex</h2>
        </div>
        <div className="warum-grid">
          <div className="warum-card">
            <div className="warum-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <h3>Klare Planung</h3>
            <p>Transparente Abläufe von Anfang an</p>
          </div>
          <div className="warum-card">
            <div className="warum-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Hochwertige Ausführung</h3>
            <p>Präzises Handwerk auf Meisterniveau</p>
          </div>
          <div className="warum-card">
            <div className="warum-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <h3>Zuverlässige Koordination</h3>
            <p>Alle Gewerke aus einer Hand</p>
          </div>
          <div className="warum-card">
            <div className="warum-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <h3>Transparente Kostenstruktur</h3>
            <p>Keine versteckten Kosten</p>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="radex-cta-section">
        <div className="cta-strip">
          <h2>Haben Sie Fragen zu einem Projekt?</h2>
          <p>Sprechen Sie uns an – wir beraten Sie unverbindlich und persönlich.</p>
          <div className="cta-strip-actions">
            <Link to="/kontakt" className="btn-gold">Kontakt aufnehmen &rarr;</Link>
            <a href="tel:+496074960620" className="btn-outline-white">
              <Phone size={18} /> Direkt anrufen – 06074 960620
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
