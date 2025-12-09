import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Footer from '../components/Footer';
import { Users, MessageSquare, Heart } from 'lucide-react';

const Community = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <CustomNavbar />
            <main className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-semibold mb-8">Community</h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                    Join thousands of physical AI engineers building the next generation of robots.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                        <Users className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Discord Server</h3>
                        <p className="mb-6 text-muted-foreground">Live chats, voice events, and support.</p>
                        <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">Join Discord</button>
                    </div>

                    <div className="p-8 rounded-3xl bg-purple-500/10 border border-purple-500/20">
                        <MessageSquare className="w-10 h-10 text-purple-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Forum</h3>
                        <p className="mb-6 text-muted-foreground">Long-form discussions and show & tell.</p>
                        <button className="px-6 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">Visit Forum</button>
                    </div>

                    <div className="p-8 rounded-3xl bg-pink-500/10 border border-pink-500/20">
                        <Heart className="w-10 h-10 text-pink-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Sponsors</h3>
                        <p className="mb-6 text-muted-foreground">Support the open source curriculum.</p>
                        <button className="px-6 py-2 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">Sponsor</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Community;
