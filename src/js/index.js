// Applikation
const app = {};

let subpageHeaderTemplate = (moment) => `<div>

    <div>

        <h1>${moment.time} - ${moment.title}</h1>
        <p>${moment.description}</p>
        <p>${moment.author}</p>

        <img src="assets/${moment.id}/${moment.square}" /> 
        
    </div>

</div>`

// Template 01
let momentTemplate01 = (moment, template) => {

    return `<hr/><div>
           ${template.template}
        
           ${template.media.map( (media) => {

                return `<div>
                    <img src="assets/${moment.id}/${media.image}" />
                    <p>${media.text}</p>
                </div>`

           } ).join('')}
        </div>`
}

// Template 02
let momentTemplate02 = (moment, template) => {

    return `<hr/><div>
           ${template.template}
           <pre>${JSON.stringify(template, null, 2)}</pre>
        </div>`
}

// Template 03
let momentTemplate03 = (moment, template) => {

    return `<hr/><div>
           ${template.template}
           <pre>${JSON.stringify(template, null, 2)}</pre>
        </div>`
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
         
            // Her hardcoder vi første moment og renderer dette moment.
            let moment = moments[0];
            app.renderMoment(moment)
     
        
        }, 0);
  
    });

}

app.init();     