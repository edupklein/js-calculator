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