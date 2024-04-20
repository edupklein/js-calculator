class CalcController {

    #calcDisplayEl;
    #dateEl;
    #hourEl;
    #locale;

    constructor() {
        
        this.#locale = "en-US";
        /**
         * Note that document.getElementById would work the same way
         * Here we are attributing the HTML elements to JS variables, converting 
         * them to a JS object.
         */
        this.#calcDisplayEl = document.querySelector("#display");
        this.#dateEl = document.querySelector("#date");
        this.#hourEl = document.querySelector("#hour");

        this.initialize();
        this.initButtonsEvent();
    }
    /**
     * Function to initialize the elements such as Date and Hour
     */
    initialize() {
        /**
         * Here we call a method to be executed for every 1000 milliseconds (1 second). 
         * Inside we are refreshing the Date and Time elements on the display for every second.
         */
        this.refreshDateTime();
        let timeInterval = setInterval(() => {
            this.refreshDateTime();
        }, 1000);
    }

    refreshDateTime() {
        /**
         * The toLocaleDateString method can receive an object to specify the format of
         * day, month and year
         */
        this.#dateEl.innerHTML = this.currentDate.toLocaleDateString(this.#locale, {
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        });
        this.#hourEl.innerHTML = this.currentDate.toLocaleTimeString(this.#locale);
    }

    initButtonsEvent() {
        /**
         * The querySelectorAll allows us to return all 'g' elements that
         * are children of the 'g' element with the id = buttons and 
         * 'g' element with the id = parts
         * 
         * The 'g' element in HTML/CSS represents an element in SVG (Scalable Vector Graphic)
         * that allows the grouping of certain elements and properties. In this case, since
         * the calculator was created in Adobe Illustrator, the HTML file (index.html)
         * has an SVG element that contains the properties of the graphics in XML for the
         * calculator. The whole graphics and vectors of the calculator are defined in this
         * SVG element, that has a lot of children. The children elements are 'g' tags.
         * 
         * Here we are retrieving the children elements of 'buttons' and 'parts'
         * 
         * If we were to use the 'querySelector' method, it would return just the first result.
         */
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        /**
         * The querySelectorAll method returns a NodeArray so we have to
         * iterate through it using a forEach method. 
         */
        buttons.forEach((button, index) => {
            /**
             * For each element children of buttons and parts (that happens to be classes)
             * we are adding events to watch the 'click' and 'drag'
             */
            this.addEventListenerAll(button, "click drag", e => {
                /**
                 * The className.baseVal return the base value of the name of the class
                 * After that, we replace the 'btn-' in the class name with nothing, to
                 * return just the text of the button, which happens to be the name of 
                 * the classes, for they were constructed following the sintax bellow:
                 * 
                 * Button '9' = class 'btn-9'
                 * Button '8' = class 'btn-8'
                 */
                console.log(button.className.baseVal.replace("btn-", ""));
            });
            /**
             * Here we are adding some events to change the appearance of the mouse
             * to show the 'pointer' cursor for the events that relate to the cursor
             * movement inside the buttons elements
             */
            this.addEventListenerAll(button, "mouseover mouseup mousedown", e => {
                button.style.cursor = "pointer";
            });
        })
    }

    /**
     * Method to add multiple events to an element
     * @param element The element to be added the events
     * @param events the events to be added to the element
     * @param fn the function to be executed 
     */
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    get calcDisplay() {
        return this.#calcDisplayEl.innerHTML;
    }

    set calcDisplay(cd) {
        this.#calcDisplayEl.innerHTML = cd; 
    }

    get dateDisplay() {
        return this.#dateEl.innerHTML;
    }

    set dateDisplay(dd) {
        this.#dateEl.innerHTML = dd;
    }

    get timeDisplay() {
        return this.#hourEl.innerHTML;
    }

    set timeDisplay(td) {
        this.#hourEl.innerHTML = td;
    }

    get currentDate() {
        return new Date();
    }
}