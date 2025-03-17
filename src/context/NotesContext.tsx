
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  aiEnhanced: boolean;
};

type NotesContextType = {
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
  enhanceNoteWithAI: (id: string) => Promise<void>;
  getNote: (id: string) => Note | undefined;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

type NotesProviderProps = {
  children: ReactNode;
};

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Error parsing stored notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiEnhanced: false,
    };
    
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    toast.success('Note created successfully');
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast.success('Note deleted successfully');
  };

  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  const enhanceNoteWithAI = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const note = notes.find((note) => note.id === id);
    if (!note) {
      setLoading(false);
      setError('Note not found');
      return;
    }

    try {
      // Import dynamically to reduce initial load time
      const { enhanceText } = await import('../utils/aiService');
      const enhancedContent = await enhanceText(note.content);
      
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === id
            ? {
                ...n,
                content: enhancedContent,
                updatedAt: new Date().toISOString(),
                aiEnhanced: true,
              }
            : n
        )
      );
      
      toast.success('Note enhanced with AI');
    } catch (err) {
      console.error('Error enhancing note with AI:', err);
      setError('Failed to enhance note. Please try again.');
      toast.error('Failed to enhance note');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
    enhanceNoteWithAI,
    getNote,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};
