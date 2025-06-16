import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

// As imagens agora serão carregadas diretamente da pasta 'public'
// Não precisamos mais das linhas de 'import' para os logos.

// --- Ícones em SVG ---
const LockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const MenuIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const XIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const AccordionChevron = ({ isOpen }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}><polyline points="6 9 12 15 18 9"></polyline></svg>);
const BenefitCheckIcon = () => (<img src="data:image/svg+xml,%3csvg stroke-width='1.5' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cdefs%3e%3cstyle%3e.cls-judrlayd7aszxcwxsgi3q-1%7bfill:none%3bstroke:%23A2E6B6%3bstroke-miterlimit:10%3b%7d%3c/style%3e%3c/defs%3e%3ccircle class='cls-judrlayd7aszxcwxsgi3q-1' cx='12' cy='12' r='10.5'/%3e%3cpolyline class='cls-judrlayd7aszxcwxsgi3q-1' points='6.27 12 10.09 15.82 17.73 8.18'/%3e%3c/svg%3e" alt="Check" style={{ width: '24px', height: '24px', flexShrink: 0 }} />);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);

// --- Componente de Vídeo do YouTube ---
const YouTubeEmbed = ({ videoId }) => (
    <div style={styles.videoContainer}>
        <div style={styles.videoWrapper}>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                className='react-player'
                width='100%'
                height='100%'
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls={true}
                config={{
                    youtube: {
                        playerVars: {
                            showinfo: 0,
                            rel: 0,
                            modestbranding: 1
                        }
                    }
                }}
            />
        </div>
    </div>
);

// --- Componente do Acordeão (FAQ) ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => (
    <div style={styles.faqItem}>
        <button style={styles.faqQuestion} onClick={onClick}>
            <span>{question}</span>
            <AccordionChevron isOpen={isOpen} />
        </button>
        {isOpen && <div style={styles.faqAnswer}><p>{answer}</p></div>}
    </div>
);

