import React, { useState, useRef, useEffect } from 'react';
import { AppleNav } from './AppleNav';
import {
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Share2,
  Video,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  X,
  Check,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw as ReplayIcon,
  Search
} from 'lucide-react';

interface CookiePageProps {
  cookieId?: string;
  onBack: () => void;
  onNavigateToCookie?: (cookieId: string) => void;
}

const DEFAULT_COOKIE_VIDEOS: Record<string, string> = {
  'chocolate-chip': 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790406180/2GALLETA_COOKIE_CHOCOCHIP.mp4',
  'red-velvet': 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1280,vc_h264/v1790491588/VIDEO_PRINCIPAL_DE_COOKIE_RED_VELVET.mp4',
  'pink-velvet': 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1280,vc_h264/v1790491588/VIDEO_PRINCIPAL_DE_COOKIE_RED_VELVET.mp4',
  'redvelvet': 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1280,vc_h264/v1790491588/VIDEO_PRINCIPAL_DE_COOKIE_RED_VELVET.mp4',
  'cookies-and-cream': 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1920/v1790499249/VIDEO_DE_LA_SECCION_1111.mp4',
  'cookies-cream': 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1920/v1790499249/VIDEO_DE_LA_SECCION_1111.mp4',
  'oatmeal-raisin': 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790540696/VIDEO_DE_LA_PRIMERA_SECCION.mp4',
};

const DEFAULT_COOKIE_VIDEO = DEFAULT_COOKIE_VIDEOS['chocolate-chip'];
const DB_NAME = 'securify_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

// Los 4 videos para la Sección 3 estilo Apple "Get the highlights"
interface HighlightItem {
  id: string;
  lead: string; // Frase 1 en negrita / blanco
  tail: string; // Frase 2 en gris traslúcido
  sublabel: string; // Pequeña etiqueta superior
  videoUrl: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'highlight-1',
    sublabel: 'Reposo en frío de 24 horas.',
    lead: 'Masa reposada con precisión.',
    tail: ' Para que los azúcares se caramelicen lentamente y la mantequilla dorada alcance notas avellanadas profundas.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790459976/1_is_clever_home_workout_roundup_perfect_for_saving_sharing_and_recreating_later_using_simple_ideas_you_can_actu.mp4',
  },
  {
    id: 'highlight-2',
    sublabel: 'Chocolate belga 70% cacao.',
    lead: 'Porcionado artesanal al gramo.',
    tail: ' Chispas y lingotes rústicos cortados a mano para una distribución uniforme en cada mordisco.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790459979/2_VIDEO_PREPARACION_RAPIDA.mp4',
  },
  {
    id: 'highlight-3',
    sublabel: 'Horno de piedra a 180°C.',
    lead: 'Borde dorado y crocante.',
    tail: ' Centro denso y húmedo que se funde en boca al primer contacto.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790459981/3_Baking_chocolate_chip_cookies__horizontal.mp4',
  },
  {
    id: 'highlight-4',
    sublabel: 'Equilibrio dulce y salino.',
    lead: 'Textura dual perfeccionada.',
    tail: ' Finalizada con escamas de sal marina pura que potencian la intensidad del chocolate recién fundido.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790459979/4_From_Klickpin.com-_Need_fresh_inspiration_Pin_these_easy_pet_routine_ideas_youll_want_to_recreate_this_weekend_for_a_stylish_result_that_st.mp4',
  },
];

// Los 6 pasos de preparación para la Sección 4: "Mírala en detalle" (Estilo Visor Apple)
interface PreparationStep {
  id: string;
  stepNumber: string;
  shortLabel: string;
  title: string;
  highlightPhrase: string;
  description: string;
  tag: string;
  imageUrl: string;
}

const PREPARATION_STEPS: PreparationStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    shortLabel: 'Paso 1: Masa Madre',
    title: 'Integración y cremado de mantequilla avellanada',
    highlightPhrase: 'Emulsión artesanal a temperatura exacta.',
    description: 'Comenzamos batiendo la mantequilla de pastoreo con azúcar moreno orgánico y mascabado para desarrollar notas tostadas y una base sedosa inigualable.',
    tag: 'Base aromática',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462426/1_paso_de_preparacion.png',
  },
  {
    id: 'step-2',
    stepNumber: '02',
    shortLabel: 'Paso 2: Harinas Nobles',
    title: 'Tamizado e incorporación envolvente',
    highlightPhrase: 'Cero sobrebatido para conservar la ternura.',
    description: 'Las harinas de fuerza media y vainilla bourbon de Madagascar se incorporan con movimientos envolventes manuales para asegurar la mordida suave sin apelmazar.',
    tag: 'Técnica manual',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462426/2_paso_de_preparacion.png',
  },
  {
    id: 'step-3',
    stepNumber: '03',
    shortLabel: 'Paso 3: Cacao Belga',
    title: 'Incorporación de chispas y lingotes de chocolate',
    highlightPhrase: '70% cacao puro cortado a cuchillo.',
    description: 'Chispas de distintos calibres y trozos rústicos de chocolate se distribuyen de manera que cada centímetro de galleta tenga una explosión chocolatosa.',
    tag: 'Cacao 70%',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462426/3_paso_de_preparacion.png',
  },
  {
    id: 'step-4',
    stepNumber: '04',
    shortLabel: 'Paso 4: Porcionado',
    title: 'Boleado al gramo y reposo en frío',
    highlightPhrase: 'Esferas generosas de 120 gramos.',
    description: 'Cada porción es pesada al miligramo y llevada a una cámara de frío por 24 horas para concentrar los sabores y evitar que se aplanen en el horno.',
    tag: 'Control de peso',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462425/4_paso_de_preparacion.png',
  },
  {
    id: 'step-5',
    stepNumber: '05',
    shortLabel: 'Paso 5: Horneado',
    title: 'Cocción milimétrica a 180°C',
    highlightPhrase: 'El punto exacto entre fundido y crocante.',
    description: 'Horno precalentado con piedra refractaria. Los bordes se doran caramelizados en minutos mientras el núcleo preserva una cremosidad volcánica.',
    tag: 'Horno refractario',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462426/5_paso_de_preparacion.png',
  },
  {
    id: 'step-6',
    stepNumber: '06',
    shortLabel: 'Paso 6: Toque Final',
    title: 'Enfriado en rejilla y escamas de sal Maldon',
    highlightPhrase: 'El contraste salino que eleva los sentidos.',
    description: 'Apenas salidas del calor, coronamos cada galleta con escamas de sal pura de mar que potencian los matices dulces y el brillo del chocolate derretido.',
    tag: 'Sal de Maldon',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790462426/6_paso_de_preparacion.png',
  },
];

const HIGHLIGHTS_REDVELVET: HighlightItem[] = [
  {
    id: 'highlight-rv-1',
    sublabel: 'Reposo en frío de 24 horas.',
    lead: 'Masa aterciopelada carmesí.',
    tail: ' Elaborada con cacao fino y extractos naturales para lograr el tono rojo escarlata y la suavidad inconfundible del auténtico Red Velvet.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1080,vc_h264/v1790493556/video_1_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-rv-2',
    sublabel: 'Corazón volcánico de cream cheese.',
    lead: 'Relleno de queso crema suave.',
    tail: ' Inyección artesanal al centro de la galleta que funde en boca y equilibra las notas dulces con un toque lácteo irresistible.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1080,vc_h264/v1790493545/video_2_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-rv-3',
    sublabel: 'Horno de precisión a 175°C.',
    lead: 'Borde crocante, núcleo sedoso.',
    tail: ' Horneada al minuto exacto para que el centro permanezca fundente y volcánico sin perder la estructura crocante exterior.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1080,vc_h264/v1790493551/video_3_de_la_seccion_2_recortado.mp4',
  },
  {
    id: 'highlight-rv-4',
    sublabel: 'Gotas de chocolate blanco de origen.',
    lead: 'Contraste dulce y cremoso.',
    tail: ' Chispas de chocolate blanco mantecoso que aportan notas caramelizadas de leche y un contraste visual inconfundible.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/q_auto,w_1080,vc_h264/v1790493544/video_4_de_la_seccion_2.mp4',
  },
];

