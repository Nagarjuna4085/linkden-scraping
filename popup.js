let scrapbtn = document.getElementById("btn")
let list =  document.getElementById('emailList')
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) =>{
        console.log(sendResponse,sender)
        let table = request.name
        let image = request.image
        let overview = request.overview
        let abotData = request.aboutData
        console.log(overview)
        console.log(abotData)
        let overviewL = document.createElement("li")
        overviewL.innerText=overview

        list.appendChild(overviewL)
        let ab = document.createElement("li")
        ab.innerText=abotData

        list.appendChild(ab)
      


        // alert(name)
        if(table==null && table.length==0){
            let li = document.createElement("li")
            li.innerText="mo data"
        }
        else{
            table.forEach(element => {
                let li = document.createElement("li")
            li.innerText=element.head + element.data
            list.appendChild(li)
            });
            let img = document.createElement("img")
            img.src = image
            list.appendChild(img)

            
        }
    }
    
    
  );
  
scrapbtn.addEventListener("click",async()=>{
    // alert("Hello")
    //getCurrent active tab
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        console.log(tab)
        if (tab.url?.startsWith("chrome://")) return undefined;
        chrome.scripting
        .executeScript({
          target : {tabId : tab.id},
          func : scrapDatasFromWebPage,
        })
    

})
async function scrapDatasFromWebPage(){
    var name="nagarjuna"
    var divWithClassName = document.querySelector(".org-top-card-primary-content__logo-container");

    // Select the image element within the div
        var imageElement = divWithClassName.querySelector("img");
        var imgSrc = imageElement.getAttribute("src");
        console.log("Image source:", imgSrc);
    

    // alert("hi")

    var about  = document.getElementById("ember50").children

   
    // Get the div by its ID
//

    for(i = 0; i <= about.length - 1; i++){
        // alert(about[i].innerHTML)
    }
    var myDiv = document.getElementById("ember50");

    // Get the section inside the div
    var section = myDiv.querySelector("section");
    
    
    // Access elements inside the section
    var overview = section.querySelector("h2");
    var aboutData = section.querySelector("p");
    // alert(paragraph.textContent)
    console.log(aboutData.textContent)
    // alert(p.textContent)
           // Get the <dl> element
    var dl = section.querySelector("dl");

    // Initialize variables to store terms and descriptions
    var terms = [];
    var descriptions = [];

    // Loop through the children of <dl>
    var children = dl.children;
    var currentTerm = null; // To keep track of the current term being processed

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.tagName === "DT") {
            // If it's a <dt> tag, store the term
            currentTerm = child.textContent;
            terms.push(currentTerm);
        } else if (child.tagName === "DD" && currentTerm !== null) {
            // If it's a <dd> tag and we have a current term, store the description cons
          console.log("D:", currentTerm);
//             descriptions.push(child.textContent);
          descriptions.push({head : currentTerm,data:child.textContent});
        //   alert(currentTerm)
        //   alert(child.textContent)
        }
    }

    // Now you have the terms and descriptions in separate arrays
    console.log("Terms:", terms);
    console.log("Descriptions:", descriptions);
    await chrome.runtime.sendMessage({name :descriptions,image:imgSrc,overview:overview.textContent,aboutData:aboutData.textContent})

}

