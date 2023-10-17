import style from './Movieitem.module.css';

function MovieItem({poster,title,imdbID}){
    return(
        <div className={style.wrapper}>
            <img src={poster} alt="" />
            <div className={style.footer}>
                {title}
                <a href={'https://imdb.com/title/' + imdbID} className={style.imdb}>IMDB</a>
            </div>
        </div>
    )
}
export default MovieItem;