import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import { BookOpen, Cpu, Globe, Terminal } from 'lucide-react';

const Modules = () => {
    const modules = [
        {
            title: "Module 1: Foundations of Physical AI",
            description: "Setup Isaac Sim, understand WRDF/URDF, and basic robot kinematics.",
            icon: BookOpen
        },
        {
            title: "Module 2: ROS 2 & Control Systems",
            description: "Master nodes, topics, services, and PID controllers for actuation.",
            icon: Terminal
        },
        {
            title: "Module 3: Vision & Perception",
            description: "Integrate cameras and LIDAR data into your robot's world model.",
            icon: Globe
        },
        {
            title: "Module 4: LLM Reasoning Agents",
            description: "Connect GPT-4V to robot action spaces for high-level planning.",
            icon: Cpu
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <CustomNavbar />
            <main className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-semibold mb-8">Curriculum Modules</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {modules.map((m, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-all">
                            <m.icon className="w-8 h-8 mb-4 text-emerald-500" />
                            <h2 className="text-xl font-bold mb-2">{m.title}</h2>
                            <p className="text-muted-foreground">{m.description}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Modules;
