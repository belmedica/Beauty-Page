import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Instagram, Facebook, Calendar, ChevronRight, MessageCircle, MapPin, Play, Star } from 'lucide-react';

// --- IMPORTACIÓN DE IMÁGENES (Desde src/Photos) ---
import logoImg from './Photos/logo.png';
import mariaPaulaImg from './Photos/maria paula bello.png';
import milenaImg from './Photos/milena ortiz tamayo.avif';
import jairoImg from './Photos/Jairo urueta.avif';
import julianaImg from './Photos/juliana cabrera.avif';
import camilaImg from './Photos/maria camila mora ibata.avif';
import angelicaImg from './Photos/angelica rosillo cardenas.avif';
// Asegúrate de tener tu imagen de fondo guardada como 'fondo.jpg'
import heroImg from './Photos/fondo.avif'; 

// --- CONFIGURACIÓN DE COLORES ---
const GOLD_COLOR = "text-[#D4AF37]"; 
const GOLD_BORDER = "border-[#D4AF37]";
const GOLD_BG = "bg-[#D4AF37]";

// --- HOOKS PERSONALIZADOS ---
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); 
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

const FadeInSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- DATOS DEL EQUIPO ---
const doctors = [
  {
    id: 1,
    name: "Dr. María Paula Bello",
    role: "Directora / Medicina Estética",
    category: ["antienvejecimiento"],
    bio: "Médica cirujana, egresada de la Escuela de Medicina Juan N. Corpas, con un Máster en Medicina Estética de la Universidad de las Islas Baleares, en España.",
    image: mariaPaulaImg
  },
  {
    id: 2,
    name: "Dra. Milena Ortiz Tamayo",
    role: "Antienvejecimiento",
    category: ["antienvejecimiento"],
    bio: "Especialista en Medicina Estética por la Universidade Brasil, experta en inyectables faciales, armonización facial y terapias antienvejecimiento.",
    image: milenaImg
  },
  {
    id: 3,
    name: "Dr. Jairo Urueta",
    role: "Dermatología",
    category: ["dermatologia"],
    bio: "Médico especialista en Dermatología, egresado de la Universidad de Buenos Aires. Experto en diagnóstico, tratamiento y prevención de enfermedades dermatológicas.",
    image: jairoImg
  },
  {
    id: 4,
    name: "Dra. Juliana Cabrera",
    role: "Dermatología",
    category: ["dermatologia"],
    bio: "Médica especialista en Dermatología (UBA). Sólida formación clínica en enfermedades de la piel, pelo y uñas.",
    image: julianaImg
  },
  {
    id: 5,
    name: "Dra. María Camila Mora Ibatá",
    role: "Antienvejecimiento",
    category: ["antienvejecimiento"],
    bio: "Especializada en procedimientos de armonización facial y reconocida por su experticia en tratamientos de labios y toxina botulínica.",
    image: camilaImg
  },
  {
    id: 6,
    name: "Dra. Angélica Rosillo Cárdenas",
    role: "Medicina Estética",
    category: ["antienvejecimiento"], 
    bio: "Profesional destacada en procedimientos estéticos integrales, enfocada en resaltar la belleza natural con técnicas mínimamente invasivas.",
    image: angelicaImg
  }
];

