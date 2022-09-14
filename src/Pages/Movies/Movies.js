import axios from "axios";
import { useEffect, useState } from "react";
import { LinearProgress} from "@material-ui/core";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] =useState(false);
  const genreforURL = useGenre(selectedGenres);
   console.log(selectedGenres);

  const fetchMovies = async () => {
    
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=ba56c0df695b16642f13c68792e60ee6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    setLoading(false);
    
    console.log("Movie page");
    console.log(data);
  };

  useEffect(() => {
    setLoading(true)
    window.scroll(0, 0);
    //setTimeout(fetchMovies,100);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      {loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />):
      <>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
          {
            (!content || content.length <=0 )&& (<h2>No Movies Found</h2>)
          }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      </>
      }
    </div>
  );
};

export default Movies;
