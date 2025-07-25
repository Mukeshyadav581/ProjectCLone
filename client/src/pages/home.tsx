import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Share, Settings, Info, Expand, ArrowLeft, Search, Send, Upload, X, Menu, Download, Palette, Layers, Grid3X3, DoorClosed, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ColorPicker from '@/components/color-picker';
import CabinetSelector from '@/components/cabinet-selector';
import BacksplashSelector from '@/components/backsplash-selector';
import FlooringSelector from '@/components/flooring-selector';
import { useKitchenCustomization } from '@/hooks/use-kitchen-customization';
import { useToast } from '@/hooks/use-toast';
import { TIMBER_CRAFT_LOGO, BIOREV_LOGO } from '@/lib/kitchen-data';

export default function Home() {
  const {
    customization,
    updateWallColor,
    updateCabinet,
    updateBacksplash,
    updateFlooring,
    getKitchenImage,
    exportDesign
  } = useKitchenCustomization();

  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDesignInfo, setShowDesignInfo] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { 
      id: 'wall-colors', 
      name: 'Wall Colors', 
      icon: Palette, 
      description: 'Transform your space with perfect colors',
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'cabinets', 
      name: 'Cabinet Styles', 
      icon: DoorClosed, 
      description: 'Premium cabinet finishes & materials',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      id: 'backsplash', 
      name: 'Backsplash', 
      icon: Grid3X3, 
      description: 'Stunning patterns & textures',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'flooring', 
      name: 'Flooring', 
      icon: Layers, 
      description: 'Luxury flooring solutions',
      gradient: 'from-violet-500 to-purple-500'
    },
  ];

  const handleSaveDesign = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✨ Design Saved Successfully",
        description: "Your kitchen masterpiece has been saved to your account.",
      });
    }, 1000);
  };

  const handleExportDesign = async () => {
    setIsLoading(true);
    try {
      await exportDesign();
      toast({
        title: "🎉 Design Downloaded",
        description: "Your kitchen design has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "❌ Export Failed",
        description: "There was an error downloading your design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareDesign = () => {
    toast({
      title: "🔗 Share Link Copied",
      description: "Design share link has been copied to your clipboard.",
    });
  };

  const handleInquirySubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🚀 Inquiry Sent Successfully",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });
      setShowInquiryDialog(false);
    }, 1000);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDesignInfo = () => {
    setShowDesignInfo(!showDesignInfo);
  };

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode((prev) => {
      if (!prev) {
        setShowSidebar(false);
        setShowDesignInfo(false);
      }
      return !prev;
    });
  }, []);

  // Exit preview with Esc key
  useEffect(() => {
    if (!isPreviewMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPreviewMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewMode]);

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
    setSearchTerm('');
  };

  const handleBackToCategories = () => {
    setCurrentCategory(null);
    setSearchTerm('');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Modern Premium Header */}
      {!isPreviewMode && (
        <motion.header 
          className="app-header h-24 flex items-center justify-between px-8 z-30 relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-48 translate-x-48 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full translate-y-40 -translate-x-40 animate-float"></div>
          </div>
          
          {/* Left section - Enhanced Logo and Title */}
          <div className="flex items-center space-x-6 relative z-10">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative">
                <img src={TIMBER_CRAFT_LOGO} alt="Timber Craft" className="h-12 w-auto filter brightness-0 invert" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              </div>
              <Separator orientation="vertical" className="h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Kitchen Designer Pro
                </h1>
                <p className="text-sm text-blue-100/80 font-medium">Professional Kitchen Customization Studio</p>
              </div>
            </motion.div>
          </div>

          {/* Center section - Enhanced Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 relative z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleSidebar}
                  size="lg"
                  className={`header-button text-base font-semibold ${
                    showSidebar 
                      ? 'active' 
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Customize</span>
                    {showSidebar && <Sparkles className="h-4 w-4 ml-1 animate-pulse" />}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>Open customization panel</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleDesignInfo}
                  size="lg"
                  className={`header-button text-base font-semibold ${
                    showDesignInfo 
                      ? 'header-button-secondary' 
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>Info</span>
                    {showDesignInfo && <Star className="h-4 w-4 ml-1 animate-pulse" />}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>View design details</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSaveDesign}
                  disabled={isLoading}
                  size="lg"
                  className="header-button text-base font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    <span>Save</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>Save your design</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleShareDesign}
                  size="lg"
                  className="header-button text-base font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <Share className="h-5 w-5" />
                    <span>Share</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>Share your design</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => window.location.reload()}
                  size="lg"
                  className="header-button text-base font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-1.837-5A7.963 7.963 0 0012 4c-4.418 0-8 3.582-8 8m16 0c0 4.418-3.582 8-8 8a7.963 7.963 0 01-6.582-3.418" />
                    </svg>
                    <span>Reset</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>Reset to default design</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={togglePreviewMode}
                  size="lg"
                  className="header-button-accent text-base font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <Expand className="h-5 w-5" />
                    <span>Preview</span>
                    <Zap className="h-4 w-4 ml-1 animate-pulse" />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-content">
                <p>Enter fullscreen preview</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right section - Enhanced Branding */}
          <div className="flex items-center space-x-4 relative z-10">
            <Separator orientation="vertical" className="h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="text-right">
                <span className="text-xs font-semibold text-blue-200/80 uppercase tracking-wider">Powered by</span>
              </div>
              <div className="relative">
                <img src={BIOREV_LOGO} alt="Biorev Technology" className="h-8 w-auto filter brightness-0 invert opacity-90" />
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              </div>
            </motion.div>
          </div>
        </motion.header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PREVIEW MODE: Enhanced fullscreen experience */}
        {isPreviewMode ? (
          <div className="w-full h-full relative bg-black">
            <motion.img
              src={getKitchenImage()}
              alt="Kitchen Design Preview"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Enhanced wall color overlay for preview */}
            <motion.div
              className="absolute inset-0"
              style={{ 
                backgroundColor: customization.wallColor,
                mixBlendMode: customization.wallColor === '#ffffff' ? 'normal' : 'soft-light'
              }}
              animate={{ 
                opacity: customization.wallColor === '#ffffff' ? 0 : 0.3
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            
            {/* Enhanced Exit Preview Button */}
            <motion.div 
              className="absolute top-8 left-8 z-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Button
                onClick={togglePreviewMode}
                size="lg"
                className="bg-white/90 hover:bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-xl border border-white/60 transform hover:scale-105"
              >
                <X className="h-5 w-5 mr-2" />
                Exit Preview
                <span className="ml-2 text-xs opacity-60">(Esc)</span>
              </Button>
            </motion.div>

            {/* Preview Mode Info Panel */}
            <motion.div
              className="absolute bottom-8 right-8 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/60 max-w-sm">
                <h3 className="font-bold text-gray-900 mb-2">Preview Mode</h3>
                <p className="text-sm text-gray-600 mb-4">Experience your kitchen design in full immersion</p>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleExportDesign}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={handleShareDesign}
                    size="sm"
                    variant="outline"
                    className="bg-white/80 hover:bg-white border-gray-200 font-semibold rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Enhanced Kitchen Preview - Main Content */}
            <div className={`flex-1 relative overflow-hidden transition-all duration-500 ${showSidebar ? 'mr-[480px]' : ''} ${!isPreviewMode ? 'mt-0' : ''}`}> 
              <motion.div
                className="kitchen-preview-container w-full h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src={getKitchenImage()}
                  alt="Kitchen Design Preview"
                  className="w-full h-full object-cover"
                />
                {/* Enhanced wall color overlay */}
                <motion.div
                  className="wall-color-overlay"
                  style={{ backgroundColor: customization.wallColor }}
                  animate={{ 
                    opacity: customization.wallColor === '#ffffff' ? 0 : 0.35,
                    mixBlendMode: customization.wallColor === '#ffffff' ? 'normal' : 'soft-light'
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Mobile Control Button - Enhanced */}
              <div className="md:hidden absolute top-6 left-6 z-20">
                <Button
                  onClick={toggleSidebar}
                  size="lg"
                  className="floating-action bg-slate-900/90 hover:bg-slate-800/90 text-white font-semibold px-4 py-3 rounded-2xl shadow-2xl hover:shadow-3xl border border-white/20 backdrop-blur-xl"
                >
                  <Menu className="h-5 w-5 mr-2" />
                  Customize
                </Button>
              </div>

              {/* Enhanced Design Info Card */}
              <AnimatePresence>
                {showDesignInfo && (
                  <motion.div
                    initial={{ y: -30, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -30, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute top-6 left-6 z-10"
                  >
                    <Card className="w-96 modern-card-elevated bg-white/95 backdrop-blur-xl border border-white/60">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl mb-1">Current Design</h3>
                            <p className="text-sm text-gray-500 font-medium">Timber Craft Kitchen Studio</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleDesignInfo}
                            className="text-gray-400 hover:text-gray-600 h-10 w-10 p-0 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <motion.div 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-gray-100/60 rounded-xl border border-gray-200/60"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div 
                                className="w-6 h-6 rounded-full border-2 border-white shadow-lg" 
                                style={{ backgroundColor: customization.wallColor }}
                              />
                              <span className="text-sm font-semibold text-gray-700">Wall Color</span>
                            </div>
                            <Badge variant="secondary" className="text-xs font-semibold bg-blue-100 text-blue-700">Custom</Badge>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50/80 to-orange-100/60 rounded-xl border border-amber-200/60"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-6 h-6 rounded border-2 border-white shadow-lg bg-amber-200" />
                              <span className="text-sm font-semibold text-gray-700">Natural Wood Cabinets</span>
                            </div>
                            <Badge variant="secondary" className="text-xs font-semibold bg-amber-100 text-amber-700">Premium</Badge>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/80 to-teal-100/60 rounded-xl border border-emerald-200/60"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-6 h-6 rounded border-2 border-white shadow-lg bg-white" />
                              <span className="text-sm font-semibold text-gray-700">Subway Backsplash</span>
                            </div>
                            <Badge variant="secondary" className="text-xs font-semibold bg-emerald-100 text-emerald-700">Classic</Badge>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50/80 to-purple-100/60 rounded-xl border border-violet-200/60"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-6 h-6 rounded border-2 border-white shadow-lg bg-amber-100" />
                              <span className="text-sm font-semibold text-gray-700">Light Oak Flooring</span>
                            </div>
                            <Badge variant="secondary" className="text-xs font-semibold bg-violet-100 text-violet-700">Natural</Badge>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Premium Right Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{ x: 480, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 480, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-20 bottom-0 w-[480px] z-20 overflow-hidden flex flex-col sidebar-panel"
                >
                  {/* Premium Header with Enhanced Gradient */}
                  <div className="relative p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full -translate-y-20 translate-x-20 animate-pulse-slow"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-500/15 to-transparent rounded-full translate-y-16 -translate-x-16 animate-float"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold tracking-tight">
                          {currentCategory ? (
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBackToCategories}
                                className="mr-4 p-3 hover:bg-white/20 text-white border border-white/30 rounded-xl transition-all duration-300 hover:scale-105"
                              >
                                <ArrowLeft className="h-5 w-5" />
                              </Button>
                              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                {categories.find(c => c.id === currentCategory)?.name}
                              </span>
                            </div>
                          ) : (
                            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                              Design Studio Pro
                            </span>
                          )}
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSidebar(false)}
                          className="text-white/80 hover:text-white hover:bg-white/20 h-12 w-12 p-0 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
                      {currentCategory ? (
                        <p className="text-blue-100 text-base font-medium">
                          {categories.find(c => c.id === currentCategory)?.description}
                        </p>
                      ) : (
                        <p className="text-blue-100 text-base font-medium">
                          Craft your perfect kitchen design with professional tools
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Search Bar */}
                  {currentCategory && (
                    <div className="p-6 bg-white/90 backdrop-blur-sm border-b border-gray-100/60">
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" />
                        <Input
                          placeholder="Search options..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 h-14 bg-white/95 border-gray-200/60 rounded-2xl text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Premium Content Area */}
                  <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white/95 to-gray-50/80">
                    {!currentCategory ? (
                      <div className="p-6 space-y-6">
                        {categories.map((category, index) => {
                          const IconComponent = category.icon;
                          return (
                            <motion.div
                              key={category.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                              whileHover={{ scale: 1.02, y: -4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                onClick={() => handleCategorySelect(category.id)}
                                className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-white/80 hover:from-white hover:to-gray-50/90 border border-white/80 hover:border-gray-200/60 rounded-3xl p-8 cursor-pointer transition-all duration-500 shadow-lg hover:shadow-2xl backdrop-blur-sm"
                              >
                                {/* Enhanced background pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                                
                                <div className="relative z-10 flex items-center space-x-6">
                                  <div className="relative">
                                    <div className={`p-5 bg-gradient-to-br ${category.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                                      <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    {/* Enhanced glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`}></div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 text-xl mb-2">
                                      {category.name}
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm font-medium leading-relaxed">
                                      {category.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="p-3 bg-gray-100/80 group-hover:bg-gray-200/80 rounded-xl transition-all duration-300 group-hover:scale-110">
                                      <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600 rotate-180 transition-all duration-300 group-hover:translate-x-1" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="space-y-8"
                        >
                          {currentCategory === 'wall-colors' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/80 shadow-xl">
                              <ColorPicker
                                color={customization.wallColor}
                                onColorChange={updateWallColor}
                                className="shadow-none bg-transparent p-0"
                                searchTerm={searchTerm}
                              />
                            </div>
                          )}
                          {currentCategory === 'cabinets' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/80 shadow-xl">
                              <CabinetSelector
                                selectedCabinet={customization.cabinet}
                                onCabinetSelect={updateCabinet}
                                className="shadow-none bg-transparent p-0"
                                searchTerm={searchTerm}
                              />
                            </div>
                          )}
                          {currentCategory === 'backsplash' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/80 shadow-xl">
                              <BacksplashSelector
                                selectedBacksplash={customization.backsplash}
                                onBacksplashSelect={updateBacksplash}
                                className="shadow-none bg-transparent p-0"
                                searchTerm={searchTerm}
                              />
                            </div>
                          )}
                          {currentCategory === 'flooring' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/80 shadow-xl">
                              <FlooringSelector
                                selectedFlooring={customization.flooring}
                                onFlooringSelect={updateFlooring}
                                className="shadow-none bg-transparent p-0"
                                searchTerm={searchTerm}
                              />
                            </div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Premium Footer */}
                  <div className="relative p-8 bg-gradient-to-r from-gray-50/95 to-white/95 border-t border-gray-200/40 backdrop-blur-sm">
                    <div className="space-y-4">
                      <Button
                        onClick={handleExportDesign}
                        disabled={isLoading}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 transform hover:scale-[1.02] text-base"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Download className="mr-3 h-5 w-5" />
                            <span>Download Design</span>
                            <Sparkles className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                      
                      <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
                        <DialogTrigger asChild>
                          <Button className="w-full h-14 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 transform hover:scale-[1.02] text-base">
                            <div className="flex items-center justify-center">
                              <Send className="mr-3 h-5 w-5" />
                              <span>Send Inquiry</span>
                              <Star className="ml-2 h-4 w-4" />
                            </div>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="modal-content sm:max-w-lg bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl">
                          <DialogHeader className="pb-6">
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              Send Design Inquiry
                            </DialogTitle>
                            <p className="text-base text-gray-600 mt-3 font-medium">Get a personalized quote for your custom kitchen design</p>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-3">
                              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Your Name</Label>
                              <Input id="name" placeholder="Enter your full name" className="focus-ring-modern h-12 rounded-xl bg-white/90 border-gray-200/60 text-base" />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                              <Input id="email" type="email" placeholder="your.email@example.com" className="focus-ring-modern h-12 rounded-xl bg-white/90 border-gray-200/60 text-base" />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number (Optional)</Label>
                              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="focus-ring-modern h-12 rounded-xl bg-white/90 border-gray-200/60 text-base" />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Project Details</Label>
                              <Textarea 
                                id="message" 
                                placeholder="Tell us about your kitchen project, timeline, and any specific requirements..." 
                                rows={4} 
                                className="focus-ring-modern resize-none rounded-xl bg-white/90 border-gray-200/60 text-base"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="file" className="text-sm font-semibold text-gray-700">Attach Files (Optional)</Label>
                              <div className="mt-2">
                                <Button variant="outline" className="w-full h-12 hover:bg-gray-50 transition-colors duration-300 rounded-xl border-gray-200/60 font-semibold">
                                  <Upload className="mr-3 h-5 w-5" />
                                  Choose Files
                                </Button>
                                <p className="text-xs text-gray-500 mt-2 font-medium">Upload floor plans, inspiration images, or other relevant files</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-4 pt-6">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowInquiryDialog(false)} 
                              className="flex-1 h-12 hover:bg-gray-50 transition-colors duration-300 rounded-xl border-gray-200/60 font-semibold text-base"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleInquirySubmit} 
                              disabled={isLoading}
                              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              {isLoading ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Sending...
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Inquiry
                                </div>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}