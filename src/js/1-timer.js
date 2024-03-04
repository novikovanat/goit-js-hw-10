import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
// import  "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('button');
button.addEventListener("click", clickHandler)

let userSelectedDate;
let ms;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    ms = userSelectedDate.getTime() - Date.now();
    if(ms>1000) {
      button.disabled = false
      }
    else
       { button.disabled = true;
        iziToast.error({
          timeout:'5000',
          messageColor:'#ffffff',
          title:'Error',
          titleColor:"#fff",
          titleSize:"16",
          titleLineHeight:'24',
          message: 'Please choose a date in the future',
          iconUrl: './img/error.svg',
          iconColor:'#fff',
          backgroundColor:'#EF4040',
          progressBarColor:"#B51B1B",
          position:'topRight',
          messageSize:'16',
          messageLineHeight:'24',
          // close:false,
        //   buttons:[ ['<button><svg width="16" height="16">./img/cross.svg</svg></button>', function (instance, toast) {
 
        //     instance.hide({ transitionOut: 'fadeOut'}, toast, 'button');
 
        // }, true],]

        
          
      })}
  },
};

const datetimePicker = document.getElementById('datetime-picker');
flatpickr(datetimePicker, options);

datetimePicker.addEventListener("input" , inputHandler)

const timeValuesArray = document.getElementsByClassName('value')

function clickHandler(){
  button.disabled = true;
  datetimePicker.disabled = true;
 
  const intervalId = setInterval(()=>{
  console.log("Here is ms in click:", ms);
  ms = userSelectedDate.getTime() - Date.now()
  convertMs(ms)
  const { days, hours, minutes, seconds } = convertMs(ms)
  timeValuesArray[0].textContent = days;
  timeValuesArray[1].textContent = hours;
  timeValuesArray[2].textContent = minutes;
  timeValuesArray[3].textContent = seconds;
  if (ms<1000){
    clearInterval(intervalId)
    datetimePicker.disabled = false;
  }
}, 1000, ms);
  

  
  // const days =userSelectedDate.getDate()
  // console.log("Here is Day:", days)
}
// console.log(timeValuesArray)
// console.log(userSelectedDate)
// timeValuesArray[0].textContent = "test"}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Add notification
// add styles

function inputHandler (event) {
  event.target.classList.add('input-change')
}