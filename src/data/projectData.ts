export const cartParts = [
  {
    id: 'estructura',
    name: "Estructura d'Alumini",
    icon: 'structure',
    description: "Esquelet principal d'alumini lleuger que aguanta tot el conjunt. Calculat a SolidWorks amb una rigidesa òptima per a l'ús diari en botiga.",
    detail: 'Pes total conjunt: 13,652 kg inclosos nanses, contenidors i elements auxiliars.',
    color: '#c84b5a',
    cameraPos: [3.0, 1.8, 3.0] as [number, number, number],
    cameraTarget: [0, 0.2, 0] as [number, number, number],
  },
  {
    id: 'plataformes',
    name: 'Plataformes Regulables',
    icon: 'layers',
    description: 'Tres plataformes ajustables en alçada amb sistema mecànic de bloqueig. Permeten adaptar-se a cada càrrega i faciliten un millor ús de la capacitat del carro.',
    detail: 'Objectiu: passar de 17,05 embalums/carro actuals a >20 per viatge.',
    color: '#818cf8',
    cameraPos: [2.2, 0.8, 2.2] as [number, number, number],
    cameraTarget: [0, 0.1, 0] as [number, number, number],
  },
  {
    id: 'rodes',
    name: 'Rodes Silencioses',
    icon: 'wheel',
    description: 'Quatre rodes dissenyades per a passadissos de botiga: silencioses, estables i amb gir suau. Mínima resistència al desplaçament i manteniment baix.',
    detail: "Contribueixen a reduir els 37,6 m de recorregut innecessari per càrrega mesurats a l'estudi de camp.",
    color: '#34d399',
    cameraPos: [2.0, -0.8, 2.2] as [number, number, number],
    cameraTarget: [0, -0.85, 0] as [number, number, number],
  },
  {
    id: 'nanses',
    name: 'Nanses Ergonòmiques',
    icon: 'grip',
    description: "Nanses laterals dissenyades per a un ús prolongat. Redueixen la fatiga en torns amb múltiples càrregues i milloren el control del carro en maniobres.",
    detail: 'Objectiu post-pilot: valoració ergonòmica ≥7/10 per part dels reponedors.',
    color: '#fbbf24',
    cameraPos: [2.8, 0.2, 0] as [number, number, number],
    cameraTarget: [0.4, 0.1, 0] as [number, number, number],
  },
  {
    id: 'contenidors',
    name: 'Contenidors de Residus',
    icon: 'container',
    description: 'Compartiments integrats a la part inferior per a cartró i plàstic. Eliminen la necessitat de desplaçaments addicionals per gestionar residus durant la reposició.',
    detail: "Objectiu: absorbir el 100% dels residus per càrrega. Impacte ambiental positiu alineat amb la política de sostenibilitat de Bon Preu.",
    color: '#4ade80',
    cameraPos: [1.8, -0.4, 2.5] as [number, number, number],
    cameraTarget: [0, -0.72, 0] as [number, number, number],
  },
  {
    id: 'bloqueig',
    name: 'Sistema de Bloqueig',
    icon: 'lock',
    description: 'Mecanisme mecànic que fixa les plataformes a la posició desitjada. Dissenyat per operar fàcilment amb una sola mà sense necessitat d\'eines.',
    detail: 'Punts de validació al pilot: resistència, risc d\'atrapaments i càrrega màxima per plataforma.',
    color: '#fb923c',
    cameraPos: [2.5, 0.5, 1.5] as [number, number, number],
    cameraTarget: [0.35, 0.25, 0.27] as [number, number, number],
  },
]

export const problemStats = [
  { value: 1800, label: 'observacions', sublabel: 'de camp agregades', suffix: '', decimals: 0, color: '#c84b5a' },
  { value: 17.05, label: 'embalums', sublabel: 'per carro (mitjana)', suffix: '', decimals: 2, color: '#818cf8' },
  { value: 9.54, label: 'kg', sublabel: 'pes mitjà observat', suffix: ' kg', decimals: 2, color: '#34d399' },
  { value: 78, label: 'segons', sublabel: 'tasques banals/càrrega', suffix: 's', decimals: 0, color: '#fbbf24' },
  { value: 37.6, label: 'metres', sublabel: 'recorregut innecessari', suffix: ' m', decimals: 1, color: '#f87171' },
]

