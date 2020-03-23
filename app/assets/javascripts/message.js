$(function(){ 

  function buildHTML(message) {
    // console.log(message)
    // var id = message.id
    // console.log(id)
   if ( message.image ) {
     var html =` <div class="main-chat_messages_message" data-id="${message.id}">
         <div class="main-chat_messages_message_upper-message">
           <div class="main-chat_messages_message_upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="main-chat_messages_message_upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat_messages_lower-message">
           <p class="lower-message_content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   }else {
     var html =
      ` <div class="main-chat_messages_message" data-id="${message.id}">
         <div class="main-chat_messages_message_upper-message">
           <div class="main-chat_messages_message_upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="main-chat_messages_message_upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lmain-chat_messages_lower-message">
           <p class="lower-message_content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }


 $('#newmessage').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat_messages').append(html);      
    $('form')[0].reset();
    $('.main-chat_messages').animate({scrollTop: $('.main-chat_messages')[0].scrollHeight}, 'fast');
  })
  .fail(function(){
    alert('error');
  });
})

 var reloadMessages = function() {
   last_message_id = $('.main-chat_messages_message').last().attr("data-id");
  console.log(last_message_id)
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.main-chat_messages').append(insertHTML);  
    $('.main-chat_messages').animate({ scrollTop: $('.main-chat_messages')[0].scrollHeight});
  }
  })
  .fail(function() {
    alert('error');
  });
 };

 if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
 }
})