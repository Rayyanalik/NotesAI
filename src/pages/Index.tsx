
import React from 'react';
import { Button } from "@/components/ui/button";
import { PenLine, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedWrapper from "@/components/AnimatedWrapper";

const Index = () => {
  return (
    <Layout>
      <AnimatedWrapper>
        <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <div className="flex items-center">
                <Sparkles size={14} className="mr-1.5" />
                <span>AI-Powered Note-Taking</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
              Capture ideas and <span className="text-primary">enhance</span> them with AI
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Create beautiful notes and let AI help you refine, expand, 
              and perfect your thoughts with a single click.
            </p>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/create">
              <Button size="lg" className="group">
                <PenLine size={18} className="mr-2 transition-transform group-hover:-translate-y-0.5" />
                Create Note
              </Button>
            </Link>
            
            <Link to="/notes">
              <Button size="lg" variant="outline" className="group">
                View Notes
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedWrapper animation="fade" delay={0.1} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PenLine size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Intuitive Editing</h3>
                <p className="text-muted-foreground">
                  Create and edit notes with a beautifully designed, distraction-free interface.
                </p>
              </AnimatedWrapper>
              
              <AnimatedWrapper animation="fade" delay={0.2} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Enhancement</h3>
                <p className="text-muted-foreground">
                  Transform your rough notes into polished content with our AI assistance.
                </p>
              </AnimatedWrapper>
              
              <AnimatedWrapper animation="fade" delay={0.3} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Focus on your ideas while our AI helps with refinement and clarity.
                </p>
              </AnimatedWrapper>
            </div>
          </div>
        </section>
      </AnimatedWrapper>
    </Layout>
  );
};

export default Index;