export const embalumsData = [
  { bin: '5-7', count: 75 }, { bin: '7-9', count: 70 }, { bin: '9-12', count: 130 },
  { bin: '12-14', count: 75 }, { bin: '14-16', count: 200 }, { bin: '16-18', count: 355 },
  { bin: '18-20', count: 250 }, { bin: '20-23', count: 255 }, { bin: '23-25', count: 165 },
  { bin: '25-27', count: 120 }, { bin: '27-29', count: 55 }, { bin: '29-32', count: 25 },
  { bin: '32-36', count: 15 }, { bin: '36-38', count: 5 },
]

export const pesData = [
  { bin: '2.5-3.3', count: 5 }, { bin: '3.3-4.2', count: 5 }, { bin: '4.2-5.1', count: 15 },
  { bin: '5.1-6.0', count: 90 }, { bin: '6.0-6.8', count: 165 }, { bin: '6.8-7.7', count: 165 },
  { bin: '7.7-8.6', count: 230 }, { bin: '8.6-9.5', count: 295 }, { bin: '9.5-10.4', count: 355 },
  { bin: '10.4-11.2', count: 245 }, { bin: '11.2-12.1', count: 185 }, { bin: '12.1-13.0', count: 100 },
  { bin: '13.0-13.9', count: 95 }, { bin: '13.9-14.7', count: 35 }, { bin: '14.7-15.6', count: 15 },
]

export const tasquesData = [
  { bin: '15-24', count: 10 }, { bin: '24-33', count: 20 }, { bin: '33-42', count: 25 },
  { bin: '42-51', count: 100 }, { bin: '51-60', count: 145 }, { bin: '60-69', count: 310 },
  { bin: '69-78', count: 275 }, { bin: '78-87', count: 265 }, { bin: '87-95', count: 280 },
  { bin: '95-104', count: 170 }, { bin: '104-113', count: 105 }, { bin: '113-122', count: 45 },
  { bin: '122-131', count: 20 }, { bin: '131-140', count: 15 }, { bin: '140-149', count: 5 },
]

export const metresData = [
  { bin: '0-5', count: 10 }, { bin: '5-11', count: 20 }, { bin: '11-17', count: 50 },
  { bin: '17-22', count: 95 }, { bin: '22-28', count: 155 }, { bin: '28-33', count: 295 },
  { bin: '33-39', count: 285 }, { bin: '39-44', count: 285 }, { bin: '44-50', count: 210 },
  { bin: '50-55', count: 130 }, { bin: '55-61', count: 65 }, { bin: '61-67', count: 25 },
  { bin: '67-72', count: 20 }, { bin: '72-78', count: 10 }, { bin: '78-83', count: 10 },
]

export const pilotPhases = [
  {
    num: '01',
    title: 'Pilot',
    duration: '3 mesos',
    carros: '303 carros',
    cost: '272.700 €',
    desc: '1 carro per botiga Bon Preu (161) + 2 per Esclat (71). Mesura contínua de KPIs per gerents i caps de torn.',
    color: '#9B2335',
    kpis: ['Embalums >20', 'Tasques banals <55s', 'Metres <26m'],
  },
  {
    num: '02',
    title: 'Ajust',
    duration: 'Post-pilot',
    carros: '—',
    cost: '—',
    desc: 'Revisió del disseny amb dades reals: plataformes, contenidors, rodes i sistemes de bloqueig. Ajust amb proveïdor si cal.',
    color: '#8b5cf6',
    kpis: ['Revisió disseny', 'Ajust proveïdor', 'Validació PRL'],
  },
  {
    num: '03',
    title: 'Escalat',
    duration: '3 anys',
    carros: '749 carros',
    cost: '≈224.700 €/any',
    desc: "Implantació progressiva prioritzant Esclat i Bon Preu gran. Imputació via autoconsum al compte d'explotació de cada botiga.",
    color: '#c84b5a',
    kpis: ['250 carros/any', 'Prioritat Esclat', 'Via autoconsum'],
  },
  {
    num: '04',
    title: 'Consolidació',
    duration: 'Continu',
    carros: '1.052 carros',
    cost: '157.800 €/any',
    desc: 'Revisió anual de KPIs. Manteniment preventiu via proveïdor.',
    color: '#10b981',
    kpis: ['KPI anual', 'Mant. preventiu'],
  },
]
