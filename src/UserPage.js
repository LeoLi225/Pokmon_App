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
  const [filterText, setFilterText] = useState('');

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
   let p1=pokemons.filter(item=>item.name.english===filterText);
   newList= (p1.length===1)?p1:newList;
   newList= (p1.length===0 && filterText!=="")?p1:newList;

  //   console.log(p1);
  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = newList.slice(indexOfFirstRecord, indexOfLastRecord)
  const numberOfPages = Math.ceil(newList.length / pokemonsPerPage);
  const loc = document.location;

  function handleLogout(){
    axios.get('http://localhost:5000/logout')
 //   axios.get('https://authserver-0vt2.onrender.com/logout')
     .catch(err => console.log("err", err))
      loc.reload(true);
  }
  

  return (
    <>
      <Search
        setTypeSelectedArray={setTypeSelectedArray}
        typeSelectedArray={typeSelectedArray}
        filterText ={filterText}
        onFilterTextChange={setFilterText}
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