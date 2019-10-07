Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
Date.prototype.toFirst = function() { 
    this.setDate(1);   
    this.setDate(this.getDate() - this.getDay() );  
} 
Date.prototype.toString = function() { 
    let date = this.toJSON().slice(0, 10); 
    return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
} 


function initTextInput(){
    let now = new Date();  
    let input = document.getElementsByClassName('nhun-calendar-input-date');

    for(let i = 0; i < input.length; i++){
        input[i].value = now.toString();
    }
}

function initSelectMonth(){ 
    let month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let month = document.getElementsByClassName('nhun-calendar-select-month');
    let now = new Date();  
    for(let k = 0; k < month.length; k++){
        for(let i = 0; i < 12; i++){
            if(i == now.getMonth()) month[k].innerHTML += `<option value='${i}' selected >${month_arr[i]}</option>`;
            else month[k].innerHTML += `<option class='nhun-calendar-option' value='${i}' >${month_arr[i]}</option>`;
        }
    } 
}

function initSelectYear(){ 
    let year = document.getElementsByClassName('nhun-calendar-select-year'); 

    let now = new Date();  
    for(let k = 0; k < year.length; k++){ 
        for(let i = now.getFullYear() - 9; i <= now.getFullYear() + 10; i++){
            if(i == now.getFullYear()) year[k].innerHTML += `<option value='${i}' selected >${i}</option>`;
            else year[k].innerHTML += `<option class='nhun-calendar-option' value='${i}' >${i}</option>`;
        }

        renderCalendar(year[k]);
    }
}


function init(){
    initTextInput();
    initSelectMonth();
    initSelectYear();
}

function renderCalendar(ele){ 
    let parent = ele.parentNode.parentNode;
    let year = parent.getElementsByClassName("nhun-calendar-select-year")[0];
    let month = parent.getElementsByClassName("nhun-calendar-select-month")[0];
    let calendar = parent.getElementsByClassName("nhun-calendar-content")[0];

    let now = new Date();
    let beginDate = new Date(year.value, month.value, 12, 12, 12, 12); 
    beginDate.toFirst();

    calendar.innerHTML = '';
    let row = ''
    for(let i = 0; i < 6; i++){ 
        row = `<div  class="nhun-calendar-div"><span class='nhun-calendar-span'>${beginDate.getWeek()}</span>`;
        for(let j = 0; j < 7; j++){
            if(now.toString() == beginDate.toString())
                row += `<button class='nhun-calendar-button same-month current-date' value='${beginDate.toString()}' onclick='updateInputDate(this)'>${beginDate.getDate()}</button>`;
            else if(beginDate.getMonth() == month.value)      
                row += `<button class='nhun-calendar-button same-month' value='${beginDate.toString()}' onclick='updateInputDate(this)'>${beginDate.getDate()}</button>`;
            else
                row += `<button class='nhun-calendar-button diff-month' value='${beginDate.toString()}' onclick='updateInputDate(this)'>${beginDate.getDate()}</button>`; 

            beginDate.setDate(beginDate.getDate() + 1);	
        }
        row += '</div>'
        calendar.innerHTML += row;
    }
}

function updateInputDate(ele){ 
    Array.from(document.getElementsByClassName('current-date'))
	.forEach(e => e.classList.remove('current-date'));
    ele.classList.add('current-date');
    let input = ele.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("nhun-calendar-input-date")[0];
    input.value = ele.value;
}

window.onload = function(){
    
    Array.from(this.document.getElementsByClassName('nhun-calendar'))
        .forEach(ele => ele.innerHTML = 
            `<input type='text' class='nhun-calendar-input-date' value='<i class="fas fa-user"></i>'/>  
            <div class="nhun-calendar-div">
                <select class='nhun-calendar-select-month' onchange="renderCalendar(this)"></select> 
                <select class='nhun-calendar-select-year' onchange="renderCalendar(this)"></select>  
            </div>
            <div class="nhun-calendar-container">
                <div class="nhun-calendar-header">
                    <span class="nhun-calendar-span">W</span>
                    <span class="nhun-calendar-span">Su</span>
                    <span class="nhun-calendar-span">Mo</span>
                    <span class="nhun-calendar-span">Tu</span>
                    <span class="nhun-calendar-span">We</span>
                    <span class="nhun-calendar-span">Th</span>
                    <span class="nhun-calendar-span">Fr</span>
                    <span class="nhun-calendar-span">Sa</span>
                </div>
                <div class="nhun-calendar-content"></div>
            </div>`)

    this.init();
}
