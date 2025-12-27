import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "nav": {
                "home": "Home",
                "about": "About",
                "services": "Services",
                "contact": "Contact",
                "signIn": "Sign In",
                "getStarted": "Get Started",
                "dashboard": "Dashboard",
                "calendar": "Calendar",
                "tasks": "Tasks",
                "notes": "Notes",
                "courses": "Courses",
                "banking": "Banking",
                "support": "Support",
                "settings": "Settings",
                "logout": "Logout"
            },
            "about": {
                "title": "Concept & Philosophy",
                "lead": "Neuro Notes was born from a simple observation: Human thought is non-linear.",
                "p1": "Most note-taking apps force you into rigid hierarchies—folders inside folders, linear document lists. But your brain works through associations, connecting disparate ideas to form new insights.",
                "h2_1": "The Digital Garden",
                "p2": "We believe in the concept of \"digital gardening\". You plant a seed (a thought), and depending on how much you water it (write more, add connections), it grows.",
                "p3": "In Neuro Notes, this is visualized literally. Topics start as small dots. As you add content, they grow into large nodes, anchoring your personal map of knowledge.",
                "h2_2": "Mental Clarity",
                "p4": "By offloading your thoughts into a structure that mimics your mind, you free up mental RAM. Focus on thinking, not remembering where you saved that file."
            },
            "hero": {
                "subtitle": "Empower your mind with 3D visualization and structured learning paths."
            },
            "footer": {
                "privacy": "Privacy Policy",
                "terms": "Terms of Service",
                "rights": "All rights reserved."
            },
            "dashboard": {
                "title": "Notes",
                "subtitle": "Manage your thoughts and knowledge maps.",
                "search": "Type to search...",
                "activity": "Activity",
                "newNote": "New Note",
                "view": {
                    "grid": "Grid view",
                    "mindmap": "Mind map view"
                },
                "filters": {
                    "all": "All",
                    "global": "Global",
                    "management": "Management",
                    "ideas": "Ideas",
                    "planning": "Planning"
                }
            },
            "auth": {
                "welcome": "Welcome Back 👋",
                "subtitle": "We are happy to have you back",
                "email": "Email Address",
                "password": "Password",
                "emailPlaceholder": "Enter your email",
                "passwordPlaceholder": "Enter your password",
                "rememberMe": "Remember me",
                "forgotPassword": "Forgot password?",
                "login": "Login Account",
                "signingIn": "Signing in...",
                "orContinue": "Or continue with",
                "google": "Sign in with Google",
                "noAccount": "Don't have an account?",
                "signUp": "Sign up for free"
            },
            "home": {
                "hero": {
                    "title": "Map Your Mind",
                    "titleGradient": "Visualize Your Growth",
                    "subtitle": "Neuro Notes transforms your scattered thoughts into a living, breathing network of knowledge. Write freely, and watch your personal universe of ideas expand.",
                    "getStarted": "Get Started Free",
                    "learnMore": "Learn How It Works"
                },
                "features": {
                    "sectionTitle": "Why use Neuro Notes?",
                    "sectionSubtitle": "Built for deep thinkers, learners, and creators.",
                    "capture": {
                        "title": "Instant Capture",
                        "desc": "Jot down thoughts instantly without worrying about organization."
                    },
                    "connect": {
                        "title": "Dynamic Connections",
                        "desc": "See how your ideas connect. Topics grow larger as you add more content."
                    },
                    "insight": {
                        "title": "Visual Insight",
                        "desc": "Gain long-term perspective on your thinking patterns identify areas of focus."
                    }
                },
                "cta": {
                    "title": "Ready to expand your mind?",
                    "subtitle": "Join thousands of users who are organizing their thoughts with Neuro Notes.",
                    "button": "Start Mapping Now"
                }
            },
            "contact": {
                "title": "Get in Touch",
                "subtitle": "We'd love to hear your thoughts.",
                "email": "Email",
                "office": "Office",
                "form": {
                    "name": "Name",
                    "email": "Email",
                    "message": "Message",
                    "placeholderName": "John Doe",
                    "placeholderEmail": "john@example.com",
                    "placeholderMessage": "How can we help?",
                    "send": "Send Message"
                }
            },
            "services": {
                "title": "Features & Services",
                "subtitle": "Everything you need to organize your inner world.",
                "capture": {
                    "title": "Thought Capture",
                    "desc": "A distraction-free editor designed for speed. Capture ideas the moment they strike."
                },
                "org": {
                    "title": "Organic Organization",
                    "desc": "No folder management required. Tags and natural language processing organize your notes automatically."
                },
                "map": {
                    "title": "Mind Map Visualization",
                    "desc": "The core of Neuro Notes. A real-time, force-directed graph of your knowledge base."
                },
                "insight": {
                    "title": "Long-term Insights",
                    "desc": "Track how your interests shift over time. See which topics are dominating your thinking."
                },
                "roadmap": {
                    "title": "Future Roadmap",
                    "items": [
                        "AI-powered connections (suggestion of related notes)",
                        "Public sharing of specific knowledge branches",
                        "Collaborative mind maps for teams"
                    ]
                }
            },
            "onboarding": {
                "sideTitle": "Shape Your Mind Space",
                "sideSubtitle": "Let's customize your experience to help you learn and organize efficiently.",
                "step": "Step",
                "of": "of",
                "back": "Back",
                "next": "Next Step",
                "step1": {
                    "title": "What is your profession?",
                    "subtitle": "We'll use this to recommend relevant topics.",
                    "options": ["Student", "Professional", "Researcher", "Entrepreneur", "Other"]
                },
                "stepCV": {
                    "title": "Tell us about yourself",
                    "subtitle": "This helps us build your initial knowledge map.",
                    "name": "Full Name",
                    "bio": "Brief Bio",
                    "experience": "Key Experience",
                    "skills": "Skills (comma separated)",
                    "placeholders": {
                        "name": "e.g. John Doe",
                        "bio": "e.g. Passionate software engineer...",
                        "experience": "e.g. 5 years at Tech Corp",
                        "skills": "e.g. React, TypeScript, AI"
                    }
                },
                "step2": {
                    "title": "Primary Learning Goal",
                    "subtitle": "What do you want to achieve with Neuro Notes?",
                    "options": {
                        "exam": "Prepare for Exams",
                        "work": "Organize Work Projects",
                        "explore": "Explore New Fields"
                    }
                },
                "step3": {
                    "title": "Select Interests",
                    "subtitle": "Pick at least 3 to build your initial map.",
                    "interests": ["Artificial Intelligence", "Neuroscience", "Psychology", "Data Science", "History", "Philosophy", "Software Engineering", "Business Strategy", "Creative Arts"]
                },
                "step4": {
                    "title": "Generating Your Space",
                    "subtitle": "We're creating a custom mind map based on your selection."
                }
            },
            "common": {
                "more": "More options",
                "notifications": "Notifications",
                "profile": "User profile",
                "close": "Close"
            }
        }
    },
    de: {
        translation: {
            "nav": {
                "home": "Startseite",
                "about": "Über uns",
                "services": "Dienstleistungen",
                "contact": "Kontakt",
                "signIn": "Anmelden",
                "getStarted": "Loslegen",
                "dashboard": "Dashboard",
                "calendar": "Kalender",
                "tasks": "Aufgaben",
                "notes": "Notizen",
                "courses": "Kurse",
                "banking": "Bankwesen",
                "support": "Unterstützung",
                "settings": "Einstellungen",
                "logout": "Abmelden"
            },
            "about": {
                "title": "Konzept & Philosophie",
                "lead": "Neuro Notes entstand aus einer einfachen Beobachtung: Menschliches Denken ist nicht linear.",
                "p1": "Die meisten Notizen-Apps zwingen Sie in starre Hierarchien – Ordner in Ordnern, lineare Dokumentlisten. Aber Ihr Gehirn arbeitet durch Assoziationen und verbindet verschiedene Ideen zu neuen Erkenntnissen.",
                "h2_1": "Der digitale Garten",
                "p2": "Wir glauben an das Konzept des \"digitalen Gärtnerns\". Man pflanzt einen Samen (einen Gedanken), und je nachdem, wie viel man ihn wässert (mehr schreibt, Verbindungen hinzufügt), wächst er.",
                "p3": "In Neuro Notes wird dies buchstäblich visualisiert. Themen beginnen als kleine Punkte. Wenn Sie Inhalte hinzufügen, wachsen sie zu großen Knoten heran und verankern Ihre persönliche Wissenskarte.",
                "h2_2": "Mentale Klarheit",
                "p4": "Indem Sie Ihre Gedanken in eine Struktur auslagern, die Ihrem Geist nachempfunden ist, geben Sie mentalen Arbeitsspeicher frei. Konzentrieren Sie sich auf das Denken, nicht darauf, sich zu merken, wo Sie diese Datei gespeichert haben."
            },
            "hero": {
                "subtitle": "Stärken Sie Ihren Geist mit 3D-Visualisierung und strukturierten Lernpfaden."
            },
            "footer": {
                "privacy": "Datenschutz",
                "terms": "Nutzungsbedingungen",
                "rights": "Alle Rechte vorbehalten."
            },
            "dashboard": {
                "title": "Notizen",
                "subtitle": "Verwalten Sie Ihre Gedanken und Wissenskarten.",
                "search": "Suchen...",
                "activity": "Aktivität",
                "newNote": "Neue Notiz",
                "view": {
                    "grid": "Rasteransicht",
                    "mindmap": "Mindmap-Ansicht"
                },
                "filters": {
                    "all": "Alle",
                    "global": "Global",
                    "management": "Management",
                    "ideas": "Ideen",
                    "planning": "Planung"
                }
            },
            "auth": {
                "welcome": "Willkommen zurück 👋",
                "subtitle": "Wir freuen uns, Sie wiederzusehen",
                "email": "E-Mail-Adresse",
                "password": "Passwort",
                "emailPlaceholder": "E-Mail eingeben",
                "passwordPlaceholder": "Passwort eingeben",
                "rememberMe": "Erinnere dich an mich",
                "forgotPassword": "Passwort vergessen?",
                "login": "Konto anmelden",
                "signingIn": "Anmeldung...",
                "orContinue": "Oder fortfahren mit",
                "google": "Mit Google anmelden",
                "noAccount": "Sie haben noch kein Konto?",
                "signUp": "Kostenlos registrieren"
            },
            "home": {
                "hero": {
                    "title": "Verwalte deinen Geist",
                    "titleGradient": "Visualisiere dein Wachstum",
                    "subtitle": "Neuro Notes verwandelt Ihre verstreuten Gedanken in ein lebendiges Wissensnetzwerk. Schreiben Sie frei und sehen Sie zu, wie sich Ihr persönliches Ideenuniversum ausdehnt.",
                    "getStarted": "Kostenlos starten",
                    "learnMore": "Wie es funktioniert"
                },
                "features": {
                    "sectionTitle": "Warum Neuro Notes?",
                    "sectionSubtitle": "Entwickelt für tiefe Denker, Lerner und Schöpfer.",
                    "capture": {
                        "title": "Sofortige Erfassung",
                        "desc": "Notieren Sie Gedanken sofort, ohne sich um die Organisation kümmern zu müssen."
                    },
                    "connect": {
                        "title": "Dynamische Verbindungen",
                        "desc": "Sehen Sie, wie Ihre Ideen miteinander verbunden sind. Themen wachsen, wenn Sie mehr hinzufügen."
                    },
                    "insight": {
                        "title": "Visuelle Einblicke",
                        "desc": "Gewinnen Sie langfristige Perspektiven auf Ihre Denkmuster und Schwerpunkte."
                    }
                },
                "cta": {
                    "title": "Bereit, Ihren Geist zu erweitern?",
                    "subtitle": "Schließen Sie sich Tausenden von Benutzern an, die ihre Gedanken mit Neuro Notes organisieren.",
                    "button": "Jetzt mit dem Mapping beginnen"
                }
            },
            "contact": {
                "title": "Kontakt aufnehmen",
                "subtitle": "Wir würden uns freuen, von Ihnen zu hören.",
                "email": "E-Mail",
                "office": "Büro",
                "form": {
                    "name": "Name",
                    "email": "E-Mail",
                    "message": "Nachricht",
                    "placeholderName": "Max Mustermann",
                    "placeholderEmail": "max@beispiel.de",
                    "placeholderMessage": "Wie können wir helfen?",
                    "send": "Nachricht senden"
                }
            },
            "services": {
                "title": "Funktionen & Dienste",
                "subtitle": "Alles, was Sie brauchen, um Ihre innere Welt zu organisieren.",
                "capture": {
                    "title": "Gedankenerfassung",
                    "desc": "Ein ablenkungsfreier Editor, der auf Geschwindigkeit ausgelegt ist. Erfassen Sie Ideen in dem Moment, in dem sie entstehen."
                },
                "org": {
                    "title": "Organische Organisation",
                    "desc": "Keine Ordnerverwaltung erforderlich. Tags und natürliche Sprachverarbeitung organisieren Ihre Notizen automatisch."
                },
                "map": {
                    "title": "Mindmap-Visualisierung",
                    "desc": "Das Kernstück von Neuro Notes. Ein echtzeitfähiger, kraftgesteuerter Graph Ihrer Wissensdatenbank."
                },
                "insight": {
                    "title": "Langfristige Einblicke",
                    "desc": "Verfolgen Sie, wie sich Ihre Interessen im Laufe der Zeit verschieben. Sehen Sie, welche Themen Ihr Denken dominieren."
                },
                "roadmap": {
                    "title": "Zukünftige Roadmap",
                    "items": [
                        "KI-gestützte Verbindungen (Vorschlag verwandter Notizen)",
                        "Öffentliche Freigabe spezifischer Wissenszweige",
                        "Kollaborative Mindmaps für Teams"
                    ]
                }
            },
            "onboarding": {
                "sideTitle": "Gestalte deinen Denkraum",
                "sideSubtitle": "Lass uns deine Erfahrung anpassen, damit du effizient lernen und organisieren kannst.",
                "step": "Schritt",
                "of": "von",
                "back": "Zurück",
                "next": "Nächster Schritt",
                "step1": {
                    "title": "Was ist dein Beruf?",
                    "subtitle": "Wir werden dies nutzen, um relevante Themen zu empfehlen.",
                    "options": ["Student", "Berufstätig", "Forscher", "Unternehmer", "Andere"]
                },
                "stepCV": {
                    "title": "Erzählen Sie uns von sich",
                    "subtitle": "Dies hilft uns, Ihre erste Wissenskarte zu erstellen.",
                    "name": "Vollständiger Name",
                    "bio": "Kurzer Lebenslauf",
                    "experience": "Wichtige Erfahrung",
                    "skills": "Fähigkeiten (kommagetrennt)",
                    "placeholders": {
                        "name": "z.B. Max Mustermann",
                        "bio": "z.B. Leidenschaftlicher Softwareentwickler...",
                        "experience": "z.B. 5 Jahre bei Tech Corp",
                        "skills": "z.B. React, TypeScript, KI"
                    }
                },
                "step2": {
                    "title": "Primäres Lernziel",
                    "subtitle": "Was möchten Sie mit Neuro Notes erreichen?",
                    "options": {
                        "exam": "Prüfungsvorbereitung",
                        "work": "Arbeitsprojekte organisieren",
                        "explore": "Neue Bereiche erkunden"
                    }
                },
                "step3": {
                    "title": "Interessen wählen",
                    "subtitle": "Wähle mindestens 3 aus, um deine erste Karte zu erstellen.",
                    "interests": ["KI", "Neurowissenschaft", "Psychologie", "Datenwissenschaft", "Geschichte", "Philosophie", "Softwareentwicklung", "Geschäftsstrategie", "Kunst"]
                },
                "step4": {
                    "title": "Raum generieren",
                    "subtitle": "Wir erstellen eine benutzerdefinierte Mindmap basierend auf deiner Auswahl."
                }
            },
            "common": {
                "more": "Mehr Optionen",
                "notifications": "Benachrichtigungen",
                "profile": "Benutzerprofil",
                "close": "Schließen"
            }
        }
    },
    pt: {
        translation: {
            "nav": {
                "home": "Início",
                "about": "Sobre",
                "services": "Serviços",
                "contact": "Contato",
                "signIn": "Entrar",
                "getStarted": "Começar",
                "dashboard": "Painel",
                "calendar": "Calendário",
                "tasks": "Tarefas",
                "notes": "Notas",
                "courses": "Cursos",
                "banking": "Finanças",
                "support": "Suporte",
                "settings": "Configurações",
                "logout": "Sair"
            },
            "about": {
                "title": "Conceito e Filosofia",
                "lead": "Neuro Notes nasceu de uma observação simples: o pensamento humano não é linear.",
                "p1": "A maioria dos aplicativos de anotações força você a hierarquias rígidas — pastas dentro de pastas, listas lineares de documentos. Mas seu cérebro trabalha por meio de associações, conectando ideias diversas para formar novos insights.",
                "h2_1": "O Jardim Digital",
                "p2": "Acreditamos no conceito de \"jardinagem digital\". Você planta uma semente (um pensamento) e, dependendo do quanto você a rega (escreve mais, adiciona conexões), ela cresce.",
                "p3": "No Neuro Notes, isso é visualizado literalmente. Os tópicos começam como pequenos pontos. À medida que você adiciona conteúdo, eles crescem e se tornam grandes nós, ancorando seu mapa pessoal de conhecimento.",
                "h2_2": "Clareza Mental",
                "p4": "Ao descarregar seus pensamentos em uma estrutura que imita sua mente, você libera memória RAM mental. Concentre-se em pensar, não em lembrar onde salvou aquele arquivo."
            },
            "hero": {
                "subtitle": "Fortaleça sua mente com visualização 3D e caminhos de aprendizado estruturados."
            },
            "footer": {
                "privacy": "Política de Privacidade",
                "terms": "Termos de Uso",
                "rights": "Todos os direitos reservados."
            },
            "dashboard": {
                "title": "Notas",
                "subtitle": "Gerencie seus pensamentos e mapas de conhecimento.",
                "search": "Digite para pesquisar...",
                "activity": "Atividade",
                "newNote": "Nova Nota",
                "view": {
                    "grid": "Visualização em grade",
                    "mindmap": "Visualização de mapa mental"
                },
                "filters": {
                    "all": "Tudo",
                    "global": "Global",
                    "management": "Gerenciamento",
                    "ideas": "Ideias",
                    "planning": "Planejamento"
                }
            },
            "auth": {
                "welcome": "Bem-vindo de volta 👋",
                "subtitle": "Estamos felizes por ter você de volta",
                "email": "Endereço de E-mail",
                "password": "Senha",
                "emailPlaceholder": "Digite seu e-mail",
                "passwordPlaceholder": "Digite sua senha",
                "rememberMe": "Lembrar de mim",
                "forgotPassword": "Esqueceu a senha?",
                "login": "Entrar na Conta",
                "signingIn": "Entrando...",
                "orContinue": "Ou continue com",
                "google": "Entrar com Google",
                "noAccount": "Não tem uma conta?",
                "signUp": "Cadastre-se gratuitamente"
            },
            "home": {
                "hero": {
                    "title": "Mapeie sua Mente",
                    "titleGradient": "Visualize seu Crescimento",
                    "subtitle": "Neuro Notes transforma seus pensamentos dispersos em uma rede de conhecimento viva. Escreva livremente e veja sua galáxia de ideias se expandir.",
                    "getStarted": "Começar Grátis",
                    "learnMore": "Saiba Como Funciona"
                },
                "features": {
                    "sectionTitle": "Por que usar Neuro Notes?",
                    "sectionSubtitle": "Construído para pensadores, estudantes e criadores.",
                    "capture": {
                        "title": "Captura Instantânea",
                        "desc": "Anote pensamentos instantaneamente sem se preocupar com a organização."
                    },
                    "connect": {
                        "title": "Conexões Dinâmicas",
                        "desc": "Veja como suas ideias se conectam. Tópicos crescem à medida que você adiciona conteúdo."
                    },
                    "insight": {
                        "title": "Insight Visual",
                        "desc": "Ganhe perspectiva de longo prazo em seus padrões de pensamento e áreas de foco."
                    }
                },
                "cta": {
                    "title": "Pronto para expandir sua mente?",
                    "subtitle": "Junte-se a milhares de usuários que estão organizando seus pensamentos com Neuro Notes.",
                    "button": "Começar Mapeamento Agora"
                }
            },
            "contact": {
                "title": "Entrar em Contato",
                "subtitle": "Adoraríamos ouvir seus pensamentos.",
                "email": "E-mail",
                "office": "Escritório",
                "form": {
                    "name": "Nome",
                    "email": "E-mail",
                    "message": "Mensagem",
                    "placeholderName": "João Silva",
                    "placeholderEmail": "joao@exemplo.com",
                    "placeholderMessage": "Como podemos ajudar?",
                    "send": "Enviar Mensagem"
                }
            },
            "services": {
                "title": "Recursos e Serviços",
                "subtitle": "Tudo o que você precisa para organizar seu mundo interior.",
                "capture": {
                    "title": "Captura de Pensamentos",
                    "desc": "Um editor sem distrações projetado para velocidade. Capture ideias no momento em que elas surgem."
                },
                "org": {
                    "title": "Organização Orgânica",
                    "desc": "Não requer gerenciamento de pastas. Tags e processamento de linguagem natural organizam suas notas automaticamente."
                },
                "map": {
                    "title": "Visualização de Mapa Mental",
                    "desc": "O núcleo do Neuro Notes. Um gráfico direcionado por força em tempo real de sua base de conhecimento."
                },
                "insight": {
                    "title": "Insights de Longo Prazo",
                    "desc": "Acompanhe como seus interesses mudam ao longo do tempo. Veja quais tópicos estão dominando seu pensamento."
                },
                "roadmap": {
                    "title": "Roteiro Futuro",
                    "items": [
                        "Conexões alimentadas por IA (sugestão de notas relacionadas)",
                        "Compartilhamento público de ramos específicos de conhecimento",
                        "Mapas mentais colaborativos para equipes"
                    ]
                }
            },
            "onboarding": {
                "sideTitle": "Modele seu Espaço Mental",
                "sideSubtitle": "Vamos personalizar sua experiência para ajudá-lo a aprender e organizar de forma eficiente.",
                "step": "Passo",
                "of": "de",
                "back": "Voltar",
                "next": "Próximo Passo",
                "step1": {
                    "title": "Qual sua profissão?",
                    "subtitle": "Usaremos isso para recomendar tópicos relevantes.",
                    "options": ["Estudante", "Profissional", "Pesquisador", "Empreendedor", "Outro"]
                },
                "stepCV": {
                    "title": "Conte-nos sobre você",
                    "subtitle": "Isso nos ajuda a construir seu mapa de conhecimento inicial.",
                    "name": "Nome Completo",
                    "bio": "Breve Biografia",
                    "experience": "Experiência Principal",
                    "skills": "Habilidades (separadas por vírgula)",
                    "placeholders": {
                        "name": "ex: João Silva",
                        "bio": "ex: Engenheiro de software apaixonado...",
                        "experience": "ex: 5 anos na Tech Corp",
                        "skills": "ex: React, TypeScript, IA"
                    }
                },
                "step2": {
                    "title": "Principal Objetivo de Aprendizado",
                    "subtitle": "O que você deseja alcançar com o Neuro Notes?",
                    "options": {
                        "exam": "Preparar para Exames",
                        "work": "Organizar Projetos de Trabalho",
                        "explore": "Explorar Novos Campos"
                    }
                },
                "step3": {
                    "title": "Selecionar Interesses",
                    "subtitle": "Escolha pelo menos 3 para criar seu mapa inicial.",
                    "interests": ["Inteligência Artificial", "Neurociência", "Psicologia", "Ciência de Dados", "História", "Filosofia", "Engenharia de Software", "Estratégia de Negócios", "Artes Criativas"]
                },
                "step4": {
                    "title": "Gerando seu Espaço",
                    "subtitle": "Estamos criando um mapa mental personalizado com base na sua seleção."
                }
            },
            "common": {
                "more": "Mais opções",
                "notifications": "Notificações",
                "profile": "Perfil do usuário",
                "close": "Fechar"
            }
        }
    },
    es: {
        translation: {
            "nav": {
                "home": "Inicio",
                "about": "Sobre",
                "services": "Servicios",
                "contact": "Contacto",
                "signIn": "Iniciar sesión",
                "getStarted": "Empezar",
                "dashboard": "Panel",
                "calendar": "Calendario",
                "tasks": "Tareas",
                "notes": "Notas",
                "courses": "Cursos",
                "banking": "Banca",
                "support": "Soporte",
                "settings": "Ajustes",
                "logout": "Cerrar sesión"
            },
            "about": {
                "title": "Concepto y Filosofía",
                "lead": "Neuro Notes nació de una observación simple: el pensamiento humano no es lineal.",
                "p1": "La mayoría de las aplicaciones de notas te obligan a jerarquías rígidas: carpetas dentro de carpetas, listas lineales de documentos. Pero tu cerebro trabaja mediante asociaciones, conectando ideas dispares para formar nuevos conocimientos.",
                "h2_1": "El Jardín Digital",
                "p2": "Creemos en el concepto de \"jardinería digital\". Plantas una semilla (un pensamiento) y, dependiendo de cuánto la riegues (escribas más, añadas conexiones), crece.",
                "p3": "En Neuro Notes, esto se visualiza literalmente. Los temas comienzan como pequeños puntos. A medida que añades contenido, crecen hasta convertirse en grandes nodos, anclando tu mapa personal de conocimiento.",
                "h2_2": "Claridad Mental",
                "p4": "Al descargar tus pensamientos en una estructura que imita tu mente, liberas RAM mental. Concéntrate en pensar, no en recordar dónde guardaste ese archivo."
            },
            "hero": {
                "subtitle": "Potencia tu mente con visualización 3D y rutas de aprendizaje estructuradas."
            },
            "footer": {
                "privacy": "Política de Privacidad",
                "terms": "Términos de Servicio",
                "rights": "Todos los derechos reservados."
            },
            "dashboard": {
                "title": "Notas",
                "subtitle": "Gestiona tus pensamientos y mapas de conocimiento.",
                "search": "Escribe para buscar...",
                "activity": "Atividad",
                "newNote": "Nueva Nota",
                "view": {
                    "grid": "Vista de cuadrícula",
                    "mindmap": "Vista de mapa mental"
                },
                "filters": {
                    "all": "Todo",
                    "global": "Global",
                    "management": "Gestión",
                    "ideas": "Ideas",
                    "planning": "Planificación"
                }
            },
            "auth": {
                "welcome": "Bienvenido de nuevo 👋",
                "subtitle": "Estamos felices de tenerte de vuelta",
                "email": "Correo electrónico",
                "password": "Contraseña",
                "emailPlaceholder": "Introduce tu correo",
                "passwordPlaceholder": "Introduce tu contraseña",
                "rememberMe": "Recuérdame",
                "forgotPassword": "¿Olvidaste tu contraseña?",
                "login": "Iniciar sesión",
                "signingIn": "Iniciando sesión...",
                "orContinue": "O continúa con",
                "google": "Iniciar sesión con Google",
                "noAccount": "¿No tienes una cuenta?",
                "signUp": "Regístrate gratis"
            },
            "home": {
                "hero": {
                    "title": "Mapea tu Mente",
                    "titleGradient": "Visualiza tu Crecimiento",
                    "subtitle": "Neuro Notes transforma tus pensamientos dispersos en una red de conocimiento viva. Escribe con libertad y observa cómo se expande tu universo personal de ideas.",
                    "getStarted": "Pruébalo Gratis",
                    "learnMore": "Mira Cómo Funciona"
                },
                "features": {
                    "sectionTitle": "¿Por qué usar Neuro Notes?",
                    "sectionSubtitle": "Creado para pensadores profundos, estudiantes y creadores.",
                    "capture": {
                        "title": "Captura Instantánea",
                        "desc": "Anota pensamientos al instante sin preocuparte por la organización."
                    },
                    "connect": {
                        "title": "Conexiones Dinámicas",
                        "desc": "Mira cómo se conectan tus ideas. Los temas crecen a medida que añades contenido."
                    },
                    "insight": {
                        "title": "Insight Visual",
                        "desc": "Obtén una perspectiva a largo plazo de tus patrones de pensamiento y áreas de enfoque."
                    }
                },
                "cta": {
                    "title": "¿Listo para expandir tu mente?",
                    "subtitle": "Únete a miles de usuarios que están organizando sus pensamientos con Neuro Notes.",
                    "button": "Empieza a Mapear Ahora"
                }
            },
            "contact": {
                "title": "Ponte en Contacto",
                "subtitle": "Nos encantaría conocer tus pensamientos.",
                "email": "Correo",
                "office": "Oficina",
                "form": {
                    "name": "Nombre",
                    "email": "Correo",
                    "message": "Mensaje",
                    "placeholderName": "Juan Pérez",
                    "placeholderEmail": "juan@ejemplo.com",
                    "placeholderMessage": "¿Cómo podemos ayudarte?",
                    "send": "Enviar Mensaje"
                }
            },
            "services": {
                "title": "Funciones y Servicios",
                "subtitle": "Todo lo que necesitas para organizar tu mundo interior.",
                "capture": {
                    "title": "Captura de Pensamientos",
                    "desc": "Un editor sin distracciones diseñado para la velocidad. Captura ideas en el momento en que surjan."
                },
                "org": {
                    "title": "Organización Orgánica",
                    "desc": "No se requiere gestión de carpetas. Las etiquetas y el procesamiento del lenguaje natural organizan tus notas automáticamente."
                },
                "map": {
                    "title": "Visualización de Mapa Mental",
                    "desc": "El núcleo de Neuro Notes. Un gráfico dirigido por fuerza en tiempo real de tu conocimiento."
                },
                "insight": {
                    "title": "Información a Largo Plazo",
                    "desc": "Rastrea cómo cambian tus intereses con el tiempo. Mira qué temas dominan tu pensamiento."
                },
                "roadmap": {
                    "title": "Plan de Futuro",
                    "items": [
                        "Conexiones impulsadas por IA (sugerencia de notas relacionadas)",
                        "Uso compartido público de ramas de conocimiento específicas",
                        "Mapas mentales colaborativos para equipos"
                    ]
                }
            },
            "onboarding": {
                "sideTitle": "Moldea tu Espacio Mental",
                "sideSubtitle": "Personalicemos tu experiencia para ayudarte a aprender y organizarte eficientemente.",
                "step": "Paso",
                "of": "de",
                "back": "Atrás",
                "next": "Siguiente Paso",
                "step1": {
                    "title": "¿Cuál es tu profesión?",
                    "subtitle": "Usaremos esto para recomendarte temas relevantes.",
                    "options": ["Estudiante", "Profesional", "Investigador", "Emprendedor", "Otro"]
                },
                "stepCV": {
                    "title": "Cuéntanos sobre ti",
                    "subtitle": "Esto nos ayuda a construir tu mapa de conocimiento inicial.",
                    "name": "Nombre completo",
                    "bio": "Breve biografía",
                    "experience": "Experiencia clave",
                    "skills": "Habilidades (separadas por comas)",
                    "placeholders": {
                        "name": "ej. Juan Pérez",
                        "bio": "ej. Ingeniero de software apasionado...",
                        "experience": "ej. 5 años en Tech Corp",
                        "skills": "ej. React, TypeScript, IA"
                    }
                },
                "step2": {
                    "title": "Objetivo de Aprendizaje",
                    "subtitle": "¿Qué deseas lograr con Neuro Notes?",
                    "options": {
                        "exam": "Preparar Exámenes",
                        "work": "Organizar Proyectos",
                        "explore": "Explorar Nuevos Campos"
                    }
                },
                "step3": {
                    "title": "Seleccionar Intereses",
                    "subtitle": "Elige al menos 3 para crear tu mapa inicial.",
                    "interests": ["Inteligencia Artificial", "Neurociencia", "Psicología", "Ciencia de Datos", "Historia", "Filosofía", "Ingeniería de Software", "Estrategia de Negocio", "Artes Creativas"]
                },
                "step4": {
                    "title": "Generando tu Espacio",
                    "subtitle": "Estamos creando un mapa mental personalizado basado en tu selección."
                }
            },
            "common": {
                "more": "Más opciones",
                "notifications": "Notificaciones",
                "profile": "Perfil de usuario",
                "close": "Cerrar"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
