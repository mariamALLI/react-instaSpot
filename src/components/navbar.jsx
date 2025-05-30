import InstaspotLogo from '../assets/images/instalogo.svg'

function Logo(){
    return (
        <header className="hero" role="banner">
       { /*Logo Section */}
        <nav className="hero__logo px-[.5rem] py-[1.2rem] flex justify-center" role="navigation"  aria-label="Main navigation">
          <img
            className="hero__logo-image"
            src={InstaspotLogo}
            alt="InstaSpots Logo Text"
          />
        </nav>
      </header>
    )
}

export {Logo}