const HIGHLIGHTS_COOKIES_CREAM: HighlightItem[] = [
  {
    id: 'highlight-cnc-1',
    sublabel: 'Reposo en frío de 24 horas.',
    lead: 'Masa reposada con precisión.',
    tail: ' Para que los azúcares se caramelicen lentamente y la mantequilla dorada alcance notas avellanadas profundas.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790501633/video_111_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-cnc-2',
    sublabel: 'Trozos crujientes de galleta negra.',
    lead: 'Porcionado artesanal al gramo.',
    tail: ' Chispas y trozos rústicos cortados a mano para una distribución uniforme en cada mordisco.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790501624/video_222_de_la_seccion_2.webm',
  },
  {
    id: 'highlight-cnc-3',
    sublabel: 'Horno de piedra a 180°C.',
    lead: 'Borde dorado y crocante.',
    tail: ' Centro denso y húmedo que se funde en boca al primer contacto.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790501622/video_333_de_la_seccion_2.webm',
  },
  {
    id: 'highlight-cnc-4',
    sublabel: 'Equilibrio dulce y cremoso.',
    lead: 'Textura dual perfeccionada.',
    tail: ' Finalizada con un toque sutil que potencia la intensidad de la crema dulce y la textura crujiente.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790501628/video_444_de_la_seccion_2.mp4',
  },
];

const HIGHLIGHTS_OATMEAL_RAISIN: HighlightItem[] = [
  {
    id: 'highlight-oat-1',
    sublabel: 'Reposo en frío de 24 horas.',
    lead: 'Masa reposada con precisión.',
    tail: ' Para que los azúcares se caramelicen lentamente y la mantequilla dorada alcance notas avellanadas profundas.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790541043/11111_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-oat-2',
    sublabel: 'Avena integral y pasas jugosas.',
    lead: 'Porcionado artesanal al gramo.',
    tail: ' Copos de avena seleccionada y pasas hidratadas para una distribución uniforme en cada mordisco.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790541043/22222_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-oat-3',
    sublabel: 'Horno de piedra a 180°C.',
    lead: 'Borde dorado y crocante.',
    tail: ' Centro denso, tierno y húmedo que se funde en boca al primer contacto.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790541045/33333_de_la_seccion_2.mp4',
  },
  {
    id: 'highlight-oat-4',
    sublabel: 'Toque de canela y vainilla pura.',
    lead: 'Textura dual perfeccionada.',
    tail: ' Finalizada con especias nobles que potencian el aroma reconfortante de la avena recién horneada.',
    videoUrl: 'https://res.cloudinary.com/yxbhso8s/video/upload/v1790541046/444444_de_la_seccion_2.mp4',
  },
];

const PREPARATION_STEPS_REDVELVET: PreparationStep[] = [
  {
    id: 'step-rv-1',
    stepNumber: '01',
    shortLabel: 'Paso 1: Masa Madre',
    title: 'Cremado de mantequilla pura y azúcar sedosa',
    highlightPhrase: 'Base esponjosa batida a baja revolución.',
    description: 'Comenzamos batiendo mantequilla de pastoreo con azúcares finos y vainilla bourbon para lograr una textura aireada que recuerda a un bizcocho aterciopelado.',
    tag: 'Base terciopelo',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_1.png',
  },
  {
    id: 'step-rv-2',
    stepNumber: '02',
    shortLabel: 'Paso 2: Tono Carmesí',
    title: 'Incorporación de cacao holandés y extracto rubí',
    highlightPhrase: 'Infusión homogénea del rojo característico.',
    description: 'Tamizamos cacao suave con harina de repostería y añadimos el tinte rubí de origen natural para obtener el color rojo profundo característico del Red Velvet.',
    tag: 'Color rubí',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_2.png',
  },
  {
    id: 'step-rv-3',
    stepNumber: '03',
    shortLabel: 'Paso 3: Chispas Blancas',
    title: 'Trozos de chocolate blanco de primera calidad',
    highlightPhrase: 'Puntos de dulzor lácteo en cada bocado.',
    description: 'Añadimos gotas de chocolate blanco de origen para contrastar visualmente con el rojo carmesí y sumar notas dulces de leche condensada.',
    tag: 'Chocolate blanco',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_3.png',
  },
  {
    id: 'step-rv-4',
    stepNumber: '04',
    shortLabel: 'Paso 4: Cream Cheese',
    title: 'Relleno de queso crema y boleado de precisión',
    highlightPhrase: 'Núcleo volcánico pesado al gramo.',
    description: 'Insertamos una porción congelada de crema de queso dulce en el centro de cada esfera de masa de 125 gramos antes de su reposo en frío por 24 horas.',
    tag: 'Relleno volcánico',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_4.png',
  },
  {
    id: 'step-rv-5',
    stepNumber: '05',
    shortLabel: 'Paso 5: Horneado',
    title: 'Cocción suave a 175°C en horno de piedra',
    highlightPhrase: 'El secreto del centro fundido.',
    description: 'Horneamos justo el tiempo necesario para fijar la corteza exterior mientras el queso crema del centro se vuelve tibio, cremoso y fundente.',
    tag: 'Horno calibrado',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_5.png',
  },
  {
    id: 'step-rv-6',
    stepNumber: '06',
    shortLabel: 'Paso 6: Toque Final',
    title: 'Enfriado y lluvia de migas aterciopeladas',
    highlightPhrase: 'Elegancia pastelera al salir del calor.',
    description: 'Coronamos cada galleta recién salida con finas virutas de galleta roja para una presentación artesanal irresistible digna de vitrina.',
    tag: 'Acabado gourmet',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790494920/paso_6.png',
  },
];

const PREPARATION_STEPS_COOKIES_CREAM: PreparationStep[] = [
  {
    id: 'step-cnc-1',
    stepNumber: '01',
    shortLabel: 'Paso 1: Masa Madre',
    title: 'Integración y cremado de mantequilla avellanada',
    highlightPhrase: 'Emulsión artesanal a temperatura exacta.',
    description: 'Comenzamos batiendo la mantequilla de pastoreo con azúcar moreno orgánico y mascabado para desarrollar notas tostadas y una base sedosa inigualable.',
    tag: 'Base aromática',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503122/paso_11111.png',
  },
  {
    id: 'step-cnc-2',
    stepNumber: '02',
    shortLabel: 'Paso 2: Harinas Nobles',
    title: 'Tamizado e incorporación envolvente',
    highlightPhrase: 'Cero sobrebatido para conservar la ternura.',
    description: 'Las harinas de fuerza media y vainilla bourbon de Madagascar se incorporan con movimientos envolventes manuales para asegurar la mordida suave sin apelmazar.',
    tag: 'Técnica manual',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503121/paso_22222.png',
  },
  {
    id: 'step-cnc-3',
    stepNumber: '03',
    shortLabel: 'Paso 3: Galleta & Crema',
    title: 'Incorporación de trozos de galleta crocante y crema',
    highlightPhrase: 'Trozos crujientes y crema dulce cortados a mano.',
    description: 'Trozos de galleta oscura rústica y motas de crema suave se distribuyen de manera que cada centímetro tenga una textura dual inconfundible.',
    tag: 'Cookies & Cream',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503119/paso_33333.png',
  },
  {
    id: 'step-cnc-4',
    stepNumber: '04',
    shortLabel: 'Paso 4: Porcionado',
    title: 'Boleado al gramo y reposo en frío',
    highlightPhrase: 'Esferas generosas de 120 gramos.',
    description: 'Cada porción es pesada al miligramo y llevada a una cámara de frío por 24 horas para concentrar los sabores y evitar que se aplanen en el horno.',
    tag: 'Control de peso',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503119/paso_44444.png',
  },
  {
    id: 'step-cnc-5',
    stepNumber: '05',
    shortLabel: 'Paso 5: Horneado',
    title: 'Cocción milimétrica a 180°C',
    highlightPhrase: 'El punto exacto entre fundido y crocante.',
    description: 'Horno precalentado con piedra refractaria. Los bordes se doran caramelizados en minutos mientras el núcleo preserva una cremosidad volcánica.',
    tag: 'Horno refractario',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503119/paso_55555.png',
  },
  {
    id: 'step-cnc-6',
    stepNumber: '06',
    shortLabel: 'Paso 6: Toque Final',
    title: 'Enfriado en rejilla y escamas minerales',
    highlightPhrase: 'El contraste sutil que eleva los sentidos.',
    description: 'Apenas salidas del calor, coronamos cada galleta para equilibrar los matices de crema dulce y el tostado de los trozos crujientes.',
    tag: 'Acabado perfecto',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790503119/paso_67777.png',
  },
];

