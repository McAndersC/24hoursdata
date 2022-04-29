const app = {};

// Subpage
let subpageHeaderTemplate = (moment) => `

<section class="hero">
<div class="container-75">
    <div class="row">
        <div class="col1">
            <img src="assets/${moment.id}/${moment.square}" alt="${moment.description}" style="width:36.7vw;">
        </div>
        <div class="col2" style="width: 3vw;">

        </div>
        <div class="col3">
            <p class="time">${moment.time}</p>
            <h1 class="display-text">${moment.title}</h1>
            <div class="spacer"></div>
            <p class="body-text">${moment.description}</p>
            <div class="spacer"></div>
            <p class="byline">© Foto: ${moment.author}</p>
        </div>
    </div>
</div>
</section>


`

// Template 01
let momentTemplate01 = (moment, template) => {
    let number01 = 0

    return `
    <section class="threexfour">
    <div class="container-75">
        <div class="row">

           ${template.media.map( (media) => {
               let b = ''
               if (number01 == 0){
                   number01 = 1;
                   b = `<div class="col2" style="width: 1.6vw;"></div>`
               }else {
                   b = ''
               }
               return `
                <div class="col1">
                    <img src="assets/${moment.id}/${media.image}" alt="" style="width: 36.7vw;">
                    <p class="pic-text"><span class="square"></span>${media.text}</p>
                </div>
                ${b}
                `
           } ).join('')}
            </div>
        </div>
    </section>
        `
}

// Template 02
let momentTemplate02 = (moment, template) => {
    return `
    <section class="fourxthree">
        <div class="container-75" style="margin: auto;">
            <img src="assets/${moment.id}/${template.media[0].image}" alt="${template.media[0].text}" style="width: 75vw;">
            <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
        </div>
    </section>
        `
}

// Template 03
let momentTemplate03 = (moment, template) => {

    return `
    <section class="onexone">
        <div class="container-75">
            <img src="assets/${moment.id}/${template.media[0].image}" alt="${template.media[0].text}" style="width: 49vw;">
            <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
        </div>
    </section>
        `
}

// Rendere moment 

app.renderMoment = (moment) => {

    // Moment Container
    let momentContainer = document.querySelector('.moment-container');
    momentContainer.innerHTML = '';
    // Indsætter moment Header
    momentContainer.insertAdjacentHTML('afterbegin', subpageHeaderTemplate(moment))

    // Indsætter moment template(s)
    moment.templates.forEach((template) => {

        switch (template.template) {
    
            case '01':

                momentContainer.insertAdjacentHTML('beforeend', momentTemplate01(moment, template))

                break;

            case '02':

                momentContainer.insertAdjacentHTML('beforeend', momentTemplate02(moment, template))

                break;

            case '03':

                momentContainer.insertAdjacentHTML('beforeend', momentTemplate03(moment, template))

                break;
        }
    })
}

// Init
app.init = () => {

    let moments = [];

    // Debug Elementer på forsiden
    let dataDebugElement = document.querySelector('.data-debug');
    let momentDebugElement = document.querySelector('.moment-debug');
    
    // Nogen elm som vi bruger
    let galleryContainer = document.querySelector('.gallery-container');
    let subpageHomePageLink = document.querySelector('.subpage-HomePageLink')

    // Henter vores data.
    fetch('.data/moments.json').then((response) => response.json()).then((response) => {

        setTimeout( () => {

            moments = response;
           
            // Udskriver debug data til forsiden
            if(dataDebugElement)
            {
                dataDebugElement.insertAdjacentHTML('afterbegin', JSON.stringify(moments, null, 2));
                momentDebugElement.insertAdjacentHTML('afterbegin', JSON.stringify(moments[0], null, 2));
            }
            
            // Hvis html inholder galleryContainerer
            if(galleryContainer){

            // Json bliver lavet om i rækkefølge efter dato
                let result = moments.sort((a,b)=> new Date(a.date).getTime() - 
                new Date(b.date).getTime());
                

                galleryContainer.innerHTML = '';

                galleryContainer.innerHTML += `
                
                <h1 class="txt">00:00 - 03:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock1"></div>

                <h1 class="txt">03:00 - 06:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock2"></div>

                <h1 class="txt">06:00 - 09:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock3"></div>

                <h1 class="txt">09:00 - 12:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock4"></div>

                <h1 class="txt">12:00 - 15:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock5"></div>

                <h1 class="txt">15:00 - 18:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock6"></div>

                <h1 class="txt">18:00 - 21:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock7"></div>

                <h1 class="txt">21:00 - 24:00 <span class="display-txt">NAT I VIBORG</span></h1> 
                <div class="container clock8"></div>
                `

                let clock1 = document.querySelector('.clock1')
                let clock2 = document.querySelector('.clock2')
                let clock3 = document.querySelector('.clock3')
                let clock4 = document.querySelector('.clock4')
                let clock5 = document.querySelector('.clock5')
                let clock6 = document.querySelector('.clock6')
                let clock7 = document.querySelector('.clock7')
                let clock8 = document.querySelector('.clock8')

                    for (let index = 0; index < result.length; index++) {
                    
                // Efter den har load content så bruger vi den her til at lave hver img på index.html
                      const content = 
                      // I 'a' tag ''nedunder'' laver vi href = subpage + ? + url fra json
                      `
                      <a href="/subpage.html?${result[index].url}">  
                        <figure>
                          <img src="assets/${result[index].id}/${result[index].square}" alt="A windmill"/>
                          <figcaption>${result[index].time}<br><span class="pic-txt">${result[index].title}</span></figcaption>
                        </figure>
                      </a>`

                // Hvis time fra json er over string så bliver clock += content
                    if (result[index].time < '03') clock1.innerHTML += content;
                    else if (result[index].time < '06') clock2.innerHTML += content;
                    else if (result[index].time < '09') clock3.innerHTML += content;
                    else if (result[index].time < '12') clock4.innerHTML += content;
                    else if (result[index].time < '15') clock5.innerHTML += content;
                    else if (result[index].time < '18') clock6.innerHTML += content;
                    else if (result[index].time < '21') clock7.innerHTML += content;
                    else if (result[index].time < '24') clock8.innerHTML += content;
                }       
            }

            // Hvis url inderholder url fra json
            for (let i = 0; i < moments.length; i++) {    
              if (window.location.href.indexOf(moments[i].url) > -1) {

            // Render templetes som passer til url
                let moment = moments[i];
                app.renderMoment(moment)
              }
            }

            // Det url man kommer fra
            const linkOfTheWebsiteUserCame = document.referrer;

            // Det url man kommer fra skal indeholde index i navnet
            if (subpageHomePageLink){
                if (linkOfTheWebsiteUserCame.indexOf('index') > -1) {
                    subpageHomePageLink.innerHTML = 'Tilbage til oversigten'
                } else {
                    subpageHomePageLink.innerHTML = 'Gå til oversigten'
                }
            }
        }, 0);
  
    });
  }

app.init();     