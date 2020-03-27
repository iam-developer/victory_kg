
								// Функция для модалки:
let open_btn = document.querySelector(".btnOpenModal");
let modal = document.querySelector(".modal");
let close_btn = document.querySelector(".close-button");
let check = document.querySelector(".send");
let closeX = document.querySelector(".closeX");
let close2 = document.querySelector(".close2");

function toggle_modal() {
	modal.classList.toggle("show-modal");
}

close_btn.onclick = toggle_modal;

open_btn.onclick = toggle_modal;

closeX.onclick = toggle_modal;

close2.onclick = toggle_modal;


									// Функция для бургер меню:

	let burger_menu = document.querySelector('.burger_menu');
	let burger_menu_btn = document.querySelector('.burger_menu_btn');

	burger_menu_btn.onclick = function() {
		burger_menu.classList.toggle("burger_menu_show");
	}

	burger_menu_btn.addEventListener('click', () => {
		burger_menu.classList.toggle('change');
	})


										// Функция для галерея:
//Функция для открытия модальное окно:
let modal_gallery = document.getElementById("my_modal");

function openModal(){
	modal_gallery.style.display = "block";

}

// Функция для закрытия модальное окно:

let closeModal = document.querySelector(".closeModal");

closeModal.onclick = function(){
	modal_gallery.style.display = "none";
}

// Глобальная переменная:
let index = 1;
show_gallery(index);
// Функция для показа текущую фотография, по которой был клик:
function show_slides(n){ 
	index = n;
	show_gallery(n);
}

// Главная функция:
function show_gallery(n){
	let slides = document.getElementsByClassName("slides");

		if(n < 1){index = slides.length}// Показывает последний фото
    	if(n > slides.length){index = 1}// Показывает первый фото

	for(i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
		}
	slides[index-1].style.display = "block";
}

// Функция для перехода слайда(след. и пред.):

function prev(){
	show_gallery(index -= 1);
}

function next(){
	show_gallery(index += 1);
}


							// Функция для "Планировки":

	let index_2 = 1;
	show_galleries(index_2);

function show_galleries(l){

	let planImg = document.getElementsByClassName("gallery_item_image");

	if(index_2 < 1){index_2 = planImg.length}
	if(index_2 > planImg.length){index_2 = 1}

	for(let p = 0; p < planImg.length; p++){
	   planImg[p].style.display = "none";
    }
	planImg[index_2-1].style.display = "block";
	planImg[index_2-1].classList.add("wow", "fadeIn");
	new WOW().init();
	mini_blocks();
}

function show_slides_2(l){
	index_2 = l;
	show_galleries(l);
}

function btnLeft(){
	show_galleries(index_2 -= 1);
}

function btnRight(){
	show_galleries(index_2 += 1);
}

function mini_blocks(){
	let mini_block = document.getElementsByClassName('spaan');

	for(let f = 0; f < mini_block.length; f++) {
		mini_block[f].style.backgroundColor = "#d6d6d6";
	}
	mini_block[index_2-1].style.backgroundColor = "#605F5F";
}


								// ФУНКЦИЯ ДЛЯ КАРТИНКИ КАРТЫ:

let index_map = 1;
show_maps_photo(index_map);

function show_map(s){
	index_map = s;
	show_maps_photo();
}

function show_maps_photo(){
	let map_photo = document.getElementsByClassName("map_img");

		for(let b = 0; b < map_photo.length; b++){
			map_photo[b].style.display= "none";
		}

		map_photo[index_map-1].style.display = "block";
		map_photo[index_map-1].classList.add('wow', 'fadeIn');
		new WOW().init();
}


						//ФУКНЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ НА JSON СЕРВЕР:

let form_button = document.querySelector('.form_feed');