const PREPARATION_STEPS_OATMEAL_RAISIN: PreparationStep[] = [
  {
    id: 'step-oat-1',
    stepNumber: '01',
    shortLabel: 'Paso 1: Masa Madre',
    title: 'Integración y cremado de mantequilla avellanada',
    highlightPhrase: 'Emulsión artesanal a temperatura exacta.',
    description: 'Comenzamos batiendo la mantequilla de pastoreo con azúcar moreno orgánico y mascabado para desarrollar notas tostadas y una base sedosa inigualable.',
    tag: 'Base aromática',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541993/1_step.png',
  },
  {
    id: 'step-oat-2',
    stepNumber: '02',
    shortLabel: 'Paso 2: Avena & Especias',
    title: 'Tamizado de harina, avena integral y canela',
    highlightPhrase: 'Copos seleccionados para una textura reconfortante.',
    description: 'Incorporamos avena de grano entero con canela pura de Ceilán y vainilla de Madagascar con movimientos envolventes para asegurar la mordida suave sin apelmazar.',
    tag: 'Avena integral',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541989/2_step.png',
  },
  {
    id: 'step-oat-3',
    stepNumber: '03',
    shortLabel: 'Paso 3: Pasas Jugosas',
    title: 'Incorporación de pasas maceradas al punto exacto',
    highlightPhrase: 'Dulzura natural y humedad en cada bocado.',
    description: 'Pasas seleccionadas e hidratadas lentamente para asegurar una distribución equilibrada de textura y sabor en toda la masa.',
    tag: 'Pasas gourmet',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541990/3_step.png',
  },
  {
    id: 'step-oat-4',
    stepNumber: '04',
    shortLabel: 'Paso 4: Porcionado',
    title: 'Boleado al gramo y reposo en frío',
    highlightPhrase: 'Esferas generosas de 120 gramos.',
    description: 'Cada porción es pesada al miligramo y llevada a una cámara de frío por 24 horas para concentrar los sabores y asegurar un horneado perfecto.',
    tag: 'Control de peso',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541989/4_step.png',
  },
  {
    id: 'step-oat-5',
    stepNumber: '05',
    shortLabel: 'Paso 5: Horneado',
    title: 'Cocción milimétrica a 180°C',
    highlightPhrase: 'El punto exacto entre tierno y crocante.',
    description: 'Horno precalentado con piedra refractaria. Los bordes se doran caramelizados en minutos mientras el núcleo preserva una ternura húmeda irresistible.',
    tag: 'Horno refractario',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541988/5_step.png',
  },
  {
    id: 'step-oat-6',
    stepNumber: '06',
    shortLabel: 'Paso 6: Toque Final',
    title: 'Enfriado en rejilla y asentamiento de aromas',
    highlightPhrase: 'La consolidación del sabor artesanal.',
    description: 'Apenas salidas del calor, dejamos reposar cada galleta para que los azúcares y notas de avena alcancen su máxima plenitud aromática.',
    tag: 'Acabado artesanal',
    imageUrl: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790541988/6_step.png',
  },
];

interface GalleryCardItem {
  id: string;
  image: string;
  alt: string;
  boldText: string;
  text: string;
  internalTitle?: string;
}

interface CookieConfig {
  name: string;
  title: string;
  tagline: string;
  badge: string;
  whatsappMessage: string;
  highlights: HighlightItem[];
  preparationSteps: PreparationStep[];
  section5Tag: string;
  section5Title: string;
  section5Image: string;
  floatingCookieImage: string;
  section6Subtitle: string;
  section6Desc: string;
  col1Title: string;
  col1Desc: string;
  col2Title: string;
  col2Desc: string;
  col3Title: string;
  col3Desc: string;
  footerNotes: string;
  galleryCards: GalleryCardItem[];
}

