import React from 'react'
import { thumbnailStyles, type ThumbnailStyle } from "../../assets/assets.ts"
import { ChevronDown, CpuIcon, ImageIcon, PenToolIcon, SparkleIcon } from 'lucide-react'

const StyleSelector = ({ value, onChange, isOpen, setIsOpen }: { value: ThumbnailStyle; onChange: (style: ThumbnailStyle) => void; isOpen: boolean; setIsOpen: (open: boolean) => void }) => {

  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold & Graphic": "Vibrant colors, strong contrasts, and eye-catching designs that grab attention.",
    "Minimalist": "Clean and simple designs with a focus on essential elements and ample white space.",
    "Photorealistic": "High-quality images that closely resemble real-life photographs with detailed textures and lighting.",
    "Illustrated": "Hand-drawn or digitally created artwork that adds a unique and artistic touch to the thumbnail.",
    "Tech/Futuristic": "Sleek and modern designs featuring advanced technology themes, neon colors, and futuristic elements."
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <SparkleIcon className="h-4 w-4" />,
    "Minimalist": <SparkleIcon className="h-4 w-4" />,
    "Photorealistic": <ImageIcon className="h-4 w-4" />,
    "Illustrated": <PenToolIcon className="h-4 w-4" />,
    "Tech/Futuristic": <CpuIcon className="h-4 w-4" />
  }
  return (
    <div className='relative space-y-3 dark'>
      <label className='block text-sm font-medium text-zinc-200'>Thumbnail Style</label>

      <button type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-white/8 bg-white/10 px-4 py-3 text-zinc-300 text-left hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-pink-500">
        <div className='space-y-1'>
          <div className='flex items-center gap-2 font-medium'>
            {styleIcons[value]}
            <span>{value}</span>
          </div>
          <p className='text-xs text-zinc-400'>{styleDescriptions[value]}</p>
        </div>
        <ChevronDown className={['h-5 w-5 text-zinc-400 transition-transform',
          isOpen && 'rotate-180'].join(' ')} />
      </button>
      {isOpen && (
        <div className="absolute bottom-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
          {thumbnailStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30"
            >
              <div>
                {styleIcons[style]}
              </div>
              <div>
                <p className='font-medium'>{style}</p>
                <p className='text-xs text-zinc-400'>{styleDescriptions[style]}</p>
              </div>
            </button>
          ))}
        </div>
      )}

    </div>
  )
}

export default StyleSelector