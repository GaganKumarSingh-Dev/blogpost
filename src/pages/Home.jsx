import React, { useContext, useEffect, useState } from 'react'
import image from "../assets/post_image.jpg"
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import Posts from '../components/posts/Posts';
import Popular from '../components/popular/Popular';
import { HiArrowDown } from "react-icons/hi";
import { context } from '../App';

const Home = () => {

    const postsRef = collection(db, "posts");

    const value = useContext(context);
    const [posts, setPosts] = value;

    const [loading, setLoading] = useState(true);
    const [noOfPosts, setNoOfPosts] = useState(4);

    const increasePosts = () => { setNoOfPosts(noOfPosts + 3) };
    

    async function fetchData() {
        if (posts.length < noOfPosts || posts.length < 10) {
            const getPostsFromFirebase = [];

            const querySnapshot = await getDocs(postsRef);
            querySnapshot.forEach((doc) => {
                getPostsFromFirebase.push({ ...doc.data(), id: doc.id });
            });
            setPosts(getPostsFromFirebase);
            // console.log(posts);
            localStorage.setItem('postsArray', JSON.stringify(getPostsFromFirebase));
        }
        setLoading(false);
    }
    
    const delDoc = async (id) => {
        const deletedDoc = await deleteDoc(doc(db, "posts", id));
        console.log(deletedDoc);
        setPosts(posts.filter((post) => post.id !== id));
        localStorage.setItem('postsArray', JSON.stringify(posts));
    }

    useEffect(() => {
        fetchData();
    },[]);

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
                    <p>{posts[0].desc.slice(0,230)}...</p>
                </div>
            </div>
            <div className='posts'>
                <div className='latest'>
                    <h2>Latest Posts</h2>
                    <hr />
                    <div>
                        {(posts.length > 0) ? (
                            posts.slice(1, noOfPosts).map((post) => <div key={post.id}>
                                <Posts title={post.title} desc={post.desc} id={post.id} delDoc={delDoc}/>
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
            <hr />
        </div>
    )
}

export default Home