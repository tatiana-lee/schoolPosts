import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostList } from './components/PostList'
import { News } from './components/News'
import api from './utils/api'
import { Info } from './components/Info'
import { NewPostButton} from './components/NewPostButton'
import './index.css'
import { Logo } from './components/Logo'
import PaginationRounded from './components/Pagination'
import { CreatePost } from './components/CreatePost'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PostInfo } from './components/PostInfo'

const theme = createTheme({
    palette: {
        primary: {
            main: '#c40808',
        },
        secondary: {
            main: '#FF0000',
        },
    },
})

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

    return (
        <ThemeProvider theme={theme}>
            <div className="appContainer">
                <Header>
                    <Logo />
                    <Info name={user?.name} />
                </Header>
                <News />
                <NewPostButton />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
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
                            </>
                        }
                    />
                    <Route path="posts/:postID" element={<PostInfo />} />
                    <Route path="users/:userID" element={<PostInfo />} />
                    <Route path="posts/create" element={<CreatePost />} />
                </Routes>
                <Footer />
            </div>
        </ThemeProvider>
    )
}
