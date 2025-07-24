import { motion } from 'framer-motion';
import { DoorClosed, Check, Crown } from 'lucide-react';
import { cabinetStyles } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CabinetSelectorProps {
  selectedCabinet: string;
  onCabinetSelect: (cabinet: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function CabinetSelector({ 
  selectedCabinet, 
  onCabinetSelect, 
  className,
  searchTerm = ''
}: CabinetSelectorProps) {
  const filteredCabinets = cabinetStyles.filter(cabinet =>
    cabinet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mr-3 shadow-lg">
            <DoorClosed className="text-white h-5 w-5" />
          </div>
          Cabinet Styles
        </h3>
        <Badge variant="secondary" className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
          {filteredCabinets.length} styles
        </Badge>
      </div>
      
      <div className="space-y-4">
        {filteredCabinets.map((cabinet, index) => {
          const isSelected = selectedCabinet === cabinet.id;
          
          return (
            <motion.div
              key={cabinet.id}
              onClick={() => onCabinetSelect(isSelected ? '' : cabinet.id)}
              className="modern-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-amber-50/20 border-amber-200/40 group"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl animate-pulse -z-10"></div>
              )}
              
              <div className="flex items-center space-x-6 relative">
                <div className="relative">
                  <div 
                  className="w-20 h-16 rounded-2xl border-3 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: cabinet.color }}
                  />
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg flex items-center">
                    {cabinet.name}
                    {cabinet.id === 'natural-wood' && <Crown className="h-4 w-4 ml-2 text-amber-500" />}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 font-medium">{cabinet.description}</div>
                </div>
                <div className="flex items-center relative">
                  {isSelected && (
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-full p-2 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 400 }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {selectedCabinet && (
        <motion.div
          className="modern-card p-6 bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/60 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-8 h-8 rounded-lg border-3 border-white shadow-lg" 
              style={{ backgroundColor: cabinetStyles.find(c => c.id === selectedCabinet)?.color }}
            />
            <div>
              <p className="text-base font-semibold text-green-900 flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                {cabinetStyles.find(c => c.id === selectedCabinet)?.name} Selected
              </p>
              <p className="text-sm text-green-700 font-medium">
                {cabinetStyles.find(c => c.id === selectedCabinet)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
