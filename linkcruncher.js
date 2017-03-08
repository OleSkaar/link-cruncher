//Link Cruncher 0.1
/* A script that searches input text for URLs, checks which language the page is by scanning the first directory of the URI, returns the correct domain (default value bi.no/edu), then opens the links */


/*
Declare arrays lang1, lang2
Declare var lang1domain and var lang2domain
Create links array
On paste, search input for values between two characters (default: "")
Place each value in links array
For each value in array, if first character is /, check if value between / / is equal to any value in lang1 array, if not, check language2
If value is match with lang1, add lang1domain in front of string
For each link in links array, open each link
*/

var lang1 = ['studier-og-kurs', 'studere-ved-bi', 'alumni-og-partnerskap', 'forskning', 'om-bi'];
var lang2 = ['programmes-and-individual-courses', 'study-at-bi', 'alumni-og-partnerskap', 'research', 'about-bi'];
var lang1domain = 'https://www.bi.no';
var lang2domain = 'https://www.bi.edu';
var inputfield = document.getElementById('inputfield');
var links = [];
var re = /\"(.*?)\"/g;

var str = '<li><a href="/studier-og-kurs/bachelorstudier/business-administration/">Bachelor of Business Administration</a></li><li><a href="/studier-og-kurs/bachelorstudier/creative-industries-management/"> Creative Industries Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/eiendomsmegling/"> Eiendomsmegling</a></li><li><a href="/studier-og-kurs/bachelorstudier/entreprenorskap-og-okonomi/"> Entreprenørskap og økonomi</a></li><li><a href="/studier-og-kurs/bachelorstudier/finans/"> Finans</a></li><li><a href="/studier-og-kurs/bachelorstudier/internasjonal-markedsforing/"> Internasjonal markedsføring</a></li><li><a href="/studier-og-kurs/bachelorstudier/markedsforingsledelse/"> Markedsføringsledelse</a></li><li><a href="/studier-og-kurs/bachelorstudier/pr-og-markedskommunikasjon/"> PR og markedskommunikasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/regnskap-og-revisjon/"> Regnskap og revisjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/retail-management/"> Retail Management</a></li><li><a href="/studier-og-kurs/bachelorstudier/sivilokonom/">Siviløkonom</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-administrasjon/"> Økonomi og administrasjon</a></li><li><a href="/studier-og-kurs/bachelorstudier/okonomi-og-forretningsjus/"> Økonomi og forretningsjus</a></li>';

var regExed;
var result;
var replaceQuote;

function replacer() {
    setTimeout(function () {
        while ((regExed = re.exec(inputfield.value)) !== null) {
            result = regExed[0];
            links.push(result);
            }
        for (i = 0; i < links.length; i++) {
            console.log('hi');
            replaceQuote = links[i].replace(/\"/g, '');
            links[i] = replaceQuote;
            }
    }, 4);

}


/* 
function openWindow() {
    for (i = 0; i < 5; i++) {
        window.open(links[i]);
    }
}
*/