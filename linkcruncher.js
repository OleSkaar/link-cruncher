//Link Cruncher 0.2
/* A script that searches input text for URLs, checks which language the page is by scanning the first directory of the URI, returns the correct domain (default value bi.no/edu), then opens the links */
/*
Declare domains array
Create objects for each domain (default: bi.no and bi.edu)
On paste, search input for values between two characters (default: "")
For each value in array, check if first value between / / is equal to any value in any of the given languages
Add the appropriate domain
Place each value in links array
For each link in links array, open each link
*/

var domains = [];

function Domain(firstDirectory, domain) {
    // Create a new domain and push domain to domains array
    this.firstDirectory = firstDirectory;
    this.domain = domain;
    domains.push(this);
}


var bino = new Domain(['studier-og-kurs', 'studere-ved-bi', 'alumni-og-partnerskap', 'forskning', 'om-bi'], 'https://www.bi.no');

var biedu = new Domain(['programmes-and-individual-courses', 'study-at-bi', 'alumni-og-partnerskap', 'research', 'about-bi'], 'https://www.bi.edu');


var inputfield = document.getElementById('inputfield');
var links = [];
var re = /\"(.*?)\"/g;
var reLang = /\/(.*?)\//;
var regExed, result;

function replacer() {
    // After 4ms, search input field for links, and activate language search function
    setTimeout(function () {
        while ((regExed = re.exec(inputfield.value)) !== null) {
        langSearch(regExed[1], domains);
                } 
        }, 4);
}

function langSearch(reg, d) {
    // See if links belongs to any of the specified languages, if match, add domain, and push results to links array
    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].firstDirectory.length; j++) {
            if (reLang.exec(reg)[1] === d[i].firstDirectory[j]) {
            result = d[i].domain + reg;
            links.push(result);
            }
        }
    }
}

function openLinks() {
    for (i = 0; i < links.length; i++) {
        window.open(links[i]);
    }
}

/*
// else statement for when language does not exist
else { 
                    alert(result +' does not belong to ' + lang1domain + ' or ' + lang2domain + '.');
                }
                
*/

if ((regExed = re.exec(inputfield.value)) !== null) {
    alert('No links found!');
    }



/* List for testing: 
<li><a href="/studier-og-kurs/bachelorstudier/business-administration/">Bachelor of Business Administration</a></li><li><a href="/studier-og-kurs/bachelorstudier/creative-industries-management/"> Creative Industries Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/eiendomsmegling/"> Eiendomsmegling</a></li><li><a href="/studier-og-kurs/bachelorstudier/entreprenorskap-og-okonomi/"> Entreprenørskap og økonomi</a></li><li><a href="/studier-og-kurs/bachelorstudier/finans/"> Finans</a></li><li><a href="/studier-og-kurs/bachelorstudier/internasjonal-markedsforing/"> Internasjonal markedsføring</a></li><li><a href="/studier-og-kurs/bachelorstudier/markedsforingsledelse/"> Markedsføringsledelse</a></li><li><a href="/studier-og-kurs/bachelorstudier/pr-og-markedskommunikasjon/"> PR og markedskommunikasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/regnskap-og-revisjon/"> Regnskap og revisjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/retail-management/"> Retail Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/sivilokonom/">Siviløkonom</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-administrasjon/"> Økonomi og administrasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-forretningsjus/"> Økonomi og forretningsjus</a></li>
*/