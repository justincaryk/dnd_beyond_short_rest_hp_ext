
let finalObserverAdded = false;

const runWhenReady = () => {
    if (finalObserverAdded) {
        console.log('exiting')
        return null;
    }

    const ELEM_ID_CONST = 'justin_c_chars_hp'

    const observables = document.querySelector('.ct-health-summary__hp-item-content')
    
    const executeMutationObserver = () => {
        
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                // inserted element already exists
                let hpElemInSlider = document.getElementById(ELEM_ID_CONST)
                
                if (hpElemInSlider) {
                    hpElemInSlider.innerHTML = `${mutation.target.data} HP`
                    return true;
                }

                // no slider open
                const introElem = document.getElementsByClassName('ct-reset-pane__intro')

                if (!introElem?.length) {
                    return false;
                }

                // create the element
                hpElemInSlider = document.createElement('h3')
                // set the inner text
                hpElemInSlider.innerHTML = `${mutation.target.data} HP`
                // set an id so it can be found later rather than continually adding new
                hpElemInSlider.id = ELEM_ID_CONST
                // add styles so it's obvious
                hpElemInSlider.style.fontSize = '2.5em';
                hpElemInSlider.style.textAlign = 'center';
                // insert it
                introElem[0].parentNode.insertBefore(hpElemInSlider, introElem[0].nextSibling)
            });
        });

        const config = { characterData: true, subtree: true };

        observer.observe(observables, config);
        console.log('hp mutation observer registered')
        finalObserverAdded = true
    }

    if (observables) {
        finalObserverAdded = true
        return executeMutationObserver()
    } else {
        console.log('the short rest extension couldn\'t find an observable: ')
        setTimeout(() => runWhenReady(), 1000)
    }
}


const isOnCharacterPage = () => {
    const path = window.location.pathname
    return path?.split('/').length === 3;
}

const main = () => {
    if (!isOnCharacterPage()) {
        console.log('not on character page. hp listener exiting...')
        return null;
    }

    const site = document.getElementById('site-main');

    if (!site) {
        return main();
    }

    runWhenReady();
}

main()