const COOKIE_CONFIG: Record<string, CookieConfig> = {
  'chocolate-chip': {
    name: 'Cookie Chocolate Chip',
    title: 'Chocolate chip.',
    tagline: 'Horneadas artesanalmente con chispas de cacao puro y una textura inigualable.',
    badge: 'Cookie',
    whatsappMessage: '¡Hola! Quiero ordenar una caja de Galletas Chocolate Chip.',
    highlights: HIGHLIGHTS,
    preparationSteps: PREPARATION_STEPS,
    section5Tag: 'Centro Volcánico',
    section5Title: 'Sensación fundida excepcional en cada bocado.',
    section5Image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790464467/ChatGPT_Image_26_sept_2026_02_45_21_p.m.png',
    floatingCookieImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467379/galleta_a_sombra_fondo_transparente.png',
    section6Subtitle: 'Menos azúcar refinada. Toda la magia.',
    section6Desc: 'Gracias al equilibrio maestro de mantequilla avellanada y el punto exacto de horneado a alta temperatura, la concentración de sabor es hasta 1.5 veces más intensa que las galletas tradicionales, presentándonos la mejor experiencia de chocolate belga fundido de la repostería artesanal.',
    col1Title: 'Cacao de Origen 70%¹',
    col1Desc: 'Seleccionamos granos tostados lentamente para conservar notas frutales y un aroma profundo que despierta los sentidos al primer instante.',
    col2Title: 'Textura Adaptativa²',
    col2Desc: 'Combina un borde dorado sutilmente crocante con un corazón denso y tierno que responde a la temperatura perfecta de servicio.',
    col3Title: 'Sal Marina en Escamas³',
    col3Desc: 'Si detecta el dulzor del fudge en el paladar, cada cristal mineral equilibra la intensidad liberando un final limpio y reconfortante.',
    footerNotes: '1. Medido en comparación con formulaciones convencionales de repostería industrial. 2. La textura óptima se alcanza entre 22°C y 26°C o con 10 segundos de tibieza. 3. Cristales recolectados a mano en salinas artesanales sin refinar.',
    galleryCards: [
      {
        id: 'choc-gal-1',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467378/galleta_imagen_transversal11.png',
        alt: 'La arquitectura de corte transversal',
        boldText: 'La arquitectura exterior caramelizada',
        text: ' brinda una resistencia crocante al primer bocado, reteniendo los aromas volátiles del cacao en su interior.',
      },
      {
        id: 'choc-gal-2',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467377/galleta_imagen_transversal22.png',
        alt: 'Canales continuos de fudge líquido',
        boldText: 'Los canales de fudge continuo',
        text: ' mantienen el chocolate en un estado fluido y sedoso, distribuyendo el sabor uniformemente en todo momento.',
      },
      {
        id: 'choc-gal-3',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467374/galleta_imagen_transversal33.jpg',
        alt: 'Miga alveolada',
        boldText: 'La estructura alveolar de miga',
        text: ' equilibra la intensidad del cacao con una textura esponjosa y ligera que se funde suavemente al paladar.',
        internalTitle: 'Miga aireada\npersonalizada',
      },
      {
        id: 'choc-gal-4',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467377/galleta_imagen_transversal44.png',
        alt: 'Epicentro volcánico de cacao belga',
        boldText: 'El epicentro volcánico',
        text: ' utiliza cacao puro belga al 70% para liberar un final envolvente de notas frutales y un tostado noble inolvidable.',
      },
    ],
  },
  'red-velvet': {
    name: 'Cookie Red Velvet',
    title: 'Red velvet.',
    tagline: 'Intensidad terciopelo carmesí con corazón volcánico de cream cheese y cacao suave.',
    badge: 'Cookie',
    whatsappMessage: '¡Hola! Quiero ordenar una caja de Galletas Red Velvet.',
    highlights: HIGHLIGHTS_REDVELVET,
    preparationSteps: PREPARATION_STEPS_REDVELVET,
    section5Tag: 'Corazón de Cream Cheese',
    section5Title: 'El terciopelo carmesí más sedoso en cada bocado.',
    section5Image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790495738/galleta_con_fondo_2.png',
    floatingCookieImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790495966/redvelvet_fondo_transparente.png',
    section6Subtitle: 'Elegancia pastelera. Textura inolvidable.',
    section6Desc: 'La receta clásica del pastel Red Velvet reinterpretada en una galleta monumental: notas sutiles de cacao, el toque cremoso del queso crema y un acabado rojo rubí que cautiva a primera vista.',
    col1Title: 'Cream Cheese Horneado¹',
    col1Desc: 'Queso crema de calidad pastelera batido con vainilla que se mantiene suave y cremoso aún después del calor del horno.',
    col2Title: 'Masa Aterciopelada²',
    col2Desc: 'Textura aireada y tierna por dentro con una fina corteza crocante que replica la experiencia del bizcocho tradicional.',
    col3Title: 'Gotas de Chocolate Blanco³',
    col3Desc: 'Aportan pequeñas notas caramelizadas de leche y un contraste visual inconfundible con el rojo carmesí.',
    footerNotes: '1. Relleno elaborado diariamente con queso crema natural y vainilla bourbon. 2. Textura óptima a temperatura ambiente o con 8 segundos de calor suave. 3. Chocolate blanco mantecoso sin grasas hidrogenadas.',
    galleryCards: [
      {
        id: 'rv-gal-1',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790497196/galleta_transversal_1.png',
        alt: 'Arquitectura transversal de Red Velvet',
        boldText: 'La arquitectura carmesí caramelizada',
        text: ' ofrece una capa exterior finamente quebradiza que protege la humedad y las notas dulces de vainilla bourbon.',
      },
      {
        id: 'rv-gal-2',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790497195/galleta_transversal_2.png',
        alt: 'Corazón volcánico de cream cheese',
        boldText: 'El corazón de cream cheese fundido',
        text: ' se despliega al centro en un manto tibio y suave, equilibrando perfectamente el cacao suave de la masa.',
      },
      {
        id: 'rv-gal-3',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790467374/galleta_imagen_transversal33.jpg',
        alt: 'Textura aterciopelada de miga',
        boldText: 'La textura aterciopelada de miga',
        text: ' recrea la esponjosidad legendaria del pastel Red Velvet, fundiéndose sin esfuerzo con cada bocado.',
        internalTitle: 'Textura terciopelo\npersonalizada',
      },
      {
        id: 'rv-gal-4',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790497195/galleta_transversal_4.png',
        alt: 'Contraste de chocolate blanco',
        boldText: 'El contraste de chocolate blanco',
        text: ' incorpora notas dulces de leche caramelizada que complementan la intensidad rubí de la galleta.',
      },
    ],
  },
  'cookies-and-cream': {
    name: 'Cookies & Cream',
    title: 'Cookies & cream.',
    tagline: 'Horneadas artesanalmente con trozos crujientes de galleta y una suave mezcla cremosa.',
    badge: 'Cookie',
    whatsappMessage: '¡Hola! Quiero ordenar una caja de Galletas Cookies & Cream.',
    highlights: HIGHLIGHTS_COOKIES_CREAM,
    preparationSteps: PREPARATION_STEPS_COOKIES_CREAM,
    section5Tag: 'Centro Volcánico',
    section5Title: 'Sensación fundida excepcional en cada bocado.',
    section5Image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790536155/galleta_con_fondo.png',
    floatingCookieImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790536155/galleta_sin_fondo.png',
    section6Subtitle: 'Menos azúcar refinada. Toda la magia.',
    section6Desc: 'Gracias al equilibrio maestro de mantequilla avellanada y el punto exacto de horneado a alta temperatura, la concentración de sabor es hasta 1.5 veces más intensa que las galletas tradicionales, presentándonos la mejor experiencia de chocolate belga fundido de la repostería artesanal.',
    col1Title: 'Cacao de Origen 70%¹',
    col1Desc: 'Seleccionamos granos tostados lentamente para conservar notas frutales y un aroma profundo que despierta los sentidos al primer instante.',
    col2Title: 'Textura Adaptativa²',
    col2Desc: 'Combina un borde dorado sutilmente crocante con un corazón denso y tierno que responde a la temperatura perfecta de servicio.',
    col3Title: 'Sal Marina en Escamas³',
    col3Desc: 'Si detecta el dulzor del fudge en el paladar, cada cristal mineral equilibra la intensidad liberando un final limpio y reconfortante.',
    footerNotes: '1. Medido en comparación con formulaciones convencionales de repostería industrial. 2. La textura óptima se alcanza entre 22°C y 26°C o con 10 segundos de tibieza. 3. Cristales recolectados a mano en salinas artesanales sin refinar.',
    galleryCards: [
      {
        id: 'cnc-gal-1',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790538244/tranversal_11.png',
        alt: 'La arquitectura de corte transversal',
        boldText: 'La arquitectura exterior caramelizada',
        text: ' brinda una resistencia crocante al primer bocado, reteniendo los aromas volátiles del cacao en su interior.',
      },
      {
        id: 'cnc-gal-2',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790538244/tranversal_22.png',
        alt: 'Canales continuos de fudge líquido',
        boldText: 'Los canales de fudge continuo',
        text: ' mantienen el chocolate en un estado fluido y sedoso, distribuyendo el sabor uniformemente en todo momento.',
      },
      {
        id: 'cnc-gal-3',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790538244/transversal_33.png',
        alt: 'Miga alveolada',
        boldText: 'La estructura alveolar de miga',
        text: ' equilibra la intensidad del cacao con una textura esponjosa y ligera que se funde suavemente al paladar.',
        internalTitle: 'Miga aireada\npersonalizada',
      },
      {
        id: 'cnc-gal-4',
        image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790538249/transversal_44.png',
        alt: 'Epicentro volcánico de cacao belga',
        boldText: 'El epicentro volcánico',
        text: ' utiliza cacao puro belga al 70% para liberar un final envolvente de notas frutales y un tostado noble inolvidable.',
      },
    ],
  },
};

// Alias para cookies-cream
COOKIE_CONFIG['cookies-cream'] = COOKIE_CONFIG['cookies-and-cream'];

// Oatmeal Raisin (idéntico en diseño y contenido a Cookie Chocolate Chip)
COOKIE_CONFIG['oatmeal-raisin'] = {
  ...COOKIE_CONFIG['chocolate-chip'],
  name: 'Oatmeal Raisin',
  title: 'Oatmeal raisin.',
  tagline: 'Horneadas artesanalmente con avena integral, pasas dulces y una textura inigualable.',
  whatsappMessage: '¡Hola! Quiero ordenar una caja de Galletas Oatmeal Raisin.',
  highlights: HIGHLIGHTS_OATMEAL_RAISIN,
  preparationSteps: PREPARATION_STEPS_OATMEAL_RAISIN,
  section5Image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790542566/oatmeal_con_fondo.png',
  floatingCookieImage: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790542566/oatmeal_sin_fondo.png',
  section6Subtitle: 'Avena integral y canela. Toda la magia.',
  section6Desc: 'Gracias al equilibrio maestro de mantequilla avellanada, copos de avena de grano entero y pasas tiernas, logramos una galleta con textura inigualable, bordes dorados crujientes y un centro húmedo reconfortante.',
  col1Title: 'Avena de Grano Entero¹',
  col1Desc: 'Copos enteros tostados suavemente que aportan fibra natural, saciedad y una textura rústica inconfundible.',
  col2Title: 'Pasas Maceradas²',
  col2Desc: 'Hidratadas artesanalmente para conservar su jugosidad natural sin resecarse durante el golpe térmico del horno.',
  col3Title: 'Canela de Ceilán³',
  col3Desc: 'Especias nobles de molienda fresca que desprenden un bouquet cálido y nostálgico desde el primer instante.',
  footerNotes: '1. Avena 100% integral seleccionada sin procesos químicos. 2. Hidratación previa en frío para preservar aceites esenciales. 3. Canela pura de origen certificado.',
  galleryCards: [
    {
      id: 'oat-gal-1',
      image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790543333/oatmeal_transversal_1.png',
      alt: 'Arquitectura exterior caramelizada con copos de avena',
      boldText: 'La arquitectura exterior caramelizada',
      text: ' brinda una resistencia crocante al primer bocado, reteniendo los aromas tostados de la avena y mantequilla en su interior.',
    },
    {
      id: 'oat-gal-2',
      image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790543332/oatmeal_transversal_2.png',
      alt: 'Concentración de pasas jugosas e hidratadas',
      boldText: 'Las pasas dulces e hidratadas',
      text: ' aportan humedad natural continua y una explosión de sabor que equilibra las notas cálidas de canela.',
    },
    {
      id: 'oat-gal-3',
      image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790543332/oatmeal_transversal_3.png',
      alt: 'Miga tierna y esponjosa de grano entero',
      boldText: 'La estructura alveolar de miga',
      text: ' combina grano entero de avena con una masa suave y mantecosa que se deshace lentamente en el paladar.',
      internalTitle: 'Miga aireada\nartesanal',
    },
    {
      id: 'oat-gal-4',
      image: 'https://res.cloudinary.com/yxbhso8s/image/upload/v1790543332/oatmeal_transversal_4.png',
      alt: 'Epicentro denso con especias nobles',
      boldText: 'El epicentro aromático',
      text: ' despliega canela de Ceilán y extracto de vainilla pura, redondeando una experiencia reconfortante en cada bocado.',
    },
  ],
};
COOKIE_CONFIG['oatmeal'] = COOKIE_CONFIG['oatmeal-raisin'];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveCookieVideoToDB(file: Blob, key: string = 'cookie_page_bg'): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadCookieVideoFromDB(key: string = 'cookie_page_bg'): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function clearCookieVideoFromDB(key: string = 'cookie_page_bg'): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {
    // Ignore error
  }
}

