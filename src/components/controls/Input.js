import React from 'react'
import { TextFields } from '@mui/icons-material';
import { useField } from 'formik';

export default function Input({ label, ...props }) {

    const [field, meta] = useField(props);
    console.log(field)
    return (
        // <div>
          <TextFields
            label={label}
            {...field}
            {...props}
            
          />
      );
};