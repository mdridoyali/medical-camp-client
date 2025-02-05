
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <aside>
                    <div className="flex   px-2 md:mx-2">
                        <img
                            className="w-8 md:w-14"
                            src={"https://i.ibb.co/NWnH0Jj/Screenshot-7-removebg-preview.png"}
                        />
                        <h1 className="text-transparent text-2xl md:text-5xl font-bold bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
                            MediCamp
                        </h1>
                    </div>
                    <p><br />Providing reliable services since 1992</p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;