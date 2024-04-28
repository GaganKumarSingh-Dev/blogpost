import React, { useContext, useEffect, useState } from 'react'
import image from "../assets/post_image.jpg"
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import Posts from '../components/posts/Posts';
import Popular from '../components/popular/Popular';
import { HiArrowDown } from "react-icons/hi";
import { context } from '../App';
import { useNavigate } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import Footer from '../components/footer/Footer';

const Home = () => {
    const navigate = useNavigate();

    const value = useContext(context);
    const [posts, setPosts, loggedIn, setLoggedIn, loading, setLoading, noOfPosts, setNoOfPosts] = value;

    const increasePosts = () => { setNoOfPosts(noOfPosts + 3) };

    const delDoc = async (id) => {
        const deletedDoc = await deleteDoc(doc(db, "posts", id));
        console.log(deletedDoc);
        setPosts(posts.filter((post) => post.id !== id));
        localStorage.setItem('postsArray', JSON.stringify(posts));
    }

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
                    <h1>{posts[0].title}</h1>
                    <p>{posts[0].desc.slice(0, 230)}...</p>
                    <button className='featured-blog-btn' onClick={() => {navigate(`/blog/${posts[0].id}`)}}>View Blog <GoArrowRight /></button>
                </div>
            </div>
            <div className='posts'>
                <div className='latest'>
                    <h2>Latest Posts</h2>
                    <hr />
                    <div>
                        {(posts.length > 0) ? (
                            posts.slice(1, noOfPosts).map((post) => <div key={post.id}>
                                <Posts title={post.title} desc={post.desc} id={post.id} delDoc={delDoc} />
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
                        posts.slice(1, 4).map((post) => <div key={post.id}>
                            <Popular title={post.title} desc={post.desc} id={post.id} />
                        </div>)
                    ) : <h2>loading...</h2>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home

