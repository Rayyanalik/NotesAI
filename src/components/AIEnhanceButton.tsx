
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type AIEnhanceButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  enhanced?: boolean;
  className?: string;
};

const AIEnhanceButton = ({ 
  onClick, 
  disabled = false, 
  loading = false,
  enhanced = false,
  className = '' 
}: AIEnhanceButtonProps) => {
  return (
    <Button
      variant={enhanced ? "default" : "secondary"}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative overflow-hidden ${enhanced ? 'bg-primary/90 hover:bg-primary' : ''} ${className}`}
    >
      <div className="flex items-center">
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Sparkles 
              size={16} 
              className={`mr-2 ${enhanced ? 'animate-pulse-subtle' : ''}`} 
            />
            <span>{enhanced ? 'AI Enhanced' : 'Enhance with AI'}</span>
          </>
        )}
      </div>
      
      {enhanced && (
        <motion.div 
          className="absolute inset-0 bg-primary/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Button>
  );
};

export default AIEnhanceButton;
