import React from 'react';

// styling for modal
export const modalStyles = {
  overlay: {
    backgroundImage: "url('iroutebackground.png')"
  },
  content : {
    width                 : '40rem',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

//stryling for modal used to delete a record
export const openModalStyles = {
  content : {
    width                 : '40rem',
    top                   : '52%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0 1rem 1.5rem 1.5rem',
    transform             : 'translate(-50%, -50%)'
  }
};

export const driverModalStyles = {
  content : {
    width                 : '40rem',
    top                   : '52%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0',
    transform             : 'translate(-50%, -50%)'
  }
}
/**
 * @datestring: validation date
 * returns date from date string
 */
export function getLocaleDate(date) {
  let str = new Date(date);
  return (
    str.toLocaleDateString()
  )
}
/**
 * @datestring: validation date
 * returns ISO date from date string
 */
export function getISODate(date) {
  let str = new Date(date);
  return (
    str.toISOString().split("T")[0]
  )
}
/**
 * @errorMessage: validation string
 * returns html to show validation message
 */
export function getFieldError(errorMessage) {
  return (
    <div className="errorNotification">
      {
        errorMessage===""||errorMessage=== undefined
        ? (<span></span>)
        : (<span>{"*"+errorMessage}</span>)
      }
    </div>
  )
}

/**
 * @responseMessage: validation string for screen
 * returns html to show validation message
 */
 export function getScreenResponse(screenMessage) {
   return (
     <div className="bg-info well-sm">
       {
         screenMessage===""||screenMessage=== undefined
         ? (<span></span>)
         : <h4><b><span>{screenMessage}</span></b></h4>
       }
     </div>
   )
 }

 /**
  * @responseMessage: validation string for field
  * returns html to show validation message
  */
 export function getResponse(responseMessage) {
   return (
     <div className="responseNotification">
       {
         responseMessage===""||responseMessage=== undefined
         ? (<span></span>)
         : (<span>{responseMessage}</span>)
       }
     </div>
   )
 }


//Generic function for seceond calculation
export function convertSecToHrs(sec, isHrs) {
        let temp1 = "00";
        let temp = "00";
        let time = 0;
        if (sec) {
            temp = Number(sec) / 3600;
            temp = temp.toString()
            temp = temp.split(".");
            time = temp[0];
            if (temp[1]) {
                temp1 = Number("0." + temp[1]) * 60;
                temp1 = temp1.toString();
                temp1 = temp1.split(".");
                temp1 = temp1[0];
            }
            if (isHrs) {
                time = time + "." + temp1;
                return time;
            }
            if (Number(time) > 11)
                time = time + ":" + temp1 + " PM";
            else
                time = time + ":" + temp1 + " AM";
        }
        return time;
    }
export function exportEmail(e) {
 return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(e);
}

export function exportPassword(pw) {
 return (pw.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && pw.length > 4 && pw.match(/[0-9]/) && pw.match(/.[!,@,#,$,%,^,&,*,?,_,~]/))
}
