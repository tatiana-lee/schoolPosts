import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardHeader,
    Avatar,
    Stack,
    TextField,
    IconButton,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { DeleteButton } from '../DeleteButton'
import './index.css'
import { GoBackButton } from '../GoBackButton'
import { EditButton } from '../EditButton'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'

export const PostInfo = ({ setPostList, user}) => {
    const [post, setPost] = useState(null)
    const [users, setUsers] = useState(null)
    const params = useParams()

    const handleAddComment = (event) => {
        event.preventDefault()
        const {
            target: { text },
        } = event
        api.addComment(params.postID, { text: text.value.trim() })
            .then((data) => {
                alert('Комментарий добавлен')
                api.getPosts(params.postID).then((data) => 
                setPost(data))
                text.value = ''
            })
            .catch((err) => {
                alert(err + ' - Не удалось добавить комментарий')
            })
    }

    const handleDeleteComment = (event) => {
        const commentID = (event.currentTarget.getAttribute('commentid'))
        api.deleteComment(params.postID, commentID)
            .then((data) => setPost(data))
    }

    useEffect(() => {
        api.getPosts(params.postID)
            .then((data) => {
                setPost(data)
            })
            .catch((err) => alert(err))
    }, [])

    useEffect(() => {
        api.getUserById(params.userID)
            .then((data) => {
                setUsers(data)
            })
            .catch((err) => alert(err))
    }, [])


    return (
        <div className="postInfo">
            <GoBackButton />
            {post && (
                <Card>
                    <Grid
                        container
                        item
                        xs={12}
                        flexDirection="row"
                        spacing={1}
                    >
                        <Grid item xs={10}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="avatar"
                                        src={post.author.avatar}
                                    />
                                }
                                title={post.author.name}
                                subheader={post.author.about}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={1}
                            paddingRight="10px"
                        >
                            {post.author._id === user?._id ? (
                                <Stack direction="row">
                                    <EditButton />
                                    <DeleteButton setPostList={setPostList} />
                                </Stack>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </Grid>
                    <CardMedia
                        component="img"
                        alt="post photo"
                        height="500"
                        width="500"
                        image={post.image}
                    ></CardMedia>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2">{post.text}</Typography>
                        {/* <Grid item> */}
                        <br />
                        Комментарии:
                        <Grid item height="200px" style={{overflowY: "scroll"}}>
                            {post?.comments?.map((e, i) =>
                                users?.map((oneuser) =>
                                oneuser._id === e.author ? (
                                        <Grid item key={e._id} container>
                                            <Grid item xs={11}>
                                                <CardHeader
                                                    style={{ padding: '5px' }}
                                                    avatar={
                                                        <Avatar
                                                            alt="avatar"
                                                            src={oneuser.avatar}
                                                        ></Avatar>
                                                    }
                                                    title={oneuser.name}
                                                    subheader={e.text}
                                                />
                                            </Grid>
                                            {user?._id === e.author ? (
                                                <Grid item xs={1}>
                                                    <IconButton commentid={e._id} onClick={handleDeleteComment}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Grid>
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    ) : (
                                        ''
                                    )
                                )
                            )}
                        </Grid>
                        <form
                            sx={{ width: '100%' }}
                            onSubmit={handleAddComment}
                        >
                            <Grid
                                item
                                container
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={11}>
                                    <TextField
                                        id="filled-basic"
                                        name="text"
                                        fullWidth
                                        label="Добавить комментарий"
                                        variant="standard"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton type="submit">
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
