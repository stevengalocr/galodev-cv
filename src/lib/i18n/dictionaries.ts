import type { Locale } from "./config";

export interface Dict {
  nav: { work: string; about: string; contact: string };
  cta: {
    viewWork: string;
    getInTouch: string;
    viewLiveDemo: string;
    downloadCv: string;
    nextProject: string;
    backHome: string;
    sendMessage: string;
    sending: string;
  };
  home: {
    role: string;
    heroLead: string;
    stackEyebrow: string;
    workEyebrow: string;
    workTitle: string;
    workLead: string;
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
    downloadCv: "Descargar CV",
    nextProject: "Siguiente proyecto",
    backHome: "Volver al inicio",
    sendMessage: "Enviar mensaje",
    sending: "Enviando…",
  },
  home: {
    role: "Ingeniero full-stack",
    heroLead:
      "Diseño y construyo productos SaaS de extremo a extremo: arquitectura, frontend, backend, base de datos y seguridad.",
    stackEyebrow: "Herramientas del día a día",
    workEyebrow: "El sistema",
    workTitle: "Cuatro productos reales, en producción",
    workLead:
      "Cada uno es un SaaS completo construido solo. Entra a cada caso para ver la arquitectura y los retos de ingeniería.",
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
    downloadCv: "Download CV",
    nextProject: "Next project",
    backHome: "Back home",
    sendMessage: "Send message",
    sending: "Sending…",
  },
  home: {
    role: "Full-stack engineer",
    heroLead:
      "I design and build SaaS products end to end: architecture, frontend, backend, database and security.",
    stackEyebrow: "Daily tools",
    workEyebrow: "The system",
    workTitle: "Four real products, in production",
    workLead:
      "Each is a complete SaaS built solo. Open any case study to see the architecture and the engineering challenges.",
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
