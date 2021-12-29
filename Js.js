let save = document.querySelector('  .container  button') ;
let char_input =  document.querySelector(' .container   div .characters') ;
let number =  document.querySelector('   .container  div  .number ') ;
let btn_generate =  document.querySelector('.container .generate') ;
let serial_input = document.querySelector('.container .Code') ;
 
let btn_generate100 = document.querySelector(' .container .generate_many');
let serial100 = document.querySelector('.meney_serials') ;
let character_container = [..."1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"];
let frm_container =   $('.frm_container') ;
let btn_cancel = document.querySelector('.frm_container form .btn_cancel');
let btn_ok = document.querySelector('.frm_container form .btn_ok');
let input_user_choise = document.querySelector('.frm_container  .frm input') ;
let note = document.querySelector('.note') ;
let character_count = 10 ;
let Serial  = "" ;
let storage_array = [] ;
let iteration_array = [] ;
let iteration_array100 =  [] ;
// localStorage.clear("random_serial")
let probabilities = (Math.pow(character_container.length , 4) );


// restore data from storage 
if (localStorage.getItem('random_serial')) {
    storage_array = JSON.parse(localStorage.getItem('random_serial')) ;
    character_container = [...storage_array[0]] ;  
    character_count = storage_array[1] ; 
     probabilities = (Math.pow(character_container.length , 4) );
}


function make_one_serial () {
   Serial = "" ;
    for (let i = 0 ; i < character_count ; i ++) {
        let Temp = Math.floor(Math.random() * character_container.length);
        Serial += character_container[Temp] ;   }    
    }
 
function add_one_serial() {
    iteration_array.push(Serial) ;
    serial_input.textContent = Serial ;
    Serial ="" ;
}

btn_generate.addEventListener('click' , function (e) {
     make_one_serial() ;
    if (iteration_array.length > 0 )
    { 
        for (let i = 0 ; i < iteration_array.length ;i++)
   {    
    // console.log(i) ;
    // console.log(`the serial is : ${Serial}  --- the iteration is : ${iteration_array[i]}`) ;
                if (Serial === iteration_array[i]) {
                       probabilities -- ;
                    //    console.log(probabilities) ;
                    if (probabilities <= 0) 
                    {
                     serial_input.textContent = `("You have Select All probabilities Serials in this Characters add another combin") ` ;
                    //  console.log("You have Select All probabilities Serials in this Characters")  ; 
                     btn_generate.setAttribute("disabled", true); 
                    break ;
                     }
                    make_one_serial () ;
                    i = -1 ;
                    continue ;
                }
                 }
                 if (!(probabilities <= 0)) 
                 { add_one_serial() ;}
                 probabilities = (Math.pow(character_container.length , 4) );
     } else {
         add_one_serial() ;   
             }
})

function make_100_serial () {
    Serial = "" ;
    for (let i = 0 ; i < character_count ; i ++) {
        let Temp = Math.floor(Math.random() * character_container.length);
        Serial += character_container[Temp]  ;
       
    }
}

function add_100_serial() {
    serial100.innerHTML += Serial + "<br/> " + `\n`;
    iteration_array100.push(Serial) ;
    Serial ="" ;
   
}

btn_generate100.onclick = function () {
    input_user_choise.setAttribute('placeholder' ,'') ;
     frm_container.fadeIn(1000 , function () {
        input_user_choise.focus() ;
     }).css('display','flex');
     input_user_choise.value = "" ;  
}

