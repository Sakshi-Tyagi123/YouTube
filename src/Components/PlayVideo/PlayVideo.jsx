import React, { useEffect, useState } from "react";
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg'
import API_KEY ,{value_convertor} from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {
    const {videoId} = useParams()
    const [apiData, setApiData] = useState(null);
    const [channelData , setChannelData] = useState(null)
    const [commentData , setCommentData] =useState([])

    const fetchVideoData = async () => {
        try {
            const video_details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(video_details_url);
            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }
            const data = await response.json();
            setApiData(data.items[0]);
        } catch (error) {
            console.error('Error fetching video data:', error);
            // Handle error (e.g., setApiData(null), display error message)
        }
    };

    const fetchOtherData = async () =>{
        if (apiData) {
            try {
                const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
                const response = await fetch(channelData_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch channel data');
                }
                const data = await response.json();
                setChannelData(data.items[0]);

                const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY} `

                await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
            } catch (error) {
                console.error('Error fetching channel data:', error);
                // Handle error (e.g., setChannelData(null), display error message)
            }
        }
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() =>{
       fetchOtherData();
    },[apiData])

    return (
        <div className="play-video">
            {apiData && (
                <>
                    <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                    <h3>{apiData.snippet.title}</h3>
                    <div className="play-video-info">
                        <p>{value_convertor(apiData.statistics.viewCount)} Views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>
                        <div>
                            <span><img src={like} alt="" />{value_convertor(apiData.statistics.likeCount)}</span>
                            <span><img src={dislike} alt="" /></span>
                            <span><img src={share} alt="" />Share</span>
                            <span><img src={save} alt="" />Save</span>
                        </div>
                    </div>
                    <hr />
                    <div className="publisher">
                        {channelData && <img src={channelData.snippet.thumbnails.default.url} alt="" />}
                        <div>
                            <p>{apiData.snippet.channelTitle}</p>
                            {channelData && <span>{value_convertor(channelData.statistics.subscriberCount)}</span>}
                        </div>
                        <button>Subscribe</button>
                    </div>
                    <div className="vid-description">
                        <p>{apiData.snippet.description.slice(0, 250)}</p>
                        <hr />
                        <h4>{value_convertor(apiData.statistics.commentCount)} Comments</h4>
                        {commentData.map((item , index) =>{
                            return(
                                <div key={index} className="comment">
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=""/>
                                <div>
                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>
                                    {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                                        </span> 
                                        </h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                                    <div className="comment-action">
                                        <img src={like} alt=""/>
                                        <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                        <img src={dislike} alt=""/>
                                    </div>
                                </div>
                            </div>
                           
                            )
                        })}
                       
                    </div>
                </>
            )}
        </div>
    );
}

export default PlayVideo;
