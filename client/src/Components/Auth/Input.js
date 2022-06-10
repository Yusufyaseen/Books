import React from 'react';
import { IconButton, InputAdornment, Grid, TextField } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
const Input = ({
  name,
  autoFoucus,
  type,
  label,
  handleChange,
  handleShowPassword,
  half,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        autoFocus={autoFoucus}
        required
        fullWidth
        label={label}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
