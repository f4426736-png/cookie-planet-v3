import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Menu, ExternalLink } from 'lucide-react';

interface RedesSocialesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85';

interface SocialPlanetItem {
  orbit: number;
  angle: number;
  radius: number;
  size: number;
  isSquare: boolean;
  glow: string;
  bgColor: string;
  name: string;
  handle: string;
  url: string;
  delay: number;
  icon: (sizeClass: string) => React.ReactNode;
}

// 14 Popular Social Networks distributed across the 4 enlarged concentric orbits
const SOCIAL_NETWORKS: SocialPlanetItem[] = [
  // --- ÓRBITA 1 (Interior) ---
  {
    orbit: 1,
    angle: 90,
    radius: 200,
    size: 72,
    isSquare: false,
    glow: 'rgba(255, 252, 0, 0.9)',
    bgColor: '#FFFC00',
    name: 'Snapchat',
    handle: '@cookieplanetsnap',
    url: 'https://snapchat.com',
    delay: 0.5,
    icon: (cls) => (
      <svg className={`${cls} text-black`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.016 2.016c-3.797 0-6.047 2.766-6.047 5.766 0 .844.234 2.156.422 2.859-.422.188-1.359.609-1.547 1.453-.141.563.328 1.078.891 1.078.234 0 .469-.094.703-.234-.141.797-.375 2.109-1.219 2.531-.469.234-.844.75-.469 1.313.422.609 1.453.609 2.297.422.75-.188 1.547-.563 2.156-.234.656.375 1.313 1.031 2.813 1.031 1.453 0 2.109-.656 2.766-1.031.609-.328 1.406.047 2.156.234.844.188 1.875.188 2.297-.422.375-.563 0-1.078-.469-1.313-.844-.422-1.078-1.734-1.219-2.531.234.141.469.234.703.234.563 0 1.031-.516.891-1.078-.188-.844-1.125-1.266-1.547-1.453.188-.703.422-2.016.422-2.859 0-3-2.25-5.766-6.047-5.766z" />
      </svg>
    ),
  },
  {
    orbit: 1,
    angle: 270,
    radius: 200,
    size: 76,
    isSquare: true,
    glow: 'rgba(225, 48, 108, 0.9)',
    bgColor: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
    name: 'Instagram',
    handle: '@cookieplanet',
    url: 'https://instagram.com',
    delay: 0.7,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },

  // --- ÓRBITA 2 ---
  {
    orbit: 2,
    angle: 0,
    radius: 280,
    size: 74,
    isSquare: false,
    glow: 'rgba(0, 136, 204, 0.9)',
    bgColor: '#0088cc',
    name: 'Telegram',
    handle: 't.me/cookieplanet',
    url: 'https://telegram.org',
    delay: 0.85,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.942z"/>
      </svg>
    ),
  },
  {
    orbit: 2,
    angle: 90,
    radius: 280,
    size: 78,
    isSquare: false,
    glow: 'rgba(0, 242, 234, 0.9)',
    bgColor: '#000000',
    name: 'TikTok',
    handle: '@cookieplanet.tok',
    url: 'https://tiktok.com',
    delay: 1.0,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.316-4.639c.307 0 .604.05.882.138V9.378a6.37 6.37 0 0 0-.882-.063 6.34 6.34 0 0 0-6.338 6.342 6.34 6.34 0 0 0 6.338 6.343 6.34 6.34 0 0 0 6.338-6.343V9.177a8.163 8.163 0 0 0 4.762 1.514V7.246a4.79 4.79 0 0 1-1.002-.56z"/>
      </svg>
    ),
  },
  {
    orbit: 2,
    angle: 180,
    radius: 280,
    size: 96,
    isSquare: false,
    glow: 'rgba(255, 0, 0, 0.9)',
    bgColor: '#FF0000',
    name: 'YouTube',
    handle: 'Cookie Planet TV',
    url: 'https://youtube.com',
    delay: 1.15,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    orbit: 2,
    angle: 270,
    radius: 280,
    size: 74,
    isSquare: true,
    glow: 'rgba(37, 211, 102, 0.9)',
    bgColor: '#25D366',
    name: 'WhatsApp',
    handle: '+52 Pedidos Express',
    url: 'https://whatsapp.com',
    delay: 1.3,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 0C5.397 0 .015 5.382.015 12.016c0 2.12.553 4.187 1.604 6.012L0 24l6.166-1.617a12.003 12.003 0 0 0 5.865 1.517h.005c6.633 0 12.016-5.383 12.016-12.017C24.052 5.382 18.669 0 12.031 0zm6.985 17.067c-.287.808-1.42 1.48-1.956 1.573-.504.088-1.157.126-3.32-.77-2.766-1.144-4.542-3.945-4.678-4.128-.135-.183-1.115-1.484-1.115-2.83 0-1.346.703-2.008.953-2.278.25-.27.545-.337.728-.337.182 0 .365.002.524.01.17.009.397-.064.62.473.23.554.78 1.905.847 2.043.068.138.113.3.023.483-.09.183-.135.297-.27.458-.135.162-.284.36-.406.483-.135.136-.277.284-.118.558.158.273.704 1.161 1.513 1.882 1.042.928 1.92 1.215 2.193 1.352.273.136.432.114.591-.068.16-.183.682-.793.864-1.066.182-.273.364-.228.614-.136.25.09 1.58.745 1.853.882.273.136.455.205.523.318.068.114.068.66-.219 1.468z"/>
      </svg>
    ),
  },

  // --- ÓRBITA 3 ---
  {
    orbit: 3,
    angle: 45,
    radius: 360,
    size: 80,
    isSquare: false,
    glow: 'rgba(24, 119, 242, 0.9)',
    bgColor: '#1877F2',
    name: 'Facebook',
    handle: 'Cookie Planet Oficial',
    url: 'https://facebook.com',
    delay: 1.4,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    orbit: 3,
    angle: 150,
    radius: 360,
    size: 104,
    isSquare: false,
    glow: 'rgba(30, 215, 96, 0.9)',
    bgColor: '#1ED760',
    name: 'Spotify',
    handle: 'Cookie Beats Playlist',
    url: 'https://spotify.com',
    delay: 1.55,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    orbit: 3,
    angle: 255,
    radius: 360,
    size: 80,
    isSquare: true,
    glow: 'rgba(10, 102, 194, 0.9)',
    bgColor: '#0A66C2',
    name: 'LinkedIn',
    handle: 'Cookie Planet Co.',
    url: 'https://linkedin.com',
    delay: 1.7,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },

  // --- ÓRBITA 4 (Exterior) ---
  {
    orbit: 4,
    angle: 15,
    radius: 440,
    size: 76,
    isSquare: false,
    glow: 'rgba(255, 255, 255, 0.9)',
    bgColor: '#000000',
    name: 'X (Twitter)',
    handle: '@cookieplanet_x',
    url: 'https://twitter.com',
    delay: 1.8,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    orbit: 4,
    angle: 85,
    radius: 440,
    size: 104,
    isSquare: true,
    glow: 'rgba(230, 0, 35, 0.9)',
    bgColor: '#E60023',
    name: 'Pinterest',
    handle: 'Cookie Moodboards',
    url: 'https://pinterest.com',
    delay: 1.95,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.5.03-3.57.14-.98.92-3.9 1.9-3.9s.6.48.6 1.18c0 1.1-.7 2.74-.7 4.26 0 1.25.92 2.28 2.15 2.28 2.58 0 4.56-2.72 4.56-6.64 0-3.48-2.5-5.91-6.08-5.91-4.14 0-6.57 3.1-6.57 6.31 0 1.25.48 2.59 1.08 3.32.12.15.14.28.1.43-.11.45-.36 1.45-.4 1.65-.06.26-.2.32-.46.2-1.72-.8-2.79-3.3-2.79-5.32 0-4.33 3.15-8.31 9.08-8.31 4.77 0 8.48 3.4 8.48 7.94 0 4.74-2.99 8.56-7.14 8.56-1.39 0-2.7-.72-3.15-1.58l-.86 3.28c-.31 1.2-1.15 2.7-1.72 3.61A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
      </svg>
    ),
  },
  {
    orbit: 4,
    angle: 155,
    radius: 440,
    size: 80,
    isSquare: false,
    glow: 'rgba(255, 69, 0, 0.9)',
    bgColor: '#FF4500',
    name: 'Reddit',
    handle: 'r/cookieplanet',
    url: 'https://reddit.com',
    delay: 2.1,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.095.326.326 0 0 0 0 .462c.983.984 2.684.984 3.668 0a.327.327 0 0 0-.462-.462c-.73.73-1.99.73-2.743 0a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
  },
  {
    orbit: 4,
    angle: 230,
    radius: 440,
    size: 104,
    isSquare: true,
    glow: 'rgba(88, 101, 242, 0.9)',
    bgColor: '#5865F2',
    name: 'Discord',
    handle: 'Cookie Club VIP',
    url: 'https://discord.com',
    delay: 2.2,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    orbit: 4,
    angle: 300,
    radius: 440,
    size: 76,
    isSquare: false,
    glow: 'rgba(160, 104, 255, 0.9)',
    bgColor: '#000000',
    name: 'Threads',
    handle: '@cookieplanet.app',
    url: 'https://threads.net',
    delay: 2.3,
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24C5.454 24 0 18.57 0 11.864 0 5.16 5.454 0 12.186 0c6.643 0 11.931 5.253 11.931 11.864 0 .616-.048 1.23-.144 1.836h-4.32a7.66 7.66 0 0 0-.17-1.018 7.397 7.397 0 0 0-7.297-5.99c-4.103 0-7.44 3.323-7.44 7.408 0 4.086 3.337 7.41 7.44 7.41 2.378 0 4.496-1.129 5.864-2.885.644.423 1.353.766 2.106 1.017C18.17 22.25 15.347 24 12.186 24zm4.072-13.914c.054.437.082.883.082 1.336 0 3.01-1.63 5.345-4.154 5.345-1.22 0-2.342-.647-2.92-1.685a3.86 3.86 0 0 1-.397-1.745c0-2.274 1.63-4.12 3.843-4.12.924 0 1.776.326 2.45.875l1.096-.006z"/>
      </svg>
    ),
  },
];

