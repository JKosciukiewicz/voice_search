(function () {
    let trigger = document.querySelector('#search-trigger')
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const result = document.querySelector('#result')
    const searchResults= document.querySelector('.search-results')
    let isListening = false
    const speechToText = new recognition()
    speechToText.continuous = true;
    speechToText.interimResults = true;

    trigger.addEventListener('click', () => {
        isListening ? speechOnStop() : speechOnStart();
        isListening = !isListening;
    })
    
    speechToText.addEventListener("result", speechOnResult);
    
    function speechOnStart() {
        console.log('start')
        speechToText.start()
        trigger.innerHTML="Listening..."
    }
    
    function speechOnStop() {
        console.log('stop')
        speechToText.stop()
        trigger.innerHTML="Press button"
    }
    
    function speechOnResult(event) {
        console.log(event)
        result.innerHTML = "";
        for (const res of event.results) {
            const text = document.createTextNode(res[0].transcript);
            const p = document.createElement("p");
            if (res.isFinal) {
                p.classList.add("final");
                speechOnStop()
            }
            p.appendChild(text);
            result.appendChild(p);
            renderProducts()
        }
    }

    function renderProducts() {
        productsHTML = ``
        productsHTML+=getProductHTML()
        searchResults.innerHTML=productsHTML
    }

    function getProductHTML() {
        let productHTML=`<div class="search-result">
                            <a href="#">
                                <div class="search-result-image">
                                    <img src="#">
                                </div>
                                <h2>Product name</h2>
                                <h3>100 zł</h3>
                            </a>
                        </div>`
        
        return productHTML
    }


})()