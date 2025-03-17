
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Sparkles, Clock } from 'lucide-react';
import { Note, useNotes } from '@/context/NotesContext';
import AnimatedWrapper from './AnimatedWrapper';
import { format } from 'date-fns';

type NoteCardProps = {
  note: Note;
  index: number;
};

const NoteCard = ({ note, index }: NoteCardProps) => {
  const { deleteNote, enhanceNoteWithAI, loading } = useNotes();
  
  // Format the date to a readable string
  const formattedDate = format(new Date(note.updatedAt), 'MMM d, yyyy • h:mm a');
  
  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <AnimatedWrapper delay={index * 0.1} className="h-full">
      <Card className="h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-card glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground whitespace-pre-line">
            {truncateContent(note.content)}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-2 border-t">
          <div className="flex items-center text-xs text-muted-foreground w-full">
            <Clock size={12} className="mr-1" />
            <span>{formattedDate}</span>
            {note.aiEnhanced && (
              <span className="ml-auto flex items-center text-primary">
                <Sparkles size={12} className="mr-1" />
                AI Enhanced
              </span>
            )}
          </div>
          <div className="flex justify-between w-full">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => deleteNote(note.id)}
              className="opacity-80 hover:opacity-100"
            >
              <Trash2 size={16} />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => enhanceNoteWithAI(note.id)}
              disabled={loading || note.aiEnhanced}
              className={`${note.aiEnhanced ? 'opacity-50 cursor-not-allowed' : 'opacity-90 hover:opacity-100'}`}
            >
              <Sparkles size={16} className="mr-1" />
              <span>{note.aiEnhanced ? 'Enhanced' : 'Enhance'}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </AnimatedWrapper>
  );
};

export default NoteCard;
