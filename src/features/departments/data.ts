export interface Department {
  slug: string
  name: string
  faculty: string
  description: string
  history: string
  missions: string[]
  head: string
  programDirector: string
  degrees: string[]
  subjects: string[]
  tools: string[]
  careerPaths: string[]
  admissionConditions: string
  admissionThresholds: string
  acquiredSkills: string[]
  advantages: string[]
  difficulties: string[]
  successTips: string[]
  idealProfile: string
  exampleProject?: {
    title: string
    description: string
  }
  aiAdvice: string
  contacts: {
    email: string
    phone: string
    website: string
  }
  location: string
  admissionCriteria: {
    bacSeries: string[]
    minAverage: number
  }
  subjectWeights: {
    name: string
    coefficient: number
  }[]
  isCertified: boolean
  icon: string
}

export const departments: Record<string, Department> = {
  'informatique': {
    slug: 'informatique',
    name: 'Informatique',
    faculty: 'Sciences & Techniques (FST)',
    description: "Le département d'Informatique forme des cadres supérieurs capables de concevoir, développer et maintenir des systèmes d'information complexes et des infrastructures réseaux.",
    history: "Créé au milieu des années 2000, ce département a évolué pour intégrer les dernières avancées technologiques, passant d'une formation généraliste à des spécialisations en Génie Logiciel et Cybersécurité.",
    missions: [
      "Former des professionnels du développement logiciel moderne.",
      "Assurer la maîtrise des infrastructures réseaux et de la sécurité informatique.",
      "Promouvoir l'innovation numérique en Moyenne Guinée.",
      "Préparer les étudiants aux certifications internationales (Cisco, Microsoft, etc.)."
    ],
    head: 'Abdoulaye Sow',
    programDirector: 'Mme. Mariama Sow',
    degrees: ['Licence en Génie Logiciel', 'Licence en Systèmes et Réseaux', 'Master en Informatique Appliquée'],
    subjects: ['Algorithmique Avancée', 'Programmation (Java, Python, C++)', 'Bases de Données (SQL & NoSQL)', 'Architecture des Ordinateurs', 'Génie Logiciel', 'Sécurité Informatique'],
    tools: ['VS Code', 'Git/GitHub', 'Docker', 'React', 'Node.js', 'PostgreSQL', 'Cisco Packet Tracer'],
    careerPaths: ['Développeur Full-stack', 'Administrateur de Bases de Données', 'Ingénieur Réseaux', 'Expert en Cybersécurité', 'Architecte Logiciel'],
    admissionConditions: 'Baccalauréat en Sciences Mathématiques ou Expérimentales avec une mention.',
    admissionThresholds: 'Moyenne générale minimale de 12.5/20 au Baccalauréat.',
    acquiredSkills: [
      "Conception et développement d'applications web et mobiles.",
      "Administration et sécurisation des réseaux d'entreprise.",
      "Modélisation de bases de données complexes.",
      "Gestion de projets informatiques en mode Agile."
    ],
    advantages: [
      "Forte demande sur le marché de l'emploi national et international.",
      "Possibilité de travailler en freelance dès la licence.",
      "Environnement d'apprentissage dynamique avec accès au laboratoire informatique."
    ],
    difficulties: [
      "Charge de travail importante nécessitant beaucoup d'autonomie.",
      "Évolution très rapide des technologies demandant une veille permanente.",
      "Niveau d'abstraction élevé demandant une bonne base en logique."
    ],
    successTips: [
      "Pratiquez le code tous les jours en dehors des cours.",
      "Apprenez l'anglais technique dès la première année.",
      "Participez aux clubs d'informatique et aux hackathons de l'université."
    ],
    idealProfile: "Étudiant curieux, passionné par les nouvelles technologies, ayant un esprit logique développé et n'ayant pas peur de passer des heures à résoudre des problèmes complexes.",
    exampleProject: {
      title: "Système de Gestion de Scolarité",
      description: "Un projet de 2ème année consistant à créer une application web complète (React/Node.js) pour gérer les inscriptions et les notes des étudiants."
    },
    aiAdvice: "Concentrez-vous sur vos bases en mathématiques, elles seront le socle de votre réussite dans ce département.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fst/informatique"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SM', 'SE'],
      minAverage: 12.5
    },
    subjectWeights: [
      { name: 'Mathématiques', coefficient: 5 },
      { name: 'Physique', coefficient: 4 },
      { name: 'Anglais', coefficient: 3 },
      { name: 'Français', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'Laptop'
  },
  'miage': {
    slug: 'miage',
    name: 'MIAGE',
    faculty: 'Sciences & Techniques (FST)',
    description: "La filière MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises) est une formation d'excellence combinant les sciences de l'informatique et les techniques de gestion.",
    history: "Inspirée du modèle français, la MIAGE de Labé collabore étroitement avec les entreprises guinéennes pour fournir des cadres capables de faire le pont entre la technologie et le business.",
    missions: [
      "Former des cadres double-compétents en informatique et gestion.",
      "Enseigner la modélisation des processus métiers.",
      "Développer des solutions logicielles adaptées aux besoins des entreprises.",
      "Former à l'audit et au conseil en systèmes d'information."
    ],
    head: 'Abdoulaye DRAME',
    programDirector: 'Dr. Fatoumata Sylla',
    degrees: ['Licence MIAGE', 'Master MIAGE (Spécialité Management des SI)'],
    subjects: ['Analyse de Gestion', 'Systèmes d\'Information', 'Comptabilité Générale', 'Programmation Orientée Objet', 'Statistiques Décisionnelles', 'Droit de l\'Informatique'],
    tools: ['SAP', 'Odoo', 'Excel Avancé', 'Power BI', 'Visio', 'SQL Server'],
    careerPaths: ['Consultant en Systèmes d\'Information', 'Chef de Projet IT', 'Analyste Business', 'Responsable de la Transformation Digitale'],
    admissionConditions: 'Baccalauréat en Sciences Mathématiques ou Sciences Sociales (avec un excellent niveau en mathématiques).',
    admissionThresholds: 'Moyenne générale minimale de 13/20.',
    acquiredSkills: [
      "Pilotage de projets informatiques complexes.",
      "Maîtrise des outils d'aide à la décision (BI).",
      "Compréhension approfondie des mécanismes financiers de l'entreprise.",
      "Conception de logiciels de gestion sur mesure."
    ],
    advantages: [
      "Profil hybride très recherché par les banques et les opérateurs de télécoms.",
      "Salaire moyen à l'embauche supérieur à la moyenne.",
      "Formation polyvalente ouvrant de nombreuses portes."
    ],
    difficulties: [
      "Équilibre délicat à trouver entre les matières techniques et de gestion.",
      "Exigence de rigueur tant en mathématiques qu'en comptabilité.",
      "Besoin de fortes compétences en communication."
    ],
    successTips: [
      "Ne délaissez aucune matière : la double compétence est votre force.",
      "Cherchez des stages dans le secteur bancaire ou industriel très tôt.",
      "Développez vos 'soft skills' (travail en équipe, prise de parole)."
    ],
    idealProfile: "Étudiant organisé et polyvalent, aimant la technologie mais souhaitant comprendre comment elle sert les objectifs financiers et stratégiques d'une organisation.",
    aiAdvice: "La MIAGE demande une grande capacité d'adaptation. Préparez-vous à jongler entre le code et la comptabilité avec la même rigueur.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fst/miage"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SM', 'SE', 'SS'],
      minAverage: 13.0
    },
    subjectWeights: [
      { name: 'Mathématiques', coefficient: 4 },
      { name: 'Gestion/Comptabilité', coefficient: 4 },
      { name: 'Informatique', coefficient: 3 },
      { name: 'Français', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'BarChart'
  },
  'economie': {
    slug: 'economie',
    name: 'Économie',
    faculty: 'Sciences Administratives et de Gestion (FSAG)',
    description: "Le département d'Économie offre une formation solide dans l'analyse des mécanismes économiques, financiers et sociaux à l'échelle nationale et internationale.",
    history: "L'un des plus anciens départements de la FSAG, il a formé de nombreux cadres travaillant aujourd'hui dans l'administration publique guinéenne et les institutions internationales.",
    missions: [
      "Enseigner les fondamentaux de la macroéconomie et microéconomie.",
      "Former à l'analyse quantitative et statistique des données économiques.",
      "Sensibiliser aux enjeux économiques de l'Afrique de l'Ouest.",
      "Développer l'esprit critique sur les politiques de développement."
    ],
    head: 'Mamadou Oury Daka Diallo',
    programDirector: 'M. Abdoulaye Camara',
    degrees: ['Licence en Économie Appliquée', 'Licence en Économie du Développement', 'Master en Finance et Contrôle'],
    subjects: ['Microéconomie', 'Macroéconomie', 'Économétrie', 'Histoire de la Pensée Économique', 'Finance Publique', 'Mathématiques pour Économistes'],
    tools: ['Stata', 'R', 'EViews', 'Excel Statistical Toolset', 'SPSS'],
    careerPaths: ['Chargé d\'Études Économiques', 'Analyste Financier', 'Consultant en Développement', 'Statisticien-Économiste'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Capacité à modéliser des phénomènes économiques.",
      "Analyse de données statistiques pour la prise de décision.",
      "Rédaction de rapports de synthèse sur les politiques publiques.",
      "Compréhension des marchés financiers mondiaux."
    ],
    advantages: [
      "Compréhension globale du monde et de ses enjeux.",
      "Débouchés variés dans le public comme dans le privé.",
      "Passerelle vers de prestigieuses écoles de commerce ou d'administration."
    ],
    difficulties: [
      "Niveau exigé en mathématiques et statistiques assez élevé.",
      "Nécessite beaucoup de lecture et une grande curiosité d'actualité.",
      "Marché du travail concurrentiel pour les profils juniors."
    ],
    successTips: [
      "Suivez l'actualité économique internationale quotidiennement.",
      "Maîtrisez les outils informatiques d'analyse de données dès le départ.",
      "Ne négligez pas les mathématiques, elles sont essentielles en économie."
    ],
    idealProfile: "Étudiant doté d'un bon esprit de synthèse, aimant les chiffres et s'intéressant vivement à la manière dont la société s'organise pour produire et répartir les richesses.",
    aiAdvice: "L'économie n'est pas que des chiffres, c'est une science sociale. Lisez beaucoup pour forger votre propre opinion critique.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fsag/economie"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS', 'SM'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Mathématiques', coefficient: 4 },
      { name: 'Économie', coefficient: 5 },
      { name: 'Français', coefficient: 3 },
      { name: 'Histoire/Géo', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'TrendingUp'
  },
  'sociologie': {
    slug: 'sociologie',
    name: 'Sociologie & Anthropologie',
    faculty: 'Lettres et Sciences Humaines (FLSH)',
    description: "Étude scientifique des sociétés humaines, des interactions sociales et des cultures, avec un focus particulier sur les réalités guinéennes en transition.",
    history: "Ce département a été renforcé ces dernières années pour mieux accompagner les projets de développement communautaire et les mutations sociales liées à l'urbanisation en Guinée.",
    missions: [
      "Former des analystes des phénomènes sociaux contemporains.",
      "Initier à la recherche qualitative (enquêtes de terrain, entretiens).",
      "Éclairer les décideurs sur les impacts sociaux des projets de développement.",
      "Promouvoir la compréhension interculturelle."
    ],
    head: 'Dr. Kadiatou Diallo',
    programDirector: 'Pr. Moussa Camara',
    degrees: ['Licence en Sociologie', 'Licence en Anthropologie de la Santé'],
    subjects: ['Théories Sociologiques', 'Anthropologie Culturelle', 'Méthodologie de la Recherche', 'Sociologie du Développement', 'Psychologie Sociale', 'Démographie'],
    tools: ['NVivo', 'Qualtrics', 'Outils de cartographie sociale', 'Logiciels de traitement d\'enquête'],
    careerPaths: ['Chargé de Projets Sociaux dans les ONG', 'Consultant en Impact Social', 'Conseiller d\'Orientation', 'Chargé de Communication Sociale', 'Responsable RH'],
    admissionConditions: 'Baccalauréat en Sciences Sociales (prioritaire) ou Lettres.',
    admissionThresholds: 'Moyenne générale minimale de 11.5/20.',
    acquiredSkills: [
      "Conduite d'enquêtes sociologiques complètes.",
      "Analyse critique des discours et des comportements sociaux.",
      "Médiation sociale et résolution de conflits communautaires.",
      "Élaboration de diagnostics territoriaux."
    ],
    advantages: [
      "Formation riche humainement et intellectuellement.",
      "Utilité directe pour les projets de développement en Guinée.",
      "Développement d'une grande empathie et capacité d'adaptation."
    ],
    difficulties: [
      "Nécessite beaucoup de lecture d'ouvrages théoriques denses.",
      "Insertion professionnelle parfois plus lente que dans les filières techniques.",
      "Charge psychologique liée aux enquêtes de terrain en milieu difficile."
    ],
    successTips: [
      "Lisez au moins un ouvrage sociologique majeur par mois.",
      "Développez vos compétences en rédaction et en argumentation.",
      "Faites des stages d'observation dans des associations ou ONG locales."
    ],
    idealProfile: "Étudiant observateur, doté d'une grande écoute, curieux des coutumes et des structures sociales, et souhaitant œuvrer pour le progrès social.",
    aiAdvice: "La sociologie exige une remise en question de ses propres préjugés. Soyez prêt à voir le monde sous un angle totalement nouveau.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/flsh/sociologie"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS'],
      minAverage: 11.5
    },
    subjectWeights: [
      { name: 'Français', coefficient: 5 },
      { name: 'Philosophie', coefficient: 4 },
      { name: 'Histoire/Géo', coefficient: 3 },
      { name: 'Anglais', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'Users'
  },
  'administration-publique': {
    slug: 'administration-publique',
    name: 'Administration Publique',
    faculty: 'Sciences Administratives et de Gestion (FSAG)',
    description: "Formation dédiée à la gestion des institutions de l'État, des collectivités locales et des services publics.",
    history: "Pilier de la formation des fonctionnaires à Labé, ce département s'adapte aujourd'hui à la décentralisation et à la modernisation de l'État guinéen.",
    missions: [
      "Former les futurs cadres de l'administration territoriale.",
      "Apprendre les rouages du droit administratif et de la gestion publique.",
      "Former à la gestion de projet dans le secteur public.",
      "Promouvoir l'éthique et la transparence administrative."
    ],
    head: 'Bakary Diomandé',
    programDirector: 'Mme. Aissatou Diallo',
    degrees: ['Licence en Administration Publique', 'Licence en Gouvernance Locale'],
    subjects: ['Droit Administratif', 'Gestion des Collectivités Locales', 'Comptabilité Publique', 'Science Politique', 'Management Public', 'Économie Publique'],
    tools: ['Logiciels de gestion budgétaire', 'Portails administratifs e-Gouv', 'Microsoft Office Pro'],
    careerPaths: ['Secrétaire Général de Commune', 'Gestionnaire de Service Public', 'Attaché d\'Administration', 'Consultant en Décentralisation'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Sciences Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Maîtrise des procédures administratives légales.",
      "Gestion de budgets publics et marchés publics.",
      "Rédaction d'actes administratifs officiels.",
      "Animation de réunions publiques et démocratie locale."
    ],
    advantages: [
      "Métiers au cœur du développement du pays.",
      "Sécurité de l'emploi (Concours de la fonction publique).",
      "Possibilité de travailler dans tout le pays."
    ],
    difficulties: [
      "Rigueur juridique absolue demandée.",
      "Contraintes administratives et bureaucratie parfois lourdes.",
      "Nécessité de maîtriser parfaitement la langue française officielle."
    ],
    successTips: [
      "Suivez les réformes administratives en cours en Guinée.",
      "Cultivez une intégrité morale irréprochable.",
      "Apprenez le fonctionnement des collectivités décentralisées."
    ],
    idealProfile: "Étudiant rigoureux, ayant le sens du service public, aimant le droit et l'organisation, et souhaitant contribuer à l'efficacité de l'État.",
    aiAdvice: "L'administration est la colonne vertébrale du pays. Votre sens de l'éthique sera votre plus grand atout durant vos études.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fsag/administration"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS', 'SM'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Français', coefficient: 4 },
      { name: 'Droit', coefficient: 5 },
      { name: 'Histoire/Géo', coefficient: 3 },
      { name: 'Anglais', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'Building2'
  },
  'gestion': {
    slug: 'gestion',
    name: 'Gestion',
    faculty: 'Sciences Administratives et de Gestion (FSAG)',
    description: "Le département de Gestion prépare les futurs managers aux techniques de direction, de comptabilité, de marketing et de ressources humaines.",
    history: "Ce département a été créé pour accompagner l'essor du secteur privé en Guinée, en fournissant des cadres capables de gérer des PME comme des grandes entreprises.",
    missions: [
      "Enseigner les techniques de management moderne.",
      "Maîtriser les outils de comptabilité et de finance d'entreprise.",
      "Former au marketing et à la stratégie commerciale.",
      "Développer les compétences en gestion des ressources humaines."
    ],
    head: 'Mamadou PETHE BALDE',
    programDirector: 'M. Lansana Camara',
    degrees: ['Licence en Gestion des Entreprises', 'Licence en Comptabilité-Gestion', 'Master en Management des Organisations'],
    subjects: ['Comptabilité Générale', 'Marketing Fondamental', 'Gestion des RH', 'Droit des Affaires', 'Stratégie de l\'Entreprise', 'Fiscalité'],
    tools: ['Sage Compta', 'Excel Finance', 'Outils de CRM', 'Logiciels de Paie'],
    careerPaths: ['Gestionnaire d\'Entreprise', 'Comptable', 'Responsable Marketing', 'Chef de Produit', 'Directeur des Ressources Humaines'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Élaboration et suivi de budgets prévisionnels.",
      "Mise en place de stratégies marketing efficaces.",
      "Gestion administrative et juridique du personnel.",
      "Analyse de la performance financière d'une organisation."
    ],
    advantages: [
      "Polyvalence extrême sur le marché du travail.",
      "Possibilité de créer et gérer sa propre entreprise.",
      "Accès à de nombreux postes d'encadrement."
    ],
    difficulties: [
      "Demande une grande rigueur dans le traitement des chiffres.",
      "Nigveau de stress parfois élevé lié aux responsabilités.",
      "Nécessite de très bonnes capacités relationnelles."
    ],
    successTips: [
      "Soyez attentifs aux évolutions du marché guinéen.",
      "Développez votre réseau professionnel dès vos premiers stages.",
      "Maîtrisez les outils informatiques de gestion, ils sont indispensables."
    ],
    idealProfile: "Étudiant ayant un esprit entrepreneur, aimant l'organisation et le contact humain, et doté d'un bon sens de l'analyse.",
    aiAdvice: "Le management s'apprend aussi par l'observation. Regardez comment fonctionnent les entreprises locales lors de vos temps libres.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fsag/gestion"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SM', 'SS'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Mathématiques', coefficient: 4 },
      { name: 'Gestion', coefficient: 5 },
      { name: 'Comptabilité', coefficient: 4 },
      { name: 'Français', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'BarChart'
  },
  'mathematiques-appliquees': {
    slug: 'mathematiques-appliquees',
    name: 'Mathématiques Appliquées',
    faculty: 'Sciences & Techniques (FST)',
    description: "Le département de Mathématiques Appliquées forme des spécialistes de la modélisation mathématique, du calcul scientifique et de l'analyse de données pour résoudre des problèmes concrets.",
    history: "Fondé pour répondre aux besoins croissants de rigueur analytique dans les secteurs techniques et financiers de la Guinée.",
    missions: [
      "Former des mathématiciens capables d'appliquer leurs connaissances aux problèmes industriels.",
      "Enseigner les outils modernes du calcul numérique et de la simulation.",
      "Développer des compétences en analyse statistique pour la recherche et l'économie.",
      "Préparer les étudiants à la recherche fondamentale et appliquée."
    ],
    head: 'Michel Kamano',
    programDirector: 'M. Saliou Diallo',
    degrees: ['Licence en Mathématiques Appliquées', 'Master en Modélisation Mathématique'],
    subjects: ['Analyse de Fourier', 'Équations Différentielles', 'Algèbre Linéaire', 'Probabilités & Statistiques', 'Optimisation Numérique', 'Théorie des Graphes'],
    tools: ['MATLAB', 'Maple', 'Python (NumPy, SciPy)', 'LaTeX', 'WolframAlpha'],
    careerPaths: ['Ingénieur Modélisateur', 'Analyste de Données', 'Enseignant-Chercheur', 'Statisticien Industrielle', 'Expert en Simulation'],
    admissionConditions: 'Baccalauréat en Sciences Mathématiques avec une note excellente en Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 13/20.',
    acquiredSkills: [
      "Capacité à traduire un problème réel en modèle mathématique.",
      "Maîtrise des algorithmes de résolution numérique.",
      "Analyse rigoureuse de vastes ensembles de données statistiques.",
      "Développement de solutions d'optimisation pour la logistique et l'industrie."
    ],
    advantages: [
      "Base solide ouvrant de nombreuses portes dans le numérique et la finance.",
      "Rareté du profil, garantissant une employabilité élevée.",
      "Base indispensable pour l'intelligence artificielle avancée."
    ],
    difficulties: [
      "Niveau d'abstraction et de rigueur mentale très exigeant.",
      "Charge de travail importante en résolution d'exercices et projets.",
      "Nécessite de fortes prédispositions logiques."
    ],
    successTips: [
      "Résolvez des problèmes mathématiques quotidiennement.",
      "Maîtrisez les outils de calcul informatique dès la 1ère année.",
      "Cultivez votre curiosité pour les applications réelles des mathématiques."
    ],
    idealProfile: "Étudiant rigoureux, doté d'une grande persévérance, passionné par la logique et souhaitant comprendre les lois fondamentales qui régissent les systèmes.",
    aiAdvice: "Les mathématiques sont le langage universel de la technologie. Maîtrisez ce langage et vous serez indispensable.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fst/maths"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SM'],
      minAverage: 13.0
    },
    subjectWeights: [
      { name: 'Mathématiques', coefficient: 6 },
      { name: 'Physique', coefficient: 4 },
      { name: 'Français', coefficient: 2 },
      { name: 'Anglais', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'Target'
  },
  'biologie': {
    slug: 'biologie',
    name: 'Biologie & Environnement',
    faculty: 'Sciences & Techniques (FST)',
    description: "Le département de Biologie & Environnement se consacre à l'étude du vivant, de la biodiversité et de la protection des écosystèmes, avec un focus sur les défis environnementaux de la Moyenne Guinée.",
    history: "Créé pour répondre aux enjeux de conservation de la nature et de santé publique dans la région de Labé.",
    missions: [
      "Former des biologistes qualifiés en analyse de laboratoire et de terrain.",
      "Promouvoir la protection de l'environnement et de la biodiversité locale.",
      "Enseigner les techniques modernes de microbiologie et de génétique.",
      "Collaborer avec les institutions de santé et de protection environnementale."
    ],
    head: 'Aboubacar DIAKITE',
    programDirector: 'M. Alpha Oumar Diallo',
    degrees: ['Licence en Biologie Appliquée', 'Licence en Environnement & Développement Durable'],
    subjects: ['Biologie Moléculaire', 'Écologie & Biodiversité', 'Microbiologie', 'Biochimie', 'Botanique & Zoologie', 'Impact Environnemental'],
    tools: ['Microscope Photonique', 'Kits d\'analyse d\'eau', 'Logiciels SIG', 'Bases de données biologiques'],
    careerPaths: ['Technicien de Laboratoire', 'Chargé d\'Études Environnementales', 'Expert en Biodiversité', 'Consultant en Développement Durable'],
    admissionConditions: 'Baccalauréat en Sciences Expérimentales ou Sciences Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Maîtrise des protocoles d'analyse biologique en laboratoire.",
      "Évaluation des impacts environnementaux des activités humaines.",
      "Inventaire et suivi de la biodiversité terrestre et aquatique.",
      "Gestion durable des ressources naturelles régionales."
    ],
    advantages: [
      "Secteur d'avenir face au changement climatique.",
      "Polyvalence entre les sciences de la vie et de la terre.",
      "Possibilité d'agir directement sur la protection de l'environnement local."
    ],
    difficulties: [
      "Beaucoup de temps de travail sur le terrain et en laboratoire.",
      "Mémorisation importante de concepts scientifiques et latins.",
      "Nécessite de la patience et de la précision dans les observations."
    ],
    successTips: [
      "Soyez assidus aux travaux pratiques en laboratoire.",
      "Suivez les problématiques de biodiversité en Guinée.",
      "Apprenez à utiliser les outils de cartographie (SIG)."
    ],
    idealProfile: "Étudiant passionné par la nature, curieux des mécanismes de la vie, ayant un sens aigu de l'observation et un engagement pour l'environnement.",
    aiAdvice: "La biologie moderne est de plus en plus liée à la donnée. Apprenez aussi à aimer les statistiques biologiques.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fst/biologie"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SE', 'SM'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Biologie', coefficient: 5 },
      { name: 'Chimie/Physique', coefficient: 4 },
      { name: 'Mathématiques', coefficient: 3 },
      { name: 'Français', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'Users'
  },
  'energie-photovoltaique': {
    slug: 'energie-photovoltaique',
    name: 'Énergie Photovoltaïque',
    faculty: 'Sciences & Techniques (FST)',
    description: "Le département d'Énergie Photovoltaïque forme des experts en systèmes d'énergie solaire, capables de concevoir, installer et maintenir des solutions énergétiques durables.",
    history: "Un département pionnier en Guinée pour soutenir la transition énergétique nationale via le potentiel solaire exceptionnel du pays.",
    missions: [
      "Former des techniciens et ingénieurs spécialisés en énergie solaire.",
      "Enseigner les technologies photovoltaïques et le stockage d'énergie.",
      "Réaliser des diagnostics énergétiques pour les bâtiments et l'industrie.",
      "Promouvoir l'accès à l'énergie propre en milieu rural."
    ],
    head: 'Mamadou Pathe Barry',
    programDirector: 'Dr. Ibrahima Diallo',
    degrees: ['Licence Professionnelle en Énergie Solaire', 'Licence en Électricité & Photovoltaïque'],
    subjects: ['Théorie des Semiconducteurs', 'Conception de Centrales Solaires', 'Stockage d\'Énergie (Batteries)', 'Maintenance Photovoltaïque', 'Électrotechnique Appliquée', 'Économie de l\'Énergie'],
    tools: ['PVsyst', 'HOMER Pro', 'Multimètres & Testeurs Solaires', 'AutoCAD Electrical'],
    careerPaths: ['Installateur de Systèmes Solaires', 'Ingénieur de Maintenance PV', 'Consultant en Énergie Solaire', 'Responsable de Projet Solaire'],
    admissionConditions: 'Baccalauréat en Sciences Mathématiques ou Sciences Expérimentales.',
    admissionThresholds: 'Moyenne générale minimale de 12.5/20.',
    acquiredSkills: [
      "Dimensionnement complet de systèmes solaires autonomes ou liés au réseau.",
      "Installation et mise en service de parcs photovoltaïques.",
      "Maintenance préventive et curative des installations solaires.",
      "Audit énergétique et optimisation de la consommation électrique."
    ],
    advantages: [
      "Domaine d'excellence avec une demande massive en Guinée.",
      "Participation active à la résolution d'une crise nationale (l'électricité).",
      "Opportunités d'entreprenariat très élevées."
    ],
    difficulties: [
      "Nécessite de fortes bases en physique et électricité.",
      "Travail physique parfois exigeant (installation en toiture ou champ).",
      "Évolution rapide des technologies réclamant une mise à jour constante."
    ],
    successTips: [
      "Pratiquez le montage des circuits électriques dès que possible.",
      "Apprenez les logiciels de simulation spécialisés comme PVsyst.",
      "Suivez les innovations en stockage d'énergie et onduleurs."
    ],
    idealProfile: "Étudiant pratique, à l'aise avec la technique et la physique, souhaitant avoir un impact direct sur le développement énergétique de son pays.",
    aiAdvice: "Le soleil est l'avenir de l'énergie en Guinée. En choisissant cette filière, vous devenez un acteur du futur.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fst/energie"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SM', 'SE'],
      minAverage: 12.5
    },
    subjectWeights: [
      { name: 'Physique/Électricité', coefficient: 5 },
      { name: 'Mathématiques', coefficient: 4 },
      { name: 'Français', coefficient: 2 },
      { name: 'Anglais', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'Sparkles'
  },
  'economie-sociale': {
    slug: 'economie-sociale',
    name: 'Économie Sociale et Solidaire',
    faculty: 'Sciences Administratives et de Gestion (FSAG)',
    description: "Le département d'Économie Sociale et Solidaire forme des cadres capables de gérer des structures à but non lucratif, des coopératives et des entreprises engagées socialement.",
    history: "Département créé pour valoriser les initiatives économiques communautaires très fortes dans la région du Fouta-Djallon.",
    missions: [
      "Former au management des entreprises sociales et solidaires.",
      "Enseigner les mécanismes du microcrédit et du développement local.",
      "Accompagner la structuration des coopératives agricoles et artisanales.",
      "Promouvoir une économie centrée sur l'humain et le territoire."
    ],
    head: 'Mamady KANTE',
    programDirector: 'M. Cherif Haidara',
    degrees: ['Licence en Économie Sociale et Solidaire', 'Licence en Gestion des Projets de Développement'],
    subjects: ['Gouvernance Coopérative', 'Économie Solidaire', 'Gestion de Projets d\'ONG', 'Microfinance', 'Sociologie des Organisations', 'Éthique Économique'],
    tools: ['Outils de gestion de projet (Trello, Slack)', 'Logiciels de microfinance', 'Méthodes d\'animation communautaire'],
    careerPaths: ['Coordonnateur de Projets d\'ONG', 'Gérant de Coopérative', 'Responsable de Microfinance', 'Expert en Développement Communautaire'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Sciences Mathématiques.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Capacité à structurer et gérer des organisations sociales.",
      "Montage et suivi de dossiers de financement pour le développement.",
      "Mise en place de systèmes de crédit communautaires.",
      "Médiation entre les acteurs économiques locaux."
    ],
    advantages: [
      "Proximité directe avec les réalités du terrain et du développement.",
      "Forte demande de la part des ONG et des organismes internationaux.",
      "Métier porteur de sens et de valeurs humaines."
    ],
    difficulties: [
      "Nécessite une grande polyvalence (gestion, social, droit).",
      "Environnement de travail souvent rural ou de terrain.",
      "Gestion de la complexité humaine et communautaire."
    ],
    successTips: [
      "Engagez-vous dans des associations dès vos études.",
      "Apprenez les techniques de facilitation et de communication.",
      "Développez votre capacité d'analyse des besoins locaux."
    ],
    idealProfile: "Étudiant ayant un fort sens social, des capacités d'organisation et souhaitant mettre l'économie au service de l'amélioration des conditions de vie.",
    aiAdvice: "L'économie sociale est la clé d'un développement durable en Guinée. Votre rôle sera de transformer les initiatives locales en succès durables.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/fsag/ess"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS', 'SM'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Économie', coefficient: 4 },
      { name: 'Français', coefficient: 4 },
      { name: 'Histoire/Géo', coefficient: 3 },
      { name: 'Philosophie', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'TrendingUp'
  },
  'anglais': {
    slug: 'anglais',
    name: 'Langue Anglaise',
    faculty: 'Lettres et Sciences Humaines (FLSH)',
    description: "Le département de Langue Anglaise offre une formation complète en linguistique, littérature et civilisation anglo-saxonne pour une maîtrise professionnelle de la langue de communication mondiale.",
    history: "Un département historique accompagnant l'ouverture de la Guinée sur le monde anglophone et regional.",
    missions: [
      "Assurer une maîtrise parfaite de l'anglais écrit et oral.",
      "Former des traducteurs et interprètes qualifiés.",
      "Enseigner la littérature et les cultures du monde anglophone.",
      "Préparer les étudiants aux tests internationaux (TOEFL, IELTS)."
    ],
    head: 'M. Ibrahima Sory Diallo',
    programDirector: 'Mme. Barry Mariama',
    degrees: ['Licence en Langue & Littérature Anglaise', 'Licence en Anglais Appliqué'],
    subjects: ['Phonétique & Phonologie', 'Littérature Britannique & Américaine', 'Grammaire Avancée', 'Traduction & Interprétation', 'Business English', 'Civilisation Américaine'],
    tools: ['Laboratoires de langues numériques', 'Bases de données littéraires', 'Logiciels de traduction assistée'],
    careerPaths: ['Traducteur/Interprète', 'Enseignant d\'Anglais', 'Négociateur International', 'Chargé de Communication Bilingue'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Lettres avec une excellente note en Anglais.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Communication fluide et professionnelle en anglais.",
      "Traduction de documents techniques, littéraires et administratifs.",
      "Analyse critique d'œuvres littéraires et culturelles.",
      "Maîtrise des contextes socioculturels anglophones."
    ],
    advantages: [
      "Compétence universelle ouvrant des portes dans tous les secteurs.",
      "Possibilité de travailler dans les organisations internationales.",
      "Secteur en forte croissance (cours d'anglais en entreprise)."
    ],
    difficulties: [
      "Nécessite une immersion constante (lecture, écoute).",
      "Apprentissage des nuances culturelles et idiomatiques complexes.",
      "Exigence de perfection dans la prononciation et la grammaire."
    ],
    successTips: [
      "Regardez des films et écoutez des podcasts en anglais chaque jour.",
      "Rejoignez les 'English Clubs' de l'université.",
      "Lisez des journaux internationaux comme The Guardian ou The New York Times."
    ],
    idealProfile: "Étudiant curieux des autres cultures, aimant la lecture et la communication, et souhaitant devenir un pont entre les langues.",
    aiAdvice: "L'anglais est votre passeport pour le monde. Ne l'apprenez pas seulement comme une matière, mais comme un style de vie.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/flsh/anglais"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Anglais', coefficient: 6 },
      { name: 'Français', coefficient: 4 },
      { name: 'Philo', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'Globe'
  },
  'arabe': {
    slug: 'arabe',
    name: 'Langue Arabe',
    faculty: 'Lettres et Sciences Humaines (FLSH)',
    description: "Le département de Langue Arabe propose une formation académique rigoureuse sur la langue, la littérature et la civilisation du monde arabo-musulman.",
    history: "Un département précieux valorisant les liens historiques, culturels et religieux profonds entre la Guinée et le monde arabe.",
    missions: [
      "Maîtrise de la langue arabe littéraire (Fusha).",
      "Étude des textes classiques et modernes de la littérature arabe.",
      "Formation à la traduction arabe-français.",
      "Compréhension des enjeux géopolitiques contemporains du monde arabe."
    ],
    head: 'Cherif Haidara',
    programDirector: 'M. Aliou Diallo',
    degrees: ['Licence en Langue & Civilisation Arabe'],
    subjects: ['Morphologie & Syntaxe (Nahu & Sarf)', 'Littérature Arabe Classique', 'Rhétorique Arabe (Balagha)', 'Traduction Arabophone', 'Histoire du Monde Arabe', 'Civilisation Islamique'],
    tools: ['Manuscrits numérisés', 'Méthodes audio-visuelles d\'apprentissage', 'Dictionnaires spécialisés'],
    careerPaths: ['Traducteur/Interprète Arabe-Français', 'Enseignant de Langue Arabe', 'Conseiller Culturel', 'Expert en Relations Guinéo-Arabes'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Lettres avec une excellente note en Arabe.',
    admissionThresholds: 'Moyenne générale minimale de 12/20.',
    acquiredSkills: [
      "Lecture, écriture et conversation courante en arabe littéraire.",
      "Analyse approfondie de textes littéraires et historiques.",
      "Capacité à effectuer des traductions documentaires précises.",
      "Connaissance des dynamiques socioculturelles du monde arabo-musulman."
    ],
    advantages: [
      "Compétence rare et très valorisée dans la diplomatie et le commerce.",
      "Lien direct avec le patrimoine culturel et religieux national.",
      "Ouverture sur des bourses d'études internationales."
    ],
    difficulties: [
      "Système d'écriture et grammaire radicalement différents du français.",
      "Richesse lexicale immense demandant une grande assiduité.",
      "Nécessite beaucoup de temps pour atteindre une fluidité professionnelle."
    ],
    successTips: [
      "Pratiquez l'expression orale avec des partenaires d'échange.",
      "Utilisez des applications mobiles pour réviser le vocabulaire.",
      "Lisez des extraits de la littérature arabe chaque jour."
    ],
    idealProfile: "Étudiant patient et méticuleux, aimant les langues à forte complexité et souhaitant approfondir sa connaissance d'une civilisation millénaire.",
    aiAdvice: "L'arabe est une langue de poésie et de science. Sa beauté se révèle à ceux qui sont persévérants.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/flsh/arabe"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS'],
      minAverage: 12.0
    },
    subjectWeights: [
      { name: 'Arabe', coefficient: 6 },
      { name: 'Français', coefficient: 3 },
      { name: 'Histoire', coefficient: 3 }
    ],
    isCertified: true,
    icon: 'Globe'
  },
  'lettres-modernes': {
    slug: 'lettres-modernes',
    name: 'Lettres Modernes',
    faculty: 'Lettres et Sciences Humaines (FLSH)',
    description: "Le département de Lettres Modernes forme des spécialistes de la langue française, de la littérature francophone et des techniques rédactionnelles.",
    history: "Socle de la culture classique à l'université, ce département s'ouvre aujourd'hui aux métiers de l'édition et de la communication digitale.",
    missions: [
      "Maîtrise approfondie de la langue française et de ses subtilités.",
      "Étude des grands courants littéraires européens et africains.",
      "Formation aux techniques d'écriture créative et professionnelle.",
      "Promotion de la francophonie et de la diversité culturelle."
    ],
    head: 'Mme. Mariame Camara',
    programDirector: 'M. Thierno Ousmane Bah',
    degrees: ['Licence en Lettres Modernes', 'Licence en Communication & Journalisme'],
    subjects: ['Histoire Littéraire', 'Linguistique Française', 'Analyse Textuelle', 'Littérature Africaine Francophone', 'Critique Littéraire', 'Techniques d\'Expression'],
    tools: ['Logiciels de correction orthographique', 'Plateformes de blogging', 'Bibliothèques numériques (Gallica, etc.)'],
    careerPaths: ['Journaliste', 'Correcteur/Éditeur', 'Rédacteur Web', 'Enseignant de Français', 'Responsable de Communication'],
    admissionConditions: 'Baccalauréat en Sciences Sociales ou Lettres.',
    admissionThresholds: 'Moyenne générale minimale de 11.5/20.',
    acquiredSkills: [
      "Excellence rédactionnelle dans tous les styles.",
      "Capacité d'analyse et de synthèse de textes complexes.",
      "Maîtrise des codes de la communication écrite et orale.",
      "Élaboration de critiques littéraires et de dossiers de presse."
    ],
    advantages: [
      "Formation ouvrant sur tous les métiers de l'écrit.",
      "Base solide pour les concours administratifs.",
      "Développement d'une grande culture générale."
    ],
    difficulties: [
      "Exigence de perfection dans la langue (orthographe, style).",
      "Charge de lecture très importante.",
      "Nécessite une grande finesse d'analyse."
    ],
    successTips: [
      "Lisez tous les genres littéraires (roman, théâtre, poésie).",
      "Écrivez régulièrement, que ce soit un journal ou un blog.",
      "Participez aux ateliers d'écriture de votre département."
    ],
    idealProfile: "Étudiant amoureux des mots, passionné par la lecture, doté d'un bon esprit critique et souhaitant maîtriser l'art de l'expression.",
    aiAdvice: "Les lettres sont les fondations de la pensée. Maîtrisez le style et vous pourrez convaincre n'importe quel auditoire.",
    contacts: {
      email: "contact@univ-labe.edu.gn",
      phone: "(+224) 629 00 58 07",
      website: "https://univ-labe.edu.gn/flsh/lettres"
    },
    location: "Campus de Hafia, Labé, Guinée",
    admissionCriteria: {
      bacSeries: ['SS'],
      minAverage: 11.5
    },
    subjectWeights: [
      { name: 'Français', coefficient: 6 },
      { name: 'Philosophie', coefficient: 4 },
      { name: 'Anglais', coefficient: 2 }
    ],
    isCertified: true,
    icon: 'FileText'
  }
}
