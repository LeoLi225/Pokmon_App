import React from 'react'
import Pokemon from './Pokemon'
import "./style.css"

function page({ currentPokemons, setCurrentId, currentId, refreshtoken, username, accesstoken, setAccesstoken }) {

  return (
    <div>
      <div className="pokemon-list">
        {
          currentPokemons.map(item => {
            return <>
              <div className='imgBorder'>
                <div key={item.id}>  <Pokemon pokemon={item} setCurrentId={setCurrentId} currentId={currentId} accessToken={accesstoken} setAccessToken={setAccesstoken} refreshToken={refreshtoken} userid={username} />   </div>
              </div>
            </>
            // return <>
            //   <div className='imgBorder'>
            //     <div className={(currentId === item.id) ? 'active' : ''} onClick={() => showInfo(item)}>
            //       <Pokemon key={item.id} pokemon={item} accesstoken={accesstoken} username={username} currentId={currentId}
            //         refreshtoken={refreshtoken} setAccesstoken={setAccesstoken} />
            //       <h4>{item.name.english}</h4>
            //       <br />
            //     </div>
            //   </div>
            // </>
          })
        }
      </div>
    </div>
  )
}

export default page;