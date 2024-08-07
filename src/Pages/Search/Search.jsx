import React, { useEffect, useState } from "react";
import './Search.css';
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import SearchItem from "../../Components/SearchItem/SearchItem";
import API_KEY from "../../data";

function Search({ sidebar, category, setCategory }) {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchSearchResults();
    }, [query]);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=${API_KEY}&q=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            const videoIds = data.items.map(item => item.id.videoId);
            setSearchResults(videoIds);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
            <div className={`container1 ${sidebar ? "" : 'large-container1'}`}>
                {/* Render search results */}
                {searchResults.map((videoId, index) => (
                    <SearchItem
                        key={index}
                        videoId={videoId}
                       
                    />
                ))}
            </div>
        </>
    );
}

export default Search;
