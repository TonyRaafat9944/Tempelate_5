//ccheck if theres local storage
let mainColors = localStorage.getItem("color_option");



if (mainColors !== null) {
    // console.log("Local storage is not empty")
    document.documentElement.style.setProperty('--main-color', mainColors)
    
            //remove active class from all colors list item
            document.querySelectorAll(".colors-list li").forEach(element => {
                element.classList.remove("active");

                // ADD ACTIVE CLASS ON ELEMENT WITH DATACOLOR === LOCAL STORAGE  ITEM
                if (element.dataset.color === mainColors) {
                    element.classList.add("active")
                }
            });

}

//Random bg option
let backgroundOption = true
// variable to control the interval
let intervalbg;

//check if theres local storage random background item
let backgroundlocalitem = localStorage.getItem("background_option");

//check if local storage not empty
if (backgroundlocalitem !== null) {
    
    if (backgroundlocalitem === 'true') {
        backgroundOption = true
    }
    else {
        backgroundOption = false
    }
    // remove active class from al lspans 
    document.querySelectorAll(".random-bg span").forEach(element => {
        element.classList.remove("active");
    })
    if (backgroundlocalitem === 'true') {
        document.querySelector(".random-bg .yes").classList.add("active")
    }
    else {
        document.querySelector(".random-bg .no").classList.add("active")
    }
}


//toggle spin class on icon
document.querySelector(".toggle .gear").onclick = function () {
    //toggle class for rotation
    this.classList.toggle("fa-spin")

    //toggle settings box
    document.querySelector(".settings-box").classList.toggle("opened")
}

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//loop on all list items
colorsLi.forEach(li => {

    //click on every list item
    li.addEventListener("click", (e) => {
        
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        
        handleActive(e)
    })
})

//switch background option
const randombgEl = document.querySelectorAll(".random-bg span");

//loop on span items
randombgEl.forEach(span => {

    //click on every span
    span.addEventListener("click", (e) => {
        
        handleActive(e)
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeimgs();
            localStorage.setItem("background_option", true); 
        }
        else {
            backgroundOption = false;
            clearInterval(intervalbg)
            localStorage.setItem("background_option", false);
        }
    })
})


//-----------------------------------------------------
// select landing page Element
let landingPage = document.querySelector(".landing-page")

//get array of imgs
let imgsArray = ["img1.jpg", "img4.jpeg", "img5.jpg"]



//function to randomize imgs

function randomizeimgs() {
    if (backgroundOption === true) {
        intervalbg = setInterval(() => {
            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //change background image url
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
        }, 2000)
    }
}
randomizeimgs();


//select skills selector
let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop
    //outer height 
    let skillsOuterHeight = ourSkills.offsetHeight
    //window height
    let windowHeight = this.innerHeight
    //window scorllTOp
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
            allSkills.forEach(skill => {
                skill.style.width = skill.dataset.progress;
            });
        
    }
}

// Create pop up with the image

let ourgallery = document.querySelectorAll(".gallery img")

ourgallery.forEach(img => {
    img.addEventListener('click', (e) => {
        //create overlay element 
        let overlay = document.createElement("div")
        //add class to overlay 
        overlay.className = 'popup-overlay';
        // append overlay to body
        document.body.appendChild(overlay)
        // create popup
        let popupbox = document.createElement("div")
        // add class to the pop up box
        popupbox.className = 'popup-box'


        //create close span
        let closebutton = document.createElement("span")
        //create the close button
        let closebuttontext = document.createTextNode("X")
        // append text to close button
        closebutton.appendChild(closebuttontext)
        // add class to close button
        closebutton.className = 'close-button'
        //append close button to popup box
        popupbox.appendChild(closebutton)


        if (img.alt !== null) {
            //create heading
            let imgheading = document.createElement("h3")
            // create text for heading 
            let imgText = document.createTextNode(img.alt)
            //append the text to the heading
            imgheading.appendChild(imgText);
            // append the heading to the popup box
            popupbox.appendChild(imgheading)
        }



        // create image 
        let popupimage = document.createElement("img")
        // set img source
        popupimage.src = img.src
        // add img to pop up box
        popupbox.appendChild(popupimage)
        //add pop up box to body
        document.body.appendChild(popupbox)
        


    })
})

//close popup
document, addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        // //remove the popup
        // e.target.parentNode.remove();
        //remove overlay 
        document.querySelector(".popup-overlay").remove();
        document.querySelector(".popup-box").remove();
    }
})
//select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullets")




//select all links
const allLinks = document.querySelectorAll(".links a")



function scrolltosomewhere(elements ) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        })
    })
}
scrolltosomewhere(allbullets);
scrolltosomewhere(allLinks);


//HANDLE active state

function handleActive(ev) {
    //remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    // add active class on self
    ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    })
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    }
    else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        handleActive(e)

        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets_option", "block");
        }
        else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option", "none");
        }
    })
    
})

//Reset button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    // localStorage.removeItem("bullets_option")
    // localStorage.removeItem("color_option")
    // localStorage.removeItem("background_option")
    window.location.reload();
    //reload window
}

//toggle menu

let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}

//click anywhere outside menu and toggle button
document.addEventListener("click", function (e) {
    if (!toggleBtn.contains(e.target) && !tLinks.contains(e.target)) {
        toggleBtn.classList.remove("menu-active");
        tLinks.classList.remove("open");
    }
});
