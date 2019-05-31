
function gen_notify() {
	let rand = Math.random();
	if (rand < 3/9) notify_line();
	else if (rand < 7.5/9) notify_ig();
	else notify_messages();
}

function notify(data) {
	let m = data.message[Math.floor(data.message.length*Math.random())];
	$.notify({
		icon: data.icon,
		title: data.title,
		message: m
	}, {
		newest_on_top: true,
		type: data.type,
		icon_type: data.icon_type,
		template: '<div data-notify="container" class="col-sm-5 alert-{0} alert-all" role="alert">' +
			'<span data-notify="icon"></span> ' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message">{2}</span>' +
		'</div>'

	});
}

function notify_line() {
	let lineData = {
		//icon: 'fab fa-line',
		icon: 'image/line.png',
		title: 'LINE',
		type: 'line',
		message: ['<span class="boldText">Mom</span></br>I left your dinner at the table', 
			'<span class="boldText">Mom</span></br>When are you coming home?'],
		icon_type: 'img'
	};
	notify(lineData);
}

function notify_ig() {
	let igData = {
		//icon: 'fab fa-instagram',
		icon: 'image/instagram.png',
		title: 'INSTAGRAM',
		type: 'instagram',
		message: ['sonia_calico just liked your post', 
			'loneyloneygal23 just liked your post',
			'This message is no longer available because it was unsent by the sender',
			'(leavemealone333) : noahalmighty: yo',
			'(leavemealone333) : noahalmighty: yo yo yoyoyooooooo',
			'(leavemealone333) : noahalmighty: yo!!!'],
		icon_type: 'img'
	};
	notify(igData);
}

function notify_messages() {
	let messageData = {
		icon: './image/messages.png',
		title: 'MESSAGES',
		type: 'messages',
		message: ['<span class="boldText">bae</span></br>can we talk?😢'],
		icon_type: 'img'
	};
	notify(messageData);
}




//alert alert-{0}
//col-sm-5 
//col-xs-10 


//fa fa-instagram
//fab fa-line