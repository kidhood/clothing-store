import React from 'react'
import { TextFields } from '@mui/icons-material';

export default function Input(props) {

    const { name, label, value,onChange } = props;
    return (
        <TextFields
            id="outlined-basic"
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            // {...(error && {error:true,helperText:error})}
        />
    )
}