var productContainer = document.getElementById("products")
var search = document.getElementById("search")
var productlist= productContainer.querySelectorAll("div")

search.addEventListener("keyup",function(){
    var enteredValue = event.target.value.toUpperCase()

    for(count=0;count<productlist.length;count++)
    {
       var productname= productlist[count].querySelector("p").textContent

       if(productname.toUpperCase().indexOf(enteredValue)<0)
       {
        productlist[count].style.display="none"
       }
       else{
        productlist[count].style.display="block"
       }
    }

})

//side navbar

var sidenav = document.querySelector(".side-navbar")

function showNavbar()
{
    sidenav.style.left="0"
}

function closeNavbar(){
    sidenav.style.left="-60%"
}

function showMore() {
    // Add more images when the button is clicked
    const product = document.getElementById('product');
    
    // Example: Add more images dynamically
    for (let i = 3; i <= 10; i++) {
        const newImage = document.createElement('img');
        newImage.src = `image${i}.jpg`;
        newImage.alt = `Image ${i}`;
        imageContainer.appendChild(newImage);
    }

    // Hide the button after all images are displayed
    document.getElementById('show-more').style.display = 'none';
}


function showMore() {
    var hiddenImages = document.querySelectorAll('.products-box.hidden');
    for (var i = 0; i < hiddenImages.length; i++) {
        hiddenImages[i].classList.remove('hidden');
    }
    document.querySelector('.show-morebtn').style.display = 'none';
}


document.getElementById('search').addEventListener('click', function() {
    document.getElementById('show-more').style.display = 'none';
});

document.getElementById('search').addEventListener('mouseout', function() {
    document.getElementById('show-more').style.display = 'block';
});