// --- Componente Principal da Aplicação ---
export default function App() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const refs = {
        video: useRef(null),
        problem: useRef(null),
        solutions: useRef(null),
        howItWorks: useRef(null),
        offer: useRef(null),
        faq: useRef(null),
    };

    const scrollTo = (ref) => {
        setIsMenuOpen(false);
        setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    const menuLinks = [
        { name: 'O Problema', ref: refs.problem },
        { name: 'Soluções', ref: refs.solutions },
        { name: 'Ver Vídeo', ref: refs.video },
        { name: 'Como Funciona', ref: refs.howItWorks },
        { name: 'Dúvidas', ref: refs.faq },
    ];

    return (
        <div style={styles.page}>
            {isMenuOpen && isMobile && (
                <>
                    <div style={styles.sideMenu}>
                        <button onClick={() => setIsMenuOpen(false)} style={styles.closeButton}><XIcon /></button>
                        <nav style={styles.sideNav}>
                            {menuLinks.map(link => (<button key={link.name} style={styles.sideNavLink} onClick={() => scrollTo(link.ref)}>{link.name}</button>))}
                            <button style={styles.sideNavButton} onClick={() => scrollTo(refs.offer)}>Teste Grátis</button>
                        </nav>
                    </div>
                    <div style={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>
                </>
            )}

            <header style={styles.header}>
                <div style={{ ...styles.container, ...styles.headerContainer }}>
                    <h1 style={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>aivend.me</h1>
                    {isMobile ? (<button onClick={() => setIsMenuOpen(true)} style={styles.menuIcon}><MenuIcon /></button>) : (
                        <nav style={styles.nav}>
                            {menuLinks.map(link => (<button key={link.name} style={styles.navLink} onClick={() => scrollTo(link.ref)}>{link.name}</button>))}
                            <a href="#offer" style={{ ...styles.navButton, ...styles.navButtonPastel }} onClick={(e) => { e.preventDefault(); scrollTo(refs.offer); }}>Teste Grátis</a>
                        </nav>
                    )}
                </div>
            </header>

            <main>
                <section style={styles.heroSection}>
                    <div style={styles.container}>
                        <h1 style={styles.heroTitle}>
                            A Inteligência{' '}
                            <span style={{ position: 'relative', display: 'inline-block' }}>
                Artificial
                <img
                    src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' d='m21 12.182-4.065 1.478a2 2 0 0 0-1.228 1.291L14.154 20a.161.161 0 0 1-.308 0l-1.553-5.049a2 2 0 0 0-1.228-1.291L7 12.182a.193.193 0 0 1 0-.364l4.065-1.478a2 2 0 0 0 1.228-1.291L13.846 4a.161.161 0 0 1 .308 0l1.553 5.049a2 2 0 0 0 1.228 1.291L21 11.818c.17.062.17.302 0 .364Z' fill='%23A2E6B6'/%3e%3cpath d='m21 12.182-4.065 1.478a2 2 0 0 0-1.228 1.291L14.154 20a.161.161 0 0 1-.308 0l-1.553-5.049a2 2 0 0 0-1.228-1.291L7 12.182a.193.193 0 0 1 0-.364l4.065-1.478a2 2 0 0 0 1.228-1.291L13.846 4a.161.161 0 0 1 .308 0l1.553 5.049a2 2 0 0 0 1.228 1.291L21 11.818c.17.062.17.302 0 .364Z' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M3.75 5.25c.472.157.843.528 1 1 .08.24.42.24.5 0a1.581 1.581 0 0 1 1-1c.24-.08.24-.42 0-.5a1.581 1.581 0 0 1-1-1 .264.264 0 0 0 0-.5 1.581 1.581 0 0 1-1 1c-.24.08-.24.42 0 .5Z' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M7.25 19.25a1.581 1.581 0 0 0-1 1c-.08.24-.42.24-.5 0a1.581 1.581 0 0 0-1-1 .264.264 0 0 1 0-.5 1.581 1.581 0 0 0 1-1c.08-.24.42-.24.5 0 .157.472.528.843 1 1 .08.24.42.24.5 0Z' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e"
                    alt="Ícone de IA"
                    style={styles.heroTitleIcon}
                />
              </span>
                            {''}que Transforma sua Rotina em Estratégia.
                        </h1>
                        <p style={styles.heroSubtitle}>Soluções de IA para Advogados, Contadores e Certificadoras que automatizam tarefas e se comunicam com você e seus clientes via WhatsApp.</p>
                        <div ref={refs.video} >
                            <YouTubeEmbed videoId="Qdewnn-VYVE" />
                        </div>
                        <a href="#offer" style={{ ...styles.ctaButton, ...styles.heroCtaButton }} onClick={(e) => { e.preventDefault(); scrollTo(refs.offer); }}>Comece seu Teste Grátis</a>
                    </div>
                </section>

                <section ref={refs.problem} style={styles.problemSection}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>Um Inimigo em Comum</h2>
                        <div style={styles.problemGrid}>
                            <div style={styles.problemCard}><img src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' fill='%23191919'/%3e%3cpath d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' stroke='%23191919'/%3e%3cpath d='M12 7v5l2.25 2.25' stroke='%23191919' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e" alt="Ícone de Tempo" style={styles.problemIcon} /><p style={styles.problemText}>Tarefas manuais e repetitivas consomem seu tempo e energia?</p></div>
                            <div style={styles.problemCard}><img src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' d='M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z' fill='%23191919'/%3e%3cpath d='M12 8v5' stroke='%23191919' stroke-linecap='round'/%3e%3cpath d='M12 16v.01' stroke='%23191919' stroke-linecap='round'/%3e%3cpath d='M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z' stroke='%23191919'/%3e%3c/svg%3e" alt="Ícone de Alerta" style={styles.problemIcon} /><p style={styles.problemText}>A pressão por conformidade e a burocracia criam um teto para o seu crescimento?</p></div>
                            <div style={styles.problemCard}><img src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' d='M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z' fill='%23191919'/%3e%3cpath d='M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z' stroke='%23191919'/%3e%3cpath d='M8 16a4.993 4.993 0 0 1 4-2c1.636 0 3.088.786 4 2' stroke='%23191919' stroke-linecap='round'/%3e%3cpath d='M9 10.01V10' stroke='%23191919' stroke-linecap='round'/%3e%3cpath d='M15 10.01V10' stroke='%23191919' stroke-linecap='round'/%3e%3c/svg%3e" alt="Ícone de Frustração" style={styles.problemIcon} /><p style={styles.problemText}>Você se sente frustrado por não ter tempo para focar na estratégia do negócio?</p></div>
                        </div>
                    </div>
                </section>

                <section ref={refs.solutions} style={styles.solutionsSection}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>A Solução Certa para Cada Profissional</h2>

                        <div style={styles.solutionsGrid}>

                            {/* Card para AdvogAI */}
                            <div style={styles.solutionCard}>
                                <div style={styles.iconContainer}>
                                    <img src="data:image/svg+xml,%3csvg stroke-width='1.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cdefs%3e%3cstyle%3e.cls-mhzwvkh1zvwmgskp5qkc-1%7bfill:none%3bstroke:%23FDCDD2%3bstroke-linecap:square%3bstroke-miterlimit:10%3b%7d%3c/style%3e%3c/defs%3e%3cg id='suitcase'%3e%3crect class='cls-mhzwvkh1zvwmgskp5qkc-1' x='1.5' y='6.27' width='21' height='15.27' rx='2'/%3e%3cpolygon class='cls-mhzwvkh1zvwmgskp5qkc-1' points='15.82 6.27 8.18 6.27 9.14 2.46 14.86 2.46 15.82 6.27'/%3e%3cline class='cls-mhzwvkh1zvwmgskp5qkc-1' x1='6.27' y1='6.27' x2='6.27' y2='21.55'/%3e%3cline class='cls-mhzwvkh1zvwmgskp5qkc-1' x1='17.73' y1='6.27' x2='17.73' y2='21.55'/%3e%3c/g%3e%3c/svg%3e" alt="Icone AdvogAl" style={{width: '48px', height: '48px'}}/>
                                </div>
                                <img src="/images/advogai-logo.png" alt="Logo AdvogAI" style={{width: '180px', height: 'auto', marginBottom: '20px'}} />
                                <p style={styles.productSlogan}>Mais Tempo para a Estratégia Jurídica.</p>
                                <p style={{...styles.productDescription, ...styles.highlightRed}}>O AdvogAl é seu assistente jurídico dedicado. Ele organiza processos, monitora prazos e automatiza a elaboração de documentos básicos, para você argumentar, negociar e vencer casos.</p>
                                <ul style={styles.benefitsList}>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Agente de IA para atendimento no WhatsApp.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Gestão e automação do fluxo de processos.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Alertas inteligentes de prazos e publicações.</li>
                                </ul>
                            </div>

                            {/* Card para ContabilizAI */}
                            <div style={styles.solutionCard}>
                                <div style={styles.iconContainer}>
                                    <img src="data:image/svg+xml,%3csvg stroke-width='1.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cdefs%3e%3cstyle%3e.cls-apfbg9ian0vfhdnoxtwp9p-1%2c.cls-apfbg9ian0vfhdnoxtwp9p-2%7bfill:none%3bstroke:%23AEC6CF%3bstroke-miterlimit:10%3b%7d.cls-apfbg9ian0vfhdnoxtwp9p-1%7bstroke-linecap:square%7d%3c/style%3e%3c/defs%3e%3cg id='calculator'%3e%3crect class='cls-apfbg9ian0vfhdnoxtwp9p-1' x='4.36' y='1.5' width='15.27' height='21'/%3e%3cpath class='cls-apfbg9ian0vfhdnoxtwp9p-1' d='M15.82 16.77v0Z'/%3e%3crect class='cls-apfbg9ian0vfhdnoxtwp9p-1' x='8.18' y='5.32' width='7.64' height='3.82'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='12' y1='12' x2='12' y2='13.91'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='8.18' y1='12' x2='8.18' y2='13.91'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='12' y1='14.86' x2='12' y2='16.77'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='8.18' y1='14.86' x2='8.18' y2='16.77'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='12' y1='17.73' x2='12' y2='19.64'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='8.18' y1='17.73' x2='8.18' y2='19.64'/%3e%3cline class='cls-apfbg9ian0vfhdnoxtwp9p-2' x1='15.82' y1='12' x2='15.82' y2='13.91'/%3e%3c/g%3e%3c/svg%3e" alt="icone ContabilizAl" style={{width: '48px', height: '48px'}}/>
                                </div>
                                <img src="/images/contabilizai-logo.png" alt="Logo ContabilizAI" style={{width: '180px', height: 'auto', marginBottom: '20px'}} />
                                <p style={styles.productSlogan}>A Inteligência Artificial para seu Escritório Contábil.</p>
                                <p style={{...styles.productDescription, ...styles.highlightBlue}}>Deixe a rotina de conciliação fiscal e lançamentos manuais no passado. O ContabilizAl integra-se aos seus sistemas para automatizar tarefas repetitivas e gerar insights tributários, transformando seu escritório em um centro de estratégia.</p>
                                <ul style={styles.benefitsList}>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Agente de IA para atendimento no WhatsApp.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Automação de lançamentos e conciliações.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Análise preditiva de impostos.</li>
                                </ul>
                            </div>

                            {/* Card para CertificAI */}
                            <div style={styles.solutionCard}>
                                <div style={styles.iconContainer}>
                                    <img src="data:image/svg+xml,%3csvg stroke-width='1.5' id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cdefs%3e%3cstyle%3e.cls-z9usf70wlqotyeifmdts6-1%7bfill:none%3bstroke:%23D1D5DB%3bstroke-miterlimit:10%3b%7d%3c/style%3e%3c/defs%3e%3cpath class='cls-z9usf70wlqotyeifmdts6-1' d='M12 22.5a11.87 11.87 0 0 1-9.55-11.64V3.41L12 1.5l9.55 1.91v7.45A11.87 11.87 0 0 1 12 22.5Z'/%3e%3cpolyline class='cls-z9usf70wlqotyeifmdts6-1' points='7.23 10.93 10.81 14.51 16.77 8.54'/%3e%3c/svg%3e" alt="Ícone CertificAl" style={{width: '48px', height: '48px'}}/>
                                </div>
                                <img src="/images/certificai-logo.png" alt="Logo CertificAI" style={{width: '180px', height: 'auto', marginBottom: '20px'}} />
                                <p style={styles.productSlogan}>Precisão e Agilidade para Certificadoras Digitais.</p>
                                <p style={{...styles.productDescription, ...styles.highlightGray}}>A rotina de um Agente de Registro é marcada por uma responsabilidade imensa. O CertificAl elimina gargalos e reduz o risco de erros humanos, permitindo que sua equipe valide documentos, automatize a comunicação e garanta conformidade total.</p>
                                <ul style={styles.benefitsList}>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Agente de IA para atendimento no WhatsApp.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Validação automática de documentos.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Comunicação proativa com clientes.</li>
                                    <li style={styles.benefitItem}><BenefitCheckIcon /> Relatórios de conformidade em tempo real.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={refs.howItWorks} style={styles.howItWorksSection}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>Como a Magia Acontece</h2>
                        <div style={styles.howItWorksGrid}>
                            <div style={styles.howItWorksStep}><div style={styles.stepNumber}><img src="https://i.ibb.co/p6tW7hB/image.png" alt="Icone de Conexão" style={styles.stepImage} /></div><h3>1. Conecte</h3><p>Integramos de forma segura com seus e-mails, sistemas de tribunais, softwares contábeis e mais.</p></div>
                            <div style={styles.howItWorksStep}><div style={styles.stepNumber}><img src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' d='M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' fill='%23A2E6B6'/%3e%3cpath opacity='0.1' d='M21 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' fill='%23A2E6B6'/%3e%3cpath d='M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' stroke='%23A2E6B6'/%3e%3cpath d='M21 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' stroke='%23A2E6B6'/%3e%3cpath d='m15 3-2.94 2.94a.086.086 0 0 0 0 .12L15 9' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='m9 21 2.947-2.947a.075.075 0 0 0 0-.106L9 15' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M12 6c2.828 0 4.243 0 5.121.879C18 7.757 18 9.172 18 12v3' stroke='%23A2E6B6'/%3e%3cpath d='M12 18c-2.828 0-4.243 0-5.121-.879C6 16.243 6 14.828 6 12V9' stroke='%23A2E6B6'/%3e%3c/svg%3e" alt="Ícone de Automação" style={styles.stepImage} /></div><h3>2. Automatize</h3><p>Nossos agentes de IA assumem as tarefas repetitivas, validando, organizando e monitorando 24/7.</p></div>
                            <div style={styles.howItWorksStep}><div style={styles.stepNumber}><img src="data:image/svg+xml,%3csvg stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.1' fill-rule='evenodd' clip-rule='evenodd' d='M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 3.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z' fill='%23A2E6B6'/%3e%3cpath d='M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z' stroke='%23A2E6B6'/%3e%3cpath d='M19 12h2' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M3 12h2' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M12 19v2' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M12 3v2' stroke='%23A2E6B6' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' stroke='%23A2E6B6'/%3e%3c/svg%3e" alt="Ícone de Foco" style={styles.stepImage} /></div><h3>3. Foque no Estratégico</h3><p>Receba relatórios e alertas, e use seu tempo livre para atender clientes e expandir seu negócio.</p></div>
                        </div>
                    </div>
                </section>

                <section id="offer" ref={refs.offer} style={styles.offerSection}>
                    <div style={styles.container}>
                        <h2 style={styles.offerTitle}>Tenha IA no seu WhatsApp.<br />Grátis por 30 dias.</h2>
                        <p style={styles.offerDescription}>Imagine um assistente 24/7 que responde dúvidas, qualifica contatos e agenda reuniões automaticamente, tudo dentro do seu WhatsApp. Dê o primeiro passo para o futuro do seu atendimento e veja na prática como liberar seu tempo.</p>
                        <a href="#offer" style={{ ...styles.ctaButton, ...styles.offerCtaButton }}>QUERO MEU TESTE GRÁTIS AGORA</a>
                        <p style={styles.urgencyText}>Após 30 dias, você pode escolher um de nossos planos flexíveis ou simplesmente cancelar, sem compromisso.</p>
                        <div style={styles.securityBadge}><LockIcon /> Seus dados estão 100% seguros conosco.</div>
                    </div>
                </section>

                <section ref={refs.faq} style={styles.faqSection}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>Dúvidas Frequentes</h2>
                        <div style={styles.faqContainer}>
                            <AccordionItem question="É seguro conectar meus dados?" answer="Sim. Usamos criptografia de ponta a ponta e seguimos as mais rigorosas políticas de segurança e privacidade de dados, em total conformidade com a LGPD." isOpen={openFaqIndex === 0} onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)} />
                            <AccordionItem question="A configuração é demorada ou complexa?" answer="Não! Você testa nossa IA no WhatsApp instantaneamente. A integração completa leva menos de 30 minutos, com suporte total da nossa equipe." isOpen={openFaqIndex === 1} onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)} />
                            <AccordionItem question="O que acontece depois do teste grátis?" answer="Você receberá uma análise dos resultados e poderá decidir se um dos nossos planos completos faz sentido para você. Sem compromisso e sem pegadinhas." isOpen={openFaqIndex === 2} onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)} />
                        </div>
                    </div>
                </section>
            </main>

            <footer style={styles.footer}>
                <div style={{ ...styles.container, ...styles.footerContainer }}>
                    <div style={styles.footerColumn}><h3 style={styles.logo}>aivend.me</h3><p style={{ fontSize: '0.9rem', color: '#555' }}>Automação inteligente para profissionais exigentes.</p><div style={styles.socialIcons}><a href="#" style={styles.socialLink}><LinkedinIcon /></a><a href="#" style={styles.socialLink}><InstagramIcon /></a></div></div>
                    <div style={styles.footerColumn}><h4 style={styles.footerTitle}>Soluções</h4><a onClick={() => scrollTo(refs.solutions)} style={styles.footerLink}>AdvogAI</a><a onClick={() => scrollTo(refs.solutions)} style={styles.footerLink}>ContabilizAl</a><a onClick={() => scrollTo(refs.solutions)} style={styles.footerLink}>CertificAl</a></div>
                    <div style={styles.footerColumn}><h4 style={styles.footerTitle}>Empresa</h4><a href="#" style={styles.footerLink}>Sobre Nós</a><a href="#" style={styles.footerLink}>Contato</a><a href="#" style={styles.footerLink}>Privacidade</a></div>
                </div>
                <div style={styles.footerBottom}><p>© 2024 aivend.me. Todos os direitos reservados.</p></div>
            </footer>
        </div>
    );
}

