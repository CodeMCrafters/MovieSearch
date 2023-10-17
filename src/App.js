import { useEffect, useState } from 'react';
import './App.css';
import Header from './componets/Header/Header';
import axios from 'axios';
import MovieItem from './componets/MovieItem/MovieItem';
import { ScaleLoader	 } from "react-spinners";


function App() {
const [search, setSearch] = useState('');
const [movieList,setMovieList] = useState([]);
const [isLoading,setIsLoading] = useState(false);
const [isError,setError] = useState('false');

useEffect(() => {
  if(search === ''){
    setIsLoading(false);
    setMovieList([]);
    return;

  }
  setIsLoading(true);

  const timeout =   setTimeout(async () =>{
    try {
      const { data } = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=8f70641`);
      setMovieList(data.Search);
    } 
    catch{
      setError(true);
    } 
    finally{
      setIsLoading(false);
    }
  }, 2000)

  return () => clearTimeout(timeout);



}, [search]);

return (
    <>
        <Header search={search} setSearch={setSearch}/>

        {isLoading 
        ? <div className='loaderWrapper'> <ScaleLoader color='red'/> </div>
        // : isError 
        // ? "Greska"  
        : movieList && Array.isArray(movieList) && (
        <div className='moviesWrapper'>
          {
          movieList.map((movie) => (
            <MovieItem title={movie.Title} poster={movie.Poster} imdbID={movie.imdbID}/>
          ))}
        </div>
        )}

    </>
  );
}

export default App;
