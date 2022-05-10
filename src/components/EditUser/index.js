import React, { useContext, useEffect, useState } from 'react'
import api from '../../utils/api'
import './index.css'

import {ErrAlert} from '../ErrAlert'

import UserContext from '../../contexts/userContext'

import { Grid, Typography, TextField, Button } from '@mui/material'
import { GoBackButton } from '../GoBackButton'
import { useNavigate } from 'react-router-dom'

export const EditUser = () => {
    const { user, setUser } = useContext(UserContext)
    const [userName, setUserName] = useState('')
    const [userAbout, setUserAbout] = useState('')
    const navigate = useNavigate()

    const handleClick = () => {
        api.editCurrentUser({ name: userName, about: userAbout })
            .then((data) => {
                setUser(data)
                alert('Изменения сохранены')
                navigate('/')
            })
            .catch((err) => (
                alert(err)
            ))
    }

    useEffect(() => {
        if (user) {
            setUserName(user.name)
            setUserAbout(user.about)
        }
    }, [user])

    return (
        <div className="editUser">
            <GoBackButton />
            <Grid
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Typography variant="h5">
                        Редактировать пользователя{' '}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Имя"
                        variant="outlined"
                        value={userName}
                        onChange={({ target }) => {
                            setUserName(target.value)
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Доп.Информация"
                        variant="outlined"
                        value={userAbout}
                        onChange={({ target }) => {
                            setUserAbout(target.value)
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