// Проверка на пустоту:

	 function check_form(e){
	 	console.log(e.parentElement);
	 	let parent = e.parentElement.id;

	 	let name = `#${parent} input[name=fio]`;
	 	let phone = `#${parent} input[name=phone]`;
	 	let email = `#${parent} input[name=email]`;

	 	let all_input = `#${parent} .input`;
	 	
	 	all_input = document.querySelectorAll(all_input);

	 	let error_msg = `#${parent}`;

	 	error_msg = document.querySelector(error_msg).nextElementSibling;
	 	console.log(error_msg);

	 	name = document.querySelector(name).value;
	 	phone = document.querySelector(phone).value;
	 	email = document.querySelector(email).value;

// Цикл for для каждого инпута:
	 	for(let i = 0; i < all_input.length; i++){
		   if(all_input[i].value == ''){
		   	  error_msg.style.padding = '6px';
		   	  error_msg.style.backgroundColor = '#EBC161';					
			  error_msg.innerText = 'Заполните поля!!!';
			  return false; // Остановливает функцию;
			}
		}
			feed(name,phone,email,parent);
  	}

// Отправка данных на сервер, точнее POST запрос:

  	const link = 'https://www.jsonstore.io/235843e64f46b79f9e423149e027829d2b9cfc5b32cdd67267b702bedeef6995';
	var array = [];
  		function feed(name,phone,email,parent) {
  		
		  		let obj = {
					name: name,
					phone: phone,
					email: email
				}

			array.push(obj);

				fetch(link,{
					headers:{'Content-type': 'application/json'},
					method: 'POST',
					body:JSON.stringify(array),
				})
					.then(res => res.json())
		    		.then(data => {
		   	 		  if(data.ok == true) {
		   	 		  	show_succes(true, parent);
		   	 		  	
		   	 		  }
		    		})
		}

// Функция для получения уведомления из сервера о том, что принято данные клиента:

		function show_succes(a, parent){
			let error_msg = `#${parent}`;
			error_msg = document.querySelector(error_msg).nextElementSibling;

			if(a == true){
				error_msg.style.padding = '6px';
				error_msg.style.color = "white";
		   	  	error_msg.style.backgroundColor = 'green';
				error_msg.innerText = "Ваши данные приняты!";
			}

			else {
				error_msg.style.padding = '6px';
		   	  	error_msg.style.backgroundColor = 'red';
				error_msg.innerText = "Повторите попытку заново!";
			}
		}

// Функция для получения данных,точнее GET запрос:
		fetch(link)
			.then(response=>response.json())
			.then(data=>{
				if(!data.result) return
				array = data.result;
				console.log(data.result);
			})


						//ФУНКЦИЯ ДЛЯ ОТПРАКИ ДАННЫХ №2 НА JSON СЕРВЕР:

 

	function CheckLastInput(p){
		console.log(p.parentElement);
	 	let parent_2 = p.parentElement.id;
	 	let check_text = document.querySelectorAll(".blooock7_text");
		let name_msg = `#${parent_2} .blooock7_text[name=name]`;
		let phone_msg = `#${parent_2} .blooock7_text[name=phone_number]`;
		let email_msg = `#${parent_2} .blooock7_text[name=e_mail]`;
		let message_msg = `#${parent_2} .blooock7_text[name=msg]`;

		name_msg = document.querySelector(name_msg).value;
		phone_msg = document.querySelector(phone_msg).value;
		email_msg = document.querySelector(email_msg).value;
		message_msg = document.querySelector(message_msg).value;

		for(let i = 0; i < check_text.length; i++){

	        if(check_text[i].value == '') {
			let errors = document.querySelector('.blooock7_text_error');
			errors.style.padding = "6px";
			errors.style.color = "white";
			errors.style.textAlign = "center";
			errors.style.backgroundColor = "red";
			errors.innerText = "Произошло ошибка.Пожалуйста, заполните все поля...";
			return false;
 		    }
		}
			feed_2(name_msg,phone_msg,email_msg,message_msg);
	}

        let link_2 = 'https://www.jsonstore.io/2ae3d2ce293ded3daa6f6da6609711ac9bdc3851c5cc73649948fa92718a3a17';
        var array_2 = [];

  		function feed_2(name_msg,phone_msg,email_msg,message_msg){
  		
		  		let obj_2 = {
					name: name_msg,
					phone: phone_msg,
					email: email_msg,
					message: message_msg
				}

			array_2.push(obj_2);

		fetch(link_2,{
					headers:{'Content-type': 'application/json'},
					method: 'POST',
					body:JSON.stringify(array_2),
				})
					.then(res => res.json())
		    		.then(data => {
		    			if(data.ok == true) {
		   	 		   	show_succes_2(true);		   	 		  	
		   	 		   }
		    		})		   	
		 }

		function show_succes_2(s) {
			let error_message = document.querySelector('.blooock7_text_error');

			if(s == true){
				error_message.style.padding = "6px";
				error_message.style.color = "white";
				error_message.style.textAlign = "center";
				error_message.style.width = "1030px";
				error_message.style.backgroundColor = "green";
				error_message.innerText = "Ваши данные отправлены. Пожалуйста, ждите звонка!";
			}

			else {

				error_message.style.color = "red";
				error_message.style.textAlign = "center";
				error_message.style.width = "1030px";
				error_message.style.backgroundColor = "green";
				error_message.innerText = "Произошло ошибка.Пожалуйста, повторите попытку заново!";
			
			}
		 }


							//ФУНКЦИЯ ДЛЯ ОТПРАКИ ДАННЫХ №3 НА JSON СЕРВЕР:

