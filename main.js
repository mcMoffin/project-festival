let burger = document.querySelector(".burger");
let mouse = document.querySelector(".cursor");

let addBtn = document.querySelectorAll(".add-cart");
let cartAmnt = document.querySelector(".nav-links h3:nth-child(4) span");

let navLinks = document.querySelector(".nav-links");

let logo = document.querySelector("#logo");
let tbBtn = document.querySelector(".nav-links h3:nth-child(1) a");
let schedBtn = document.querySelector(".nav-links h3:nth-child(2) a");
let ticketBtn = document.querySelector(".nav-links h3:nth-child(3) a");
let cartBtn = document.querySelector(".nav-links h3:nth-child(4) a");

let controller;
let pgScene;
let endPgScene;

let amntInCart = 0;
let productList = [];

function cursor(e){
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function mainPgAnimations(){
    controller = new ScrollMagic.Controller();

    let sliders = document.querySelectorAll(".slides");

    // index pg
    sliders.forEach((slide, index, slides) => {
        let cityImg = slide.querySelector(".intro-img2");
        let stageImg = slide.querySelector(".intro-img1");
        let multiImg = slide.querySelectorAll("img");
        
        let singleImg = slide.querySelector("img");
        let lSwipe = slide.querySelector(".lSwipe");
        let rSwipe = slide.querySelector(".rSwipe");

        const slideTl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power2.inOut"}
        });

        if(slide.querySelector(".intro-img2")){            
            slideTl.fromTo(cityImg, {y: "100"}, {y: "0"});
            slideTl.fromTo(stageImg, {opacity: "0"}, {opacity: "1"}, "-=0.25");
            slideTl.fromTo(multiImg, {scale: 2}, {scale: 1}, "-=0.25");
        }else{
            slideTl.fromTo(lSwipe, {y: "0"}, {y: "2000"});
            slideTl.fromTo(rSwipe, {y: "0"}, {y: "-2000"}, "-=0.25");
            slideTl.fromTo(singleImg, {scale: 2}, {scale: 1}, "-=0.25");
        }

        pgScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(slideTl)
        .addTo(controller);


        const pageTl = gsap.timeline();
        let nextSlide = slide.length - 1 === index ? 'end' : slides[index + 1];

        pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"});
        pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5");
        
        pageTl.fromTo(slide, {opacity:1, scale: 1}, {opacity:0, scale: 0.5});


        endPgScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
            reverse: true
        })
        .setTween(pageTl)
        .setPin(slide, {pushFollowers: false})
        .addTo(controller);
        
    });
}

function seccondPgAnimations(){

    controller = new ScrollMagic.Controller();

    let sliders = document.querySelectorAll(".detail-slide");

    sliders.forEach(slide =>{
        let slideTxt = slide.querySelector(".concert-txt div");
        let slideImg = slide.querySelector(".concert-img img");
        let slideDate = slide.querySelector(".concert-date div");

        let landMark = document.querySelector('.burger');
        
        const theTl = gsap.timeline({
            default: {duration: 0.5, ease: "power3.out"}
        });

        if(getComputedStyle(landMark).position === 'absolute') {                
            theTl.from(slideTxt, 1, {y: "300px", opacity: 0});       
            theTl.from(slideImg, 1, {y: "-300px", opacity: 0}, "-=1");       
        }else{
            
            if(slide.querySelector(".concert1")){
                theTl.from(slideTxt, 1, {x: "300px", opacity: 0});
                theTl.from(slideImg, 1, {x: "-300px", opacity: 0}, "-=1");
                theTl.from(slideDate, 1, {x: "200px"});
            } else{
                theTl.from(slideImg, 1, {x: "300px", opacity: 0});
                theTl.from(slideTxt, 1, {x: "300px", opacity: 0}, "-=0.3");
                theTl.from(slideDate, 1, {y: "-300px"});
            }
        }

        pgScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook:0.25,
            reverse: false
        })
        .setTween(theTl)
        .addTo(controller);

    });
}

