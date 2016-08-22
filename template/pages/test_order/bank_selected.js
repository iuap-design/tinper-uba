function showBankList(){
	var bank_list = $(".bank-list");
	if(bank_list){
		bank_list.show();
	}
}
function notShowBankList(){
	var bank_list = $(".bank-list");
	if(bank_list){
		bank_list.hide();
	}
}

/*	$(".pl-item").click(
		function() {
			$(this).children("input.radio_bank_code")[0].checked=true;
			$(this).addClass("selected");
			$(this).siblings().removeClass("selected");
		}
	)*/