import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    userName: 'albert',
    name: 'Alberto rodri',
    isFollowing: true
  },
  {
    userName: 'camila',
    name: 'Camila Ortiz Pulgarín',
    isFollowing: false
  },
  {
    userName: 'jose',
    name: 'Jose Luis Ortiz',
    isFollowing: true
  },
  {
    userName: 'robert',
    name: 'Roberto Alcatraz',
    isFollowing: false
  }
]

export function App() {

  return (
    <section className="App">
      {
        users.map(user => {
          const { userName, name, isFollowing } = user
          return(
            <TwitterFollowCard
              key={userName}
              userName={userName}
              initialIsFollowing={isFollowing}
            >
              {name}
            </TwitterFollowCard>
          )
        })
      }
      
    </section>
  );
}
