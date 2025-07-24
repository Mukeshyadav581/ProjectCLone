import { motion } from 'framer-motion';
import { Grid3X3, Check, Gem } from 'lucide-react';
import { backsplashOptions } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BacksplashSelectorProps {
  selectedBacksplash: string;
  onBacksplashSelect: (backsplash: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function BacksplashSelector({ 
  selectedBacksplash, 
  onBacksplashSelect, 
  className,
  searchTerm = ''
}: BacksplashSelectorProps) {
  const filteredBacksplash = backsplashOptions.filter(backsplash =>
    backsplash.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mr-3 shadow-lg">
            <Grid3X3 className="text-white h-5 w-5" />
          </div>
          Backsplash Options
        </h3>
        <Badge variant="secondary" className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          {filteredBacksplash.length} patterns
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-5">
        {filteredBacksplash.map((backsplash, index) => {
          const isSelected = selectedBacksplash === backsplash.id;
          
          return (
            <motion.div
              key={backsplash.id}
              onClick={() => onBacksplashSelect(isSelected ? '' : backsplash.id)}
              className="modern-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-emerald-50/20 border-emerald-200/40 group"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl animate-pulse -z-10"></div>
              )}
              
              <div 
                className="w-full h-28 border-b border-gray-200/50 relative group-hover:h-32 transition-all duration-300"
                style={{ backgroundColor: backsplash.color }}
              >
                {/* Enhanced pattern overlay effect */}
                <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-300">
                  {backsplash.pattern === 'subway' && (
                    <div className="grid grid-cols-8 gap-1 h-full p-2">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div key={i} className="bg-gray-600 rounded-sm shadow-sm" />
                      ))}
                    </div>
                  )}
                  {backsplash.pattern === 'mosaic' && (
                    <div className="grid grid-cols-10 gap-1 h-full p-2">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="bg-gray-600 rounded-full shadow-sm" />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-gray-900 flex items-center">
                    {backsplash.name}
                    {backsplash.id === 'glass-mosaic' && <Gem className="h-4 w-4 ml-2 text-emerald-500" />}
                  </div>
                  {isSelected && (
                    <motion.div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-2 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 400 }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </div>
                <div className="text-sm text-gray-600 font-medium capitalize">
                  {backsplash.pattern} pattern
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {selectedBacksplash && (
        <motion.div
          className="modern-card p-6 bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/60 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-8 h-8 rounded-lg border-3 border-white shadow-lg" 
              style={{ backgroundColor: backsplashOptions.find(b => b.id === selectedBacksplash)?.color }}
            />
            <div>
              <p className="text-base font-semibold text-green-900 flex items-center">
                <Gem className="h-4 w-4 mr-2" />
                {backsplashOptions.find(b => b.id === selectedBacksplash)?.name} Selected
              </p>
              <p className="text-sm text-green-700 font-medium capitalize">
                {backsplashOptions.find(b => b.id === selectedBacksplash)?.pattern} pattern style
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
