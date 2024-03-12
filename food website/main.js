
$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        speed: 1000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1.8,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

const btn=document.querySelector("#signin")
btn.addEventListener("click", ()=>{
    window.location.href="login1.html/index.html"
})


// CART Iteam Functionaity
let cartNum = document.querySelector(".cart-number")
let itemsObj = {};

let addIteam = document.querySelectorAll(".dish-add-btn")
for(let singleAddIteam of addIteam){
    singleAddIteam.addEventListener("click",(event)=>{
        let num = cartNum.innerHTML;
        ++num;
        cartNum.innerHTML=num;
        let itemCard = event.target.closest('.dish-box');
        let title = itemCard.querySelector('.dish-title .h3-title').textContent;
        let price = itemCard.querySelector('.dist-bottom-row li b').textContent;
        let image = itemCard.querySelector('.dist-img img').src;
        itemsObj[num] = {
            title: title,
            price: price,
            imgSrc :image
        };
        displayItemsInCart();
    })
}


// Function to append items to the cart popup
let totalPrice = 0;
function displayItemsInCart() {
    cartPopup.innerHTML = '';
    for (let key in itemsObj) {
        if (itemsObj.hasOwnProperty(key)) {
            let obj = itemsObj[key];
            let itemDetails = document.createElement('div');
            let imgOfDish = document.createElement("img");
            imgOfDish.src = obj.imgSrc;
            imgOfDish.classList.add("smallImg")
            itemDetails.textContent = `${obj.title} - ${obj.price}`;
            itemDetails.prepend(imgOfDish);

            // totalPrice+=obj.price;
            // console.log(totalPrice);

            // Remove functionality
            let removeButton = document.createElement('button');
            removeButton.classList.add("removeBtn")
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                delete itemsObj[key];
                let num = cartNum.innerHTML;
                --num;
                cartNum.innerHTML=num;
                displayItemsInCart();
            });
            itemDetails.append(removeButton);
            cartPopup.appendChild(itemDetails);
        }
    }
}

// Add a click event listener to the cart for popup
const cartButton = document.getElementById('cartButton');
const cartPopup = document.getElementById('cartPopup');

cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (cartPopup.style.display === 'none') {
        cartPopup.style.display = 'block';
    } else {
        cartPopup.style.display = 'none';
    }
});

