const filmlistcontainer = document.getElementsByClassName('film-list')[0];
const aboutcontainer = document.getElementsByClassName('aboutme')[0];
const navbar = document.getElementsByClassName('navbar')[0];
const containerh3 = document.getElementById('container-h3');
const containerinput = document.getElementById('container-input');
const abouth3 = document.querySelector('.aboutme h3');
const aboutimg = document.querySelector('.aboutme div');
const aboutme = document.querySelector('.aboutme p');
const copyright = document.querySelector('.copy_right');
const producttitle = document.querySelectorAll('.film-list h3');
const author = document.querySelector('.aboutme span');
const filmcount = document.getElementById('count');


console.log(filmcount)


// Blur and Unblur function

const blurelements = (apply) => {
    const elements = [containerh3, containerinput, navbar, filmlistcontainer];

    elements.forEach(element => {
        element.style.filter = apply ? 'blur(5px)' : 'none';
    })
};


// create card and append function
const createcard = (story, parentcontainer) => {
    const {imgsrc, title, about, director} = story;

    const parent = document.createElement('li');
    parent.classList.add('parent')
    
    const parentimg = document.createElement('div');
    parentimg.style.backgroundImage = `url(${imgsrc})`;

    const parenttitle = document.createElement('h3');
    parenttitle.textContent = title;

    const aboutoffilm = document.createElement('p');
    aboutoffilm.textContent = about;

    parent.append(parentimg, parenttitle, aboutoffilm);
    parentcontainer.append(parent)

    parent.addEventListener('click', () => {

        blurelements(true)
        aboutcontainer.style.display = 'block';
        
        abouth3.textContent = title;
        aboutimg.style.backgroundImage = `url(${imgsrc})`;
        aboutme.textContent = about;
        author.textContent = 'Director: ' + director;
    }) 
}


// Fetch data and random data
let datacount = 6;
fetch('config.json')
    .then(res => res.json())
    .then(data => {

        data.sort(() => Math.random() - 0.5)
        data.forEach(story => createcard(story, filmlistcontainer))
        countfilm()
    })


// loading animation
const loading = document.getElementsByClassName('loader')[0];
let counttime = 0;
const loadingtimer = () => {
    setInterval(() => {
        counttime++;

        if(counttime === 1){
            loading.style.display = 'none';
            filmlistcontainer.style.display = 'flex';
            counttime= 0;
            clearInterval(loadingtimer)
        }else{
            
        }
    }, 1000);
}

loadingtimer()

// Detech the switch
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        console.log("User left the tab");
    } else {
        window.location.reload()
    }
});


// Close About 
const closeabout = () => {
    const aboutVisible = window.getComputedStyle(aboutcontainer).display === 'block';

    if (aboutVisible) {
        blurelements(false);
        aboutcontainer.style.display = 'none';
    }
};

// CLOSE WHEN CLICKING OUTSIDE CARDS
filmlistcontainer.addEventListener('click', (e) => {
    if (!e.target.closest('li')) {
        closeabout();
    }
});

// CLOSE WHEN CLICKING NAVBAR / HEADERS / INPUT
navbar.addEventListener('click', closeabout);
containerh3.addEventListener('click', closeabout);
containerinput.addEventListener('click', closeabout);

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape'){
        closeabout()
    }
})

// const copytext = () => {
//     const getdate = new Date();
//     const getyear = getdate.getFullYear()


// };

// copytext()

const search = () => {
    const filter = containerinput.value.toUpperCase(); // user text
    const cards = filmlistcontainer.getElementsByTagName('li'); // all li cards

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0];

        if (title) {
            let textvalue = title.textContent || title.innerText;

            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }
    }
};

containerinput.addEventListener('keyup', search);


// Update film count dynamically
const countfilm = () => {
    const cards = filmlistcontainer.getElementsByTagName('li'); // all cards
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].style.display !== 'none') {
            visibleCount++;
        }
    }

    filmcount.textContent = `${datacount}/${visibleCount} movies`;
};