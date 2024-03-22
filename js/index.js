/*  Globals and Constants */

const blink = new blinkerTimer();
const shellButtons = document.getElementsByClassName("shell-button");
var isButtonPressed = false;

//  Shell reference strings
const rootCommand = "root@thalia-user: ~/sbin$ ";
const rootCat = "cat ";
const highlighter = "_";

// Strings used in the loading of pages
const pageNames = [
    "index.html",
    "speakers.html",
    "sponsors.html",
    "schedule.html",
];

const fileName = location.href.split("/").slice(-1);
const activeLoadBar = "[---------------------------------]";
const inactiveLoadBar = "Requesting Access."

/* Helper Functions */

//  Template for replacing characters within a string.
String.prototype.replaceAt = function (indexToReplace, replacement) {
    return this.substring(0, indexToReplace) + replacement + this.substring(indexToReplace + replacement.length);
}

//  Shell highlight timer
//  .start() & .stop() can be used to manager the global timer.
function blinkerTimer() {
    //  Starting the timer by creating a new instance.
    this.start = () => {
        timer = setInterval(() => {
            let commandHighlighter = document.getElementById("highlighter");

            if (commandHighlighter.style.visibility == "hidden")
                commandHighlighter.style.visibility = "visible";
            else
                commandHighlighter.style.visibility = "hidden";
        }, 500)
    };

    this.stop = () => {
        clearInterval(timer);
        document.getElementById("highlighter").style.visibility = "visible";
    };
}

//  Sleep timer for async/await
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Shell & Menu Functions */

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

//  Writes a command to the current command line. After finishing the animation, redirect to new page is fired.

async function prepareRedirect(commandIdent) {
    //  Briefly changing the contents of the highlighter to prep for the animation.
    document.getElementById("highlighter").innerText = "";
    document.getElementById("highlighter").innerText = rootCat + pageNames[commandIdent];
    await reconstructInnerHtmlID("highlighter", 50);

    window.location.href = "./" + pageNames[commandIdent];
}

// Handler for left-hand buttons
async function buttonPress(buttonIdent) {
    if (!isButtonPressed) {
        blink.stop();
        await resetOnInnerPageLoad();
        isButtonPressed = true;
        await prepareRedirect(buttonIdent);
    }
}

/* Top-loading page functions */
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
    //  with '\'.
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
    // Set button-pressed during load to prevent issues
    // NOTE: Should honestly get a better solution, this is kinda jank.
    isButtonPressed = true;
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

    // Undo first assignment
    isButtonPressed = false;
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

//  Page setup after initial load
async function loadAssets() {
    blink.start();
    await onInnerPageLoad();
}

// Main workings on DOM
document.onload = loadAssets();
shellButtons[0].onclick = () => { buttonPress(0) };
shellButtons[1].onclick = () => { buttonPress(1) };
shellButtons[2].onclick = () => { buttonPress(2) };
shellButtons[3].onclick = () => { buttonPress(3) };
