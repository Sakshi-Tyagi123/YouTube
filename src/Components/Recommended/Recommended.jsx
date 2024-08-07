
import React, { useEffect, useState } from "react";
import './Recommended.css'
import { value_convertor } from "../../data";
import API_KEY from "../../data";
import {Link} from 'react-router-dom'

function Recommended({ categoryId }) {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
                const response = await fetch(relatedVideo_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApiData(data.items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [categoryId]);

    return (
        <div className="recommended">
            {apiData.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt=""/>
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_convertor(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Recommended;
