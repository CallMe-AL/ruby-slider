let rubies = [
    {
        id: 1,
        img: "./images/ruby1.JPG",
        desc: "Ruby and her toys",
    },
    {
        id: 2,
        img: "./images/ruby2.JPG",
        desc: "Snoozin'",
    },
    {
        id: 3,
        img: "./images/ruby3.JPG",
        desc: "Beggin'",
    },
    {
        id: 4,
        img: "./images/ruby4.JPG",
        desc: "Smilin'",
    },
    {
        id: 5,
        img: "./images/ruby5.JPG",
        desc: "Ruby in the lilacs",
    },
    {
        id: 6,
        img: "./images/ruby6.JPG",
        desc: "Ruby stoically in a car",
    },
]

let slideIndex = 0;

window.addEventListener('DOMContentLoaded', function() {
    displayCarousel(rubies);    
    setUpCarousel();
});

const container = document.querySelector('.track-container');
const prevBtn = document.querySelector('.btn-left');
const nextBtn = document.querySelector('.btn-right');

let transitionTime;
let hoverEffect = false;

// function for growSlide function
const toggleGrow = function(e) {
    e.target.classList.toggle('grow');
}

function displayCarousel(rubyArray) {

    let newArray = rubyArray.map(function(item) {
        return `<div class="slide">
        <div class="slide-img"></div>
    </div>`;
    });

    newArray = newArray.join('');

    container.innerHTML = newArray;
}

function setUpCarousel() {
    const images = document.querySelectorAll('.slide-img');
    const slides = document.querySelectorAll('.slide');
    const imgText = document.querySelector('.img-text');

    images.forEach(function(div, index) {
        div.style.backgroundImage = `url(${rubies[index].img})`;
    });

    slides[0].classList.add('active');

    imgText.textContent = `${rubies[slideIndex].desc}`;

    slides[1].classList.add('next-slide');
    slides[rubies.length - 1].classList.add('prev-slide');

    const activeSlide = document.querySelector('.active');
    growSlide(images);
    hoverSlide(activeSlide);
    setHover(slides[slideIndex]);
}


prevBtn.addEventListener('click', function() {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = rubies.length - 1;
    }
    showSlide(slideIndex);
});

nextBtn.addEventListener('click', function() {
    slideIndex++;
    if (slideIndex > rubies.length - 1) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
});

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const imgText = document.querySelector('.img-text');
    const images = document.querySelectorAll('.slide-img');

    slides.forEach(function(slide) {
        if (slide.classList.contains('active')) {
            slide.classList.remove('active');
            slide.classList.remove('hoverable');
        } else if (slide.classList.contains('next-slide')) {
            slide.classList.remove('next-slide');
        } else if (slide.classList.contains('prev-slide')) {
            slide.classList.remove('prev-slide');
        }

    });

    imgText.textContent = `${rubies[slideIndex].desc}`;

    slides[slideIndex].classList.add('active');
    growSlide(images);
   
    nextSlide(slideIndex, slides);
    prevSlide(slideIndex, slides);

    // waits until transition finishes before allowing hover ability
    clearTimeout(transitionTime);
    setHover(slides[slideIndex]);
}


function growSlide(imgs) {
    imgs.forEach(function(img, index) {
        img.classList.remove('grow');
        img.removeEventListener('click', toggleGrow);
        if (index == slideIndex) {
            img.addEventListener('click', toggleGrow);
        }
    });
}

function setHover(activeSlide) {
    transitionTime = setTimeout(function(){
        if (activeSlide.classList.contains('active')) {
            // checks boolean of hover state 
            // if user allows hovering, adds the class
            // removes in case button is turned to off
            if (hoverEffect == true) {
                activeSlide.classList.add('hoverable');
            } else {
                activeSlide.classList.remove('hoverable');
            }
            
            hoverSlide(activeSlide);
        }        
    }, 800);
}

// for showSlide function
function nextSlide(index, slideArray) {
    index++;
    if (index > rubies.length - 1) {
        index = 0;
    }

    slideArray[index].classList.add('next-slide');
}

// for showSlide function
function prevSlide(index, slideArray) {
    index--;
    if (index < 0) {
        index = rubies.length - 1;
    }

    slideArray[index].classList.add('prev-slide');
}

// ***** hover functionality *****
const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.carousel');

function hoverSlide(slide) {
    slide.addEventListener('mousemove', function(e) {
        const carContLeft = carouselContainer.offsetLeft;
        
        if ((e.pageX - carContLeft) < slide.getBoundingClientRect().width / 2) {
            if (slide.classList.contains('active') && slide.classList.contains('right')) {
                slide.classList.remove('right');
            };
            
            slide.classList.add('left');
        } else {
            if (slide.classList.contains('active') && slide.classList.contains('left')) {
                slide.classList.remove('left');
            };
            slide.classList.add('right');
        }
    });
    
    slide.addEventListener('mouseout', function() {
        slide.classList.remove('left');
        slide.classList.remove('right');
    });

}

// ***** hover btn functionality *****
const hoverBtn = document.querySelector('.hover-btn');
const onOff = document.querySelector('.on-off'); // lets user know boolean state

hoverBtn.addEventListener('click', function() {
    const activeSlide = document.querySelector('.active');
    // checks if hover boolean is set to true
    if (hoverEffect == true) {
        hoverEffect = false;
        // if the current slide already has the hoverable class, removes it
        if (activeSlide.classList.contains('hoverable')) {
            activeSlide.classList.remove('hoverable')
        }
        onOff.textContent = 'off';
    } else {
        hoverEffect = true;
        // if the current slide had the hoverable class removed, adds it again
        if (!activeSlide.classList.contains('hoverable')) {
            activeSlide.classList.add('hoverable')
        }
        onOff.textContent = 'on';
    }
});