function thirdPgAnimations(){
    let hl = document.querySelectorAll(".headliners");

    let profileInImg = document.querySelectorAll(".hl-img img");
    let profileImg = document.querySelectorAll(".hl-img");
    let profileTxt = document.querySelectorAll(".hl-txt");

    const tl = gsap.timeline({
        defaults: {duration: 1, ease: "power1.inOut", stagger: 0.1}
    });

    tl.from(hl, {border: "#000"});
    tl.from(profileInImg, {opacity: 0, scale: 1.5});
    tl.from(profileImg, {x: "150%"});
    tl.from(profileTxt, {opacity: 0, x: "-50%"}, "-=0.5");
}

barba.init({
    views: [
        {namespace: "home",

            beforeEnter(){
                mainPgAnimations();

                logo.href = "./index.html";
                tbBtn.href = "./pages/throwback.html";
                schedBtn.href = "./pages/schedual.html";
                ticketBtn.href = "./pages/purchase.html";
                cartBtn.href = "./pages/cart.html";            
            },
            beforeLeave(){
                
                closeNav(burger);
                
                pgScene.destroy();
                endPgScene.destroy();
                controller.destroy();
            }
        },
        {namespace: "throwback",

            beforeEnter(){
                seccondPgAnimations();

                logo.href = "../index.html";
                tbBtn.href = "./throwback.html";
                schedBtn.href = "./schedual.html";
                ticketBtn.href = "./purchase.html";
                cartBtn.href = "./cart.html";            
            },
            beforeLeave(){
                
                closeNav(burger);
                
                pgScene.destroy();
                endPgScene.destroy();
                controller.destroy();
            }
        },
        {namespace: "schedual",

            beforeEnter(){
                logo.href = "../index.html";
                tbBtn.href = "./throwback.html";
                schedBtn.href = "./schedual.html";
                ticketBtn.href = "./purchase.html";
                cartBtn.href = "./cart.html";    
                thirdPgAnimations();
                        
            },
            beforeLeave(){
                closeNav(burger);
                
                pgScene.destroy();
                endPgScene.destroy();
                controller.destroy();
            }
        },
        {namespace: "purchase",

            beforeEnter(){
                logo.href = "../index.html";
                tbBtn.href = "./throwback.html";
                schedBtn.href = "./schedual.html";
                ticketBtn.href = "./purchase.html";
                cartBtn.href = "./cart.html";            
            },
            beforeLeave(){
                
                closeNav(burger);
                
                pgScene.destroy();
                endPgScene.destroy();
                controller.destroy();
            }
        },
        {namespace: "cart",

            beforeEnter(){

                logo.href = "../index.html";
                tbBtn.href = "./throwback.html";
                schedBtn.href = "./schedual.html";
                ticketBtn.href = "./purchase.html";
                cartBtn.href = "./cart.html";            
            },
            beforeLeave(){
                closeNav(burger);

                pgScene.destroy();
                endPgScene.destroy();
                controller.destroy();
            }
        },

    ],

    transitions: [{
        leave({current, next}){

            let done = this.async();
            const tl = gsap.timeline({default: {ease: "power2.inOut"} });

            tl.fromTo(current.container, 1,{opacity: 1}, {opacity: 0});
            
            tl.fromTo(".swipe", 0.75, {x: "-100%" }, {x: "0%", stagger: 0.25,  onComplete: done }, "-=0.5" );  
        },

        enter({current, next}){
            let done = this.async();

            window.scrollTo(0,0);

            const tl = gsap.timeline({default: {ease: "power2.inOut"} });
            
            tl.fromTo(".swipe", 1, {x: "0%" }, {x: "100%", stagger: 0.25,  onComplete: done });

            tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1});
            
        }
    }]
    
  });

