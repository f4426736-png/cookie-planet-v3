import { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import HeroVideoScrubber from './HeroVideoScrubber';
import PrmptHeader from './PrmptHeader';
import GalleryGrid from './GalleryGrid';

interface PrmptExperienceProps {
  onBackToHome?: () => void;
}

export default function PrmptExperience({ onBackToHome }: PrmptExperienceProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      id="scroll-spacer"
      className="relative select-none w-full min-h-[500vh] bg-white text-white overflow-x-hidden font-inter-tight lg:cursor-none p-0 m-0"
    >
      <CustomCursor />
      <HeroVideoScrubber />
      <PrmptHeader onBackToHome={onBackToHome} />
      <GalleryGrid />
    </div>
  );
}
