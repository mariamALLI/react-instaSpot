import InstaspotLogo from '../assets/images/instalogo.svg'

function Logo(){
    return (
        <header className="hero" role="banner">
       { /*Logo Section */}
        <nav className="hero__logo px-[0rem] py-[1rem] flex justify-center" role="navigation"  aria-label="Main navigation">
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