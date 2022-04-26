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

let momentTemplate = (moment) => moment.templates.map((template) => {

    return `<div>
        <h2>Template ${template.template}</h2>
            ${template.media.map((media) => {


                return `<div>
                <img src="assets/${moment.id}/${media.image}" />
                <p>${media.text}</p>
                </div>`

            }).join('')}
    </div>`


}).join('')

app.init = () => {

    let moments = [];
    let dataDebugElement = document.querySelector('.data-debug');
    let momentDebugElement = document.querySelector('.moment-debug');
    let momentContainer = document.querySelector('.moment-container');
    // Henter vores data.
    fetch('.data/moments.json').then((response) => response.json()).then((response) => {

        setTimeout( () => {

            moments = response;
           
            if(dataDebugElement)
            {
                dataDebugElement.insertAdjacentHTML('afterbegin', JSON.stringify(moments, null, 2));
                momentDebugElement.insertAdjacentHTML('afterbegin', JSON.stringify(moments[0], null, 2));
            }
         
     

            momentContainer.insertAdjacentHTML('afterbegin', subpageHeaderTemplate(moments[0]))
            momentContainer.insertAdjacentHTML('beforeend', momentTemplate(moments[0]))

        }, 0);
  
    });


}

app.init();     