function activeCursor(e){
    let theTargetClass = e.target.classList;
    let mouseTxt = mouse.querySelector("span");
    
    if(theTargetClass.contains("explore")){
        mouse.classList.add("cursor-explore");
        mouseTxt.innerText = "Click";        
        gsap.to('.title-swipe', 1, {y: '0%'});

    }else{
        mouse.classList.remove("cursor-explore");
        mouseTxt.innerText = "";
        gsap.to('.title-swipe', 1, {y: '100%'});
    }
    
    if(theTargetClass.contains("add-cart") || theTargetClass.contains("checkout")){
        mouse.classList.add("cursor-btn");
        mouseTxt.innerText = "Ticket";
    }else{
        mouse.classList.remove("cursor-btn");
    }
    
    if(e.target.id === "logo" || theTargetClass.contains("burger")){
        mouse.classList.add("nav-explore");
    }else{
        mouse.classList.remove("nav-explore");
    }
}

function navToggle(e){

    if(!e.target.classList.contains("active")){
        e.target.classList.add("active");

        gsap.to(".bLine1", 0.5, {backgroundColor: "#000", rotation:"45", y: "5"});
        gsap.to(".bLine2", 0.5, {backgroundColor: "#000", opacity: "0", x: "30"});
        gsap.to(".bLine3", 0.5, {backgroundColor: "#000", rotation: "-45", y: "-5"});
        gsap.to("#logo", 0.5, {color: "#000"});
        gsap.to(".nav-options a", 0.5, {color: "#000"});
        gsap.to(".amount", 0.5, {color: "#000"});
        gsap.to(".nav-bar", 1, {clipPath: "circle(2500px at 100% -10%)"});

        navLinks.classList.add("active");
        document.body.classList.add("hide");
    }else{
        e.target.classList.remove("active");

        gsap.to(".bLine1", 0.5, {backgroundColor: "#fff", rotation: "0", y: "0"});
        gsap.to(".bLine2", 0.5, {backgroundColor: "#fff", opacity: "1", x: "0"});
        gsap.to(".bLine3", 0.5, {backgroundColor: "#fff", rotation: "-0", y: "0"});
        gsap.to("#logo", 0.5, {color: "#fff"});
        gsap.to(".nav-options a", 0.5, {color: "#fff"});
        gsap.to(".amount", 0.5, {color: "#fff"});
        gsap.to(".nav-bar", 0.5, {clipPath: "circle(30px at 100% -10%)"});

        navLinks.classList.remove("active");
        document.body.classList.remove("hide");
    }
}

function closeNav(e){

    e.classList.remove("active");

    gsap.to(".bLine1", 0.5, {backgroundColor: "#fff", rotation: "0", y: "0"});
    gsap.to(".bLine2", 0.5, {backgroundColor: "#fff", opacity: "1", x: "0"});
    gsap.to(".bLine3", 0.5, {backgroundColor: "#fff", rotation: "-0", y: "0"});
    gsap.to("#logo", 0.5, {color: "#fff"});
    gsap.to(".nav-options a", 0.5, {color: "#fff"});
    gsap.to(".amount", 0.5, {color: "#fff"});
    gsap.to(".nav-bar", 0.5, {clipPath: "circle(30px at 100% -10%)"});

    navLinks.classList.remove("active");
    document.body.classList.remove("hide");
}

// cart creation
let shoppingCart = (function() {
    
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
    // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    let obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart[item].count = count;

          saveCart();
          return;
        }
      }
      let item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }

    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(let i in cart) {
          console.log(i);
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };

    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(let item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      let totalCount = 0;
      for(let item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      let totalCart = 0;
      for(let item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      let cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover",activeCursor);

addBtn.forEach( button =>{

    button.addEventListener("click",(e) =>{
      let tagetParent= e.target.parentElement;

        let product = tagetParent.getAttribute("data-product");
        let prodPrice = tagetParent.getAttribute("data-price");
        let prodAmntInput = tagetParent.querySelector("input");
        let prodAmnt = Number(prodAmntInput.value);

        shoppingCart.addItemToCart(product, prodPrice, prodAmnt);
    });
});

// shoppingCart.totalCart() for the individual items
//  shoppingCart.totalCount() for the cart icon
