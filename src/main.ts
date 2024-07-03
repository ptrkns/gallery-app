// Images
const path : string = './assets/images.json';
let currentPicture : number = 0;
let imageArray : {
    image: string,
    title: string,
    description: string,
    artist: string,
    camera: string,
    lens: number,
    fstop: number,
    iso: number,
    shutter: number,
    link: string
}[] = [];

function setThumbnailClick(name: string, index: number) {
    $(name).on('click', () => {
        currentPicture = index;
        loadMainPicture(index);
    });
};

function setThumbnail(name: string, index: number) {
    $(name).attr('src', imageArray[index].image);
    setThumbnailClick(name, index);
};

function updateThumbnails(index: number) {
    setThumbnail('#th-image-2', index);
    if( index === 0 ) {
        setThumbnail('#th-image-1', imageArray.length - 1);
        setThumbnail('#th-image-3', index + 1);
    }
    else if ( index > 0 && index < imageArray.length - 1 ) {
        setThumbnail('#th-image-1', index - 1);
        setThumbnail('#th-image-3', index + 1);
    }
    else if ( index === imageArray.length - 1 ) {
        setThumbnail('#th-image-1', index - 1);
        setThumbnail('#th-image-3', 0);
    }
};

function loadMainPicture(index: number) {
    const main_image = document.querySelector('#main-image') as HTMLImageElement;
    main_image.setAttribute('src', imageArray[index].image);

    $('#title').text(imageArray[index].title);
    $('#description').text(imageArray[index].description);
    $('#artist').text("Taken by " + imageArray[index].artist);
    $('#camera').text(imageArray[index].camera);
    $('#lens').text(imageArray[index].lens + " mm");
    $('#fstop').text("f/" + imageArray[index].fstop);
    $('#iso').text(imageArray[index].iso);
    $('#shutter').text("1/" + imageArray[index].shutter + " s");
    $('#link').attr('href', imageArray[index].link);
    updateThumbnails(index);
};

function imageArrayInit() {
    fetch(path)
    .then((response) => { return response.json(); })
    .then((data) => {
        imageArray = data;
        loadMainPicture(currentPicture);
        updateThumbnails(currentPicture);
    })
    .catch((error) => { console.error("There was a problem with the fetch operation: ", error); });
};
imageArrayInit();

function setArrowClick(name: string) {
    $(name).on('click', () => {
        if (name === '#al' && currentPicture > 0) {currentPicture--;}
        else if (name === '#al' && currentPicture === 0) {currentPicture = imageArray.length - 1;}

        if (name === '#ar' && currentPicture < imageArray.length - 1) {currentPicture++;}
        else if (name === '#ar' && currentPicture === imageArray.length - 1) {currentPicture = 0;}

        for (let i = 0; i < imageArray.length; i++) {
            if (currentPicture === i) {
                $('#main-image').attr('src', imageArray[currentPicture].image);
                $('#title').text(imageArray[currentPicture].title);
                $('#description').text(imageArray[currentPicture].description);
                $('#artist').text("Taken by " + imageArray[currentPicture].artist);
                $('#camera').text(imageArray[currentPicture].camera);
                $('#lens').text(imageArray[currentPicture].lens + " mm");
                $('#fstop').text("f/" + imageArray[currentPicture].fstop);
                $('#iso').text(imageArray[currentPicture].iso);
                $('#shutter').text("1/" + imageArray[currentPicture].shutter + " s");
                $('#link').attr('href', imageArray[currentPicture].link);
                updateThumbnails(currentPicture);
            }
        }
    });
};
setArrowClick('#al');
setArrowClick('#ar');