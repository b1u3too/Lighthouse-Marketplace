$(() => {
  $('#open-cost-search').on('click', () => {
    $('.welcome-message').hide();
    $('#cost-search').show();
  })

$('.compose-message').find('form').submit(function(event){
  event.preventDefault();
  const messageText = $('.compose-message').find('#message').val();
  hideError();

  if(!messageText || messageText.trim().length === 0) {
    const err = new Error("No message!");
    showError(err);
    return;
  }

  const message = $(this).serializeArray();
  console.log(message);
  $.ajax({
    method:'POST',
    url:'/api/messages',
    data: message
  })
    .then(() => {
      alert("Message sent!")
      $('.compose-message').find('form').trigger("reset");
      return;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

  const hideError = function() {
    $('.compose-message').find('.error-text').html('');
    $('error-text').slideUp('fast');
  }

  const showError = function(err) {
    $('.compose-message').find('.error-text').html(err.message);
    $('.error-message').slideDown('fast');
  }

});



