const shortCutsUser = document.querySelector('.shortcuts-user')

let isNormal = false;

let isPassed = false
let isComeback = false
let limit = 64;
let adition = 0

const smoothSticky = (e) => {
    // console.log(window.innerHeight || document.documentElement.clientHeight);
    // console.log(window.innerWidth || document.documentElement.clientWidth);

    const smooth = () => {
        shortCutsUser.classList.add('animation-sitcky')
    }

    const comeback = () => {
        shortCutsUser.classList.remove('animation-sitcky')
    }
    if (!isPassed){
        if (limit+adition > shortCutsUser.getBoundingClientRect().y){
            smooth()
            isPassed = true
            isComeback = false
            adition = 26
        }
    }else{
        if (!isComeback){
            if (100 < shortCutsUser.getBoundingClientRect().y) {
                isComeback = true
                isPassed = false
                comeback()
                adition = 0
            }
        }
    }
    
}
window.addEventListener('scroll',smoothSticky)