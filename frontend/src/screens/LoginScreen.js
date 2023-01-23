import * as React from 'react';
import {useState, memo} from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Title from '../components/Title.js'
import Spacer from '../components/Spacer.js'
import Footer from '../components/Footer.js'


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const validatateInput = () => { 
        // Validate email against regex funciton
        setError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email));
        /*  Validate password against regex function
         *      - 8 characters minimum
         *      - 1 uppercase character
         *      - 1 special character
         *      - 1 number 
         */
        setError(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/i.test(password));
        if (!error) {
            return true;
        }
        return false;
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Ensure email and password fields are not empty
        if (email === "" || password === ""){
            setError(true)
        } 
        const validInput = validatateInput();
        if (validInput) {
            console.log('Authenticate with KeyCloak')
        }
    }

    return (
        <>
            <div className="border d-flex align-items-center justify-content-center"
                style={
                    {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
            }>
                <Title text={"KITT4SME Digital Datasheet"}/>
                <Spacer/>
                { error ? <p style={{ color: '#d82c2c'}}>Check your email and password are correct!</p>: null}
                <Spacer/>
                <Box 
                    sx={{ display: 'flex', flexWrap: 'wrap', }}>
                    <FormControl sx={{width: 500, alignContent: 'flex-end' , fontSize: '1.5rem' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username" sx={{fontSize: '1.5rem' }} error={error}>Email</InputLabel>
                    <OutlinedInput
                        error={error}
                        id="outlined-adornment-username"
                        type={'text'}
                        label="Email"
                        sx={{fontSize: '1.5rem' }}
                        onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                </Box>
                <Spacer/>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{width: 500, alignContent: 'flex-end' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize: '1.5rem' }} error={error}>Password</InputLabel>
                    <OutlinedInput
                        error={error}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        sx={{fontSize: '1.5rem' }}           
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                       
                    />
                    </FormControl>
                </Box>
                <Spacer/>
                { error ? 
                    <>
                        <p style={{ color: '#d82c2c'}}>Password must contain:</p>
                        <ul style={{ color: '#d82c2c'}}>
                            <li>8 characters minimum    </li> 
                            <li>1 uppercase character   </li>
                            <li>1 special character    </li>
                            <li>1 number                </li>
                        </ul>
                    </>
                   : null
                }
                <Spacer/>
                <Button variant="contained" sx={{width: 500, fontSize: '2rem'}} onClick={handleLogin}>Login</Button>

               
            </div>
            <div>
                <Footer/>
            </div>
        </>

    )

}

export default memo(LoginScreen)
