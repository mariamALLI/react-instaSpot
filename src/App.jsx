import { Profile } from './components/profile'
import { Logo } from './components/navbar'
import { Cards, Horizontaline } from './components/cards'
import { useRef } from 'react'
import { Footer } from './components/footer'

function App() {
  const cardsRef = useRef(null);

  const handleNewPost = (newPost) => {
    if (cardsRef.current) {
      cardsRef.current.handleNewPost(newPost);
    }
  };

  return (
    <div className="bg-gray-100">
      <Logo/>
      <Profile onNewPost={handleNewPost} />
      <Horizontaline/>
      <Cards ref={cardsRef} />
      <Horizontaline/>
      <Footer />
    </div>
  )
}

export default App
