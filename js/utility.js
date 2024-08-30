let container_box=document.getElementById("container");
async function Load (value){
    try{
        let res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    let data=await res.json();
    
   
    display(data[0])
    }
    catch(err){
        toggleSpinner(false)
        let ERR=document.getElementById("ERROR");
        ERR.classList.remove('hidden')
        ERR.innerText="word incorrect.Not found!"
    }
}
let display=(data)=>{
    container_box.innerHTML=""
    let div=document.createElement("div");
    let Antonyms = (result) => {
        return result.map(antonym => `<li>${antonym}</li>`).join("");
    };
    div.innerHTML=`
    <h1 class="text-3xl font-semibold">Word:${data.word}</h1>
     <p class="text-gray-400">${data.meanings[1].partOfSpeech}</p>
     <h3><span class="text-xl">Example:</span>${data.meanings[0].definitions[0].example===undefined ?"Not found"
        :data.meanings[0].definitions[0].example}</h3>
     <h3><span class="text-xl">Meaning:</span>${data.meanings[0].definitions[0].definition ===undefined? "Not found"
        :data.meanings[0].definitions[0].definition
     }</h3>
<h3><span class="text-xl">Antonyms:</span> ${data.meanings[0].antonyms.length > 0 ? Antonyms(data.meanings[0].antonyms) : "Not found"}</h3>

<div class="mt-5">
            <a href="${data.sourceUrls[0]}" target="_blank" class="btn button bg-cyan-500 px-4 py-2 text-white rounded">read more</a>
        </div>
    `
    
    toggleSpinner(false)
    container_box.appendChild(div)

}

let searchHandaller=()=>{
    toggleSpinner(true)
    let text=document.getElementById("INPUT");
    let value=text.value;
    Load(value)
}
let toggleSpinner=(isspinner)=>{
    let spinnerID=document.getElementById("Spinner");
    if(isspinner){
        spinnerID.classList.remove('hidden')
    }
    else{
        spinnerID.classList.add('hidden')
    }
}