const dogBreedAPI = 'https://dog.ceo/api/breeds/list/all';
const imageByBreedAPI = 'https://dog.ceo/api/breed/';
const selectField = $("#breed-list");
const breedImages = document.getElementById('breed-images');

const MAX_IMAGE = 5;

// var dogBreedProm = fetch(dogBreedAPI);

// dogBreedProm.then((resp)=>{
//  return resp.json();
// }).then((data)=>{
//     console.log('data',data);
// }).catch((err)=>{
//     console.log('err',err);
// })

selectField.on('change',async function changeSelectField(e){
    var data = await fetchImagesFromBreed(selectField.val());
    var resp = addImages(data);
});

async function addImages(imgList){
   if(imgList.length <=0){
        breedImages.innerHTML = "No Images";
        return;
   }
   imgList = imgList.slice(0,MAX_IMAGE);
   imgList.map((item)=>{
    var img = document.createElement('img');
    $(img).attr('src',item);
    $(img).attr('height','100px');
    $(img).attr('width','100px');
    breedImages.append(img);
   })
}

async function fetchImagesFromBreed(breedName)
{
    try {
        var resp = await fetch(`${imageByBreedAPI}${breedName}/images`);
        var data = await resp.json();
        return data.message;    
    } catch (error) {
        console.log('err',error);   
    }
    
}



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
    selectField.change()
})();