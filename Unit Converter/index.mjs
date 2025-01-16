const lengthForm = document.getElementById('length-form')
const lengthResult = document.getElementById('length-result')
const weightForm = document.getElementById('weight-form')
const weightResult = document.getElementById('weight-result')
const tempForm = document.getElementById('temperature-form')
const tempResult = document.getElementById('temperature-result')

// Length conversion map
const lengthConversion = {
  km: {
    m: 1000,
    cm: 100000,
    mm: 1000000,
    mi: 0.62,
    yd: 1093.61,
    ft: 3280.83,
    in: 39370.07,
  },
  m: {
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.0006,
    yd: 1.09,
    ft: 3.28,
    in: 39.37,
  },
  cm: {
    km: 0.00001,
    m: 0.01,
    mm: 100,
    mi: 0.000006,
    yd: 0.01,
    ft: 0.03,
    in: 0.39,
  },
  mm: {
    km: 0.000001,
    m: 0.001,
    cm: 0.01,
    mi: 0.0000006,
    yd: 0.001,
    ft: 0.003,
    in: 0.03,
  },
  mi: {
    km: 1.6,
    m: 1609,
    cm: 160935,
    mm: 1609350,
    yd: 1760,
    ft: 5280.01,
    in: 63360.23,
  },
  yd: { km: 0.0009, m: 0.91, cm: 91.44, mm: 914.4, mi: 0.0005, ft: 3, in: 36 },
  ft: {
    km: 0.0003,
    m: 0.3,
    cm: 30.48,
    mm: 304.8,
    mi: 0.0001,
    yd: 0.33,
    in: 12,
  },
  in: {
    km: 0.00002,
    m: 0.02,
    cm: 2.54,
    mm: 25.4,
    mi: 0.00001,
    yd: 0.02,
    ft: 0.08,
  },
}

// Weight conversion map
const weightConversion = {
  kg: { g: 1000, mg: 1000000, oz: 35.27, lb: 2.2 },
  g: { kg: 0.001, mg: 1000, oz: 0.03, lb: 0.002 },
  mg: { kg: 0.000001, g: 0.001, oz: 0.00003, lb: 0.000002 },
  oz: { kg: 0.02, g: 28.34, mg: 28349.5, lb: 0.06 },
  lb: { kg: 0.45, g: 453.59, mg: 453592, oz: 16 },
}

// Temperature conversion map
const tempMap = {
  'c-f': (c) => c * 1.8 + 32,
  'c-k': (c) => c + 273.15,
  'f-c': (f) => (f - 32) * 0.56,
  'f-k': (f) => (f - 32) * 0.56 + 273.15,
  'k-c': (k) => k - 273.15,
  'k-f': (k) => (k - 273.15) * 1.8 + 32,
}

// Length converter
const lengthConvert = (length, fromUnit, toUnit) => {
  return length * lengthConversion[fromUnit][toUnit]
}

// Weight converter
const weightConvert = (weight, fromUnit, toUnit) => {
  return weight * weightConversion[fromUnit][toUnit]
}

// Temperature converter
const tempConvert = (temp, fromUnit, toUnit) => {
  // Get key
  const key = `${fromUnit}-${toUnit}`

  return tempMap[key](temp)
}

// Execute when length form is submitted
lengthForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const length = parseFloat(document.getElementById('length').value)
  const lengthFrom = document.getElementById('length-from').value
  const lengthTo = document.getElementById('length-to').value

  // Calculate and convert length here
  // Check if same unit
  const convertedLength =
    lengthFrom === lengthTo
      ? length
      : lengthConvert(length, lengthFrom, lengthTo)

  // Display convert result
  lengthResult.innerHTML = `Result: ${length} ${lengthFrom} = ${convertedLength} ${lengthTo}`
})

// Execute when weight form is submitted
weightForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const weight = parseFloat(document.getElementById('weight').value)
  const weightFrom = document.getElementById('weight-from').value
  const weightTo = document.getElementById('weight-to').value

  // Calculate and convert weight here
  // Check if same unit
  const convertedWeight =
    weightFrom === weightTo
      ? weight
      : weightConvert(weight, weightFrom, weightTo)

  // Display convert result
  weightResult.innerHTML = `Result: ${weight} ${weightFrom} = ${convertedWeight} ${weightTo}`
})

// Execute when temperature form is submitted
tempForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const temp = parseFloat(document.getElementById('temperature').value)
  const tempFrom = document.getElementById('temperature-from').value
  const tempTo = document.getElementById('temperature-to').value

  // Calculate and convert temperature here
  // Check if same unit
  const convertedTemp =
    tempFrom === tempTo ? temp : tempConvert(temp, tempFrom, tempTo)

  // Display convert result
  tempResult.innerHTML = `Result: ${temp} ${tempFrom} = ${convertedTemp} ${tempTo}`
})