const LOGOS = [
  {
    name: 'Instagram',
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg',
    subtitle: '50k+ Followers',
  },
  {
    name: 'TikTok',
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg',
    subtitle: 'Viral Recipes',
  },
  {
    name: 'YouTube',
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg',
    subtitle: 'Baking Shows',
  },
  {
    name: 'Spotify',
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg',
    subtitle: 'Cookie Vibes',
  },
  {
    name: 'Community Discord',
    src: 'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg',
    subtitle: 'VIP Drops',
  },
];

const FULL_TEXT =
  'Conéctate a la Galaxia Cookie Planet — ¡El hype, las recetas y drops exclusivos en un solo lugar!';
const DARK_CHAR_COUNT = 38;

export const RedesSocialesModal: React.FC<RedesSocialesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [count, setCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) {
      setTypedText('');
      setIsTypingDone(false);
      setCount(0);
      return;
    }

    let currentIndex = 0;
    const initialDelay = setTimeout(() => {
      typingTimerRef.current = setInterval(() => {
        if (currentIndex < FULL_TEXT.length) {
          currentIndex++;
          setTypedText(FULL_TEXT.slice(0, currentIndex));
        } else {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setIsTypingDone(true);
        }
      }, 30);
    }, 400);

    return () => {
      clearTimeout(initialDelay);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [isOpen]);

  // Count up animation: 0 to 50 (50k+ Cookie Lovers)
  useEffect(() => {
    if (!isOpen) return;

    let start = 0;
    const end = 50;
    const duration = 2000;
    const startTime = Date.now() + 1200;

    const timer = setInterval(() => {
      const now = Date.now();
      if (now < startTime) return;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeVal = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (end - start) * easeVal);

      setCount(currentVal);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden text-white font-sans selection:bg-[#A068FF] selection:text-black animate-in fade-in duration-300"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#070319',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Floating Exit Button */}
      <button
        onClick={onClose}
        aria-label="Cerrar ventana Redes Sociales"
        className="fixed top-5 right-5 z-50 bg-[#060218]/90 hover:bg-[#060218] border border-white/20 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:scale-105"
      >
        <X className="w-3.5 h-3.5 text-[#A068FF]" />
        <span>Volver a Cookie Planet</span>
      </button>

      {/* Main Container */}
      <div className="w-full min-h-screen flex flex-col justify-between max-w-[1920px] mx-auto relative z-10 px-4 sm:px-8 md:px-12 py-6 sm:py-8">
        {/* HEADER */}
        <header className="w-full flex items-center justify-between py-2 sm:py-4">
          {/* Left: Brand + Nav Links */}
          <div className="flex items-center gap-6 md:gap-10">
            <a
              href="#cookie-planet"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A068FF] via-purple-400 to-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(160,104,255,0.6)]">
                <span className="text-black font-black text-sm">🍪</span>
              </div>
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: "'Urbanist', sans-serif" }}
                  className="font-bold text-lg text-black tracking-tight"
                >
                  COOKIE PLANET
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#060218]/80 font-semibold -mt-1">
                  Social Space
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: 'Instagram Feed', href: 'https://instagram.com' },
                { label: 'TikTok Recetas', href: 'https://tiktok.com' },
                { label: 'Comunidad VIP', href: '#comunidad' },
                { label: 'Playlist Spotify', href: 'https://spotify.com' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative text-[15px] font-medium text-[#000000] py-1 transition-colors group cursor-pointer flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A068FF] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="relative text-[15px] font-medium text-white py-1 transition-colors group cursor-pointer"
            >
              <span>Ver Stories</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>

            {/* "Join Now" Pill Button with rotating conic-gradient border */}
            <div className="btn-border-wrap">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden rounded-full bg-[#000000] text-white px-6 py-2.5 text-[15px] font-medium transition-all group cursor-pointer inline-flex items-center gap-2 z-10"
              >
                <span className="absolute inset-0 bg-[#A068FF] -translate-x-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 -z-10" />
                <span className="relative z-10 group-hover:text-black font-semibold transition-colors duration-200">
                  Seguir @cookieplanet
                </span>
                <ChevronRight className="w-4 h-4 relative z-10 group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-black/40 border border-white/20 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* HERO SECTION */}
        <div className="w-full flex-1 flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12 py-6 sm:py-10">
          {/* HERO LEFT */}
          <div className="w-full xl:max-w-[540px] 2xl:max-w-[620px] flex flex-col items-start pt-2 xl:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-ping" />
              <span>Nuestra Galaxia Digital</span>
            </div>

            {/* Typewriter Heading */}
            <h1
              style={{
                fontFamily: "'Urbanist', sans-serif",
                lineHeight: 1.08,
                letterSpacing: '-1.5px',
              }}
              className="text-[34px] sm:text-[46px] md:text-[54px] lg:text-[58px] font-semibold tracking-tight min-h-[140px] sm:min-h-[180px]"
            >
              <span className="text-[#000000]">
                {typedText.slice(0, DARK_CHAR_COUNT)}
              </span>
              <span className="text-[#ffffff]">
                {typedText.slice(DARK_CHAR_COUNT)}
              </span>
              {!isTypingDone && (
                <span className="inline-block w-1 h-[42px] sm:h-[54px] bg-[#A068FF] ml-1 align-middle animate-pulse" />
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 text-sm sm:text-base max-w-lg mt-4 leading-relaxed font-normal">
              Explora nuestros canales oficiales: videos virales de horneado, sorteos
              exclusivos, playlist para disfrutar tus galletas y chat VIP directo con
              nuestro equipo repostero.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="btn-border-wrap">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative overflow-hidden rounded-full bg-[#060218] text-white px-7 py-3 text-[16px] font-medium transition-all group cursor-pointer inline-flex items-center gap-2.5 z-10"
                >
                  <span className="absolute inset-0 bg-[#A068FF] translate-x-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 -z-10" />
                  <span className="relative z-10 group-hover:text-black font-semibold transition-colors duration-200">
                    Explorar en TikTok
                  </span>
                  <ChevronRight className="w-4 h-4 relative z-10 group-hover:text-black transition-colors" />
                </a>
              </div>

              {/* Cursor Element badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A068FF] text-black font-semibold text-xs shadow-[0_0_20px_rgba(160,104,255,0.7)]"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>@cookieplanet en vivo</span>
              </motion.div>
            </div>
          </div>

          {/* HERO RIGHT -- Enlarged Concentric Circles Visualization (880px / 920px container) */}
          <div className="w-full xl:w-[780px] 2xl:w-[880px] aspect-square flex items-center justify-center relative select-none overflow-visible">
            {/* Orbit container (Scaled up from 720px to 880px) */}
            <div className="relative w-[370px] h-[370px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] xl:w-[780px] xl:h-[780px] 2xl:w-[880px] 2xl:h-[880px] flex items-center justify-center">
              {/* ORBIT 4 (Outermost, 880px scale) */}
              <div
                className="spin-orbit-4 absolute rounded-full border border-purple-300/25"
                style={{
                  width: '100%',
                  height: '100%',
                  boxShadow: 'inset 0 0 50px rgba(160,104,255,0.08)',
                }}
              >
                {SOCIAL_NETWORKS.filter((s) => s.orbit === 4).map((item, idx) => (
                  <div
                    key={`orb4-${idx}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(clamp(175px, 48vw, 440px)) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="counter-spin-orbit-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-130 block"
                        style={{
                          width: `${item.size}px`,
                          height: `${item.size}px`,
                          filter: `drop-shadow(0 0 22px ${item.glow})`,
                        }}
                      >
                        <div
                          className={`w-full h-full flex items-center justify-center text-white border-2 border-white/90 shadow-2xl transition-all ${
                            item.isSquare ? 'rounded-2xl' : 'rounded-full'
                          }`}
                          style={{ background: item.bgColor }}
                        >
                          {item.icon('w-[52%] h-[52%]')}
                        </div>
                        <span className="absolute -bottom-7 px-3 py-1 rounded-full bg-black/95 border border-white/20 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-30">
                          {item.name} · <span className="text-[#A068FF] font-normal">{item.handle}</span>
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORBIT 3 (82% scale ~ 720px) */}
              <div
                className="spin-orbit-3 absolute rounded-full border border-purple-300/30"
                style={{
                  width: '82%',
                  height: '82%',
                }}
              >
                {SOCIAL_NETWORKS.filter((s) => s.orbit === 3).map((item, idx) => (
                  <div
                    key={`orb3-${idx}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(clamp(142px, 39vw, 360px)) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="counter-spin-orbit-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-130 block"
                        style={{
                          width: `${item.size}px`,
                          height: `${item.size}px`,
                          filter: `drop-shadow(0 0 24px ${item.glow})`,
                        }}
                      >
                        <div
                          className={`w-full h-full flex items-center justify-center text-white border-2 border-white/95 shadow-2xl transition-all ${
                            item.isSquare ? 'rounded-2xl' : 'rounded-full'
                          }`}
                          style={{ background: item.bgColor }}
                        >
                          {item.icon('w-[56%] h-[56%]')}
                        </div>
                        <span className="absolute -bottom-7 px-3 py-1 rounded-full bg-black/95 border border-white/20 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-30">
                          {item.name} · <span className="text-[#A068FF] font-normal">{item.handle}</span>
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORBIT 2 (64% scale ~ 560px) */}
              <div
                className="spin-orbit-2 absolute rounded-full border border-purple-300/35"
                style={{
                  width: '64%',
                  height: '64%',
                }}
              >
                {SOCIAL_NETWORKS.filter((s) => s.orbit === 2).map((item, idx) => (
                  <div
                    key={`orb2-${idx}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(clamp(110px, 30vw, 280px)) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="counter-spin-orbit-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-130 block"
                        style={{
                          width: `${item.size}px`,
                          height: `${item.size}px`,
                          filter: `drop-shadow(0 0 22px ${item.glow})`,
                        }}
                      >
                        <div
                          className={`w-full h-full flex items-center justify-center text-white border-2 border-white/90 shadow-2xl transition-all ${
                            item.isSquare ? 'rounded-2xl' : 'rounded-full'
                          }`}
                          style={{ background: item.bgColor }}
                        >
                          {item.icon('w-[54%] h-[54%]')}
                        </div>
                        <span className="absolute -bottom-7 px-3 py-1 rounded-full bg-black/95 border border-white/20 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-30">
                          {item.name} · <span className="text-[#A068FF] font-normal">{item.handle}</span>
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORBIT 1 (45% scale ~ 400px, innermost) */}
              <div
                className="spin-orbit-1 absolute rounded-full border border-purple-300/45"
                style={{
                  width: '45%',
                  height: '45%',
                }}
              >
                {SOCIAL_NETWORKS.filter((s) => s.orbit === 1).map((item, idx) => (
                  <div
                    key={`orb1-${idx}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(clamp(78px, 22vw, 200px)) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="counter-spin-orbit-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center cursor-pointer transition-transform hover:scale-130 block"
                        style={{
                          width: `${item.size}px`,
                          height: `${item.size}px`,
                          filter: `drop-shadow(0 0 24px ${item.glow})`,
                        }}
                      >
                        <div
                          className={`w-full h-full flex items-center justify-center text-white border-2 border-white/95 shadow-2xl transition-all ${
                            item.isSquare ? 'rounded-2xl' : 'rounded-full'
                          }`}
                          style={{ background: item.bgColor }}
                        >
                          {item.icon('w-[56%] h-[56%]')}
                        </div>
                        <span className="absolute -bottom-7 px-3 py-1 rounded-full bg-black/95 border border-white/20 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-30">
                          {item.name} · <span className="text-[#A068FF] font-normal">{item.handle}</span>
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* CENTER CIRCLE WITH COUNT UP (Also enlarged) */}
              <div className="absolute z-20 flex flex-col items-center justify-center text-center rounded-full bg-gradient-to-b from-[#070319]/90 to-[#000000]/95 border-2 border-[#A068FF]/60 shadow-[0_0_60px_rgba(160,104,255,0.5)] w-[140px] h-[140px] sm:w-[170px] sm:h-[170px]">
                <span
                  style={{ fontFamily: "'Urbanist', sans-serif" }}
                  className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none"
                >
                  {count}k+
                </span>
                <span
                  style={{ fontFamily: "'Urbanist', sans-serif" }}
                  className="text-xs sm:text-base font-semibold uppercase tracking-wider text-[#A068FF] mt-1"
                >
                  Cookie Lovers
                </span>
                <span className="text-[11px] text-white/50 font-normal">
                  Comunidad Activa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LOGO TICKER STRIP (BOTTOM) */}
        <footer className="w-full mt-6 pt-4 border-t border-white/10 relative overflow-hidden">
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <div className="animate-marquee-infinite flex items-center gap-16 py-3">
              {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-[110px] sm:w-[137px] h-[36px] object-contain brightness-100 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white/90 group-hover:text-[#A068FF] transition-colors">
                      {logo.name}
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">
                      {logo.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#060218]/95 backdrop-blur-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="font-bold text-xl text-white">Redes Cookie Planet</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 py-6 overflow-y-auto max-h-[70vh]">
              {[
                { label: 'Instagram (@cookieplanet)', href: 'https://instagram.com' },
                { label: 'TikTok (Recetas & Drops)', href: 'https://tiktok.com' },
                { label: 'YouTube (Cookie Planet TV)', href: 'https://youtube.com' },
                { label: 'WhatsApp (Pedidos Express)', href: 'https://whatsapp.com' },
                { label: 'Facebook (Página Oficial)', href: 'https://facebook.com' },
                { label: 'Spotify (Baking Playlists)', href: 'https://spotify.com' },
                { label: 'Telegram (Canal de Alertas)', href: 'https://telegram.org' },
                { label: 'Snapchat (Stories Diarias)', href: 'https://snapchat.com' },
                { label: 'Pinterest (Tableros Dulces)', href: 'https://pinterest.com' },
                { label: 'Discord VIP (Comunidad)', href: 'https://discord.com' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-white hover:text-[#A068FF] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-5 h-5 text-white/60" />
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold text-center"
            >
              Volver a la Tienda
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RedesSocialesModal;
