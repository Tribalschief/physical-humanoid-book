import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import { Download, Github } from 'lucide-react';

const Resources = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <CustomNavbar />
            <main className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-semibold mb-8">Student Resources</h1>

                <div className="grid gap-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">Downloads</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-4">
                                <Download className="w-6 h-6" />
                                <div>
                                    <div className="font-semibold">Course Assets</div>
                                    <div className="text-xs text-muted-foreground">Models, Textures (2.4GB)</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">External Tools</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a href="#" className="p-4 rounded-xl bg-card border border-border/50 flex items-center gap-4 hover:bg-muted transition-colors">
                                <Github className="w-6 h-6" />
                                <span>Source Code Repo</span>
                            </a>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Resources;
