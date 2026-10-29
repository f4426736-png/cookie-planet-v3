import React, { useEffect } from 'react';

interface FeatherAtlasModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const FeatherAtlasModal: React.FC<FeatherAtlasModalProps> = ({
  isOpen = true,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#f6f1e7] overflow-hidden">
      <iframe
        src="/feather-atlas.html"
        title="Feather Atlas 3D Bird Field Guide"
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </div>
  );
};

export default FeatherAtlasModal;
