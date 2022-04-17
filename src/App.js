import React, { useState, useEffect } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostList } from './components/PostList'
import api from './utils/api'
import { Info } from './components/Info'
import { CustomizedButton as Button } from './components/Button'
import './index.css'
import { Logo } from './components/Logo'

export const App = () => {
    const [postList, setPostList] = useState(null)
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    )

    useEffect(() => {
        api.getCurrentUser().then((user) => setUser(user))
    }, [])

    useEffect(() => {
        api.getPosts().then((list) => setPostList(list))
    }, [])

    return (
        <div className="appContainer">
            <Header>
                <Logo />
                <Info name={user?.name} />
            </Header>
            <Button></Button>
            <PostList
                list={postList}
                favorites={favorites}
                setFavorites={setFavorites}
            />
            <Footer />
        </div>
    )
}
