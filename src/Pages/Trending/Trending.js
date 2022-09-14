import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import { LinearProgress} from "@material-ui/core";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading ,setLoading] =useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=ba56c0df695b16642f13c68792e60ee6&page=${page}`
    );

    setContent(data.results);
    setLoading(false);
    console.log("Trending page");
    console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      {loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) :(
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
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
       <CustomPagination setPage={setPage} /> 
       </>)}
    </div>
  );
};

export default Trending;