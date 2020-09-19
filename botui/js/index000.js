var $messages = $('.messages-content');
$messages.mCustomScrollbar();


function insertMessage() {
  msg = 'DDD'
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg()


}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault()
  insertMessage();
}

function serverMessage(response2) {
    $('.message-input').val(response2);
 }


function fetchmsg(){
     var url = 'http://localhost:3000/send-msg1';
      const data = new URLSearchParams();
      data.append("MSG", "웅 마쟈");
      console.log("abc",data)
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
         serverMessage(response.Reply);

         })
          .catch(error => console.error('Error h:', error));

}
