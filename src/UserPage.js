import Search from "./Search";
import Page from './Page';
import Pagination from './Pagination';
import axios from 'axios'
import Display from './Display';
import React, { useEffect, useState } from 'react'

function UserPage({ username, refreshtoken, accesstoken, setAccesstoken }) {
  const [typeSelectedArray, setTypeSelectedArray] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(res => res.data)
      .then(res => {
        setPokemons(res)
      })
      .catch(err => console.log("err", err))
  }, [])

  let newList = [];

  pokemons.map(pokemon => {
    if (typeSelectedArray.every(type => pokemon.type.includes(type))) {
      newList.push(pokemon);
    }
    return 1;
  })
  //  let p1=pokemons.filter(item=>item.name.english===filterText);
  //  newList= (p1.length===1)?p1:newList;
  //  newList= (p1.length===0 && filterText!=="")?p1:newList;

  //   console.log(p1);
  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = newList.slice(indexOfFirstRecord, indexOfLastRecord)
  const numberOfPages = Math.ceil(newList.length / pokemonsPerPage);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Search
        setTypeSelectedArray={setTypeSelectedArray}
      />
      < Page currentPokemons={currentPokemons} setCurrentId={setCurrentId} currentId={currentId} 
            refreshtoken={refreshtoken} username={username} accesstoken={accesstoken} setAccesstoken={setAccesstoken} 
      />

      < Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

      />
      <br />
      <div className="inforTable">
        <h3>Pokemon information:</h3>
        < Display currentPokemons={currentPokemons} currentId={currentId} />
        <br />
      </div>

      <button onClick={handleLogout}>Logout</button>

    </>
  );
}

export default UserPage;