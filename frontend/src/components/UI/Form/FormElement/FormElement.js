import React from 'react';
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';

const FormElement = ({name, value, onChange, label, error, type, required, styles}) => (
    <Grid item xs={12}>
        <TextField
            className={styles}
            fullWidth
            autoComplete={name}
            label={label}
            name={name}
            type={type}
            required={required}
            value={value.username}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error}
            inputProps={{
                min: new Date().toLocaleDateString('en-CA'),
                max: '2030-01-01'
            }}
        />
    </Grid>
);

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    styles: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
};

export default FormElement;