import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { Menu, X } from "lucide-react";

const CustomNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 hover:no-underline">
                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                            <span className="text-background font-bold text-sm">P</span>
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-foreground">PhysicalAI</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                            Documentation
                        </Link>
                        <Link href="/modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                            Modules
                        </Link>
                        <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                            Resources
                        </Link>
                        <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                            Community
                        </Link>
                        <Link
                            href="/docs/intro"
                            className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors hover:no-underline"
                        >
                            Get Started
                        </Link>
                    </div>

                    <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50">
                        <div className="flex flex-col gap-4">
                            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                                Documentation
                            </Link>
                            <Link href="/modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                                Modules
                            </Link>
                            <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                                Resources
                            </Link>
                            <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline">
                                Community
                            </Link>
                            <Link
                                href="/docs/intro"
                                className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium text-center hover:no-underline"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default CustomNavbar;
