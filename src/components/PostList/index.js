import React from 'react'
import { PostCard } from '../PostCard'
import './index.css'


export const PostList = ({ list, favorites, setFavorites}) => {
  return (
    <div className='posts'>
        {list?.slice(0, 12).map((e) => (
            <PostCard key={e._id} postText={e} isInFavorites={favorites.includes(e._id)} setFavorites={setFavorites}/>
        ))}
    </div>
  )
}
