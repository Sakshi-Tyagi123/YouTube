import React, { useEffect, useState } from "react";
import './SearchItem.css';
import { Link } from "react-router-dom";
import moment from 'moment';
import API_KEY , {value_convertor} from "../../data";

function SearchItem({ videoId }) {
   const [info , setInfo] = useState([]);
   const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        fetchVideoDetails();
    }, [videoId]);

    const fetchVideoDetails = async () => {
        try {
            const video_url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&maxResults=15&key=${API_KEY}`;
            const response = await fetch(video_url);
            const data = await response.json();
            setInfo(data.items);
            const categoryId = data.items[0].snippet.categoryId;
            setCategoryId(categoryId)
        
        } catch (error) {
            console.error("Error fetching video details:", error);
        }
    }

    return(
     <div className="search">
       {info.map((item1 , index) => {
        return(
            <Link to={`video/${categoryId}/${videoId}`} >
          <div className="search-card" key={index}>
             <div>
             <img src={item1.snippet.thumbnails.medium.url} alt=""/>
              </div>
              <div className="card-2">
              <h2>{item1.snippet.title}</h2>
              <h3>{item1.snippet.channelTitle}</h3>
              <p>{value_convertor(item1.statistics.viewCount)} views &bull; {moment(item1.snippet.publishedAt).fromNow()}</p>
              </div>
          </div>
         </Link>

        )
       })}
     </div>
    )
}
export default SearchItem;
