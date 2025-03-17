
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CreateNoteForm from '@/components/CreateNoteForm';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { hasApiKey, saveApiKey, clearApiKey } from '@/utils/aiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key, X } from 'lucide-react';

const CreateNote = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(!hasApiKey());

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setApiKey('');
      setShowApiKeyForm(false);
    }
  };

  const handleClearApiKey = () => {
    clearApiKey();
    setShowApiKeyForm(true);
  };

  return (
    <Layout>
      <AnimatedWrapper animation="slide">
        <div className="max-w-3xl mx-auto">
          {!showApiKeyForm && (
            <div className="mb-4 flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Key size={14} />
                    <span>Manage API Key</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>OpenAI API Key</DialogTitle>
                    <DialogDescription>
                      Your API key is stored locally in your browser and never sent to our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      API key is currently saved. You can clear it or replace it with a new one.
                    </p>
                    <Button variant="destructive" onClick={handleClearApiKey} className="w-full">
                      <X size={16} className="mr-2" /> Clear API Key
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {showApiKeyForm ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Set Your OpenAI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  To use the AI enhancement feature, please enter your OpenAI API key. 
                  Your key will be stored locally in your browser and is never sent to our servers.
                </p>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  className="mb-2"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                  Save API Key
                </Button>
              </CardFooter>
            </Card>
          ) : null}
          <CreateNoteForm />
        </div>
      </AnimatedWrapper>
    </Layout>
  );
};

export default CreateNote;

