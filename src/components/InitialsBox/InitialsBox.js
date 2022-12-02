import './InitialsBox.css'
function InitialsBox({ firstWord = '', secondWord = '', bgColor = null }) {
  let firstCharacter = ''
  let secondCharacter = ''
  // Null Null
  if (firstWord !== '' || secondWord !== '') {
    if (firstWord !== '') {
      firstCharacter = firstWord[0].substring(0, 1).toUpperCase()
    } else {
      // if the firstword is empty it will take first letter from the second word
      firstCharacter = secondWord[0].substring(0, 1).toUpperCase()
    }
    //Luciano Simano
    if (secondWord !== '') {
      secondCharacter = secondWord[0].substring(0, 1).toUpperCase()
    } else {
      secondCharacter = firstWord[1].substring(0, 1).toUpperCase()
    }
  } else {
    firstCharacter = 'A'
    secondCharacter = 'A'
  }
  return (
    <div className="initials-box-circle">
      <span>{firstCharacter + secondCharacter} </span>
    </div>
  )
}
export default InitialsBox
