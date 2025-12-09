
import React from 'react';
import Link from '@docusaurus/Link';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        product: [
            { label: "Modules", href: "/modules" },
            { label: "Documentation", href: "/docs" },
            { label: "Pricing", href: "/pricing" },
            { label: "Changelog", href: "/changelog" },
        ],
        resources: [
            { label: "Community", href: "/community" },
            { label: "Blog", href: "/blog" },
            { label: "Research", href: "/research" },
            { label: "Support", href: "/support" },
        ],
        company: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Press", href: "/press" },
        ],
        legal: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "License", href: "/license" },
        ],
    };

    return (
        <footer className="border-t border-border/50 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                                <span className="text-background font-bold text-sm">P</span>
                            </div>
                            <span className="font-semibold tracking-tight text-foreground hover:no-underline">PhysicalAI</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            The definitive resource for Physical AI & Humanoid Robotics education.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground text-center">
                        © {new Date().getFullYear()} PhysicalAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
