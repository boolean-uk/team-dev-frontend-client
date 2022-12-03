import './InitialsBox.css'

function InitialsBox({ firstWord = '', secondWord = '', bgColor = null }) {
  let firstCharacter = ''
  let secondCharacter = ''

  const arrayOfColor = [
    '#54577C',
    '#546A76',
    '#F34213',
    '#3E2F5B',
    '#136F63',
    '#0A369D',
    '#5E7CE2',
    '#424B54',
    '#9B6A6C',
    '#36213E'
  ]

  const randomNumber = Math.floor(Math.random() * 10)

  let finalColor = bgColor
  if (bgColor === null) {
    finalColor = arrayOfColor[randomNumber]
  }

  if (firstWord !== '' || secondWord !== '') {
    if (firstWord !== '') {
      firstCharacter = firstWord[0].substring(0, 1).toUpperCase()
    } else {
      // if the firstword is empty it will take first letter from the second word
      firstCharacter = secondWord[0].substring(0, 1).toUpperCase()
    }
    if (secondWord !== '') {
      if (firstWord === '') {
        secondCharacter = secondWord[1].substring(0, 1).toUpperCase()
      } else {
        secondCharacter = secondWord[0].substring(0, 1).toUpperCase()
      }
    } else {
      secondCharacter = firstWord[1].substring(0, 1).toUpperCase()
    }
  } else {
    firstCharacter = 'A'
    secondCharacter = 'A'
  }
  return (
    <div
      style={{ backgroundColor: finalColor }}
      className="initials-box-circle"
    >
      <span>{firstCharacter + secondCharacter}</span>
    </div>
  )
}
export default InitialsBox