// --- Estilos (CSS-in-JS) ---
const styles = {
    page: { fontFamily: "'Inter', sans-serif", color: '#191919', backgroundColor: '#FFFFFF' },
    container: { maxWidth: '1140px', margin: '0 auto', padding: '0 20px' },
    header: { padding: '20px 0', zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, borderBottom: '1px solid #EAEAEA' },
    headerContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontSize: '1.8rem', fontWeight: 700, margin: 0, cursor: 'pointer' },
    nav: { display: 'flex', alignItems: 'center', gap: '20px' },
    navLink: { background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: '1rem', color: '#333', fontWeight: 500 },
    navButton: { textDecoration: 'none', backgroundColor: '#191919', color: '#FFFFFF', padding: '10px 20px', fontSize: '1rem', fontWeight: 600, borderRadius: '8px' },
    navButtonPastel: { backgroundColor: '#A3E6B6', color: '#191919' },
    menuIcon: { background: 'none', border: 'none', cursor: 'pointer' },
    sideMenu: { position: 'fixed', top: 0, right: 0, width: '280px', height: '100%', backgroundColor: '#FFFFFF', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', padding: '20px' },
    closeButton: { background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-end', padding: '10px' },
    sideNav: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
    sideNavLink: { background: 'none', border: 'none', cursor: 'pointer', padding: '15px', fontSize: '1.1rem', color: '#333', fontWeight: 500, textAlign: 'left', borderRadius: '8px' },
    sideNavButton: { backgroundColor: '#A3E6B6', color: '#191919', border: 'none', cursor: 'pointer', padding: '15px', fontSize: '1.1rem', fontWeight: 600, borderRadius: '8px', marginTop: '15px' },
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000 },
    heroSection: { paddingTop: '100px', paddingBottom: '120px', textAlign: 'center', backgroundColor: '#F7F7F7' },
    heroTitle: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px auto' },
    heroTitleIcon: { position: 'absolute', top: '-12px', right: '-32px', width: '32px', height: '32px', transform: 'rotate(15deg)' },
    heroSubtitle: { fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '750px', margin: '0 auto 40px auto', lineHeight: 1.7, color: '#555' },
    videoContainer: { maxWidth: '900px', margin: '40px auto 0 auto', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: '#000' },
    videoWrapper: { position: 'relative', paddingTop: '56.25%' },
    heroCtaButton: { backgroundColor: '#A3E6B6', color: '#191919', marginTop: '40px', padding: '20px 45px', fontSize: '1.1rem' },
    problemSection: { padding: '100px 0', backgroundColor: '#FFFFFF' },
    sectionTitle: { textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '60px' },
    problemGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start', textAlign: 'center' },
    problemCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '20px' },
    problemIcon: { width: '48px', height: '48px' },
    problemText: { fontSize: '1.1rem', color: '#333', margin: '0', lineHeight: 1.6, maxWidth: '300px' },
    solutionsSection: { padding: '100px 0', backgroundColor: '#F7F7F7' },
    solutionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', alignItems: 'stretch' },
    solutionCard: { backgroundColor: '#FFFFFF', padding: '40px 0', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', overflow: 'hidden' },
    iconContainer: { height: '48px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    productSlogan: { fontSize: '1.1rem', color: '#555', fontWeight: 500, margin: '10px 0 20px 0', padding: '0 20px' },
    productDescription: { color: '#333', lineHeight: 1.6, textAlign: 'justify', padding: '20px 40px', marginBottom: 'auto' },
    benefitsList: { listStyle: 'none', padding: '30px 40px 0 40px', margin: '0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', boxSizing: 'border-box' },
    benefitItem: { display: 'flex', alignItems: 'center', gap: '10px', lineHeight: 1.5 },
    highlightRed: { backgroundColor: 'rgba(254, 205, 211, 0.6)' },
    highlightBlue: { backgroundColor: 'rgba(174, 198, 207, 0.6)' },
    highlightGray: { backgroundColor: 'rgba(209, 213, 219, 0.6)' },
    ctaButton: { backgroundColor: '#191919', color: '#FFFFFF', padding: '18px 40px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', borderRadius: '8px', display: 'inline-block' },
    howItWorksSection: { padding: '100px 0', backgroundColor: '#FFFFFF' },
    howItWorksGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' },
    howItWorksStep: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    stepNumber: { width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F7F7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid #EAEAEA' },
    stepImage: { width: '40px', height: '40px', objectFit: 'contain' },
    offerSection: { padding: '100px 0', backgroundColor: '#191919', color: '#FFFFFF', textAlign: 'center' },
    offerTitle: { fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '20px' },
    offerDescription: { fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 40px auto', lineHeight: 1.7, color: '#e9ecef' },
    offerCtaButton: { padding: '22px 50px', fontSize: '1.2rem', backgroundColor: '#A3E6B6', color: '#191919', fontWeight: 700 },
    securityBadge: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '15px', color: '#adb5bd', fontSize: '0.9rem' },
    urgencyText: { marginTop: '25px', fontSize: '0.9rem', color: '#adb5bd' },
    faqSection: { padding: '100px 0', backgroundColor: '#F7F7F7' },
    faqContainer: { maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' },
    faqItem: { border: '1px solid #e9ecef', borderRadius: '8px', backgroundColor: '#FFFFFF' },
    faqQuestion: { width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' },
    faqAnswer: { padding: '0 20px 20px 20px', color: '#555', lineHeight: 1.6, borderTop: '1px solid #e9ecef', margin: '0 20px', paddingTop: '20px' },
    footer: { backgroundColor: '#F7F7F7', padding: '80px 0 0 0' },
    footerContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', paddingBottom: '60px' },
    footerColumn: { display: 'flex', flexDirection: 'column', gap: '12px' },
    footerTitle: { fontSize: '1.1rem', fontWeight: 600, color: '#191919', margin: 0, marginBottom: '8px' },
    footerLink: { color: '#555', textDecoration: 'none', cursor: 'pointer' },
    socialIcons: { display: 'flex', gap: '16px', marginTop: '10px' },
    socialLink: { color: '#555' },
    footerBottom: { borderTop: '1px solid #e9ecef', textAlign: 'center', padding: '30px 20px', fontSize: '0.9rem', color: '#6c757d' }
};

// Adiciona a fonte Inter ao <head> do documento
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
    document.head.appendChild(fontLink);
}
