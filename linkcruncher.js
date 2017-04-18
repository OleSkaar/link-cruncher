//Link Cruncher 0.3
/* A script that searches input text for URLs, checks which language the page is by scanning the first directory of the URI, returns the correct domain (default value bi.no/edu), then opens the links */
/*
Declare domains array
Create objects for each domain (default: bi.no and bi.edu)
On paste, search input for values between two characters (default: "")
For each value in array, check if first value between / / is equal to any value in any of the given languages
Add the appropriate domain
Place each value in links array
For each link in links array, open each link

TO DO list: 

add option to customize regex character


add function to edit a domain? (add or edit domains)

add function to prioritize newest domain in the domains list (z-index = domains.length?)

make buttons toggle show/hide, instead of having one button for each

add "how does this work?" section, explaining the different fields

combine add new domains and show current domains fields (top domain field = fields to add new domain)

function to toggle styles on or off? could include both button toggles and form not filled out alert
*/


var domains = [];

function Domain(firstDirectory, domain) {
    // Create a new domain and push domain to domains array
    this.firstDirectory = firstDirectory;
    this.domain = domain;
    domains.push(this);
    showLinks('currentDomains', this.domain, 'domainname');
    for (var i = 0; i < this.firstDirectory.length; i++) 
        {
            showLinks('currentDomains', ('/' + this.firstDirectory[i] + '/'), 'domainlist');
        }
}


new Domain(['studier-og-kurs', 'studere-ved-bi', 'alumni-og-partnerskap', 'forskning', 'om-bi'], 'https://www.bi.no');

new Domain(['programmes-and-individual-courses', 'study-at-bi', 'alumni-og-partnerskap', 'research', 'about-bi'], 'https://www.bi.edu');


var inputfield = document.getElementById('inputfield');
var links = [];
var re = /\"(.*?)\"/g;
var reLang = /\/(.*?)\//;
var reLangG = /\/(.*?)\//g;
var regExed, result, domainReg;
var inDirectory = false;

function replacer() {
    // After 4ms, search input field for links, and activate language search function
    setTimeout(function () {
        while ((regExed = re.exec(inputfield.value)) !== null) {
        langSearch(regExed[1], domains);
                } 
        }, 4);
}

function langSearch(reg, d) {
    inDirectory = false;
    // See if first directory belongs to any of the specified languages, if match, add domain, and push results to links array, if not show directory in red
    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].firstDirectory.length; j++) {
            if (reLang.exec(reg) !== null && reLang.exec(reg)[1] === d[i].firstDirectory[j]) {
            result = d[i].domain + reg;
            links.push(result);
            showLinks('results', result, 'green');
            inDirectory = true;
            } 
        }
    }
    if (inDirectory === false) {
        showLinks('results', reg, 'red');
        }
}

function openLinks() {
    //Open every link in the links array (triggers pop-up blocker in Chrome)
    for (i = 0; i < links.length; i++) {
        window.open(links[i]);
    }
}

function showLinks(id, r, c) {
    // Create a paragraph element, fill with text content, and each paragraph a class
    var para = document.createElement('p');
    para.setAttribute('class', c);
    var node = document.createTextNode(r);
    para.appendChild(node);
    document.getElementById(id).appendChild(para);
}

function showHide(i, d) {
    document.getElementById(i).style.display = d;
}

function newDomain(d, t) {
    //If domain fields are not empty, create new Domain object, push all directories to directories array, clear fields and reset color to default. If one or more fields are empty, make that field light red and display message
    var dval = document.getElementById(d).value;
    var tval = document.getElementById(t).value;
    if (dval !== "" && tval !== "")   
    {
    var n = new Domain([], tval);
    while ((domainReg = reLangG.exec(dval)) !== null) {
        n.firstDirectory.push(domainReg[1]);
        showLinks('currentDomains', ('/' + domainReg[1] + '/'), 'domainlist');
    }  
        clearField(d);
        clearField(t);
        rcls(d, 'lightRed');
        rcls(t, 'lightRed');
        showHide ('fieldMissing', 'none');
    } else
        showHide ('fieldMissing', 'block');
        { 
            if (dval === "") {
                cls (d, 'lightRed');
            } else {
                rcls (d, 'lightRed');
            }
            if (tval === "") {
                cls (t, 'lightRed');
            } else {
                rcls (t, 'lightRed');
            }
        }
}

function clearField(f) {
    document.getElementById(f).value = null;
}

function cls (id, c) {
    document.getElementById(id).setAttribute('class', c);
}

function rcls (id, c) {
    document.getElementById(id).removeAttribute('class', c);
}

function changeReg() {
    var regTemp = document.getElementById(regExChar).value 
    re = /\"(.regTemp?)\"/g;
}


/* List for testing: 
-<li><a href="/studier-og-kurs/bachelorstudier/business-administration/">Bachelor of Business Administration</a></li><li><a href="/studier-og-kurs/bachelorstudier/creative-industries-management/"> Creative Industries Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/eiendomsmegling/"> Eiendomsmegling</a></li><li><a href="/studier-og-kurs/bachelorstudier/entreprenorskap-og-okonomi/"> Entreprenørskap og økonomi</a></li><li><a href="/studier-og-kurs/bachelorstudier/finans/"> Finans</a></li><li><a href="/studier-og-kurs/bachelorstudier/internasjonal-markedsforing/"> Internasjonal markedsføring</a></li><li><a href="/studier-og-kurs/bachelorstudier/markedsforingsledelse/"> Markedsføringsledelse</a></li><li><a href="/studier-og-kurs/bachelorstudier/pr-og-markedskommunikasjon/"> PR og markedskommunikasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/regnskap-og-revisjon/"> Regnskap og revisjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/retail-management/"> Retail Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/sivilokonom/">Siviløkonom</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-administrasjon/"> Økonomi og administrasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-forretningsjus/"> Økonomi og forretningsjus</a></li>

        <ul class="menu-items">
                        <li class="menu-item category">
                            <span class="category-name">Programmes and individual courses</span>

                                    <ul class="category-items">
                                        <li class="">
                                            <a href="/programmes-and-individual-courses/">Front page</a>
                                        </li>
                                            <li class="">
                                                <a href="/programmes-and-individual-courses/bachelor-programmes/">Bachelor programmes</a>
                                            </li>
                                            <li class="">
                                                <a href="/programmes-and-individual-courses/master-programmes/">Master programmes</a>
                                            </li>
                                            <li class="">
                                                <a href="/programmes-and-individual-courses/executive-education/">Executive education</a>
                                            </li>
                                            <li class="">
                                                <a href="/programmes-and-individual-courses/phd/">PhD</a>
                                            </li>
                                            <li class="">
                                                <a href="/programmes-and-individual-courses/corporate/">Corporate</a>
                                            </li>
                                            <li class="">
                                                <a href="https://issuu.com/bi_business_school">Brochures</a>
                                            </li>
                                    </ul>


*/
