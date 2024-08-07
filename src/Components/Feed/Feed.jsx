import React, { useEffect, useState } from "react";
import './Feed.css'
import { Link } from "react-router-dom";
import  API_KEY , {value_convertor }  from "../../data.js";
import moment from 'moment'


function Feed({category}) {
const [data , setData] =useState([])

   const fetchData = async() =>{
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${API_KEY}`
      await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items) );
      console.log(data)
   }

   useEffect(()=> {
       fetchData();
   },[category])


   return(
    <div className="feed">
      {data.map((item,index) => {
          return(
            <Link to={`video/${item.snippet.categoryId}/${item.id}`} > <div className="card">
        <img src={item.snippet.thumbnails.medium.url} alt=""/>
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_convertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
     </div>
     </Link>
          )
      })}
    

     
    </div>
     
   )
}

export default Feed;