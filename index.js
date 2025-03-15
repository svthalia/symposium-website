//  javascript my beloved - it's the ONLY enjoyable part from this mess,
//  have you even seen my tags in the HTML doc????

/********************************/
/* Globally used document items */
/********************************/

//  mobile relevant elements.
var mobile_options_button = document.getElementById("top_side_bar_button");
var mobile_options_exit = document.getElementById("mobile_side_bar_exit");
var mobile_side_bar = document.getElementById("mobile_side_bar");
var mobile_opacity_curtain = document.getElementById("main_opacity_curtain");

//  course grid elemnts for better displays.
var all_link = document.getElementById("all");
var speakers_link = document.getElementById("speakers");
var companies_link = document.getElementById("companies");

//  page switch relevant elements.
var banner = document.getElementById("course_banner");
var banner_img = document.getElementById("course_img_banner");
var grid = document.getElementById("course_grid");
var names = document.getElementsByClassName("course_name");
var info = document.getElementById("course_info");
var text = document.getElementById("course_text");
var title = document.getElementById("course_title");
var author = document.getElementById("course_author");
var selector = document.getElementById("selector");

// event relevant elements
var event_list = document.getElementById("event_list");
var event_list_button = document.getElementById("upcomming_button")
var event_container = document.getElementById("upcomming");

//  button relevant elements.
var main_home_button = document.getElementById("logo_button")
var mobile_home_button = document.getElementById("mobile_logo_button")

//  easter egg buttons for fun!
var courses_button = document.getElementById("courses_button");
var beer_button = document.getElementById("beer_button");
var notification_button = document.getElementById("notification_button");
var settings_button = document.getElementById("settings_button");
var portofolio_button = document.getElementById("protofolio_button");
var help_button = document.getElementById("help_button");
var mobile_settings_button = document.getElementById("mobile_settings_button");
var mobile_portofolio_button = document.getElementById("mobile_portofolio_button");
var mobile_help_button = document.getElementById("mobile_help_button");
var profile = document.getElementById("profile");

//  easter egg relevant elements.
var easter_egg_opacity_curtain = document.getElementById("easter_egg_opacity_curtain");
var easter_egg = document.getElementById("easter_egg_curtain");
var easter_egg_img = document.getElementById("easter_egg_img");

//  you could've got them by the class 'course' - whatevs, I'll fix it later.
//  My laziness knows no bounds anymore. I might just leave it like this (:
var courses = [document.getElementById("course_1"), document.getElementById("course_2"), document.getElementById("course_3"), document.getElementById("course_4"), document.getElementById("course_5"), document.getElementById("course_6")];

/************************/
/* Globally used states */
/************************/

//  variable for determining whether to hide or display the current schedule.
var display_schedule = true;


/*******************************/
/* Content for course Switches */
/*******************************/

//  oh the atrocities I am about to commit here are so new that they don't even
//  have a name at this point, God forgive me.
//
//  soooo, simply change the text here in order to make it update whenever a user
//  clicks a course.
const johan_text = 
    `This text is here just to show you how the fuckery is supposed to work. These are not quotes
     but backticks, because why the fuck not, right Javascript? Anyhow, simply replace the text here,
     with the actual description and you should have yourself a working little course view. I need a drink.`

const marije_text =
    `3 The LORD appeared to us in the past, saying: “I have loved you with an everlasting love; I have drawn you with unfailing kindness.
     4 I will build you up again, and you, Virgin safwfaw, will be rebuilt. Again you will take up your timbrels and go out to dance with the joyful.
     5 Again you will plant vineyards on the hills of Samaria; the farmers will plant them and enjoy their fruit.
     6 There will be a day when watchmen cry out on the hills of Ephraim, ‘Come, let us go up to Zion, to the LORD our God.’ ”`

const luca_text =
    ``

const nedap_text =
    ``

const formorrow_text =
    ``

const tba_text =
    ``

//  titles for each announcements
const johan_title = "Somebody once told me...";
const marije_title = "Evil";
const luca_title = "";
const nedap_title = "";
const formorrow_title = "";
const tba_title = ""

//  the source for the course cover image.
const johan_cover_dir = "resources/test_cover.jpg"
const marije_cover_dir = "resources/test_switch_cover.jpg"
const luca_cover_dir = "resources/test_cover.jpg"
const nedap_cover_dir = "resources/test_cover.jpg"
const formorrow_cover_dir = "resources/test_cover.jpg"
const tba_cover_dir = "resources/test_cover.jpg"


/*******************************/
/* Simple Conversion Functions */
/*******************************/

//  converts a course index to its associated display when clicked.
function index_to_text(course_index) {
    switch(course_index) {
        case 1:
            return johan_text;

        case 2:
            return marije_text;

        case 3:
            return luca_text;

        case 4:
            return nedap_text;

        case 5:
            return formorrow_text;

        case 6:
            return tba_text
    }
}

//  converts a course index to its associated image cover when clcked.
function index_to_cover(course_index) {
    switch(course_index) {
        case 1:
            return johan_cover_dir;

        case 2:
            return marije_cover_dir;

        case 3:
            return luca_cover_dir;

        case 4:
            return nedap_cover_dir;

        case 5:
            return formorrow_cover_dir;

        case 6:
            return tba_cover_dir
    }
}

//  converts a course index to its associated title when clicked.
function index_to_title(course_index) {
    switch(course_index) {
        case 1:
            return johan_title;

        case 2:
            return marije_title;

        case 3:
            return luca_title;

        case 4:
            return nedap_title;

        case 5:
            return formorrow_title;

        case 6:
            return tba_title;
    }  
}

