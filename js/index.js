/**************************/
/*  Globals and Constants */
/**************************/

const blink = new blinkerTimer();
const shellButtons = document.getElementsByClassName("shell-button");

var buttonPresses = 0;
var isButtonPressed = false;

//  Strings for reference in order to represent
//  the different shell commands.
const rootCommand = "root@thalia-user: ~/sbin$ ";
const rootCat = "cat ";
const highlighter = "_";

// Strings used in the loading of pages
const pageNames = [
    "index.html",
    "speakers.html",
    "schedule.html",
    "about.html",
];

const fileName = location.href.split("/").slice(-1);

const activeLoadBar = "[---------------------------------]";
const inactiveLoadBar = "Requesting Access."

/********************/
/* Helper Functions */
/********************/

//  Template for replacing characters within a string.
String.prototype.replaceAt = function (indexToReplace, replacement) {
    return this.substring(0, indexToReplace) + replacement + this.substring(indexToReplace + replacement.length);
}

//  Template for the timer that controls the blinking of
//  the shell highlighter. *.start() starts the global timer,
//  and *.stop() stops the global timer.
function blinkerTimer() {
    //  The two possible states.
    var stop, resume;

    //  Starting the timer by creating a new instance.
    this.start = () => {
        timer = setInterval(() => {
            //  Updating the command highlighter
            let commandHighlighter = document.getElementById("highlighter");

            //  Fliping the states of the highlighter.
            if (commandHighlighter.style.visibility == "hidden")
                commandHighlighter.style.visibility = "visible";

            else

                commandHighlighter.style.visibility = "hidden";
        }, 500)
    };

    //  Stopping the timer by killing its current instance,
    //  and making sure the blinker is visible.
    this.stop = () => {
        clearInterval(timer);
        document.getElementById("highlighter").style.visibility = "visible";
    };
}

//  Sleeps for a specified amount of time
//  in ms. Very useful in combination
//  with 'async' and 'await'.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**************************/
/* Shell & Menu Functions */
/**************************/

//  Gradually reconstructs the text contents of a
//  given html element. 'htmlElementID' help get the
//  html element, and 'speed' denotes how fast the 
//  text is reconstructed.
async function reconstructInnerHtmlID(htmlElementID, speed) {
    //  Storing the specified html element and its text contents.
    let htmlEL = document.getElementById(htmlElementID);
    let initialString = htmlEL.innerText;

    //  Setting the visibility on, and deleting the
    //  original text contents of the html element,
    //  in order to make the efect pop out.
    htmlEL.style.visibility = "visible";
    htmlEL.innerText = "";

    //  Going through each element of the intial string
    //  and adding it sequentiantly to the element's
    //  contents again.
    for (i = 0; i < initialString.length; i++) {
        htmlEL.innerText = htmlEL.innerText + initialString.charAt(i);

        //  Spaces work a bit different, so enforcing it for now.
        //  Also, a little more waiting time to add some 'pizzaz'.
        if (initialString.charAt(i) == ' ') {
            await sleep(speed + 50);
            htmlEL.innerText = htmlEL.innerText + '\xa0';
        }

        //  Delay after each letter.
        await sleep(speed);
    }
}

//  Writes a command to the current command line. The
//  command is denoted by the commandIdent which corresponds
//  to an existing command.
async function writeCurrentCommandToShell(commandIdent) {
    //  Briefly chaging the contents of the highlighter to achieve the animation.
    document.getElementById("highlighter").innerText = "";
    document.getElementById("highlighter").innerText = rootCat + pageNames[commandIdent];
    await reconstructInnerHtmlID("highlighter", 50);

    window.location.href = "http://127.0.0.1:5500/" + pageNames[commandIdent];
}

//  How each shell-button press is handled.
//  The highlighter stops blinking, and the corresponding
//  command for that button is written sequentiantly to the
//  shell. There is also a check to avoid multiple button
//  presses at a time. 'buttonIdent' just identifies
//  which button was pressed.
async function buttonPress(buttonIdent) {
    if (!isButtonPressed) {
        //  Breifly stopping the highlighting animation.

        blink.stop();
        await resetOnInnerPageLoad();


        //  Flaging the button as pressed and writing to the shell.
        isButtonPressed = true;
        await writeCurrentCommandToShell(buttonIdent);

        //  Incrementing the button press counter in order 
        //  correctly display the commands.
        buttonPresses++;

        //  Flagging the button as released.
        isButtonPressed = false;
    }
}

/******************************/
/* Top-loading page functions */
/******************************/

//  The functions work very nicely together.
//  Still they need to be called only when the inner
//  page loads/ or during. Didn't get to do it as a truly
//  single-page application, so for showing the functionalities
//  and animations I was calling these functions inside the button
//  press function.
//
//  Maybe a flag would be a good idea to know when the animations
//  have finished and the page can be loaded - nothing special,
//  just a bool value.
//
//  Always call 'resetOnInnerPageLoad()' before 'onInnerPageLoad'.


//  Creates the loading bar animation
//  dynamically.
async function loadingBarAnimation(speed) {
    //  Getting the loading bard section and replacing it
    //  with its 'active' form.
    let loadingBar = document.getElementById("load-bar");
    let tempAsset = activeLoadBar;

    //  The temporary asset that creates the animation
    loadingBar.innerHTML = tempAsset;

    //  Replacing each unloaded character one by one
    //  wiht '\'.
    for (i = 1; i < activeLoadBar.length - 1; i++) {
        tempAsset = tempAsset.replaceAt(i, '\\');

        //  Adding delay.
        //  Lil' easter egg hehe, we be evil in this house.
        //  I barely had any sleep.
        let seconds = new Date().getTime() / 1000;
        if (seconds % 37 == 0)
            await sleep(speed + 2000);

        else
            await sleep(speed);

        //  Updating the inner text of the loading bar for each
        //  iteration.
        loadingBar.innerText = tempAsset;
    }
}

//  Loads every piece of text required for switching to a new page
//  in their specific order.
async function onInnerPageLoad() {
    //  Getting the requried loading lines and updating 
    //  the one that denotes that loaded Page.
    document.getElementById("on-load-center-box").style.visibility = "hidden";
    let loadingLines = document.getElementsByClassName("loading-output");
    document.getElementById("page-identifier").innerText = fileName;

    //  Wating for th loading bar to finish.
    await loadingBarAnimation(25);

    //  Instantly rendering the rest of the remaining lines.
    for (i = 1; i < 4; i++) {
        loadingLines[i].style.visibility = "visible";
        await sleep(25);
    }
    document.getElementById("on-load-center-box").style.visibility = "visible";
}

//  Resets the loading part of the page, preparing
//  it for a new inner page load.
async function resetOnInnerPageLoad() {
    let loadingLines = document.getElementsByClassName("loading-output");
    let loadBar = document.getElementById("load-bar");

    //  Hiding the unused elements in reverse order and
    //  with a delay in order for a smoother transition.
    for (i = 3; i > 0; i--) {
        loadingLines[i].style.visibility = "hidden";
        await sleep(25);
    }

    loadBar.innerHTML = inactiveLoadBar;
}

//  Loads everything needed for the page.
async function loadAssets() {
    blink.start();
    await onInnerPageLoad();
}

//  Onload behaviour for different elements.
document.onload = loadAssets();

//  Beahviour for buttons.
shellButtons[0].onclick = () => { buttonPress(0) };
shellButtons[1].onclick = () => { buttonPress(1) };
shellButtons[2].onclick = () => { buttonPress(2) };
shellButtons[3].onclick = () => { buttonPress(3) };