export const CookiePage: React.FC<CookiePageProps> = ({ cookieId = 'chocolate-chip', onBack, onNavigateToCookie }) => {
  const currentKey = (cookieId === 'red-velvet' || cookieId === 'pink-velvet' || cookieId === 'redvelvet')
    ? 'red-velvet' 
    : (cookieId === 'cookies-and-cream' || cookieId === 'cookies-cream' || cookieId === 'chocolate-oreo' || cookieId === 'galleta-vaquera')
    ? 'cookies-and-cream'
    : (cookieId === 'oatmeal-raisin' || cookieId === 'oatmeal')
    ? 'oatmeal-raisin'
    : 'chocolate-chip';
  const config = COOKIE_CONFIG[currentKey] || COOKIE_CONFIG['chocolate-chip'];

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_COOKIE_VIDEO);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Estados para el carrusel estilo Apple Ribbon Controller
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progresses, setProgresses] = useState<number[]>([0, 0, 0, 0]);

  // Estado para la Sección 4: Mírala en detalle (Visor de 6 pasos de preparación estilo Apple)
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  // Estado para la animación de ondas concéntricas púrpuras al hacer scroll (Sección 7)
  const section7Ref = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!section7Ref.current) return;
      const rect = section7Ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Progreso de 0 a 1 mientras la sección entra y cruza la ventana
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRedVelvet = currentKey === 'red-velvet';
  const isCookiesCream = currentKey === 'cookies-and-cream';
  const isOatmeal = currentKey === 'oatmeal-raisin';
  const defaultVideo = DEFAULT_COOKIE_VIDEOS[currentKey] || DEFAULT_COOKIE_VIDEOS['chocolate-chip'];
  const dbStorageKey = `cookie_page_bg_${currentKey}`;
  const localUrlKey = `cookie_page_video_url_${currentKey}`;
  const versionKey = `cookie_page_video_version_${currentKey}`;
  const currentVersionTag = currentKey === 'red-velvet'
    ? 'v1_redvelvet'
    : currentKey === 'cookies-and-cream'
    ? 'v3_cookiescream'
    : currentKey === 'oatmeal-raisin'
    ? 'v2_oatmealraisin'
    : 'v2_chocochip';

  // Inicializar video principal
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    async function init() {
      const savedVersion = localStorage.getItem(versionKey);
      if (savedVersion !== currentVersionTag) {
        await clearCookieVideoFromDB(dbStorageKey);
        localStorage.removeItem(localUrlKey);
        localStorage.setItem(versionKey, currentVersionTag);
        setVideoSrc(defaultVideo);
        setIsCustom(false);
        return;
      }

      const savedBlob = await loadCookieVideoFromDB(dbStorageKey);
      if (savedBlob) {
        setVideoSrc(URL.createObjectURL(savedBlob));
        setIsCustom(true);
        return;
      }
      const savedUrl = localStorage.getItem(localUrlKey);
      if (savedUrl) {
        setVideoSrc(savedUrl);
        setIsCustom(true);
      } else {
        setVideoSrc(defaultVideo);
        setIsCustom(false);
      }
    }
    init();
  }, [currentKey]);

  // Asegurar reproducción del video hero
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  // Sincronización del video activo en el carrusel de Apple
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === activeIndex) {
        if (isPlaying) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      } else {
        v.pause();
      }
    });
  }, [activeIndex, isPlaying]);

  // Desplazamiento suave de la tarjeta activa en el carrusel estilo Apple
  const scrollToSlide = (index: number) => {
    setActiveIndex(index);
    if (!carouselTrackRef.current) return;
    const cards = carouselTrackRef.current.querySelectorAll('.apple-highlight-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  // Manejo de actualización de progreso del video activo
  const handleTimeUpdate = (idx: number) => {
    const video = videoRefs.current[idx];
    if (!video || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgresses((prev) => {
      const copy = [...prev];
      copy[idx] = pct;
      return copy;
    });
  };

  // Cuando el video activo termina, avanza al siguiente como en Apple
  const handleVideoEnded = (idx: number) => {
    if (idx < config.highlights.length - 1) {
      scrollToSlide(idx + 1);
    } else {
      // Si llegó al final, vuelve al primero o se detiene
      scrollToSlide(0);
    }
  };

  const toggleGlobalPlay = () => {
    const currentVid = videoRefs.current[activeIndex];
    if (!currentVid) return;

    if (isPlaying) {
      currentVid.pause();
      setIsPlaying(false);
    } else {
      currentVid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await saveCookieVideoToDB(file, dbStorageKey);
      const blobUrl = URL.createObjectURL(file);
      setVideoSrc(blobUrl);
      setIsCustom(true);
      setVideoModalOpen(false);
      showNotice('¡Video local guardado correctamente!');
    } catch {
      const blobUrl = URL.createObjectURL(file);
      setVideoSrc(blobUrl);
      setVideoModalOpen(false);
      showNotice('Video cargado en sesión actual');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = customUrl.trim();
    if (!raw) return;

    let finalUrl = raw;
    const driveMatch1 = raw.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
    const driveMatch2 = raw.match(/drive\.google\.com\/(?:open|uc)\?id=([a-zA-Z0-9_-]+)/i);
    const isBareId = /^[a-zA-Z0-9_-]{25,50}$/.test(raw);

    if (driveMatch1 && driveMatch1[1]) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch1[1]}`;
    } else if (driveMatch2 && driveMatch2[1]) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch2[1]}`;
    } else if (isBareId) {
      finalUrl = `https://drive.google.com/uc?export=download&id=${raw}`;
    }

    setVideoSrc(finalUrl);
    setIsCustom(true);
    localStorage.setItem(localUrlKey, finalUrl);
    setVideoModalOpen(false);
    setCustomUrl('');
    showNotice('¡Video actualizado con éxito!');
  };

  const handleResetVideo = async () => {
    await clearCookieVideoFromDB(dbStorageKey);
    localStorage.removeItem(localUrlKey);
    setVideoSrc(defaultVideo);
    setIsCustom(false);
    setVideoModalOpen(false);
    showNotice('Restablecido al video por defecto');
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#0071E3] selection:text-white antialiased overflow-x-hidden font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',Helvetica,Arial,sans-serif]">
      
      {/* ========================================================================= */}
      {/* SECCIÓN 1: HERO MONUMENTAL CON VIDEO EN LOOP */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black select-none">
        
        {/* Video fijo de fondo optimizado en loop */}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onEnded={(e) => {
            const el = e.currentTarget;
            el.currentTime = 0;
            el.play().catch(() => {});
          }}
        />

        {/* Barra superior oficial de Apple (idéntica a la página principal) */}
        <AppleNav
          onLogoClick={onBack}
          onOpenVideoSettings={() => setVideoModalOpen(true)}
          onOpenCookie={(slug) => {
            if (slug && onNavigateToCookie) {
              onNavigateToCookie(slug);
            }
          }}
        />

        {/* Notificación flotante */}
        {notification && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-amber-400/40 text-amber-300 text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check size={14} />
            <span>{notification}</span>
          </div>
        )}

        {/* Contenido en primer plano con el diseño tipográfico y ubicación idéntica a Apple */}
        <div className="relative h-full w-full pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 z-20">
          
          {/* Botón superior derecho de Pausa/Play estilo Apple como en la imagen */}
          <div className="flex justify-end pt-12 sm:pt-14 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play().catch(() => {});
                  } else {
                    videoRef.current.pause();
                  }
                }
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Pausar o reproducir video"
            >
              <Pause size={18} />
            </button>
          </div>

          {/* Bloque tipográfico inferior izquierdo: Estilo y ubicación EXACTOS de Apple */}
          <div className="max-w-3xl pb-14 sm:pb-16 md:pb-20 text-left pointer-events-auto">
            {/* Cejilla / Eyebrow superior */}
            <p className="text-lg sm:text-2xl md:text-[26px] font-semibold tracking-tight text-white mb-2 md:mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {config.badge}
            </p>

            {/* Titular monumental blanco con la misma escala e impacto de Apple */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-balance">
              {config.title}
            </h1>

            {/* Bajada sutil debajo del titular */}
            <p className="text-xs sm:text-sm md:text-[15px] font-normal text-white/80 mt-3 md:mt-4 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {config.tagline}
            </p>
          </div>

          {/* Botón flotante para ordenar por WhatsApp (minimalista estilo Apple) */}
          <div className="absolute right-6 sm:right-10 md:right-16 lg:right-20 bottom-14 sm:bottom-16 md:bottom-20 pointer-events-auto hidden sm:block">
            <button
              onClick={() => {
                const msg = encodeURIComponent(config.whatsappMessage);
                window.open(`https://wa.me/?text=${msg}`, '_blank');
              }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <ShoppingBag size={16} />
              <span>Pedir ahora</span>
            </button>
          </div>

        </div>

        {/* Botón sutil centrado en el borde inferior para saltar al carrusel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              document.getElementById('apple-highlights-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all text-xs font-medium cursor-pointer shadow-lg"
          >
            <span>Ver aspectos clave</span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 3: "GET THE HIGHLIGHTS" IDÉNTICA A APPLE */}
      {/* ========================================================================= */}
      <section
        id="apple-highlights-section"
        className="relative w-full pt-20 pb-36 bg-[#F5F5F7] text-neutral-900 overflow-hidden"
      >
        {/* Cabecera oficial de Apple */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-10">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F]">
            Conoce los aspectos clave.
          </h2>
        </div>

        {/* Carrusel horizontal con espaciado oficial de Apple */}
        <div
          ref={carouselTrackRef}
          className="flex gap-5 md:gap-7 overflow-x-auto px-6 md:px-[max(24px,calc((100vw-1200px)/2))] pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {config.highlights.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => scrollToSlide(idx)}
              className="apple-highlight-card relative flex-shrink-0 w-[84vw] sm:w-[560px] md:w-[760px] lg:w-[860px] h-[520px] md:h-[600px] rounded-[28px] md:rounded-[32px] overflow-hidden bg-black snap-start cursor-pointer shadow-[0_12px_40px_rgba(0,0,0,0.12)] select-none group"
            >
              {/* Video de fondo */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={item.videoUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={() => handleTimeUpdate(idx)}
                onEnded={() => handleVideoEnded(idx)}
              />

              {/* Degradado superior sutil para dar legibilidad perfecta a la tipografía Apple */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/75 pointer-events-none" />

              {/* Tipografía Monumental en dos tonos (Estilo Oficial Apple) */}
              <div className="relative z-10 p-7 md:p-12 max-w-2xl">
                <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-amber-300 mb-2 font-mono">
                  {item.sublabel}
                </p>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-[1.15] tracking-tight">
                  <span className="text-white font-semibold">
                    {item.lead}
                  </span>
                  <span className="text-white/60 font-normal">
                    {item.tail}
                  </span>
                </h3>
              </div>

              {/* Botón flotante inferior sutil estilo Apple */}
              <div className="absolute bottom-6 left-7 md:left-12 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const msg = encodeURIComponent(`¡Hola! Me encantó: "${item.lead}". Deseo pedir galletas.`);
                    window.open(`https://wa.me/?text=${msg}`, '_blank');
                  }}
                  className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-xl border border-white/20 text-white text-xs md:text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                >
                  Pedir esta receta
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================================== */}
        {/* LA CÁPSULA FLOTANTE OFICIAL DE CONTROL APPLE (Pill Controller)        */}
        {/* ===================================================================== */}
        <div className="mt-8 flex justify-center px-4">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#E8E8ED]/90 backdrop-blur-xl border border-[#D2D2D7]/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            
            {/* Barritas de progreso segmentadas (una por cada video) */}
            <div className="flex items-center gap-2">
              {config.highlights.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isPassed = idx < activeIndex;
                const currentPct = isActive ? progresses[idx] || 0 : isPassed ? 100 : 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSlide(idx)}
                    className="relative py-1 px-0.5 cursor-pointer group"
                    title={`Ir al video ${idx + 1}`}
                  >
                    {/* Track gris */}
                    <div
                      className={`h-2 rounded-full transition-all duration-300 overflow-hidden ${
                        isActive ? 'w-16 bg-[#D2D2D7]' : 'w-2 bg-[#D2D2D7]/80 hover:bg-[#86868B]'
                      }`}
                    >
                      {/* Relleno negro dinámico sincronizado con el video */}
                      {isActive && (
                        <div
                          className="h-full bg-[#1D1D1F] transition-all duration-100 ease-linear rounded-full"
                          style={{ width: `${currentPct}%` }}
                        />
                      )}
                      {!isActive && isPassed && (
                        <div className="h-full w-full bg-[#1D1D1F] rounded-full" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Separador vertical sutil */}
            <div className="w-px h-4 bg-[#D2D2D7]" />

            {/* Botón circular de Reproducir / Pausar general estilo Apple */}
            <button
              onClick={toggleGlobalPlay}
              className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 border border-[#D2D2D7]/80 text-[#1D1D1F] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
              title={isPlaying ? 'Pausar presentación' : 'Reproducir presentación'}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause size={12} fill="currentColor" />
              ) : (
                <Play size={12} fill="currentColor" className="ml-0.5" />
              )}
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 4: "MÍRALA EN DETALLE" (FORMATO TARJETA MONUMENTAL ESTILO APPLE) */}
      {/* ========================================================================= */}
      <section
        id="closer-look-section"
        className="relative w-full pt-16 pb-36 bg-[#F5F5F7] text-neutral-900 overflow-hidden select-none border-t border-neutral-200/60"
      >
        {/* Cabecera oficial de Apple */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-10">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F]">
            Mírala en detalle.
          </h2>
        </div>

        {/* Tarjeta de Estudio Monumental a Escala Completa Apple (Ultra Expandida Horizontalmente) */}
        <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 md:px-8">
          <div className="relative w-full h-[520px] sm:h-[620px] md:h-[720px] lg:h-[800px] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-neutral-200/80 group">
            
            {/* Capa de fondo con degradado sutil de estudio limpio */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFC] via-white to-[#F5F5F7]/80 pointer-events-none" />

            {/* Escenario central de la figura ultra-expandido horizontalmente de borde a borde */}
            <div className="absolute inset-0 flex items-center justify-center p-0 overflow-hidden">
              {config.preparationSteps.map((step, idx) => {
                const isCurrent = activeStepIndex === idx;
                const isPrev = idx < activeStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isCurrent
                        ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                        : isPrev
                        ? 'opacity-0 -translate-x-32 scale-95 pointer-events-none'
                        : 'opacity-0 translate-x-32 scale-95 pointer-events-none'
                    }`}
                  >
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover object-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                );
              })}
            </div>

            {/* Botón flotante inferior sutil estilo Apple dentro de la tarjeta */}
            <div className="absolute bottom-6 left-7 md:left-12 z-20">
              <button
                type="button"
                onClick={() => {
                  const msg = encodeURIComponent(`¡Hola! Estoy viendo el paso "${config.preparationSteps[activeStepIndex]?.title || ''}". Quiero pedir una caja de galletas recién horneadas.`);
                  window.open(`https://wa.me/?text=${msg}`, '_blank');
                }}
                className="px-5 py-2.5 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs md:text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md flex items-center gap-2"
              >
                <ShoppingBag size={14} />
                <span>Pedir este lote</span>
              </button>
            </div>

            {/* Flechas de navegación a los lados dentro de la tarjeta */}
            <button
              type="button"
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : config.preparationSteps.length - 1))}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-neutral-300/80 text-[#1D1D1F] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer z-20"
              aria-label="Paso anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={() => setActiveStepIndex((prev) => (prev < config.preparationSteps.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-neutral-300/80 text-[#1D1D1F] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer z-20"
              aria-label="Paso siguiente"
            >
              <ChevronRight size={22} />
            </button>

          </div>
        </div>

        {/* ===================================================================== */}
        {/* LA CÁPSULA INFERIOR DE FIGURAS DE APPLE (Thumbnails Floating Pill)    */}
        {/* ===================================================================== */}
        <div className="mt-8 flex justify-center px-4">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#E8E8ED]/90 backdrop-blur-2xl border border-[#D2D2D7]/70 shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-x-auto max-w-full">
            {config.preparationSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-md ring-2 ring-[#1D1D1F] scale-105'
                      : 'bg-transparent hover:bg-white/60 opacity-60 hover:opacity-100'
                  }`}
                  title={step.shortLabel}
                  aria-label={`Ver ${step.shortLabel}`}
                >
                  {/* Miniatura de la figura en círculo limpio */}
                  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center p-0.5">
                    <img
                      src={step.imageUrl}
                      alt={step.shortLabel}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Indicador inferior cuando está activo */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#1D1D1F]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 5: HISTORIA DE PRODUCTO (FULL-BLEED CINEMATIC STORY - ESTILO APPLE) */}
      {/* Réplica exacta de la sección "Cancelación de ruido excepcional" de Apple  */}
      {/* ========================================================================= */}
      <section
        id="product-story-section"
        className="relative w-full h-screen min-h-[640px] md:min-h-[850px] bg-[#060B18] text-white flex flex-col items-center justify-start overflow-hidden select-none"
      >
        {/* IMAGEN DE FONDO A PANTALLA COMPLETA TOTAL (Full-bleed cover) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src={config.section5Image}
            alt={config.section5Title}
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
        </div>

        {/* Viñeta sutil en la parte superior para máxima legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none z-10" />

        {/* Tipografía Monumental Centrada al estilo exacto de Apple */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 pt-16 sm:pt-20 md:pt-28 text-center">
          <p className="text-sm md:text-base font-semibold tracking-wide text-amber-200/90 mb-3 md:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {config.section5Tag}
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-semibold tracking-tight leading-[1.1] text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {config.section5Title}
          </h2>
        </div>

        {/* Suave degradado inferior para fundir con el footer o siguiente sección */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 6: CARACTERÍSTICAS TÉCNICAS (APPLE 3-COLUMN FEATURE GRID)         */}
      {/* Réplica exacta del bloque "Menos ruido. Toda la magia." adaptado a Cookie */}
      {/* ========================================================================= */}
      <section className="relative w-full py-28 md:py-36 bg-[#F5F5F7] text-[#1D1D1F] border-t border-neutral-200/80">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          
          {/* Encabezado y Párrafo Editorial Apple */}
          <div className="max-w-[760px] mx-auto text-center mb-20 md:mb-24">
            <h3 className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-[#1D1D1F] leading-tight mb-4">
              {config.section6Subtitle}
            </h3>
            <p className="text-base sm:text-lg md:text-[19px] text-[#86868B] font-normal leading-relaxed text-balance">
              {config.section6Desc}
            </p>
          </div>

          {/* Grid de 3 Columnas con Iconografía y Tipografía de Precisión Apple */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-14">
            
            {/* Columna 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#1D1D1F]">
                {/* Ícono personalizado estilo Apple: Aura / Ingredientes nobles */}
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="14" r="4" fill="currentColor" fillOpacity="0.1" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
              <h4 className="text-base sm:text-[17px] font-semibold text-[#1D1D1F] mb-2 tracking-tight">
                {config.col1Title}
              </h4>
              <p className="text-[14px] sm:text-[15px] text-[#6E6E73] leading-relaxed">
                {config.col1Desc}
              </p>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#1D1D1F]">
                {/* Ícono estilo Apple: Destello / Textura Dual */}
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M5 3v4" />
                  <path d="M3 5h4" />
                </svg>
              </div>
              <h4 className="text-base sm:text-[17px] font-semibold text-[#1D1D1F] mb-2 tracking-tight">
                {config.col2Title}
              </h4>
              <p className="text-[14px] sm:text-[15px] text-[#6E6E73] leading-relaxed">
                {config.col2Desc}
              </p>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-14 h-14 flex items-center justify-center mb-5 text-[#1D1D1F]">
                {/* Ícono estilo Apple: Sonoridad crujiente / Escamas de sal marina */}
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10v3" />
                  <path d="M6 6v11" />
                  <path d="M10 3v18" />
                  <path d="M14 8v7" />
                  <path d="M18 5v13" />
                  <path d="M22 10v4" />
                </svg>
              </div>
              <h4 className="text-base sm:text-[17px] font-semibold text-[#1D1D1F] mb-2 tracking-tight">
                {config.col3Title}
              </h4>
              <p className="text-[14px] sm:text-[15px] text-[#6E6E73] leading-relaxed">
                {config.col3Desc}
              </p>
            </div>

          </div>

          {/* Notas al pie discretas estilo Apple */}
          <div className="mt-16 pt-8 border-t border-neutral-300/60 max-w-[760px] mx-auto text-center">
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              {config.footerNotes}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 7: RENDIMIENTO DE SABOR - «UNA MEJORA RESONANTE» (ESTILO APPLE)   */}
      {/* Las ondas concéntricas abarcan TODA la pantalla (full-bleed 100vw)         */}
      {/* Tonos rojizos/carmesí para Red Velvet, púrpuras para Chocolate Chip       */}
      {/* ========================================================================= */}
      <section
        ref={section7Ref}
        id="flavor-performance-section"
        className={`relative w-full ${isRedVelvet ? 'bg-[#150207]' : isCookiesCream ? 'bg-[#08090C]' : 'bg-[#100322]'} text-white overflow-hidden select-none`}
      >
        {/* ===================================================================== */}
        {/* ESCENARIO DE ONDAS CONCÉNTRICAS A PANTALLA COMPLETA (FULL-BLEED)        */}
        {/* ===================================================================== */}
        <div className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* FONDO MONUMENTAL: Gradientes radiales concéntricos que cubren toda la pantalla */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `scale(${0.92 + scrollProgress * 0.38})`,
            }}
          >
            {/* Capa 0: Fondo base nocturno que llena todos los rincones */}
            <div className={`absolute inset-0 ${isRedVelvet ? 'bg-[#150207]' : isCookiesCream ? 'bg-[#08090C]' : 'bg-[#100322]'}`} />

            {/* Onda gigante 5: Abarca toda la pantalla de borde a borde */}
            <div
              className={`absolute w-[180vw] h-[180vw] min-w-[1600px] min-h-[1600px] rounded-full ${
                isRedVelvet
                  ? 'bg-[#7f0d26]/35'
                  : isCookiesCream
                  ? 'bg-[#2A313D]/45'
                  : isOatmeal
                  ? 'bg-[#78350f]/35'
                  : 'bg-[#5b159d]/30'
              } blur-[60px]`}
            />

            {/* Onda concéntrica 4 */}
            <div
              className={`absolute w-[135vw] h-[135vw] min-w-[1250px] min-h-[1250px] rounded-full ${
                isRedVelvet
                  ? 'bg-[#9f1239]/45 border border-[#fb7185]/20'
                  : isCookiesCream
                  ? 'bg-[#333C4D]/55 border border-[#CBD5E1]/25'
                  : isOatmeal
                  ? 'bg-[#92400e]/45 border border-[#fde68a]/20'
                  : 'bg-[#721ca8]/45 border border-[#c084fc]/15'
              }`}
            />

            {/* Onda concéntrica 3 */}
            <div
              className={`absolute w-[98vw] h-[98vw] min-w-[920px] min-h-[920px] rounded-full ${
                isRedVelvet
                  ? 'bg-[#be123c]/65 border border-[#fda4af]/30 shadow-[0_0_100px_rgba(190,18,60,0.45)]'
                  : isCookiesCream
                  ? 'bg-[#475569]/70 border border-[#E2E8F0]/35 shadow-[0_0_100px_rgba(226,232,240,0.3)]'
                  : isOatmeal
                  ? 'bg-[#b45309]/65 border border-[#fef3c7]/30 shadow-[0_0_100px_rgba(180,83,9,0.45)]'
                  : 'bg-[#8b23c8]/65 border border-[#d8b4fe]/25 shadow-[0_0_100px_rgba(139,35,200,0.4)]'
              }`}
            />

            {/* Onda concéntrica 2 */}
            <div
              className={`absolute w-[68vw] h-[68vw] min-w-[650px] min-h-[650px] rounded-full ${
                isRedVelvet
                  ? 'bg-[#e11d48] border border-[#ffe4e6]/45 shadow-[0_0_120px_rgba(225,29,72,0.55)]'
                  : isCookiesCream
                  ? 'bg-[#64748B] border border-white/60 shadow-[0_0_125px_rgba(255,255,255,0.4)]'
                  : isOatmeal
                  ? 'bg-[#d97706] border border-[#fef3c7]/45 shadow-[0_0_120px_rgba(217,119,6,0.55)]'
                  : 'bg-[#a833dc] border border-[#f3e8ff]/40 shadow-[0_0_120px_rgba(168,51,220,0.5)]'
              }`}
            />

            {/* Esfera central 1: Epicentro ultra-iluminado */}
            <div
              className={`absolute w-[44vw] h-[44vw] min-w-[420px] min-h-[420px] rounded-full ${
                isRedVelvet
                  ? 'bg-gradient-to-b from-[#fb7185] via-[#e11d48] to-[#9f1239] shadow-[0_0_160px_rgba(251,113,133,0.75)]'
                  : isCookiesCream
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] shadow-[0_0_160px_rgba(255,255,255,0.75)] border border-white/80'
                  : isOatmeal
                  ? 'bg-gradient-to-b from-[#fbbf24] via-[#d97706] to-[#78350f] shadow-[0_0_160px_rgba(251,191,36,0.75)] border border-[#fef3c7]/40'
                  : 'bg-gradient-to-b from-[#e980fa] via-[#cf59f7] to-[#aa29e6] shadow-[0_0_160px_rgba(233,128,250,0.7)]'
              }`}
            />
          </div>

          {/* CAPA INTERMEDIA: Textos situados en el corazón de la esfera */}
          <div
            className="relative z-30 max-w-4xl mx-auto px-6 text-center transition-all duration-300 ease-out will-change-transform pt-14 sm:pt-18 md:pt-20"
            style={{
              transform: `translateY(${-(scrollProgress - 0.4) * 35}px)`,
              opacity: Math.max(0.35, Math.min(1, 1 - (scrollProgress - 0.65) * 2)),
            }}
          >
            <p
              className={`text-base sm:text-lg md:text-xl font-medium tracking-tight mb-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] ${
                isCookiesCream ? 'text-neutral-900 font-semibold' : 'text-white/95'
              }`}
            >
              Rendimiento de sabor
            </p>
            <h2
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-[90px] font-semibold tracking-tight leading-[1.02] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] ${
                isCookiesCream ? 'text-neutral-950' : 'text-white'
              }`}
            >
              Una mejora<br />resonante.
            </h2>
          </div>

          {/* CAPA DE PRIMER PLANO: La galleta flotante sobre la esfera */}
          <div
            className={`relative z-20 w-full max-w-6xl mx-auto px-6 ${
              isOatmeal ? 'mt-4 sm:mt-6 md:mt-8 pb-8' : 'mt-2 sm:mt-4 md:mt-6 pb-6'
            } flex items-center justify-center transition-transform duration-300 ease-out will-change-transform`}
            style={{
              transform: `translateY(${-(scrollProgress - 0.3) * 30}px) scale(${0.96 + scrollProgress * 0.1})`,
            }}
          >
            <div className="relative group cursor-pointer flex items-center justify-center">
              {/* Rim light detrás de la galleta */}
              <div
                className={`absolute -inset-8 sm:-inset-12 rounded-full blur-3xl ${
                  isRedVelvet
                    ? 'bg-gradient-to-t from-rose-600/60 via-red-400/30 to-transparent'
                    : isCookiesCream
                    ? 'bg-gradient-to-t from-white/70 via-slate-200/40 to-transparent'
                    : isOatmeal
                    ? 'bg-gradient-to-t from-amber-500/70 via-amber-300/40 to-transparent'
                    : 'bg-gradient-to-t from-purple-500/50 via-purple-400/25 to-transparent'
                }`}
              />
              
              {/* Sombra suave de oclusión */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-black/90 blur-2xl rounded-full" />

              <img
                src={config.floatingCookieImage}
                alt="Arquitectura y textura de la galleta"
                className={`relative z-10 ${
                  isOatmeal
                    ? 'max-w-[460px] sm:max-w-[680px] md:max-w-[860px] lg:max-w-[1000px] scale-110 sm:scale-115 md:scale-120'
                    : 'max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px]'
                } w-full h-auto object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-700`}
              />
            </div>
          </div>

        </div>

        {/* Transición gradual hacia el negro de las tarjetas */}
        <div
          className={`relative z-10 w-full bg-gradient-to-b from-transparent ${
            isRedVelvet ? 'via-[#100205]' : isCookiesCream ? 'via-[#08090C]' : isOatmeal ? 'via-[#0f0a04]' : 'via-[#08020f]'
          } to-[#000000] pt-12 pb-20 md:pb-28`}
        >
          
          {/* Descripción editorial intermedia */}
          <div className="max-w-2xl mx-auto px-6 text-center mb-16 md:mb-24">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-3">
              Sumérgete en una experiencia multisensorial.
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              {isRedVelvet
                ? 'Gracias a una matriz interna de cocción por capas y emulsión térmica controlada, cada galleta Red Velvet logra una distribución precisa de queso crema fundente y notas de cacao fino, desatando una textura aterciopelada ininterrumpida.'
                : isCookiesCream
                ? 'Gracias a una matriz interna de cocción por capas y emulsión térmica controlada, cada galleta Cookies & Cream logra una fusión magistral de trozos crocantes de galleta oscura y una suave mezcla cremosa, desatando una textura dual ininterrumpida.'
                : isOatmeal
                ? 'Gracias a una matriz interna de cocción por capas y emulsión térmica controlada, cada galleta Oatmeal Raisin logra una distribución uniforme de copos de avena tostada y pasas hidratadas, desatando una mordida tierna y un reconfortante aroma a canela.'
                : 'Gracias a una matriz interna de cocción por capas y emulsión térmica controlada, cada galleta logra una distribución matemática de núcleos de cacao semiamargo al 70%, desatando crujidos profundos en los bordes y un centro cremoso ininterrumpido.'}
            </p>
          </div>

        {/* ===================================================================== */}
        {/* GALERÍA DE 4 TARJETAS VERTICALES CON ESQUINAS ULTRA-REDONDEADAS       */}
        {/* RÉPLICA EXACTA DE LA IMAGEN DE REFERENCIA DE APPLE (FORMATO GRANDE)    */}
        {/* ===================================================================== */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-12 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
            {config.galleryCards.map((card) => (
              <div key={card.id} className="flex flex-col">
                <div
                  className={`relative w-full aspect-[4/7] min-h-[480px] sm:min-h-[560px] md:min-h-[640px] rounded-[40px] overflow-hidden bg-neutral-900 border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group ${
                    card.internalTitle ? 'flex flex-col justify-end p-8 sm:p-9' : ''
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                      card.internalTitle ? 'absolute inset-0' : ''
                    }`}
                  />
                  {card.internalTitle && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                      <h3 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight whitespace-pre-line">
                        {card.internalTitle}
                      </h3>
                    </>
                  )}
                </div>
                <div className="pt-6 px-1">
                  <p className="text-[15px] sm:text-[17px] text-[#A1A1A6] leading-relaxed">
                    <strong className="text-white font-semibold block sm:inline">{card.boldText}</strong>
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

      </section>

      {/* MODAL PARA CAMBIAR VIDEO DE ESTA VENTANA INTERNA */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-6 text-left shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Video size={16} className="text-amber-400" />
                <span className="text-white text-sm font-medium">Video de {config.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Upload size={14} className="text-amber-400" />
                  <p className="text-xs font-medium text-white">1. Subir video desde tu dispositivo</p>
                </div>
                <p className="text-[11px] text-white/60">
                  Selecciona un archivo (.mp4, .webm). Se guardará de manera permanente en tu navegador para esta ventana.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white text-black text-xs font-medium rounded-full py-2.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Examinar archivo de video...
                </button>
              </div>

              <form onSubmit={handleUrlSubmit} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2">
                  <LinkIcon size={14} className="text-amber-400" />
                  <p className="text-xs font-medium text-white">2. O ingresar URL directa / Cloudinary / Drive</p>
                </div>
                <p className="text-[11px] text-white/60">
                  Pega cualquier enlace directo a video (.mp4) o enlace de Google Drive.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://.../video.mp4 o enlace Drive"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/20 rounded-full px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>

              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetVideo}
                  className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Restablecer video original</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
