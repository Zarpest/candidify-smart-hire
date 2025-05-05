
import { Job, Candidate, CandidateStage, DashboardMetrics } from '@/types';

// Datos de ejemplo para las ofertas de trabajo
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desarrollador Frontend Senior',
    department: 'Tecnología',
    location: 'Remoto',
    type: 'Tiempo completo',
    description: 'Estamos buscando un desarrollador frontend senior con experiencia en React, TypeScript y buenas prácticas de desarrollo.',
    requirements: [
      { id: '1', description: 'Al menos 3 años de experiencia con React', isRequired: true },
      { id: '2', description: 'Experiencia con TypeScript', isRequired: true },
      { id: '3', description: 'Conocimientos de UI/UX', isRequired: false },
    ],
    skills: ['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
    status: 'published',
    createdAt: '2023-05-10T14:30:00Z',
    updatedAt: '2023-05-10T14:30:00Z',
    applications: 24
  },
  {
    id: '2',
    title: 'Diseñador UX/UI',
    department: 'Diseño',
    location: 'Híbrido',
    type: 'Tiempo completo',
    description: 'Buscamos un diseñador UX/UI con experiencia en la creación de interfaces de usuario para aplicaciones web y móviles.',
    requirements: [
      { id: '1', description: 'Al menos 2 años de experiencia en diseño UX/UI', isRequired: true },
      { id: '2', description: 'Portafolio demostrable', isRequired: true },
      { id: '3', description: 'Experiencia con Figma', isRequired: true },
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
    status: 'published',
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-05-15T10:00:00Z',
    applications: 18
  },
  {
    id: '3',
    title: 'Project Manager',
    department: 'Operaciones',
    location: 'Presencial',
    type: 'Tiempo completo',
    description: 'Buscamos un Project Manager con experiencia en la gestión de proyectos de desarrollo de software.',
    requirements: [
      { id: '1', description: 'Al menos 3 años de experiencia en gestión de proyectos', isRequired: true },
      { id: '2', description: 'Certificación PMP o similar', isRequired: false },
      { id: '3', description: 'Experiencia en metodologías ágiles', isRequired: true },
    ],
    skills: ['Scrum', 'Kanban', 'Jira', 'Confluence', 'MS Project'],
    status: 'published',
    createdAt: '2023-05-20T09:15:00Z',
    updatedAt: '2023-05-20T09:15:00Z',
    applications: 12
  },
  {
    id: '4',
    title: 'Desarrollador Backend',
    department: 'Tecnología',
    location: 'Remoto',
    type: 'Tiempo completo',
    description: 'Estamos buscando un desarrollador backend con experiencia en Node.js y bases de datos.',
    requirements: [
      { id: '1', description: 'Al menos 2 años de experiencia con Node.js', isRequired: true },
      { id: '2', description: 'Experiencia con bases de datos SQL y NoSQL', isRequired: true },
      { id: '3', description: 'Conocimientos de Docker', isRequired: false },
    ],
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
    status: 'published',
    createdAt: '2023-05-25T11:45:00Z',
    updatedAt: '2023-05-25T11:45:00Z',
    applications: 20
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Tecnología',
    location: 'Remoto',
    type: 'Tiempo completo',
    description: 'Buscamos un DevOps Engineer con experiencia en AWS y CI/CD.',
    requirements: [
      { id: '1', description: 'Al menos 3 años de experiencia en DevOps', isRequired: true },
      { id: '2', description: 'Certificación AWS', isRequired: false },
      { id: '3', description: 'Experiencia con Terraform', isRequired: true },
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
    status: 'published',
    createdAt: '2023-06-01T13:00:00Z',
    updatedAt: '2023-06-01T13:00:00Z',
    applications: 15
  }
];

// Datos de ejemplo para los candidatos
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    jobId: '1',
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    phone: '+34 612345678',
    location: 'Madrid, España',
    resumeUrl: 'https://example.com/resumes/ana_garcia.pdf',
    workExperience: [
      {
        id: '1',
        company: 'TechCorp',
        position: 'Frontend Developer',
        startDate: '2020-03-01',
        endDate: null,
        description: 'Desarrollo de aplicaciones web con React y TypeScript'
      },
      {
        id: '2',
        company: 'WebSolutions',
        position: 'Junior Developer',
        startDate: '2018-05-01',
        endDate: '2020-02-28',
        description: 'Desarrollo y mantenimiento de sitios web con JavaScript y jQuery'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Universidad Politécnica de Madrid',
        degree: 'Ingeniería Informática',
        field: 'Ingeniería del Software',
        startDate: '2014-09-01',
        endDate: '2018-06-30'
      }
    ],
    skills: ['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Git'],
    stage: CandidateStage.INTERVIEW,
    score: 85,
    notes: 'Candidata con buena experiencia en React y TypeScript. Mostró gran interés en el puesto.',
    createdAt: '2023-06-10T09:00:00Z',
    updatedAt: '2023-06-15T14:30:00Z'
  },
  {
    id: '2',
    jobId: '1',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+34 698765432',
    location: 'Barcelona, España',
    resumeUrl: 'https://example.com/resumes/carlos_rodriguez.pdf',
    workExperience: [
      {
        id: '1',
        company: 'Digital Solutions',
        position: 'Frontend Lead',
        startDate: '2019-01-15',
        endDate: null,
        description: 'Liderar equipo de desarrollo frontend y definir la arquitectura de las aplicaciones'
      },
      {
        id: '2',
        company: 'CreativeTech',
        position: 'Senior Developer',
        startDate: '2016-07-01',
        endDate: '2018-12-31',
        description: 'Desarrollo de aplicaciones SPA con Angular y React'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Universitat Politècnica de Catalunya',
        degree: 'Master en Desarrollo Web',
        field: 'Tecnologías Web',
        startDate: '2014-09-01',
        endDate: '2016-06-30'
      },
      {
        id: '2',
        institution: 'Universitat de Barcelona',
        degree: 'Grado en Ingeniería Informática',
        field: 'Ingeniería del Software',
        startDate: '2010-09-01',
        endDate: '2014-06-30'
      }
    ],
    skills: ['JavaScript', 'React', 'Angular', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    stage: CandidateStage.TECHNICAL,
    score: 92,
    notes: 'Candidato con experiencia relevante y sólidos conocimientos técnicos. Muy buena comunicación.',
    createdAt: '2023-06-12T10:30:00Z',
    updatedAt: '2023-06-18T11:45:00Z'
  },
  {
    id: '3',
    jobId: '1',
    name: 'Laura Martínez',
    email: 'laura.martinez@example.com',
    phone: '+34 678123456',
    location: 'Sevilla, España',
    resumeUrl: 'https://example.com/resumes/laura_martinez.pdf',
    workExperience: [
      {
        id: '1',
        company: 'WebDev Inc',
        position: 'Frontend Developer',
        startDate: '2021-02-01',
        endDate: null,
        description: 'Desarrollo de interfaces de usuario con React'
      },
      {
        id: '2',
        company: 'StartupX',
        position: 'Junior Developer',
        startDate: '2019-06-01',
        endDate: '2021-01-31',
        description: 'Desarrollo web con Vue.js'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Universidad de Sevilla',
        degree: 'Grado en Ingeniería del Software',
        field: 'Desarrollo Web',
        startDate: '2015-09-01',
        endDate: '2019-06-30'
      }
    ],
    skills: ['JavaScript', 'React', 'Vue.js', 'HTML', 'CSS', 'SASS', 'Git'],
    stage: CandidateStage.SCREENING,
    score: 78,
    notes: 'Buena candidata con potencial de crecimiento. Necesita reforzar conocimientos en TypeScript.',
    createdAt: '2023-06-14T15:20:00Z',
    updatedAt: '2023-06-16T09:10:00Z'
  },
  {
    id: '4',
    jobId: '2',
    name: 'Miguel Sánchez',
    email: 'miguel.sanchez@example.com',
    phone: '+34 654321987',
    location: 'Madrid, España',
    resumeUrl: 'https://example.com/resumes/miguel_sanchez.pdf',
    workExperience: [
      {
        id: '1',
        company: 'DesignStudio',
        position: 'UI/UX Designer',
        startDate: '2020-01-15',
        endDate: null,
        description: 'Diseño de interfaces de usuario para aplicaciones web y móviles'
      },
      {
        id: '2',
        company: 'Creative Agency',
        position: 'Graphic Designer',
        startDate: '2018-03-01',
        endDate: '2019-12-31',
        description: 'Diseño gráfico para marcas y campañas publicitarias'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Escuela Superior de Diseño',
        degree: 'Grado en Diseño Digital',
        field: 'Diseño de Interfaces',
        startDate: '2014-09-01',
        endDate: '2018-06-30'
      }
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research'],
    stage: CandidateStage.INTERVIEW,
    score: 88,
    notes: 'Excelente portafolio y experiencia relevante. Muy buen candidato para el puesto.',
    createdAt: '2023-06-15T11:00:00Z',
    updatedAt: '2023-06-19T16:30:00Z'
  },
  {
    id: '5',
    jobId: '2',
    name: 'Elena Navarro',
    email: 'elena.navarro@example.com',
    phone: '+34 612398745',
    location: 'Valencia, España',
    resumeUrl: 'https://example.com/resumes/elena_navarro.pdf',
    workExperience: [
      {
        id: '1',
        company: 'DigitalUX',
        position: 'UX Designer',
        startDate: '2019-09-01',
        endDate: null,
        description: 'Investigación de usuarios y diseño de experiencias'
      },
      {
        id: '2',
        company: 'WebAgency',
        position: 'UI Designer',
        startDate: '2017-06-01',
        endDate: '2019-08-31',
        description: 'Diseño de interfaces para sitios web y aplicaciones'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Universidad Politécnica de Valencia',
        degree: 'Master en Diseño de Interacción',
        field: 'UX/UI',
        startDate: '2015-09-01',
        endDate: '2017-06-30'
      },
      {
        id: '2',
        institution: 'Universidad de Valencia',
        degree: 'Grado en Bellas Artes',
        field: 'Diseño Gráfico',
        startDate: '2011-09-01',
        endDate: '2015-06-30'
      }
    ],
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'User Testing'],
    stage: CandidateStage.FINAL,
    score: 90,
    notes: 'Excelente candidata con un enfoque centrado en el usuario. Gran comunicación y portafolio impresionante.',
    createdAt: '2023-06-16T14:45:00Z',
    updatedAt: '2023-06-20T10:15:00Z'
  }
];

