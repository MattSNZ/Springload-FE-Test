import React, { useState } from 'react'
import validators from '../validators'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar, Box, Button, Container, CssBaseline, Typography, InputLabel, MenuItem, Select, FormControl, Grid, TextField, FormHelperText } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B5DE5'
    },
    secondary: {
      main: '#00BBF9'
    },
    background: {
      default: '#F9F9F9'
    }
  },
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightHeavy: 700
  }
})

const animalsArr = ['Bear', 'Tiger', 'Snake', 'Donkey']

const App = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [colour, setColour] = useState('')
  const [colourError, setColourError] = useState(false)
  const [animals, setAnimals] = useState([])
  const [animalsError, setAnimalsError] = useState(false)
  const [typeOfTiger, setTypeOfTiger] = useState('')
  const [typeOfTigerError, setTypeOfTigerError] = useState(false)
  const [showTigerType, setShowTigerType] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'colour') {
      setColour(value)
    } else if (name === 'animals') {
      setAnimals(value)
      if (value.indexOf('Tiger') !== -1) {
        setShowTigerType(true)
      } else {
        setShowTigerType(false)
      }
    } else if (name === 'typeOfTiger') {
      setTypeOfTiger(value)
    }
  }

  const validateForm = infoObj => {
    const validEmail = validators.email(infoObj.email)
    const validPwd = validators.password(infoObj.password)
    const validColour = validators.colour(infoObj.colour)
    const validAnimals = validators.animals(infoObj.animals)
    let validTypeOfTiger = validators.typeOfTiger(infoObj.typeOfTiger) // let is a small bodge to allow validation when value isn't present
    validEmail ? setEmailError(false) : setEmailError(true)
    validPwd ? setPasswordError(false) : setPasswordError(true)
    validColour ? setColourError(false) : setColourError(true)
    validAnimals ? setAnimalsError(false) : setAnimalsError(true)
    if (infoObj.animals.indexOf('Tiger') !== -1) { validTypeOfTiger ? setTypeOfTigerError(false) : setTypeOfTigerError(true) } else { validTypeOfTiger = true }

    if (validEmail && validPwd && validColour && validAnimals && validTypeOfTiger) { return true }
    return false
  }

  const handleSubmit = e => {
    e.preventDefault()
    const submitInfo = {
      email,
      password,
      colour,
      animals,
      typeOfTiger
    }

    const valid = validateForm(submitInfo)

    if (valid) {
      console.log('The info you want is:')
      console.log('Email: ', submitInfo.email)
      console.log('Password: ', submitInfo.password)
      console.log('Colour: ', submitInfo.colour)
      console.log('Animals: ', submitInfo.animals)
      if (submitInfo.typeOfTiger) { console.log('Type of Tiger: ', submitInfo.typeOfTiger) }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign up here
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  variant="standard"
                  onChange={handleChange}
                  error={emailError}
                  helperText={emailError && 'A valid email address is required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  variant="standard"
                  onChange={handleChange}
                  error={passwordError}
                  helperText={passwordError && 'Your password must be at least 8 characters'}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControl required fullWidth> */}
                <TextField
                  required
                  fullWidth
                  // labelId="colour-label"
                  label="Colour"
                  id="colour"
                  name="colour"
                  value={colour}
                  // label="Colour"
                  variant="standard"
                  onChange={handleChange}
                  select
                  error={colourError}
                  helperText={colourError && 'You must select a colour'}
                >
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="brown">Brown</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                </TextField>
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth >
                  <InputLabel id="animals-label">Animals</InputLabel>
                  <Select
                    required
                    fullWidth
                    // label="Animals"
                    labelId="animals-label"
                    id="animals"
                    name="animals"
                    variant="standard"
                    // select
                    multiple
                    value={animals}
                    onChange={handleChange}
                    error={animalsError}
                  >
                    {animalsArr.map((animal) => (
                      <MenuItem
                        key={animal}
                        value={animal}
                      >
                        {animal}
                      </MenuItem>
                    ))}
                  </Select>
                  { animalsError && <FormHelperText sx={{ color: 'error' }}>You must select an animal</FormHelperText>}
                </FormControl>
              </Grid>
              { showTigerType && <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="typeOfTiger"
                  label="Type of Tiger"
                  name="typeOfTiger"
                  value={typeOfTiger}
                  variant="standard"
                  onChange={handleChange}
                  error={typeOfTigerError}
                  helperText={typeOfTigerError && 'If Tiger is chosen above, we need to know which type'}
                />
              </Grid>}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleSubmit} >Sign Up</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
