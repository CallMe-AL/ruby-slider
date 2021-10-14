let rubies = [
    {
        id: 1,
        img: "./images/ruby1.jpg",
    },
    {
        id: 2,
        img: "./images/ruby2.jpg",
    },
    {
        id: 3,
        img: "./images/ruby3.jpg",
    },
    {
        id: 4,
        img: "./images/ruby4.jpg",
    },
    {
        id: 5,
        img: "./images/ruby5.jpg",
    },
    {
        id: 6,
        img: "./images/ruby6.jpg",
    },
]

let slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.btn-left');
const nextBtn = document.querySelector('.btn-right');
const container = document.querySelector('.track-container');
const imgText = document.querySelectorAll('.img-text');

// container.insertBefore(slides[slides.length - 1], slides[0]);

// // carousel functionality
// prevBtn.addEventListener('click', function() { 
//     slides = document.querySelectorAll('.slide');
//     const activeSlide = document.querySelector('.active');
//     const prevSlide = activeSlide.previousElementSibling;

//     container.insertBefore(slides[slides.length - 1], slides[0]);

//     activeSlide.classList.remove('active');
//     prevSlide.classList.add('active');
// });

// nextBtn.addEventListener('click', function() {  
//     slides = document.querySelectorAll('.slide');
//     const activeSlide = document.querySelector('.active');
//     const nextSlide = activeSlide.nextElementSibling;

//     container.appendChild(slides[0]);

//     activeSlide.classList.remove('active');
//     nextSlide.classList.add('active');
// });

let slideIndex = 0;
container.insertBefore(slides[slides.length - 1], slides[0]);
hoverSlide(slides[slideIndex]);
slides[slideIndex].style.backgroundImage = `url(${rubies[slideIndex].img})`;

let transitionTime;
let hoverEffect = true;

prevBtn.addEventListener('click', function() {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
    clearTimeout(transitionTime);
    setHover();
});

nextBtn.addEventListener('click', function() {
    slideIndex++;
    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
    clearTimeout(transitionTime);
    setHover();
});

function showSlide(slideIndex) {
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

    const activeText = document.querySelector('.active-text');
    activeText.classList.remove('active-text');

    imgText[slideIndex].classList.add('active-text');
    slides[slideIndex].classList.add('active');
    slides[slideIndex].style.backgroundImage = `url(${rubies[slideIndex].img})`;
   
    nextSlide(slideIndex);
    prevSlide(slideIndex);
}

function setHover() {
    transitionTime = setTimeout(function(){
        if (slides[slideIndex].classList.contains('active')) {
            // checks boolean of hover state 
            // if user allows hovering, adds the class
            // removes in case button is turned to off
            if (hoverEffect == true) {
                slides[slideIndex].classList.add('hoverable');
            } else {
                slides[slideIndex].classList.remove('hoverable');
            }
            
            hoverSlide(slides[slideIndex]);
        }        
    }, 800);
}

function nextSlide(index) {
    index++;
    if (index > slides.length - 1) {
        index = 0;
    }

    slides[index].classList.add('next-slide');
    slides[index].style.backgroundImage = `url(${rubies[index].img})`;
}

function prevSlide(index) {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }

    slides[index].classList.add('prev-slide');
    slides[index].style.backgroundImage = `url(${rubies[index].img})`;
}

// hover functionality
const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.carousel');

function hoverSlide(slide) {
    slide.addEventListener('mousemove', function(e) {
        const carContLeft = carouselContainer.offsetLeft;
        const carLeft = carousel.offsetLeft;
    
        const distanceLeft = carLeft + carContLeft;
        
        if ((e.pageX - distanceLeft) < slide.getBoundingClientRect().width / 2) {
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

// hover btn functionality
const hoverBtn = document.querySelector('.hover-btn');
const onOff = document.querySelector('.on-off'); // lets user know boolean state

hoverBtn.addEventListener('click', function() {

    // checks if hover boolean is set to true
    if (hoverEffect == true) {
        hoverEffect = false;
        // if the current slide already has the hoverable class, removes it
        if (slides[slideIndex].classList.contains('hoverable')) {
            slides[slideIndex].classList.remove('hoverable')
        }
        onOff.textContent = 'off';
    } else {
        hoverEffect = true;
        // if the current slide had the hoverable class removed, adds it again
        if (!slides[slideIndex].classList.contains('hoverable')) {
            slides[slideIndex].classList.add('hoverable')
        }
        onOff.textContent = 'on';
    }
});

