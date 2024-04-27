import React, { useEffect, useState } from 'react'
import image from "../assets/post_image.jpg"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import Posts from '../components/posts/Posts';
import Popular from '../components/popular/Popular';
import { HiArrowDown } from "react-icons/hi";



const Home = () => {

    const postsRef = collection(db, "posts");

    const [posts, setPosts] = useState(localStorage.getItem('postsArray') ? JSON.parse(localStorage.getItem('postsArray')) : []);
    const [loading, setLoading] = useState(true);
    const [noOfPosts, setNoOfPosts] = useState(3);

    const increasePosts = () => { setNoOfPosts(noOfPosts + 3) };
    

    async function fetchData() {
        if (posts.length < 5) {
            const getPostsFromFirebase = [];

            const querySnapshot = await getDocs(postsRef);
            querySnapshot.forEach((doc) => {
                getPostsFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setPosts(getPostsFromFirebase);
            localStorage.setItem('postsArray', JSON.stringify(getPostsFromFirebase));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    });



    
    if (loading) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className='home'>
            <div className='featured-post'>
                <img src={image} alt="" />
                <div>
                    <h3>Featured</h3>
                    <h1>6 Legit Apps To Make Truly Passive Income By Having Your Computer Turned On.</h1>
                    <p>Discover how to earn passive income by simply leaving your computer running. Here are six methods that can help you monetize your idle computer time.</p>
                </div>
            </div>
            <div className='posts'>
                <div className='latest'>
                    <h2>Latest Posts</h2>
                    <hr />
                    <div>
                        {(posts.length > 0) ? (
                            posts.slice(0, noOfPosts).map((post) => <div key={post.key}>
                                <Posts title={post.title} desc={post.desc} />
                            </div>)
                        ) : <h2>loading...</h2>
                        }
                    {posts.length > 4 && <button className='view-more' onClick={increasePosts}>View More <span><HiArrowDown /></span></button>}
                    </div>
                </div>
                <hr />
                <div className='popular'>
                    <h2>Popular Posts (Top 3)</h2>
                    {(posts.length > 0) ? (
                        posts.slice(0, 3).map((post) => <div key={post.key}>
                            <Popular title={post.title} desc={post.desc} />
                        </div>)
                    ) : <h2>loading...</h2>
                    }
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Home