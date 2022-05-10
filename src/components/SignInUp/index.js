import React, { useContext, useState, useEffect } from 'react'

import { TextField, Modal, Typography, Button, Box, Grid } from '@mui/material'

import UserContext from '../../contexts/userContext'
import api from '../../utils/api'

import './index.css'
import { useNavigate } from 'react-router-dom'
import {useLocalStorage} from '../../hooks/useLocalStorage'

export const SingInUp = () => {
    const { setUser } = useContext(UserContext)
    const {writeLS, readLS} = useLocalStorage()
    const navigate = useNavigate()
    const [login, setLogin] = useState(
        readLS("token") === "" ||
          readLS("token") === null
          ? false
          : true
      );
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const onSignIn = (signedInUser) => {
        const { token, data } = signedInUser
        writeLS('token', token)
        setUser(data)
        navigate('/')
    }

    const signUp = () => {
        api.signUp({ email, password })
            .then((createdUser) => {
                return api.signIn({ email, password })
            })
            .then((signedInUser) => {
                const { token, data } = signedInUser
                console.log({ signedInUser })
                writeLS('token', token)
                setUser(data)
            })
    }

    // const signIn = () => {
    //     api.signIn({ email, password })
    //         .then((res) => {
    //             onSignIn(res)
    //             // api.getPosts()
    //         })
    // }

    const signIn = () => {
        api
          .signIn({ email, password })
          .then((data) => {
            localStorage.setItem("userID", data.data._id);
            localStorage.setItem("token", data.token);
            alert('Вы успешно авторизированы!')
            setLogin(true);
            navigate('/')
          })
          .catch((err) => {
            alert('Пользователь не найден')
          });
      };
    
      useEffect(() => {
        if (login) {
          api
            .getCurrentUser()
            .then((data) => {
              setUser(data);
            })
            .catch((err) => {
              alert(err);
            });
        }
      }, [login]);

    return (
        <div className="signForm">
            <Grid item container flexDirection="column" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Введите ваши данные </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item container spacing={2} xs={12} flexDirection="row">
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={signUp}
                        >
                            Регистрация
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={signIn}
                        >
                            Логин
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
