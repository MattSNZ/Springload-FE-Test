const email = text => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(text)
}

const password = text => {
  if (text.length > 8) { return true }
  return false
}

const colour = text => {
  if (text) { return true }
  return false
}

const animals = animalsArr => {
  if (animalsArr.length > 0) { return true }
  return false
}

const typeOfTiger = text => {
  if (text) { return true }
  return false
}

export default { email, password, colour, animals, typeOfTiger }
