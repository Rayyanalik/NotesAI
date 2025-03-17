import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '@/context/NotesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PenLine, ArrowLeft } from 'lucide-react';
import AIEnhanceButton from './AIEnhanceButton';
import { hasApiKey } from '@/utils/aiService';
import { toast } from 'sonner';

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    // Use enhanced content if available, otherwise use original content
    const finalContent = isEnhanced && enhancedContent ? enhancedContent : content;
    addNote(title, finalContent);
    
    // Navigate to notes page after creation
    navigate('/notes');
  };

  const handleEnhanceWithAI = async () => {
    if (!content.trim()) return;
    
    if (!hasApiKey()) {
      toast.error('OpenAI API key is required for AI enhancement', {
        description: 'Please add your API key in the settings above',
        duration: 5000,
        action: {
          label: 'Settings',
          onClick: () => {
            const settingsButton = document.querySelector('[data-dialog-trigger="true"]') as HTMLElement;
            if (settingsButton) settingsButton.click();
          },
        }
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      // Import dynamically to reduce initial load time
      const { enhanceText } = await import('../utils/aiService');
      const improved = await enhanceText(content);
      setEnhancedContent(improved);
      setIsEnhanced(true);
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto glass">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <CardTitle className="text-2xl font-medium">Create New Note</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-none focus-visible:ring-0 px-0 py-2 h-auto"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your note content here..."
              value={isEnhanced ? enhancedContent : content}
              onChange={(e) => {
                if (isEnhanced) {
                  setEnhancedContent(e.target.value);
                } else {
                  setContent(e.target.value);
                }
              }}
              className="min-h-[200px] border-none focus-visible:ring-0 px-0 resize-none"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AIEnhanceButton
            onClick={handleEnhanceWithAI}
            disabled={!content.trim() || isProcessing || !hasApiKey()}
            loading={isProcessing}
            enhanced={isEnhanced}
          />
          
          <Button 
            type="submit" 
            disabled={!title.trim() || !(content.trim() || enhancedContent.trim())}
            className="bg-primary hover:bg-primary/90"
          >
            <PenLine size={16} className="mr-2" />
            Save Note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateNoteForm;
