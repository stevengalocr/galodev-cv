import type { Locale } from "./config";

export interface Dict {
  nav: { work: string; about: string; contact: string };
  cta: {
    viewWork: string;
    getInTouch: string;
    viewLiveDemo: string;
    visitSite: string;
    caseStudy: string;
    downloadCv: string;
    nextProject: string;
    backHome: string;
    sendMessage: string;
    sending: string;
  };
  home: {
    role: string;
    heroOrigin: string;
    heroLead: string;
    stackEyebrow: string;
    skillsEyebrow: string;
    skillsTitle: string;
    skillsLead: string;
    workEyebrow: string;
    workTitle: string;
    workLead: string;
    logEyebrow: string;
    logTitle: string;
    logLead: string;
    logMore: string;
    logLess: string;
    logPrivateTitle: string;
    logPrivateBody: string;
    aboutEyebrow: string;
    contactTitle: string;
    contactLead: string;
  };
  work: {
    problem: string;
    solution: string;
    architecture: string;
    challenges: string;
    challengesLead: string;
    security: string;
    result: string;
    stack: string;
    live: string;
  };
  about: {
    title: string;
    stackTitle: string;
    experienceTitle: string;
  };
  contact: {
    title: string;
    lead: string;
    name: string;
    email: string;
    message: string;
    success: string;
    error: string;
    or: string;
  };
  footer: { built: string; rights: string };
}

const es: Dict = {
  nav: { work: "Proyectos", about: "Sobre mí", contact: "Contacto" },
  cta: {
    viewWork: "Ver proyectos",
    getInTouch: "Hablemos",
    viewLiveDemo: "Ver demo en vivo",
    visitSite: "Visitar sitio",
    caseStudy: "Caso de estudio",
    downloadCv: "Descargar CV",
    nextProject: "Siguiente proyecto",
    backHome: "Volver al inicio",
    sendMessage: "Enviar mensaje",
    sending: "Enviando…",
  },
  home: {
    role: "Ingeniero full-stack",
    heroOrigin: "Desde Costa Rica al mundo.",
    heroLead:
      "Diseño y construyo productos SaaS de extremo a extremo: arquitectura, frontend, backend, base de datos y seguridad.",
    stackEyebrow: "Herramientas del día a día",
    skillsEyebrow: "El camino",
    skillsTitle: "Habilidades de Steven Galo",
    skillsLead:
      "Un recorrido por mi experiencia — y las habilidades que fui adquiriendo en el camino, de proyectos independientes a producción.",
    workEyebrow: "El sistema GaloDev",
    workTitle: "Seis productos reales, en producción",
    workLead:
      "Los diseñé, construí y publiqué yo. Visita cada sitio o entra al caso para ver la arquitectura y los retos de ingeniería.",
    logEyebrow: "Bitácora",
    logTitle: "Todo lo que he construido",
    logLead:
      "Del primer HTML a seis productos en producción. Tomado de mi historial en GitHub.",
    logMore: "Ver los {n} proyectos",
    logLess: "Ver menos",
    logPrivateTitle: "+3 años de trabajo empresarial que no se ve aquí",
    logPrivateBody:
      "Desde 2023 trabajo a diario en repositorios privados de empresa, con Angular, Go, C# y .NET. Ese código es confidencial, por eso no aparece en esta lista.",
    aboutEyebrow: "Quién está detrás",
    contactTitle: "¿Construimos algo juntos?",
    contactLead: "Disponible para empleo y proyectos freelance.",
  },
  work: {
    problem: "El problema",
    solution: "La solución",
    architecture: "Arquitectura",
    challenges: "Retos de ingeniería",
    challengesLead: "Las decisiones técnicas que definen el producto.",
    security: "Seguridad",
    result: "Resultado",
    stack: "Stack",
    live: "En vivo",
  },
  about: {
    title: "Sobre mí",
    stackTitle: "Stack técnico",
    experienceTitle: "Lo que hago",
  },
  contact: {
    title: "Contacto",
    lead: "Cuéntame en qué estás pensando. Respondo rápido.",
    name: "Nombre",
    email: "Correo",
    message: "Mensaje",
    success: "¡Mensaje enviado! Te respondo pronto.",
    error: "Algo falló. Escríbeme directo por correo.",
    or: "o escríbeme directo",
  },
  footer: { built: "Construido con Next.js, sin plantillas.", rights: "Todos los derechos reservados." },
};

const en: Dict = {
  nav: { work: "Work", about: "About", contact: "Contact" },
  cta: {
    viewWork: "View work",
    getInTouch: "Get in touch",
    viewLiveDemo: "View live demo",
    visitSite: "Visit site",
    caseStudy: "Case study",
    downloadCv: "Download CV",
    nextProject: "Next project",
    backHome: "Back home",
    sendMessage: "Send message",
    sending: "Sending…",
  },
  home: {
    role: "Full-stack engineer",
    heroOrigin: "From Costa Rica to the world.",
    heroLead:
      "I design and build SaaS products end to end: architecture, frontend, backend, database and security.",
    stackEyebrow: "Daily tools",
    skillsEyebrow: "The path",
    skillsTitle: "Steven Galo's skills",
    skillsLead:
      "A walk through my experience — and the skills I picked up along the way, from independent projects to production.",
    workEyebrow: "The GaloDev system",
    workTitle: "Six real products, in production",
    workLead:
      "I designed, built and shipped each one. Visit any site or open the case study to see the architecture and the engineering challenges.",
    logEyebrow: "Build log",
    logTitle: "Everything I have built",
    logLead:
      "From the first HTML to six products in production. Taken from my GitHub history.",
    logMore: "See all {n} projects",
    logLess: "Show less",
    logPrivateTitle: "3+ years of enterprise work you cannot see here",
    logPrivateBody:
      "Since 2023 I have worked daily in private company repositories, with Angular, Go, C# and .NET. That code is confidential, so it is not on this list.",
    aboutEyebrow: "Who's behind it",
    contactTitle: "Should we build something?",
    contactLead: "Open to full-time roles and freelance projects.",
  },
  work: {
    problem: "The problem",
    solution: "The solution",
    architecture: "Architecture",
    challenges: "Engineering challenges",
    challengesLead: "The technical decisions that define the product.",
    security: "Security",
    result: "Result",
    stack: "Stack",
    live: "Live",
  },
  about: {
    title: "About",
    stackTitle: "Tech stack",
    experienceTitle: "What I do",
  },
  contact: {
    title: "Contact",
    lead: "Tell me what you have in mind. I reply fast.",
    name: "Name",
    email: "Email",
    message: "Message",
    success: "Message sent! I'll get back to you soon.",
    error: "Something failed. Email me directly.",
    or: "or reach me directly",
  },
  footer: { built: "Built with Next.js, no templates.", rights: "All rights reserved." },
};

const dictionaries: Record<Locale, Dict> = { es, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
