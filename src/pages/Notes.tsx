
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import NoteCard from '@/components/NoteCard';
import { useNotes } from '@/context/NotesContext';
import { Button } from '@/components/ui/button';
import { PenLine, Info } from 'lucide-react';
import AnimatedWrapper from '@/components/AnimatedWrapper';

const Notes = () => {
  const { notes } = useNotes();

  return (
    <Layout>
      <AnimatedWrapper>
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          <Link to="/create">
            <Button>
              <PenLine size={16} className="mr-2" />
              Create New
            </Button>
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No notes yet</h2>
            <p className="text-muted-foreground mb-6">
              Start creating notes to see them here
            </p>
            <Link to="/create">
              <Button>
                <PenLine size={16} className="mr-2" />
                Create your first note
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        )}
      </AnimatedWrapper>
    </Layout>
  );
};

export default Notes;
