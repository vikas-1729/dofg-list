const dogBreedAPI = 'https://dog.ceo/api/breeds/list/all';
const selectField = $("#breed-list");
// var dogBreedProm = fetch(dogBreedAPI);

// dogBreedProm.then((resp)=>{
//  return resp.json();
// }).then((data)=>{
//     console.log('data',data);
// }).catch((err)=>{
//     console.log('err',err);
// })

async function fetchAllBreedList(){
    try {
        var resp = await fetch(dogBreedAPI);
        var data = await resp.json();
        console.log('data',data);
        return Object.keys(data.message);   
    } catch (error) {
        console.log('err',error);
    }    
}

function addToSelect(data){
    if(data.length <=0){
        return;
    }
    selectField.html("");
    console.log('a1',data);
    for(let i =0;i<data.length;i++){
        var option = document.createElement('option');
        $(option).text(data[i]);
        $(option).attr("value",data[i]);
        selectField.append(option);
    }

}

(async function init(){
    var data = await  fetchAllBreedList();
    addToSelect(data);

})();