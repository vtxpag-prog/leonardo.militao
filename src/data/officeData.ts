export const OFFICE_INFO = {
  name: "Leonardo Militão Advogados Associados",
  legalName: "Leonardo Militão Sociedade Individual de Advocacia e Associados",
  cnpj: "05.243.864/0001-58",
  activeSince: "30/07/2002",
  phone: "(31) 99925-7444",
  whatsapp: "5531999257444",
  landline: "(31) 2555-7444",
  email: "contato@leonardomilitao.com.br",
  address: {
    street: "Rua dos Dominicanos",
    number: "165 — Sala 401",
    neighborhood: "Bairro Serra",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30210-480",
    full: "Rua dos Dominicanos, 165 — Sala 401 — Bairro Serra, Belo Horizonte/MG, CEP 30210-480",
    googleMapsUrl: "https://maps.google.com/?q=Rua+dos+Dominicanos,+165,+Bairro+Serra,+Belo+Horizonte,+MG,+30210-480"
  },
  workingHours: "Segunda a sexta, das 09h às 18h (Sábados e domingos fechados)",
  lawyers: [
    {
      name: "Dr. Leonardo Militão",
      title: "Sócio Fundador & Jurista",
      oab: "OAB/MG (27+ anos de experiência)",
      primaryArea: "Direito Público, Constitucional & Instâncias Superiores (STJ / STF)",
      education: [
        "Doutor em Filosofia do Direito pela UFMG (2005–2009)",
        "Mestre em Administração Pública — Gestão da Política da Saúde (Escola de Governo Paulo Neves de Carvalho, 2002–2005)",
        "Especialista em Direito Municipal (UniBH, 2000–2001)",
        "Docente e Pesquisador Jurídico"
      ],
      bio: "Mais de 27 anos dedicados exclusivamente a defender cidadãos, servidores e instituições contra os excessos do Poder Público. Reconhecido por sustentações consistentes e vitórias paradigmáticas nos Tribunais Superiores que consolidaram jurisprudência para milhares de brasileiros.",
      quote: "Defendo o seu direito com a mesma garra que defenderia o meu.",
      photo: "/assets/aistudio/dr_leonardo_b7fe1218.jpg"
    },
    {
      name: "Dra. Juliana Lemos Costa",
      title: "Advogada Sócia",
      oab: "OAB/MG nº 118.956",
      primaryArea: "Direito Administrativo, Municipal & Direito da Saúde",
      education: [
        "Inscrita na OAB/MG desde ~2008 (mais de 15 anos de atuação contínua)",
        "Especialista em Gestão e Tramitação de Processos de Direito Público",
        "Condução direta de rotinas forenses e mediação perante órgãos públicos"
      ],
      bio: "Atuação direta na condução diária, diligente e humana dos processos da banca. Focada no acolhimento do cliente, no esclarecimento transparente de cada decisão judicial e no acompanhamento minucioso de cada fase até a efetivação dos direitos.",
      quote: "Acompanhamento próximo, ético e transparente de cada causa.",
      photo: "/assets/aistudio/dra_juliana_a3082e35.jpg"
    }
  ],
  practiceAreas: [
    {
      id: "constitucional",
      title: "Direito Constitucional & Garantias",
      shortDesc: "Defesa dos direitos e garantias fundamentais perante o Estado.",
      fullDesc: "Mandados de Segurança individuais e coletivos, Ações Ordinárias contra abusos estatais, controle de constitucionalidade e preservação da dignidade do cidadão diante de atos de autoridade.",
      icon: "Scale"
    },
    {
      id: "administrativo",
      title: "Direito Administrativo & Servidores",
      shortDesc: "Proteção da carreira, vencimentos e dignidade do servidor público.",
      fullDesc: "Defesa em Concursos Públicos, Processos Administrativos Disciplinares (PAD), planos de cargos e salários, promoções retroativas, vantagens pecuniárias e aposentadorias de servidores civis e militares.",
      icon: "ShieldAlert"
    },
    {
      id: "municipal",
      title: "Direito Municipal & Contratos",
      shortDesc: "Mais de 25 anos de autoridade em questões municipais e urbanísticas.",
      fullDesc: "Relações com Prefeituras e Câmaras Municipais, impugnações de autos de infração e posturas, defesa em licitações e recomposição do equilíbrio financeiro de contratos administrativos.",
      icon: "Landmark"
    },
    {
      id: "saude",
      title: "Direito da Saúde Pública",
      shortDesc: "Ações urgentes com pedido de liminar para salvar vidas.",
      fullDesc: "Fornecimento de remédios de alto custo negados pelo SUS, cirurgias de emergência, vagas imediatas em CTI/UTI e terapias especiais. Atuação ágil e humanizada onde o tempo é crucial.",
      icon: "HeartPulse"
    },
    {
      id: "superiores",
      title: "Instâncias Superiores (STJ e STF)",
      shortDesc: "Atuação recursal e estratégica onde se decidem as regras do país.",
      fullDesc: "Recursos Especiais e Extraordinários, memoriais direcionados e sustentações orais perante os Tribunais em Brasília, com histórico de modificação de entendimentos em benefício de inúmeros cidadãos.",
      icon: "Award"
    }
  ],
  comparison: [
    {
      item: "Atendimento e Acesso",
      bigFirm: "Você fala com atendentes ou estagiários que mudam frequentemente.",
      militao: "Você fala e é atendido diretamente pelo Dr. Leonardo e pela Dra. Juliana."
    },
    {
      item: "Foco e Especialidade",
      bigFirm: "Atendem de tudo (trabalhista, trânsito, cível em massa) sem profundidade.",
      militao: "Atuação 100% exclusiva em Direito Público há quase três décadas."
    },
    {
      item: "Tratamento da sua causa",
      bigFirm: "Seu processo é apenas mais um número em metas de volume.",
      militao: "Cada processo recebe estudo doutrinário e dedicação estratégica individualizada."
    },
    {
      item: "Instâncias Superiores",
      bigFirm: "Muitas vezes desistem ou fazem recursos genéricos pré-formatados.",
      militao: "Doutorado pela UFMG e histórico real de vitória e mudança de teses no STJ e STF."
    },
    {
      item: "Linguagem e Transparência",
      bigFirm: "Juridiquês incompreensível e falta de retorno proativo.",
      militao: "Comunicação clara, na sua língua, com atualizações periódicas por WhatsApp."
    }
  ]
};

