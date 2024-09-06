const btn = document.querySelectorAll('button');
btn.forEach((bt)=>{
    bt.addEventListener('click',()=>{
        console.log("Button Clicked");
    });
});