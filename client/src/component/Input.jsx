import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Input = (props) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={props.label} type={props.type} variant="outlined" name={props.name} onChange={props.onChange} value={props.value} />
        </Box>
    );
}

export default Input;
