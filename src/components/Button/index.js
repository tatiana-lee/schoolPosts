import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { purple } from '@mui/material/colors'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}))

export const CustomizedButton = () => {
    const handleClick = () => {
        console.log('Есть контакт!')
    }
    const styleBtn = {
        position: 'fixed'
    }
    return (
        <Stack spacing={2} direction="row" style={styleBtn}>
            <ColorButton variant="contained" onClick={handleClick}>
                New Post
            </ColorButton>
        </Stack>
    )
}