export const INITIAL_LEADS: import('../types/crm').Lead[] = [
  {
    id: "lead-1",
    name: "Carlos Alberto Menezes",
    email: "carlos.menezes@email.com",
    cpf: "123.456.789-00",
    whatsapp: "(31) 98765-4321",
    practiceArea: "Direito Administrativo & Servidores",
    processNumber: "5002134-88.2024.8.13.0024",
    message: "Preterição em concurso público estadual após homologação do resultado.",
    stage: "novo_lead",
    createdAt: "2026-11-06T09:30:00Z",
    timeline: [
      {
        id: "tl-101",
        date: "2026-11-06T09:30:00Z",
        author: "Sistema Web",
        category: "observacao",
        text: "Lead recebido pelo formulário da Landing Page. Relatou preterição de vaga após prazo de homologação."
      },
      {
        id: "tl-102",
        date: "2026-11-06T10:15:00Z",
        author: "Dr. Leonardo Militão",
        category: "whatsapp",
        text: "Primeiro contato via WhatsApp. Solicitada cópia do edital e cópia do Diário Oficial com nomeações posteriores."
      }
    ]
  },
  {
    id: "lead-2",
    name: "Mariana Silva Duarte",
    email: "mariana.duarte@email.com",
    cpf: "234.567.890-11",
    whatsapp: "(31) 99123-5566",
    practiceArea: "Direito da Saúde Pública",
    processNumber: "",
    message: "Negativa de fornecimento de medicamento oncológico de alto custo pelo Estado.",
    stage: "em_atendimento",
    createdAt: "2026-11-05T14:15:00Z",
    timeline: [
      {
        id: "tl-201",
        date: "2026-11-05T14:15:00Z",
        author: "Dra. Juliana Lemos Costa",
        category: "ligacao",
        text: "Atendimento telefônico realizado com a filha da paciente. Caso urgente de fornecimento de medicamento de alto custo negado pela SES/MG."
      },
      {
        id: "tl-202",
        date: "2026-11-05T16:40:00Z",
        author: "Dra. Juliana Lemos Costa",
        category: "documentos",
        text: "Recebidos laudos oncológicos, prescrição pelo princípio ativo e negativa administrativa protocolada no SUS."
      }
    ]
  },
  {
    id: "lead-3",
    name: "Engenharia & Obras Horizonte Ltda",
    email: "contato@obrasbh.com.br",
    cpf: "345.678.901-22",
    whatsapp: "(31) 98444-1234",
    practiceArea: "Direito Municipal & Contratos",
    processNumber: "0012399-45.2023.8.13.0024",
    message: "Equilíbrio econômico-financeiro em contrato com secretaria municipal de obras.",
    stage: "agendado",
    createdAt: "2026-11-04T11:00:00Z",
    timeline: [
      {
        id: "tl-301",
        date: "2026-11-04T11:00:00Z",
        author: "Dr. Leonardo Militão",
        category: "reuniao",
        text: "Reunião de alinhamento com a diretoria técnica da empresa. Apresentada planilha com impacto do aumento do CUB."
      },
      {
        id: "tl-302",
        date: "2026-11-05T15:00:00Z",
        author: "Dr. Leonardo Militão",
        category: "processual",
        text: "Minuta do pedido administrativo de repactuação e reequilíbrio finalizada para protocolo na secretaria municipal."
      }
    ]
  },
  {
    id: "lead-4",
    name: "Sérgio Ribeiro Couto",
    email: "sergio.couto@email.com",
    cpf: "456.789.012-33",
    whatsapp: "(31) 99888-7711",
    practiceArea: "Instâncias Superiores (STJ e STF)",
    processNumber: "RESP 1.942.301/MG",
    message: "Recurso Especial admitido e pendente de julgamento pela Primeira Turma do STJ.",
    stage: "processo_andamento",
    createdAt: "2026-10-28T16:20:00Z",
    timeline: [
      {
        id: "tl-401",
        date: "2026-10-28T16:20:00Z",
        author: "Dr. Leonardo Militão",
        category: "processual",
        text: "Interposição de memoriais e pedido de preferência para sustentação oral em Brasília perante a Primeira Turma do STJ."
      }
    ]
  },
  {
    id: "lead-5",
    name: "Helena Castro Guimarães",
    email: "helena.guimaraes@email.com",
    cpf: "567.890.123-44",
    whatsapp: "(31) 99222-3344",
    practiceArea: "Direito Constitucional & Garantias",
    processNumber: "5008912-11.2023.8.13.0024",
    message: "Mandado de segurança concedido favoravelmente com ordem cumprida.",
    stage: "concluido",
    createdAt: "2026-10-15T10:00:00Z",
    timeline: [
      {
        id: "tl-501",
        date: "2026-10-15T10:00:00Z",
        author: "Dra. Juliana Lemos Costa",
        category: "processual",
        text: "Sentença com trânsito em julgado favorável confirmando a segurança pleiteada e expedição de ofício."
      },
      {
        id: "tl-502",
        date: "2026-10-20T11:30:00Z",
        author: "Dr. Leonardo Militão",
        category: "ligacao",
        text: "Cliente comunicada sobre a vitória judicial e encerramento do processo com cumprimento integral da tutela."
      }
    ]
  }
];