// --- COMPONENTES ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-14 w-auto flex items-center">
             <img src={logoImg} alt="Logo Bel Medicina Estética" className="h-full w-auto object-contain" />
          </div>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-[#606060]">
          {['Inicio', 'Quiénes Somos', 'Directora', 'Equipo', 'Contacto'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-').replace('é','e').replace('ó','o').replace('?','')}`} className="relative group hover:text-black transition-colors">
              {item}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${GOLD_BG} transition-all group-hover:w-full`}></span>
            </a>
          ))}
        </div>

        <button className={`bg-black text-white px-6 py-2.5 rounded-full text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-colors duration-300 shadow-lg border border-transparent hover:border-[#D4AF37]`}>
          Agendar Cita
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  // CAMBIO: Se cambió h-screen por min-h-[85vh] para que la imagen no se recorte tanto verticalmente
  <section id="inicio" className="relative w-full min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
    <div className="absolute inset-0 z-0">
      <img 
        src={heroImg} 
        alt="Fondo Estético Minimalista" 
        // CAMBIO: Se añadió object-center para centrar mejor el foco de la imagen
        className="w-full h-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/80"></div>
    </div>
    
    <div className="relative z-10 max-w-5xl mx-auto text-center px-6 mt-20">
      <FadeInSection>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`h-[1px] w-12 bg-[#D4AF37]`}></div>
          <span className={`inline-block text-[11px] tracking-[0.3em] ${GOLD_COLOR} uppercase font-bold`}>
            Bienvenido a Bel Clinic
          </span>
          <div className={`h-[1px] w-12 bg-[#D4AF37]`}></div>
        </div>
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <h1 className="text-5xl md:text-8xl font-serif font-medium text-black mb-8 leading-[1.1]">
          Medicina Estética <br/> 
          <span className={`italic font-light ${GOLD_COLOR}`}>Consciente</span>
        </h1>
      </FadeInSection>

      <FadeInSection delay={400}>
        {/* CAMBIO: Texto oscurecido (text-[#333333]) y con más peso (font-normal) para mejorar legibilidad */}
        <p className="text-lg md:text-xl text-[#333333] font-normal mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Fusionamos ciencia médica y armonía artística para resaltar tu mejor versión.
        </p>
      </FadeInSection>

      <FadeInSection delay={600}>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button className={`group relative overflow-hidden bg-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl border border-transparent hover:border-[#D4AF37]`}>
            <span className="relative z-10 flex items-center gap-2">
              Reservar Consulta <ChevronRight size={16} className="text-[#D4AF37]" />
            </span>
            <div className="absolute inset-0 bg-[#222] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
        </div>
      </FadeInSection>
    </div>

    <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce ${GOLD_COLOR}`}>
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"></div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="quienes-somos" className="py-24 px-6 bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <FadeInSection>
        <div className="relative pl-8 border-l-2 border-[#D4AF37]">
          <h2 className="text-4xl font-serif text-black mb-8">¿Quiénes Somos?</h2>
          
          <div className="space-y-6 text-[#606060] font-light leading-relaxed text-lg">
            <p>
              <strong className="text-black font-medium">Bèl Medicina Estética</strong> ofrece un servicio incomparable con las técnicas más avanzadas, brindando resultados reales en cada uno de nuestros pacientes. Usamos tecnología de vanguardia y los mejores productos médicos.
            </p>
            <p>
              Tratamientos personalizados según tus necesidades específicas para ayudarte a alcanzar tus objetivos de manera rápida y efectiva.
            </p>
            <p>
              Nuestra misión es ayudarte a verte y sentirte mejor. Nuestro personal altamente profesional, nuestra avanzada tecnología y la atmósfera acogedora hacen de Bèl Medicina Estética tu mejor opción para el tratamiento de belleza que necesitas.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={200}>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer bg-gray-100">
          <img 
            src="/api/placeholder/800/450" 
            alt="Video Institucional Bel" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={32} className="text-[#D4AF37] ml-1" fill="#D4AF37" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#D4AF37]/30 rounded-xl -z-10"></div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const DirectorSection = () => (
  <section id="directora" className="py-24 px-6 bg-[#FAFAFA] relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="relative h-[500px] md:h-full min-h-[500px] order-2 md:order-1">
          <img 
            src={mariaPaulaImg} 
            alt="Dra. Maria Paula Bello" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-3 rounded shadow-lg border-l-4 border-[#D4AF37]">
            <p className="font-serif text-lg text-black">Dra. Maria Paula Bello</p>
            <p className="text-xs uppercase tracking-wider text-[#606060]">Directora Médica</p>
          </div>
        </div>

        <div className="p-10 md:p-16 order-1 md:order-2">
          <FadeInSection>
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Liderazgo y Experiencia</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-black mb-8 leading-tight">
              Nuestra Directora
            </h2>
            
            <p className="text-[#606060] leading-relaxed mb-6 font-light text-lg">
              Nuestra directora, la <strong className="text-black font-medium">Dra. Maria Paula Bello</strong>, es egresada de Medicina de la Universidad Juan N. Corpas y cuenta con un magíster en Medicina Estética de la prestigiosa universidad de las Islas Baleares.
            </p>
            
            <p className="text-[#606060] leading-relaxed mb-10 font-light text-lg">
              Su amplia experiencia ha logrado llevar a miles de pacientes a su objetivo, potencializando su belleza de manera armoniosa y natural.
            </p>

            <button className="px-8 py-3 bg-transparent border border-black text-black text-sm uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all duration-300">
              Descubre nuestros tratamientos
            </button>
          </FadeInSection>
        </div>

      </div>
    </div>
  </section>
);

const TeamSection = () => {
  const [filter, setFilter] = useState('antienvejecimiento'); 
  const [animating, setAnimating] = useState(false);

  const handleFilterChange = (newFilter) => {
    if (filter === newFilter) return; 
    setAnimating(true);
    setFilter(newFilter);
    setTimeout(() => setAnimating(false), 300);
  };

  const filteredDoctors = doctors.filter(doc => doc.category.includes(filter));

  return (
    <section id="equipo" className="py-32 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Nuestro Equipo Médico</h2>
            <div className="flex justify-center items-center gap-2 mb-6">
               <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
               <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
               <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
            </div>
            <p className="text-[#606060] max-w-2xl mx-auto font-light text-lg">
              Profesionales de alto nivel comprometidos con tu bienestar y seguridad.
            </p>
          </div>
        </FadeInSection>

        <div className="flex justify-center mb-16">
          <div className="inline-flex gap-4 md:gap-8">
            {[
              { id: 'antienvejecimiento', label: 'Antienvejecimiento' },
              { id: 'dermatologia', label: 'Dermatología' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleFilterChange(btn.id)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium tracking-widest uppercase transition-all duration-300 ${
                  filter === btn.id
                    ? 'text-black'
                    : 'text-[#A1A0A0] hover:text-[#606060]'
                }`}
              >
                {btn.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] transform transition-transform duration-300 ${
                  filter === btn.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </button>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 transition-opacity duration-300 min-h-[500px] ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5] bg-[#F0F0F0]">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <button className="bg-white text-black px-6 py-2 rounded-full text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-[#D4AF37]">
                     Ver Perfil
                   </button>
                </div>
              </div>
              
              <div className="text-center px-4">
                <h3 className="text-2xl font-serif text-black mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {doc.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#A1A0A0] font-bold mb-4 border-b border-gray-100 pb-4 inline-block">
                  {doc.role}
                </p>
                <p className="text-[#606060] text-sm leading-relaxed font-light line-clamp-3">
                  {doc.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contacto" className="bg-[#1A1A1A] text-white pt-24 pb-12 px-6 border-t-4 border-[#D4AF37]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
      
      <div className="col-span-1 md:col-span-1">
         <img src={logoImg} alt="Bel Clinic Logo White" className="h-14 invert brightness-0 mb-6" />
         <p className="text-gray-400 text-sm leading-relaxed">
           Excelencia médica y calidez humana en cada tratamiento.
         </p>
      </div>

      <div className="col-span-1 md:col-span-2 md:pl-12">
        <h4 className="font-serif text-xl mb-8 flex items-center gap-2">
          Contacto <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">
          <div className="flex items-start gap-4 hover:text-[#D4AF37] transition-colors">
            <MapPin className="text-[#D4AF37] mt-1" size={18} />
            <span>Calle 110 # 9 - 25 Cons. 601<br/>Bogotá, Colombia</span>
          </div>
          <div className="flex items-start gap-4 hover:text-[#D4AF37] transition-colors">
            <Phone className="text-[#D4AF37] mt-1" size={18} />
            <span>+57 311 805 8080<br/>+57 601 123 4567</span>
          </div>
          <div className="flex items-start gap-4 hover:text-[#D4AF37] transition-colors">
            <Mail className="text-[#D4AF37] mt-1" size={18} />
            <span>info@bel.clinic<br/>administracion@bel.clinic</span>
          </div>
          <div className="flex items-start gap-4 hover:text-[#D4AF37] transition-colors">
            <Calendar className="text-[#D4AF37] mt-1" size={18} />
            <span>Lun - Vie: 8am - 7pm<br/>Sáb: 9am - 1pm</span>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-start md:items-end">
         <h4 className="font-serif text-xl mb-8">Síguenos</h4>
         <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300">
              <Facebook size={18} />
            </a>
         </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <p>© {new Date().getFullYear()} Bèl Medicina Estética. Todos los derechos reservados.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
        <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a 
    href="https://api.whatsapp.com/send/?phone=573118058080&text&type=phone_number&app_absent=0" 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group border-2 border-white"
  >
    <MessageCircle size={28} fill="white" />
    <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      ¡Escríbenos!
    </span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#D4AF37] selection:text-white">
      <Navigation />
      <Hero />
      <AboutSection />
      <DirectorSection />
      <TeamSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}