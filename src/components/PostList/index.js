import React from 'react'
import { PostCard } from '../PostCard'
import './index.css'


export const PostList = ({ list }) => {
  return (
    <div className='posts'>
        {list.map((e, i) => (
            <PostCard key={i} postText={e}/>
        ))}
    </div>
  )
}
