let name = null
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/signin');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function() {
    // };
    // xhr.send('idtoken=' + id_token);
    const profile = googleUser.getBasicProfile()
    name = profile.getName()
    $(document).on('click', '#google', function(event){
        $.ajax({
            url: 'http://localhost:3000/signin',
            type: 'post',
            data:{
                idtoken: id_token
            },
            success: function(data){

                localStorage.setItem('token', data.token)
                $('#login-hide').css({display: 'none'})
                $('#main').show()
                $('#name').html('Hi, '+ name)
            }
        })
    })
}

function loginanimate(){
    let log = $("#center");
    let show = $('.hide');
    let pg = $('#login-hide');
    
    log.animate({height: '500px', opacity: '0.4'}, "slow");
    log.animate({opacity: '1'}, "slow");
    show.animate({opacity: '1'}, "slow")
    setTimeout(()=>{
        pg.addClass('bg')
    }, 1500)
}
$(document).on('click', '#start', function(even){
    loginanimate()
})


$(document).on('click', '#logout', function(event){
    localStorage.removeItem('token')
    $('#login-hide').css({display: 'block'})
    $('#main').hide()
    $('#name').html('')
    loginanimate()
})