export const INITIAL_REMINDERS: import('../types/crm').FollowUpReminder[] = [
  {
    id: "rem-1",
    leadId: "lead-1",
    leadName: "Carlos Alberto Menezes",
    title: "Cobrar envio do edital e termo de posse dos aprovados posteriores",
    description: "Pedir pelo WhatsApp comprovante da homologação e termo de posse para instruir o mandado de segurança.",
    dueDateTime: "2026-11-06T15:30:00Z",
    assignedTo: "Dr. Leonardo Militão",
    createdBy: "Dr. Leonardo Militão",
    createdAt: "2026-11-06T10:15:00Z",
    status: "pending",
    priority: "alta"
  },
  {
    id: "rem-2",
    leadId: "lead-2",
    leadName: "Mariana Silva Duarte",
    title: "Analisar negativa administrativa da SES/MG para pedido liminar urgente",
    description: "Conferir laudo oncológico e prescrição médica com indicação de urgência pelo médico assistente.",
    dueDateTime: "2026-11-06T17:00:00Z",
    assignedTo: "Dra. Juliana Lemos Costa",
    createdBy: "Dra. Juliana Lemos Costa",
    createdAt: "2026-11-05T16:40:00Z",
    status: "pending",
    priority: "alta"
  },
  {
    id: "rem-3",
    leadId: "lead-3",
    leadName: "Engenharia & Obras Horizonte Ltda",
    title: "Reunião de alinhamento sobre reajuste de insumos e planilha CUB",
    description: "Apresentar minuta do requerimento de reequilíbrio econômico-financeiro para assinatura dos diretores.",
    dueDateTime: "2026-11-07T10:00:00Z",
    assignedTo: "Dr. Leonardo Militão",
    createdBy: "Dr. Leonardo Militão",
    createdAt: "2026-11-05T15:00:00Z",
    status: "pending",
    priority: "media"
  },
  {
    id: "rem-4",
    leadId: "lead-4",
    leadName: "Sérgio Ribeiro Couto",
    title: "Acompanhar inclusão em pauta no STJ (Primeira Turma)",
    description: "Verificar no Diário da Justiça Eletrônico publicação do despacho do Ministro Relator.",
    dueDateTime: "2026-11-09T09:00:00Z",
    assignedTo: "Dr. Leonardo Militão",
    createdBy: "Dr. Leonardo Militão",
    createdAt: "2026-10-28T16:20:00Z",
    status: "pending",
    priority: "baixa"
  }
];
