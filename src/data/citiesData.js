const customCityImages = {
  "frankfurt-am-main": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Skyline_Frankfurt_am_Main_2015.jpg/1280px-Skyline_Frankfurt_am_Main_2015.jpg",
  "darmstadt": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Darmstadt_Mathildenh%C3%B6he.jpg/1280px-Darmstadt_Mathildenh%C3%B6he.jpg",
  "offenbach-am-main": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Offenbach_B%C3%BCsingpalais.jpg/1280px-Offenbach_B%C3%BCsingpalais.jpg",
  "hanau": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Hanau_Marktplatz_S%C3%BCdseite.jpg/1280px-Hanau_Marktplatz_S%C3%BCdseite.jpg",
  "wiesbaden": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Wiesbaden_BW_2017-04-24_20-51-36.jpg/1280px-Wiesbaden_BW_2017-04-24_20-51-36.jpg",
  "mainz": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mainz_Dom_BW_2012-08-18_16-18-12.JPG/1280px-Mainz_Dom_BW_2012-08-18_16-18-12.JPG",
  "aschaffenburg": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Schloss_Johannisberg_%28Aschaffenburg%29_II.jpg/1280px-Schloss_Johannisberg_%28Aschaffenburg%29_II.jpg",
  "roedermark": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Seligenstadt_Frankfurter_Strasse_12.jpg/1280px-Seligenstadt_Frankfurter_Strasse_12.jpg"
};

const defaultImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
];

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export const allCitiesList = [
  { name: "Frankfurt am Main", slug: "frankfurt-am-main" },
  { name: "Offenbach am Main", slug: "offenbach-am-main" },
  { name: "Hanau", slug: "hanau" },
  { name: "Aschaffenburg", slug: "aschaffenburg" },
  { name: "Dietzenbach", slug: "dietzenbach" },
  { name: "Dreieich", slug: "dreieich" },
  { name: "Eschborn", slug: "eschborn" },
  { name: "Groß-Gerau", slug: "gross-gerau" },
  { name: "Heusenstamm", slug: "heusenstamm" },
  { name: "Hofheim am Taunus", slug: "hofheim-am-taunus" },
  { name: "Königstein im Taunus", slug: "koenigstein-im-taunus" },
  { name: "Kronberg im Taunus", slug: "kronberg-im-taunus" },
  { name: "Langen", slug: "langen" },
  { name: "Maintal", slug: "maintal" },
  { name: "Mühlheim am Main", slug: "muehlheim-am-main" },
  { name: "Neu-Isenburg", slug: "neu-isenburg" },
  { name: "Obertshausen", slug: "obertshausen" },
  { name: "Oberursel", slug: "oberursel" },
  { name: "Rodgau", slug: "rodgau" },
  { name: "Rödermark", slug: "roedermark" },
  { name: "Rüsselsheim am Main", slug: "ruesselsheim-am-main" },
  { name: "Seligenstadt", slug: "seligenstadt" },
  { name: "Babenhausen", slug: "babenhausen" },
  { name: "Bad Homburg v. d. Höhe", slug: "bad-homburg-vor-der-hoehe" },
  { name: "Bad Nauheim", slug: "bad-nauheim" },
  { name: "Bad Soden am Taunus", slug: "bad-soden-am-taunus" },
  { name: "Bad Vilbel", slug: "bad-vilbel" },
  { name: "Bruchköbel", slug: "bruchkoebel" },
  { name: "Büttelborn", slug: "buettelborn" },
  { name: "Darmstadt", slug: "darmstadt" },
  { name: "Dieburg", slug: "dieburg" },
  { name: "Egelsbach", slug: "egelsbach" },
  { name: "Erzhausen", slug: "erzhausen" },
  { name: "Flörsheim am Main", slug: "floersheim-am-main" },
  { name: "Friedberg (Hessen)", slug: "friedberg-hessen" },
  { name: "Friedrichsdorf", slug: "friedrichsdorf" },
  { name: "Ginsheim-Gustavsburg", slug: "ginsheim-gustavsburg" },
  { name: "Griesheim", slug: "griesheim" },
  { name: "Großkrotzenburg", slug: "grosskrotzenburg" },
  { name: "Groß-Umstadt", slug: "gross-umstadt" },
  { name: "Hainburg", slug: "hainburg" },
  { name: "Hattersheim am Main", slug: "hattersheim-am-main" },
  { name: "Karben", slug: "karben" },
  { name: "Kelkheim (Taunus)", slug: "kelkheim-taunus" },
  { name: "Kelsterbach", slug: "kelsterbach" },
  { name: "Mainz", slug: "mainz" },
  { name: "Mörfelden-Walldorf", slug: "moerfelden-walldorf" },
  { name: "Nidderau", slug: "nidderau" },
  { name: "Raunheim", slug: "raunheim" },
  { name: "Schwalbach am Taunus", slug: "schwalbach-am-taunus" },
  { name: "Sulzbach (Taunus)", slug: "sulzbach-taunus" },
  { name: "Weiterstadt", slug: "weiterstadt" },
  { name: "Wiesbaden", slug: "wiesbaden" }
];

export const mainCities = allCitiesList.map(c => {
  return {
    ...c,
    heroImg: customCityImages[c.slug] || defaultImages[getHash(c.slug) % defaultImages.length],
    districts: c.slug === "frankfurt-am-main" ? ["Sachsenhausen", "Nordend", "Bornheim", "Bockenheim", "Westend", "Ostend", "Gallus", "Niederrad", "Höchst", "Riedberg"]
             : c.slug === "darmstadt" ? ["Bessungen", "Eberstadt", "Kranichstein", "Arheilgen", "Wixhausen", "Innenstadt"]
             : c.slug === "offenbach-am-main" ? ["Innenstadt", "Bürgel", "Bieber", "Rumpenheim", "Lauterborn", "Tempelsee"]
             : c.slug === "hanau" ? ["Innenstadt", "Kesselstadt", "Großauheim", "Steinheim", "Wolfgang", "Lamboy"]
             : c.slug === "wiesbaden" ? ["Innenstadt", "Biebrich", "Bierstadt", "Sonnenberg", "Schierstein", "Dotzheim"]
             : c.slug === "mainz" ? ["Altstadt", "Neustadt", "Oberstadt", "Gonsenheim", "Bretzenheim", "Mombach"]
             : c.slug === "aschaffenburg" ? ["Innenstadt", "Damm", "Leider", "Nilkheim", "Schweinheim", "Strietwald"]
             : c.slug === "roedermark" ? ["Ober-Roden", "Urberach", "Waldacker"]
             : []
  };
});

export function getCityBySlug(slug) {
  if (!slug) return null;
  const lowerSlug = slug.toLowerCase();
  
  // Find in main cities
  const found = mainCities.find(c => c.slug === lowerSlug);
  if (found) return found;

  // Generic fallback if not defined but accessed
  const formattedName = slug
    .split('-')
    .map(word => {
      if (['am', 'an', 'der', 'im', 'vord'].includes(word.toLowerCase())) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return {
    slug: lowerSlug,
    name: formattedName,
    heroImg: defaultImages[getHash(lowerSlug) % defaultImages.length],
    districts: [],
    isDynamic: true
  };
}