btn_ok.onclick = function (e) {
    if (input_user_choise.value !== "")
    {
        // check if user some how  entered a value = not anumber
            if (!(isNaN(input_user_choise.value))) {
    let check_text = true ; /// this is just for print the Note One Time 
    serial100.style.display =  'block' ;
    for (let j = 0 ; j <= parseInt(input_user_choise.value)  ; j++)
 {   
        make_100_serial () ;
        if (iteration_array100.length > 0) {
            for (let i = 0 ; i< iteration_array100.length ; i++) {
                    if (iteration_array100[i] === Serial) {
                        make_100_serial () ;
                        i = -1 ;
                        probabilities -- ;
                         if (probabilities <= 0 )
                         {
                             if (check_text)
                            {serial100.innerHTML +=  ` <br/> \n ("You have Select All probabilities Serials in this Characters add another combin") ` ;
                            check_text = false ;
                            frm_container.fadeOut(500) ; 
                            }
                            btn_generate100.setAttribute("disabled", true); 
                             break ;
                         }
                        continue ;
                    }
            }
            if (!(probabilities <= 0)) 
            {  
                frm_container.fadeOut(500) ; 
                 add_100_serial() ;}
            probabilities = (Math.pow(character_container.length , 4) );
          } 
          else 
                 {
             add_100_serial() ;
             frm_container.fadeOut(500) ;
                } 
}} 
 // if input not a number 
else {
    input_user_choise.value = "" ;
    input_user_choise.setAttribute('placeholder' , "هذا الحقل مخصص للارقام فقط ") ;
}
 /// if input is  impty
}  else {
    input_user_choise.setAttribute('placeholder' , "من فضلك اضف هنا عدد السيريال التي تريدها ") ;
}
    } 

document.addEventListener('click' , function (e) {
        if (e.target.className == 'frm_container' ||  e.target == btn_cancel )
        { frm_container.fadeOut(500) ; }
}) ;

save.onclick = function() {

        // check if field is Empty or Number Field has chars
        if (char_input.value === "" || number.value === "" ) {
            // this is just for show  ,, remove blue color from place holder 
            number.classList.remove('blue')
            char_input.classList.remove('blue');
            if  (char_input.value =="" )
           { char_input.setAttribute('placeholder',"ادخل الرموز التي تريد تكوين كلمة السيريال بها  ")}
            if(number.value == "" )
            {
                number.setAttribute('placeholder',"ادخل عدد الرموز التي تريدها في السيريال  ")}       
        }   
        else { 
            // if the value is not a number invert ! means ites anumber 
            if (!(isNaN(number.value)))
         {  
            character_container =  char_input.value ;
            character_count = number.value  ;
            storage_array[0] = character_container  ;
            storage_array[1] = character_count ;
            console.log(storage_array) ;
            localStorage.setItem("random_serial",JSON.stringify(storage_array)) ;
            iteration_array = [] ;
            iteration_array100 = [] ;
            btn_generate.removeAttribute("disabled"); 
            btn_generate100.removeAttribute("disabled"); 
            char_input.value = "" ;
            number.value = ""
            number.setAttribute('placeholder' , "Saved") ;
            char_input.setAttribute('placeholder' , "Saved") ;
              // this is just for show  ,, add blue color from place holder 
            number.classList.add('blue')
            char_input.classList.add('blue');
         } 
         // if user enter a char show this 
         else {
                number.value = "" ; 
            number.setAttribute ('placeholder' , 'هذا الحقل مخصص للأرقام فقط');}
        }
} ;

    prevent_charactars (number)
    prevent_charactars (input_user_choise)
function prevent_charactars (el) {
    el.addEventListener('keydown' , function(e) {
        if (!(e.keyCode >= 48 && e.keyCode <= 58 || e.keyCode === 8))
        { 
             e.preventDefault(); 
        } }) ;
}

    $(document).ready(function() {
        $(note).click(function() {
            navigator.clipboard.writeText(note.textContent);
        });
    });
   



    // quick Copy 
    serial_input.addEventListener('click',function(e) {
        navigator.clipboard.writeText(this.textContent);
    });
    serial100.onclick = function (e) {
        navigator.clipboard.writeText(this.textContent);
    }

    // Reload 
document.querySelector('i').onclick = function ()  {
    window.location.reload() ;
}


