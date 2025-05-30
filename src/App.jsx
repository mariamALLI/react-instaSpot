import { Profile } from './components/profile'
import { Logo } from './components/navbar'
import { Cards, Horizontaline } from './components/cards'
import { useRef } from 'react'

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
    </div>
  )
}

export default App
