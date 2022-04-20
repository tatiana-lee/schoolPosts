import React, { useState, useEffect } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostList } from './components/PostList'
import { News } from './components/News'
import api from './utils/api'
import { Info } from './components/Info'
import { CustomizedButton as Button } from './components/Button'
import './index.css'
import { Logo } from './components/Logo'
import PaginationRounded from './components/Pagination'

export const App = () => {
    const [postList, setPostList] = useState([])
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    )

    useEffect(() => {
        api.getCurrentUser()
            .then((user) => setUser(user))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getPosts()
            .then((res) => setPostList(res))
            .catch((err) => console.log(err))
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)
    console.log(postList.lenght)

    return (
        <div className="appContainer">
            <Header>
                <Logo />
                <Info name={user?.name} />
            </Header>
            <Button />
            <News />
            <PostList
                postList={currentPosts}
                favorites={favorites}
                setFavorites={setFavorites}
            />
            <PaginationRounded
                postsPerPage={postsPerPage}
                totalPosts={postList.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Footer />
        </div>
    )
}
