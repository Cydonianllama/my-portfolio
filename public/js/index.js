var btnMenu = document.getElementsByClassName("btn-menu");
var body = document.body
var itemsHamburguer = document.querySelectorAll('.dumb-hamburger-container li a');

for (var i = 0; i < btnMenu.length; i++) {
    btnMenu[i].addEventListener('click', function () {
        body.classList.toggle('menu-open');
    });
}

itemsHamburguer.forEach(item => {
    item.addEventListener('click',(event)=>{
        body.classList.toggle('menu-open');
    })
})

window.addEventListener('scroll',(event)=>{
    if (body.classList.contains('menu-open')){
        body.classList.toggle('menu-open');
    }
})