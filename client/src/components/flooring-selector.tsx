import { motion } from 'framer-motion';
import { Layers, Check, Award } from 'lucide-react';
import { flooringOptions } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FlooringSelectorProps {
  selectedFlooring: string;
  onFlooringSelect: (flooring: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function FlooringSelector({ 
  selectedFlooring, 
  onFlooringSelect, 
  className,
  searchTerm = ''
}: FlooringSelectorProps) {
  const filteredFlooring = flooringOptions.filter(flooring =>
    flooring.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl mr-3 shadow-lg">
            <Layers className="text-white h-5 w-5" />
          </div>
          Flooring Options
        </h3>
        <Badge variant="secondary" className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
          {filteredFlooring.length} materials
        </Badge>
      </div>
      
      <div className="space-y-4">
        {filteredFlooring.map((flooring, index) => {
          const isSelected = selectedFlooring === flooring.id;
          
          return (
            <motion.div
              key={flooring.id}
              onClick={() => onFlooringSelect(isSelected ? '' : flooring.id)}
              className="modern-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-violet-50/20 border-violet-200/40 group"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl animate-pulse -z-10"></div>
              )}
              
              <div className="flex items-center space-x-6 relative">
                <div className="relative">
                  <div 
                  className="w-20 h-16 rounded-2xl border-3 border-white shadow-lg relative overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: flooring.color }}
                  >
                    {/* Enhanced wood grain effect for wood floors */}
                    {flooring.id.includes('oak') || flooring.id.includes('walnut') ? (
                      <div className="absolute inset-0 opacity-40">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-black to-transparent opacity-15"></div>
                        <div className="absolute top-0 h-px w-full bg-black opacity-25"></div>
                        <div className="absolute top-1/4 h-px w-full bg-black opacity-20"></div>
                        <div className="absolute top-1/2 h-px w-full bg-black opacity-25"></div>
                        <div className="absolute top-3/4 h-px w-full bg-black opacity-20"></div>
                      </div>
                    ) : null}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg flex items-center">
                    {flooring.name}
                    {flooring.id === 'light-oak' && <Award className="h-4 w-4 ml-2 text-violet-500" />}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 font-medium">{flooring.description}</div>
                </div>
                <div className="flex items-center relative">
                  {isSelected && (
                    <motion.div
                      className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-full p-2 shadow-lg"
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
      
      {selectedFlooring && (
        <motion.div
          className="modern-card p-6 bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/60 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-8 h-8 rounded-lg border-3 border-white shadow-lg" 
              style={{ backgroundColor: flooringOptions.find(f => f.id === selectedFlooring)?.color }}
            />
            <div>
              <p className="text-base font-semibold text-green-900 flex items-center">
                <Award className="h-4 w-4 mr-2" />
                {flooringOptions.find(f => f.id === selectedFlooring)?.name} Selected
              </p>
              <p className="text-sm text-green-700 font-medium">
                {flooringOptions.find(f => f.id === selectedFlooring)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
