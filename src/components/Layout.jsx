import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="bg-background min-h-screen text-white overflow-hidden">
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