let send = document.querySelector(".send");

let text_error = document.querySelector(".text_error");

function check_modal_input(x){
		console.log(x.parentElement);
		let parent_3 = x.parentElement.id;

		let modal_name = `#${parent_3} .input_modal[name=modal_name]`;
		let modal_phone = `#${parent_3} .input_modal[name=modal_phone]`;
		let modal_email = `#${parent_3} .input_modal[name=modal_email]`;

		modal_name = document.querySelector(modal_name).value;
		modal_phone = document.querySelector(modal_phone).value;
		modal_email = document.querySelector(modal_email).value;

		let all_modal_inputs = `#${parent_3} .input_modal`;
		all_modal_inputs = document.querySelectorAll(".modal-content input");
		
		for(let i=0; i<all_modal_inputs.length; i++){
			if(all_modal_inputs[i].value == ''){
				text_error.style.display = "block";
				text_error.style.color = "white";
				text_error.style.backgroundColor = 'red';
				text_error.innerText = "Произошло ошибка.Пожалуйста, заполните все поля!";	
				document.querySelector(".send").style.marginTop = "0";
				return false;			
			}
		}
		feed_3(modal_name,modal_phone,modal_email);
	}

		const link_3 = 'https://www.jsonstore.io/9c448a4b19e324b3efc291aff3c7235bb236bac2b554a1b6fb92aec8d9effb3e';
		var array_3 = [];

  		function feed_3(modal_name,modal_phone,modal_email,parent_3) {
  		
		  		let obj_3 = {
					name: modal_name,
					phone: modal_phone,
					email: modal_email
				}

			array_3.push(obj_3);

				fetch(link_3,{
					headers:{'Content-type': 'application/json'},
					method: 'POST',
					body:JSON.stringify(array_3),
				})
					.then(res => res.json())
		    		.then(data => {
		   	 		  if(data.ok == true) {
		   	 		  	show_succes_3(true, parent_3);
		   	 		  	console.log(data);
		   	 		  }
		    		})
		}

				function show_succes_3(b, parent_3){
			let text_error = document.querySelector(".text_error");

			if(b == true){
				text_error.style.display = "block";
				text_error.style.padding = '6px';
		   	  	text_error.style.backgroundColor = 'green';
				text_error.innerText = "Ваши данные приняты!";
				text_error.style.border = "0";
				text_error.style.color = "white";
				send.style.marginTop = "0";
			}

			else {
				text_error.style.padding = '6px';
		   	  	text_error.style.backgroundColor = 'red';
				text_error.innerText = "Повторите попытку заново!";
			}
		}

		fetch(link_3)
			.then(response=>response.json())
			.then(data=>{
				if(!data.result) return
				array_3 = data.result;
				console.log(data.result);
			})
 
 