//  converts a course index to the corresponding author for the course.
function index_to_author(course_index) {
    switch(course_index) {
        case 1:
            return "Johan Jeuring posted on Mar 10, 2025 14:21";

        case 2:
            return "Marije Goudriaan posted on Mar 7, 2025 10:26";

        case 3:
            return "Luca Consoli posted on Mar 7, 2025 17:05";

        case 4:
            return "Nedap Team posted on Mar 9, 2025 19:56";

        case 5:
            return "Formorrow Team posted on Mar 5, 2025 20:37";

        case 6:
            return "TBA Team posted on Mar 10, 2025 14:20";
    }  
}


/********************/
/* General Handlers */
/********************/

//  assigning easter egg handlers for each unused button.
profile.onclick = function() { easter_egg_display("resources/easter_egg_1.jpg"); }
beer_button.onclick = function() {easter_egg_display("resources/easter_egg_2.jpg"); }
courses_button.onclick = function() { easter_egg_display("resources/easter_egg_3.jpeg"); }
notification_button.onclick = function() { easter_egg_display("resources/easter_egg_4.png"); }
settings_button.onclick = function() { easter_egg_display("resources/easter_egg_5.png"); }
portofolio_button.onclick = function() { easter_egg_display("resources/easter_egg_6.png");}
help_button.onclick = function() { easter_egg_display("resources/easter_egg_7.png");}
mobile_settings_button.onclick = function() { easter_egg_display("resources/easter_egg_5.png"); }
mobile_portofolio_button.onclick = function() { easter_egg_display("resources/easter_egg_6.png");}
mobile_help_button.onclick = function() { easter_egg_display("resources/easter_egg_7.png");}

//  assigning an escape handler for the shown easter_egg.
easter_egg_img.onclick = function() {
    easter_egg_opacity_curtain.style.display = "none";
    easter_egg.style.display = "none";
    document.body.style.overflowY  = "scroll";
    document.body.style.overflowX = "hidden";
}


//  assigning a handle for each course in the course grid.
//  
//  Here comes the fun part!
//  Too lazy to initialize each course by hand, so I'm using a for loop here.
courses.forEach(course => {
    course.onclick = function () { course_switch_handler(Number(course.id.slice(-1))) };
    course.onmouseover = function () { 
        course.style.cursor = "pointer";
        course.style.top = "-10px";
        course.style.boxShadow = "0 2px 2px 0 #9c9c9c";
    };
    course.onmouseleave = function () {
        course.style.top = ""
        course.style.boxShadow = "";
    };
})

//  assigning a proper handler for the main home button.
main_home_button.onclick = home_switch_handler;

//  assigning a handler for the event list view.
event_list_button.onclick = function() {
    if(display_schedule) {
        event_list.style.display = "none"
        event_list_button.style.rotate = "0deg";
    } else {
        event_list.style.display = "grid"
        event_list_button.style.rotate = "90deg";
    }

    display_schedule = !display_schedule;
}

function easter_egg_display(easter_egg_source) {
    easter_egg_img.src = easter_egg_source;

    easter_egg_opacity_curtain.style.display = "block";
    easter_egg.style.display = "block";
    document.body.style.overflow = "hidden";
}


/*******************/
/* Switch Handlers */
/*******************/

//  handles switching from the main page to the selected course view.
function course_switch_handler(course_index) {
    grid.style.display = "none";
    selector.style.display = "none";
    banner.style.display = "block";
    info.style.display = "block";

    banner_img.src = index_to_cover(course_index);
    text.innerHTML = index_to_text(course_index);
    title.innerHTML = index_to_title(course_index);
    author.innerHTML = index_to_author(course_index);
}

//  handles switching from any other view back to the initial home view.
function home_switch_handler() {
    grid.style.display = "grid";
    selector.style.display = "flex";
    banner.style.display = "none";
    info.style.display = "none";

    mobile_side_bar.style.left = "-100%";
    mobile_opacity_curtain.style.opacity = "none";
    document.body.style.overflowY  = "scroll";
    document.body.style.overflowX = "hidden";
}


/*******************/
/* Mobile Handlers */
/*******************/

//  assigning a proper handler for the mobile home button
mobile_home_button.onclick = home_switch_handler;

//  handler for the mobile side bar view.
mobile_options_button.onclick = function() {
    mobile_side_bar.style.left = "0";
    mobile_opacity_curtain.style.display = "block";
    document.body.style.overflow = "hidden";
}

//  handler for hiding the mobile side bar.
mobile_options_exit.onclick = function() {
    mobile_side_bar.style.left = "-100%";
    mobile_opacity_curtain.style.display = "none";
    document.body.style.overflowY  = "scroll";
    document.body.style.overflowX = "hidden";
}

/************************/
/* Course Grid Handlers */
/************************/

//  all course selector handler; simply display all the courses in the
//  course grid.
all_link.onclick = function () {
    courses.forEach(course => {
        course.style.display = "";
    });
}

//  speaker course selector handler; showing only the first three courses
//  that correspond to their assigned speakers.
speakers_link.onclick = function () { 
    for (let i = 0; i < courses.length; i++) {
        var course = courses[i];
        if (i < 3) {
            course.style.display = "block";
        } else {
            course.style.display = "none";
        }
    }
}

//  companies course selector handler; showing only the last three courses
//  that correspond to their assigned companies.
companies_link.onclick = function () {
    for (let i = 0; i < courses.length; i++) {
        var course = courses[i];
        if (i < 3 || i == 5) {
            course.style.display = "none";
        } else {
            course.style.display = "block";
        }
    }
}


