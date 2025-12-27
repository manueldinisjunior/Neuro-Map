import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "home": "Home",
                "about": "About",
                "services": "Services",
                "contact": "Contact",
                "signIn": "Sign In",
                "getStarted": "Get Started"
            },
            "hero": {
                "subtitle": "Empower your mind with 3D visualization and structured learning paths."
            },
            "footer": {
                "privacy": "Privacy Policy",
                "terms": "Terms of Service",
                "rights": "All rights reserved."
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
                "getStarted": "Loslegen"
            },
            "hero": {
                "subtitle": "Stärken Sie Ihren Geist mit 3D-Visualisierung und strukturierten Lernpfaden."
            },
            "footer": {
                "privacy": "Datenschutz",
                "terms": "Nutzungsbedingungen",
                "rights": "Alle Rechte vorbehalten."
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
                "getStarted": "Começar"
            },
            "hero": {
                "subtitle": "Fortaleça sua mente com visualização 3D e caminhos de aprendizado estruturados."
            },
            "footer": {
                "privacy": "Política de Privacidade",
                "terms": "Termos de Uso",
                "rights": "Todos os direitos reservados."
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
                "getStarted": "Empezar"
            },
            "hero": {
                "subtitle": "Potencia tu mente con visualización 3D y rutas de aprendizaje estructuradas."
            },
            "footer": {
                "privacy": "Política de Privacidad",
                "terms": "Términos de Servicio",
                "rights": "Todos los derechos reservados."
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
