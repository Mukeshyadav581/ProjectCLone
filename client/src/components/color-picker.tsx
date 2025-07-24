import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check, Sparkles } from 'lucide-react';
import { presetColors } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function ColorPicker({ color, onColorChange, className, searchTerm = '' }: ColorPickerProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const filteredColors = presetColors.filter(presetColor =>
    presetColor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mr-3 shadow-lg">
            <Palette className="text-white h-5 w-5" />
          </div>
          Wall Color
        </h3>
        <Badge variant="secondary" className="text-xs font-semibold bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
          {filteredColors.length} options
        </Badge>
      </div>
      
      {/* Custom Color Picker */}
      <div className="modern-card p-6 bg-gradient-to-br from-white to-pink-50/30 border-pink-200/40">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-pink-500" />
          Custom Color
        </h4>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-16 h-16 rounded-2xl border-3 border-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onFocus={() => setIsColorPickerOpen(true)}
              onBlur={() => setIsColorPickerOpen(false)}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900">Selected Color</div>
            <div className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded-lg mt-1 inline-block">{color.toUpperCase()}</div>
          </div>
        </div>
      </div>
      
      {/* Preset Colors */}
      <div className="modern-card p-6 bg-gradient-to-br from-white to-gray-50/50">
        <h4 className="font-semibold text-gray-900 mb-5 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
          Preset Colors
        </h4>
        <div className="grid grid-cols-4 gap-4">
          {filteredColors.map((presetColor, index) => {
            const isSelected = color === presetColor;
            return (
              <motion.button
                key={presetColor}
                onClick={() => onColorChange(presetColor)}
                className="relative w-full aspect-square rounded-2xl border-3 border-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl group"
                style={{ backgroundColor: presetColor }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse"></div>
                )}
                
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 400 }}
                  >
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                  </motion.div>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Color Information */}
      {color !== '#ffffff' && (
        <motion.div
          className="modern-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200/60 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-8 h-8 rounded-full border-3 border-white shadow-lg" 
              style={{ backgroundColor: color }}
            />
            <div>
              <p className="text-base font-semibold text-blue-900 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Preview Active
              </p>
              <p className="text-sm text-blue-700 font-medium">This color is being applied to your kitchen walls</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
