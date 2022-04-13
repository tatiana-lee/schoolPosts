import React from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostList } from './components/PostList'
import { postData } from './posts/posts'
import { CustomizedButton as Button } from './components/Button'

export const App = () => {
    

    return (
        <div className="appContainer">
            <Header></Header>
            <Button></Button>
            <div className="content container">
                <div className="content__posts">
                    <PostList list={postData} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
