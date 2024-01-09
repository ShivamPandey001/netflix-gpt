import { IMG_CDN_URL } from "../constants";

const MovieCard = ({posterPath}) =>{
    if(!posterPath) return null;
    return <div>
        <div className="w-36 md:w-48 pr-4">
            <img src={IMG_CDN_URL + posterPath} alt="MovieCard" />
        </div>
    </div>
}

export default MovieCard;