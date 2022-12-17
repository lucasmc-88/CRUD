let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');

let screenValue = "";


for(let item of buttons) {
  item.addEventListener('click', (e) => { 
      let buttonText = e.target.innerHTML;
      console.log('Button text is ' + buttonText);
    switch (buttonText) {
      case 'X':
        buttonText = "*";
        console.log('Button text is ' + buttonText);
        screenValue += buttonText;
        screen.value = screenValue;
        break;
        case 'AC':
          screenValue = "";
          screen.value = screenValue;
          break;
        case '√':
          screenValue = "";
          screen.Value = screenValue;
          break;
      default:
        screenValue += buttonText;
        screen.value = screenValue;
        break;
    }
  });
}



//console.log(buttons);



/* const handleChange = (event) => {
    console.log(event.target.value)
}
screen.addEventListener('change', handleChange); */

/*for(let item of buttons) {
    item.addEventListener('click', (e) => { 
        let buttonText = e.target.innerHTML;
        console.log('Button text is ' + buttonText);

        switch (buttonText) {
            case 'X':
                buttonText = "*";
                console.log('Button text is ' + buttonText);
                screenValue += buttonText;
                screen.value = screenValue;
                break;
            case 'AC':
                screenValue = "";
                screen.value = screenValue;
                break;

*/
