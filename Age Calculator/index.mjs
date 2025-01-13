// Declare global variables (no need to import installed npm packages)
const dateTime = luxon.DateTime
const calcBtn = document.getElementById('calculator-btn')
const result = document.getElementById('result')

// Customizing the date picker
const picker = datepicker('#birth-date', {
  position: 'c',
  showAllDates: true,
  dateSelected: new Date(),
  maxDate: new Date(),
  formatter: (input, date, instance) => {
    input.value = dateTime.fromJSDate(date).toFormat('MM/dd/yyyy')
  },
})

calcBtn.addEventListener('click', (e) => {
  e.preventDefault()

  // Calculate Y/M/D from user's input to now
  const { years, months, days } = dateTime
    .fromFormat(picker.el.value, 'MM/dd/yyyy')
    .diffNow(['years', 'months', 'days'])
    .negate()
    .toObject()

  result.innerText = `You are ${Math.floor(years)} years ${Math.floor(
    months
  )} months and ${Math.floor(days)} days old!`
})
