class CalcController {

    // Display element that display the numbers of the calculator 
    #calcDisplayEl;
    // Date element being displayed in the calculator
    #dateEl;
    // Time element being displayed in the calculator
    #hourEl;
    // The setting to format the displayed Date and Time
    #locale;
    // List containing all operations executed in the calculator 
    #operations;

    constructor() {
        
        this.#operations = [];
        this.#locale = "en-US";
        /**
         * Note that document.getElementById would work the same way
         * Here we are attributing the HTML elements to JS variables, converting 
         * them to a JS object.
         */
        this.#calcDisplayEl = document.querySelector("#display");
        this.#dateEl = document.querySelector("#date");
        this.#hourEl = document.querySelector("#hour");
        // Function to initialize the elements such as Date and Hour
        this.initialize();
        // Function to set the events from the button presses
        this.setButtonsEvents();
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
    /**
     * Function to set the events from the button presses
     */
    setButtonsEvents() {
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
                let buttonClass = button.className.baseVal.replace("btn-", "");
                // Function to execute the proper behavior based on the button pressed
                this.execBtn(buttonClass);

                console.log(buttonClass);
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

    /**
     * Function to execute the proper behavior based on the button pressed
     * 
     * @param button the name of the buttonClass that was pressed 
     */
    execBtn(button) {

        switch(button) {
            // Clear All button function
            case "ac":
                this.clearAllFn();
                break;
            // Clear Entry button function
            case "ce":
                this.clearEntryFn();
                break;
            // Percent button function
            case "percent":
                this.percentFn();
                break;
            // Division button function
            case "division":
                this.divisionFn();
                break;
            // Multiply button function
            case "multiply":
                this.multiplyFn();
                break;
            // Subtract button function
            case "subtract":
                this.subtractFn();
                break;
            // Add button function
            case "add":
                this.addFn();
                break;
            // Equals button function
            case "equals":
                this.equalsFn();
                break;
            // Point button function
            case "point":
                this.pointFn();
                break;
            // Function to be executed to every number button
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(button));
                break;
            // Default just in case something goes wrong
            default:
                this.setError();
        }
    }

    /**
     * Clear All button function
     */
    clearAllFn() {
        this.#operations = [];
    }

    /**
     * Clear Entry button function
     */
    clearEntryFn() {
        this.#operations.pop();
    }

    /**
     * Percent button function
     */
    percentFn() {

    }

    /**
     * Division button function
     */
    divisionFn() {

    }

    /**
     * Multiply button function
     */
    multiplyFn() {

    }

    /**
     * Subtract button function
     */
    subtractFn() {

    }

    /**
     * Add button function
     */
    addFn() {

    }

    /**
     * Equals button function
     */
    equalsFn() {

    }

    /**
     * Point button function
     */
    pointFn() {

    }

    /**
     * Add some operation to the operations list
     * @param operation the operation on the  
     */
    addOperation(operation) {
        this.#operations.push(operation);

        console.log(this.#operations);
    }

    /**
     * Set error message on display screen
     */
    setError() {
        this.calcDisplay = "Error";
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