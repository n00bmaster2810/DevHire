function validation(){
    var user= document.getElementById('dev-signup-email').value;
    var pass= document.getElementById('dev-signup-password').value;
    if(user.indexOf('@')<=0){
document.getElementById('dse').innerHTML=" *invalid email";
return false;


    }
    if(!(pass.match(/^[A-Za-z]\w{7,14}$/))){
     document.getElementById('dsp').innerHTML=" *please enter strong password of length >= 8 and contains a capital letter and a number and a special character";
      return false;

    }
    return true;
   }
       


   function validation1(){
    var user= document.getElementById('comp-signup-email').value;
    var pass= document.getElementById('comp-signup-password').value;
    if(user.indexOf('@')<=0){
document.getElementById('cse').innerHTML=" *invalid email";
return false;


    }
   


    if(!(pass.match(/^[A-Za-z]\w{7,14}$/))){
     document.getElementById('csp').innerHTML=" *please enter strong password of length >= 8 and contains a capital letter and a number and a special character";
      return false;

    }
    return true;
    
   }
