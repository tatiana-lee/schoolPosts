import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import './index.css'


export const PostCard = ({postText}) => {
    return (
        <Card sx={{ minWidth: 275 }} className='postCard'>
            <CardContent>
                <Typography
                    sx={{ fontSize: 16 }}
                    color="purple"
                    height='50px'
                    fontWeight='bold'
                    gutterBottom
                >
                    {postText.title}
                </Typography>

                <Typography color="text.secondary">{postText.author.email}</Typography>
                <br/>
                <Typography variant="body2">{postText.text}</Typography>
            </CardContent>
        </Card>
    )
}
