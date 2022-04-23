import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    '&:hover': {
        backgroundColor: red[900],
    },
}))

export const CustomizedButton = () => {
    const styleBtn = {
        top: '90px',
        right: '20px',
        position: 'fixed',
        
    }
    return (
        <Stack spacing={2} direction="row" style={styleBtn}>
        <Link to={`posts/create`}>
            <ColorButton variant="contained">
                New Post
            </ColorButton>
            </Link>
        </Stack>
    )
}