// Datos de ejemplo para el dashboard
export const mockDashboardMetrics: DashboardMetrics = {
  totalJobs: 5,
  totalCandidates: 42,
  newCandidatesThisWeek: 12,
  pendingReview: 8,
  jobStats: [
    { jobId: '1', jobTitle: 'Desarrollador Frontend Senior', applications: 24, hired: 0 },
    { jobId: '2', jobTitle: 'Diseñador UX/UI', applications: 18, hired: 0 },
    { jobId: '3', jobTitle: 'Project Manager', applications: 12, hired: 0 },
    { jobId: '4', jobTitle: 'Desarrollador Backend', applications: 20, hired: 0 },
    { jobId: '5', jobTitle: 'DevOps Engineer', applications: 15, hired: 0 }
  ],
  candidatesByStage: [
    { stage: CandidateStage.APPLIED, count: 12 },
    { stage: CandidateStage.SCREENING, count: 10 },
    { stage: CandidateStage.INTERVIEW, count: 8 },
    { stage: CandidateStage.TECHNICAL, count: 6 },
    { stage: CandidateStage.FINAL, count: 4 },
    { stage: CandidateStage.OFFER, count: 2 },
    { stage: CandidateStage.HIRED, count: 0 },
    { stage: CandidateStage.REJECTED, count: 0 }
  ]
};
