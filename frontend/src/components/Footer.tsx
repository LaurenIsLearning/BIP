

function Footer() {
    // Create a way to scroll to the top of the screen
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
        });

    };

    return (
        <>
        <footer>
            <button className="button_light" onClick={scrollToTop}>Back to Top</button>
        </footer>
        </> 
    )
}

export default Footer;