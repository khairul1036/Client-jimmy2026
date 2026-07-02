import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, ChevronRight, Check, Wrench, Clock, AlertTriangle } from 'lucide-react';
import { Link } from '../router';
import useSeo from '../useSeo';
import { mainCities } from '../data/citiesData';

export default function EinsatzgebieteHub2() {
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
    }, []);

    // SEO configuration
    useSeo({
        title: "Einsatzgebiete | Radex Objektmanagement GmbH",
        description: "Radex realisiert Sanierungs- und Modernisierungsprojekte im gesamten Rhein-Main-Gebiet – mit Standort in Rödermark/Ober-Roden und kurzen Wegen zu Kunden, Baustellen und Fachpartnern.",
        path: "/einsatzgebiete"
    });

    // Dynamic Leaflet Map setup
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Append Leaflet CSS if not already there
        let leafletCss = document.getElementById('leaflet-css');
        if (!leafletCss) {
            leafletCss = document.createElement('link');
            leafletCss.id = 'leaflet-css';
            leafletCss.rel = 'stylesheet';
            leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(leafletCss);
        }

        // Load Leaflet JS
        let leafletJs = document.getElementById('leaflet-js');
        if (!leafletJs) {
            leafletJs = document.createElement('script');
            leafletJs.id = 'leaflet-js';
            leafletJs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            leafletJs.onload = () => initLeafletMap();
            document.body.appendChild(leafletJs);
        } else if (window.L) {
            initLeafletMap();
        }

        function initLeafletMap() {
            const L = window.L;
            if (!L) return;

            const mapEl = document.getElementById('einsatz-map');
            if (!mapEl || mapEl._leaflet_id) return; // Prevent double initialization

            // Rödermark center [50.0039, 8.8258]
            const map = L.map('einsatz-map', {
                scrollWheelZoom: false
            }).setView([50.0039, 8.8258], 9);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(map);

            // Circle representing 50km radius
            L.circle([50.0039, 8.8258], {
                color: '#F97316',
                fillColor: '#F97316',
                fillOpacity: 0.12,
                radius: 50000 // 50km radius in meters
            }).addTo(map);

            // Custom Gold dot icons
            const createGoldDotIcon = (cityName) => {
                return L.divIcon({
                    className: 'map-gold-dot',
                    html: `<div style="
            background-color: #F97316;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            box-shadow: 0 0 6px rgba(0,0,0,0.3);
          " title="${cityName}"></div>`,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                });
            };

            // Special red-gold dot icon for Rödermark (Standort)
            const centerIcon = L.divIcon({
                className: 'map-center-dot',
                html: `<div style="
          position: relative;
          background-color: #1E3A8A;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid #F97316;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.8);
        ">
          <div style="
            position: absolute;
            top: 2px;
            left: 2px;
            background-color: #F97316;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          "></div>
        </div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            // Add Rödermark marker
            const centerMarker = L.marker([50.0039, 8.8258], { icon: centerIcon }).addTo(map);
            centerMarker.bindPopup('<b>Radex Standort Rödermark</b><br>Odenwaldstraße 61, 63322 Rödermark<br>Einsatzradius ca. 50 km.').openPopup();

            // Coordinates for other key cities in Rhein-Main
            const keyCities = [
                { name: "Frankfurt am Main", coords: [50.1109, 8.6821] },
                { name: "Offenbach am Main", coords: [50.0998, 8.7836] },
                { name: "Hanau", coords: [50.1311, 8.9208] },
                { name: "Aschaffenburg", coords: [49.9723, 9.1508] },
                { name: "Darmstadt", coords: [49.8728, 8.6512] },
                { name: "Wiesbaden", coords: [50.0826, 8.2400] },
                { name: "Mainz", coords: [49.9929, 8.2473] },
                { name: "Bad Homburg", coords: [50.2294, 8.6094] },
                { name: "Seligenstadt", coords: [50.0436, 8.9747] },
                { name: "Rodgau", coords: [50.0211, 8.8837] },
                { name: "Langen", coords: [49.9917, 8.6792] },
                { name: "Königstein", coords: [50.1832, 8.4633] }
            ];

            keyCities.forEach(city => {
                L.marker(city.coords, { icon: createGoldDotIcon(city.name) })
                    .addTo(map)
                    .bindPopup(`<b>${city.name}</b><br>Sanierungs- und Modernisierungsprojekte.`);
            });
        }
    }, []);

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

    return (
        <div className="einsatzgebiete-hub-wrapper">
            {/* Dynamic Inline CSS matching exact Radex website colors and styles */}
            <style>{`
        .einsatzgebiete-hub-wrapper {
          --gold: #F97316;
          --gold-dark: #EA580C;
          --gold-pale: rgba(249, 115, 22, 0.05);
          font-family: var(--font-body), sans-serif;
          color: var(--text);
          line-height: 1.6;
          background-color: var(--bg-light);
        }
        
        /* Hero Section */
        .radex-einsatz-hero {
          position: relative;
          background-image: linear-gradient(rgba(250, 251, 253, 0.88), rgba(250, 251, 253, 0.92)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600');
          background-size: cover;
          background-position: center;
          padding: clamp(80px, 10vw, 120px) 24px;
          text-align: left;
          color: var(--text);
          display: flex;
          justify-content: center;
        }
        
        .radex-einsatz-hero-inner {
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
        
        .radex-einsatz-hero h1 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 800;
          margin: 0 0 20px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          color: var(--navy);
        }
        
        .radex-einsatz-hero p {
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

        /* Map & Info Radius Section */
        .radex-map-section {
          max-width: var(--container-width);
          margin: 80px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .radex-map-section {
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

        .radex-map-section h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .radex-map-section p {
          font-size: 16px;
          color: var(--text-light);
          margin-bottom: 32px;
        }

        .radex-map-info-bullets {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .radex-bullet-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .radex-bullet-icon-box {
          background-color: var(--gold-pale);
          color: var(--gold);
          padding: 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radex-bullet-text h4 {
          font-family: var(--font-heading), sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 4px 0;
        }

        .radex-bullet-text p {
          font-size: 14px;
          color: var(--text-light);
          margin: 0;
        }

        .radex-map-container-outer {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
          height: 400px;
          position: relative;
        }

        @media (max-width: 575px) {
          .radex-map-container-outer {
            height: 300px;
          }
        }

        #einsatz-map {
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* Cities Grid Section */
        .radex-cities-grid-section {
          background-color: var(--bg-light);
          padding: 80px 24px;
          text-align: center;
        }

        .radex-cities-header {
          max-width: 700px;
          margin: 0 auto 50px auto;
        }

        .radex-cities-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .radex-cities-header p {
          font-size: 16px;
          color: var(--text-light);
          margin: 0;
        }

        .radex-cities-grid {
          max-width: var(--container-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1199px) {
          .radex-cities-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 991px) {
          .radex-cities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 575px) {
          .radex-cities-grid {
            grid-template-columns: 1fr;
          }
        }

        .stadt-card {
          position: relative;
          height: 240px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid var(--border);
        }

        @media (max-width: 575px) {
          .stadt-card {
            height: 200px;
          }
        }

        .stadt-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .stadt-card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: var(--transition);
        }

        .stadt-card:hover .stadt-card-image {
          transform: scale(1.05);
        }

        .stadt-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65));
          z-index: 2;
        }

        .stadt-card-banner {
          position: relative;
          z-index: 3;
          width: 100%;
          background-color: rgba(var(--navy-rgb), 0.95);
          padding: 12px 16px;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.08);
          transition: var(--transition);
        }

        .stadt-card:hover .stadt-card-banner {
          background-color: var(--gold);
        }

        .stadt-card-name {
          color: var(--white);
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          font-size: 15px;
          transition: var(--transition);
        }

        .stadt-card:hover .stadt-card-name {
          color: var(--navy-dark);
        }

        .stadt-card-arrow {
          color: var(--gold);
          display: flex;
          align-items: center;
          transition: var(--transition);
        }

        .stadt-card:hover .stadt-card-arrow {
          color: var(--navy-dark);
          transform: translateX(4px);
        }

        /* Emergency Section */
        .radex-emergency-section {
          background-color: var(--bg-section);
          padding: 80px 24px;
        }
        
        .radex-emergency-inner {
          max-width: var(--container-width);
          margin: 0 auto;
        }
        
        .radex-emergency-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 50px auto;
        }
        
        .radex-emergency-header h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }
        
        .radex-emergency-header p {
          font-size: 16px;
          color: var(--text-light);
          margin: 0;
        }
        
        .radex-emergency-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        @media (max-width: 991px) {
          .radex-emergency-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        
        .emergency-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        
        .emergency-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .emergency-icon-box {
          position: relative;
          color: var(--gold);
          margin-bottom: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .emergency-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background-color: rgba(249, 115, 22, 0.1);
          color: var(--gold);
          padding: 4px 10px;
          border-radius: 20px;
        }
        
        .emergency-badge.bg-orange {
          background-color: rgba(234, 88, 12, 0.1);
          color: #EA580C;
        }
        
        .emergency-badge.bg-red {
          background-color: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }
        
        .emergency-card h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 12px 0;
        }
        
        .emergency-card p {
          font-size: 15px;
          color: var(--text-light);
          margin: 0 0 24px 0;
          line-height: 1.6;
          flex-grow: 1;
        }
        
        .emergency-link {
          margin-top: auto;
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        /* Contact Section */
        .radex-contact-section {
          background-color: var(--bg-light);
          color: var(--text);
          padding: 80px 24px;
          display: flex;
          justify-content: center;
          border-bottom: 4px solid var(--gold);
        }
        
        .radex-contact-inner {
          max-width: var(--container-width);
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }
        
        @media (max-width: 991px) {
          .radex-contact-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        
        .radex-contact-info-panel h2 {
          font-family: var(--font-heading), sans-serif;
          font-size: clamp(28px, 4.5vw, 36px);
          font-weight: 800;
          margin: 0 0 20px 0;
          color: var(--navy);
          letter-spacing: -0.5px;
        }
        
        .radex-contact-info-panel p {
          font-size: 16px;
          color: var(--text-light);
          margin-bottom: 32px;
          line-height: 1.7;
        }
        
        .radex-cta-card-highlight {
          background-color: rgba(249, 115, 22, 0.04);
          border: 1px solid rgba(249, 115, 22, 0.15);
          border-left: 4px solid var(--gold);
          padding: 24px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          margin-bottom: 32px;
        }
        
        .radex-cta-card-highlight h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 6px 0;
        }
        
        .radex-cta-card-highlight p {
          font-size: 14px;
          color: var(--text-light);
          margin: 0;
        }
        
        .radex-contact-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .radex-contact-link-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--text);
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: color 0.2s ease;
        }
        
        .radex-contact-link-item:hover {
          color: var(--gold);
        }
        
        .radex-form-panel {
          background-color: var(--white);
          border: 1px solid var(--border);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        
        @media (max-width: 575px) {
          .radex-contact-section {
            padding: 50px 16px;
          }
          .radex-form-panel {
            padding: 24px 16px;
          }
        }
        
        .radex-form-panel h3 {
          font-family: var(--font-heading), sans-serif;
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 24px 0;
          color: var(--navy);
        }
        
        .radex-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        @media (max-width: 575px) {
          .radex-form-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .radex-form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .radex-form-field label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .radex-input {
          background-color: var(--bg-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .radex-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.25);
        }
        
        .radex-form-field-full {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        
        .radex-form-field-full label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .radex-textarea {
          background-color: var(--bg-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 15px;
          min-height: 120px;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .radex-textarea:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.25);
        }
        
        .radex-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 24px;
        }
        
        .radex-checkbox {
          accent-color: var(--gold);
          margin-top: 3px;
          cursor: pointer;
        }
        
        .radex-checkbox-label {
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.4;
          cursor: pointer;
        }
        
        .radex-checkbox-label a {
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
          color: var(--navy);
          margin: 0 0 10px 0;
        }
        
        .success-box p {
          font-size: 15px;
          color: var(--text-light);
          margin: 0;
          line-height: 1.6;
        }
      `}</style>

            {/* 1. HERO SECTION */}
            <section className="radex-einsatz-hero">
                <div className="radex-einsatz-hero-inner">
                    <div className="radex-hero-label">Rhein-Main-Region</div>
                    <h1>Einsatzgebiete</h1>
                    <p>
                        Radex realisiert Sanierungs- und Modernisierungsprojekte im gesamten Rhein-Main-Gebiet – mit Standort in Rödermark/Ober-Roden und kurzen Wegen zu Kunden, Baustellen und Fachpartnern. Im Umkreis von ca. 50 km betreuen wir Ihr Vorhaben von der ersten Planung bis zur schlüsselfertigen Übergabe. Entdecken Sie unsere lokalen Services und Referenzen für Ihre Stadt.
                    </p>
                    <div className="radex-hero-ctas">
                        <a href="#kontakt-formular" className="btn-gold">Beratung anfragen</a>
                        <a href="tel:+496074960620" className="btn-outline-navy">
                            <Phone size={18} /> 06074 960620
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. MAP & RADIUS SECTION */}
            <section className="radex-map-section">
                <div className="radex-map-info-col">
                    <span className="radex-section-label">Rhein-Main-Region – Einsatzgebiete</span>
                    <h2>Einsatzgebiete im Rhein-Main-Gebiet</h2>
                    <p>
                        Wir realisieren Sanierungs- und Modernisierungsprojekte im Umkreis von ca. 50 km rund um Rödermark (Ober-Roden).
                    </p>
                    <div className="radex-map-info-bullets">
                        <div className="radex-bullet-item">
                            <div className="radex-bullet-icon-box">
                                <MapPin size={20} />
                            </div>
                            <div className="radex-bullet-text">
                                <h4>Standort</h4>
                                <p>Rödermark (Ober-Roden)</p>
                            </div>
                        </div>
                        <div className="radex-bullet-item">
                            <div className="radex-bullet-icon-box">
                                <ChevronRight size={20} />
                            </div>
                            <div className="radex-bullet-text">
                                <h4>Einsatzgebiet</h4>
                                <p>ca. 50 km Umkreis</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="radex-map-col">
                    <div className="radex-map-container-outer">
                        <div id="einsatz-map"></div>
                    </div>
                </div>
            </section>

            {/* 2.5 EMERGENCY ASSISTANCE & EXPRESS SERVICE SECTION */}
            <section className="radex-emergency-section">
                <div className="radex-emergency-inner">
                    <div className="radex-emergency-header">
                        <span className="radex-section-label">Schnelle Hilfe & Express-Service</span>
                        <h2>Notfallhilfe & Sofortmaßnahmen</h2>
                        <p>
                            Wenn es schnell gehen muss: Sofortmaßnahmen bei Schäden, Express-Modernisierungen und dringende Erstbewertungen direkt in Ihrer Region.
                        </p>
                    </div>
                    
                    <div className="radex-emergency-grid">
                        {/* 1. Emergency Bathroom Services */}
                        <div className="emergency-card">
                            <div className="emergency-icon-box">
                                <span className="emergency-badge">24/7 Notdienst</span>
                                <Wrench size={32} />
                            </div>
                            <h3>Notfall-Sanitärservice</h3>
                            <p>
                                Schnelle Hilfe bei Wasserschäden, Rohrbrüchen oder dringenden Sanitärproblemen. Wir sind in Kürze bei Ihnen vor Ort.
                            </p>
                            <a href="tel:+496074960620" className="btn-gold emergency-link">
                                Jetzt anrufen &rarr;
                            </a>
                        </div>
                        
                        {/* 2. Express Renovation */}
                        <div className="emergency-card">
                            <div className="emergency-icon-box">
                                <span className="emergency-badge bg-orange">Express</span>
                                <Clock size={32} />
                            </div>
                            <h3>Express-Renovierung</h3>
                            <p>
                                Schnelle Projektabwicklung für dringende Modernisierungen mit kurzer Vorlaufzeit. Perfekt für dringende Vorhaben.
                            </p>
                            <a href="#kontakt-formular" className="btn-outline-navy emergency-link">
                                Termin anfragen &rarr;
                            </a>
                        </div>
                        
                        {/* 3. Contaminant Emergency Assessment */}
                        <div className="emergency-card">
                            <div className="emergency-icon-box">
                                <span className="emergency-badge bg-red">Schadstoffe</span>
                                <AlertTriangle size={32} />
                            </div>
                            <h3>Schadstoff-Notfallbewertung</h3>
                            <p>
                                Schnelle Erstbewertung bei akutem Schimmelpilzbefall oder Verdacht auf Asbest in Bestandsgebäuden.
                            </p>
                            <a href="#kontakt-formular" className="btn-outline-navy emergency-link">
                                Bewertung anfordern &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CITIES GRID SECTION */}
            <section className="radex-cities-grid-section">
                <div className="radex-cities-header">
                    <span className="radex-section-label">Städte & Gemeinden</span>
                    <h2>Unsere Einsatzgebiete</h2>
                    <p>Klicken Sie auf eine Stadt für regionale Informationen zu unseren Leistungen vor Ort.</p>
                </div>

                <div className="radex-cities-grid">
                    {mainCities.map((city, idx) => (
                        <Link key={idx} to={`/${city.slug}`} className="stadt-card">
                            <div
                                className="stadt-card-image"
                                style={{ backgroundImage: `url(${city.heroImg})` }}
                            ></div>
                            <div className="stadt-card-overlay"></div>
                            <div className="stadt-card-banner">
                                <span className="stadt-card-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} color="var(--gold)" />
                                    {city.name}
                                </span>
                                <span className="stadt-card-arrow">
                                    <ChevronRight size={18} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 4. CONTACT & CONSULTATION SECTION */}
            <section id="kontakt-formular" className="radex-contact-section">
                <div className="radex-contact-inner">
                    <div className="radex-contact-info-panel">
                        <span className="radex-section-label">Regionalität</span>
                        <h2>Regional vor Ort im Rhein-Main-Gebiet</h2>
                        <p>
                            Kurze Wege, schnelle Reaktionszeiten und persönliche Betreuung sorgen für eine zuverlässige Umsetzung Ihrer Projekte.
                        </p>
                        <div className="radex-cta-card-highlight">
                            <h3>Jetzt unverbindlich beraten lassen</h3>
                            <p>Schnelle Rückmeldung – persönlich & unverbindlich</p>
                        </div>
                        <div className="radex-contact-links">
                            <a href="tel:+496074960620" className="radex-contact-link-item">
                                <Phone size={20} color="#F97316" /> +49 6074 960620
                            </a>
                            <a href="mailto:info@radex-objektmanagement.de" className="radex-contact-link-item">
                                <Mail size={20} color="#F97316" /> info@radex-objektmanagement.de
                            </a>
                        </div>
                    </div>

                    <div className="radex-form-panel">
                        {!formSubmitted ? (
                            <form onSubmit={handleFormSubmit}>
                                <h3>Kostenlose Beratung sichern</h3>

                                <div className="radex-form-grid">
                                    <div className="radex-form-field">
                                        <label htmlFor="vorname">Vorname *</label>
                                        <input
                                            type="text"
                                            id="vorname"
                                            name="vorname"
                                            className="radex-input"
                                            placeholder="Ihr Vorname"
                                            value={formData.vorname}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.vorname && <span className="error-message">{formErrors.vorname}</span>}
                                    </div>
                                    <div className="radex-form-field">
                                        <label htmlFor="nachname">Nachname *</label>
                                        <input
                                            type="text"
                                            id="nachname"
                                            name="nachname"
                                            className="radex-input"
                                            placeholder="Ihr Nachname"
                                            value={formData.nachname}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.nachname && <span className="error-message">{formErrors.nachname}</span>}
                                    </div>
                                </div>

                                <div className="radex-form-grid">
                                    <div className="radex-form-field">
                                        <label htmlFor="telefon">Telefon</label>
                                        <input
                                            type="tel"
                                            id="telefon"
                                            name="telefon"
                                            className="radex-input"
                                            placeholder="Ihre Telefonnummer"
                                            value={formData.telefon}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="radex-form-field">
                                        <label htmlFor="email">E-Mail *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="radex-input"
                                            placeholder="Ihre E-Mail"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                    </div>
                                </div>

                                <div className="radex-form-field-full">
                                    <label htmlFor="nachricht">Nachricht *</label>
                                    <textarea
                                        id="nachricht"
                                        name="nachricht"
                                        className="radex-textarea"
                                        placeholder="Kurze Beschreibung Ihres Projekts ..."
                                        value={formData.nachricht}
                                        onChange={handleInputChange}
                                    ></textarea>
                                    {formErrors.nachricht && <span className="error-message">{formErrors.nachricht}</span>}
                                </div>

                                <div className="radex-checkbox-field">
                                    <input
                                        type="checkbox"
                                        id="dsgvo"
                                        name="dsgvo"
                                        className="radex-checkbox"
                                        checked={formData.dsgvo}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="dsgvo" className="radex-checkbox-label">
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
