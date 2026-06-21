/* ================= INTRO ================= */
window.addEventListener('load', function() {
    let introLoader = document.getElementById('intro-loader');
    
    if (introLoader) {
        setTimeout(function() {
            introLoader.classList.add('fade-out');
        }, 1000); 
    }
});



/* ================= DROPDOWNS ================= */
const allde = document.querySelector(".all-de-hai")
const list2 = document.querySelector(".list-hai")

allde.addEventListener("click", () => {
    list2.classList.toggle('hide')
});

const box = document.querySelector(".box-hai")


/* ================= SLIDER ================= */
const sliders = document.querySelectorAll('.s4-box');

sliders.forEach(slider =>{
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const track = slider.querySelector('.s4-sp')
    const slides = slider.querySelectorAll('.s4-page')

let currentIndex = 0;
let timer;

function resetAutoPlay() {
    clearInterval(timer);
    timer = setInterval(nextSlide,3000)
};
function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }
function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length; 
            updateSlider();
        }
nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay(); 
        });

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();

});
updateSlider();
resetAutoPlay();
});

/* ================= GIỎ HÀNG & YÊU THÍCH (LOCALSTORAGE) ================= */
let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
let cart = JSON.parse(localStorage.getItem('myCart')) || [];


function updateCounters() {
    let wishlistSpan = document.getElementById('wishlist-count');
    let cartSpan = document.getElementById('cart-count');
    let wishlistTotal = 0;
    let cartTotal = 0;

    if(wishlistSpan) {
        wishlistSpan.innerText = wishlist.length;
    }
    if(cartSpan) {
        cartSpan.innerText = cart.length;
    }

    wishlist.forEach(function(item) {
        let priceNumber = parseFloat(item.price.replace('$', ''));
        wishlistTotal += priceNumber;
    });

    cart.forEach(function(item) {
        let priceNumber = parseFloat(item.price.replace('$', ''));
        cartTotal += priceNumber;
    });

    let globalTotal = wishlistTotal + cartTotal;

    let priceDisplay = document.querySelector('.cart-price-hai span b');
    if (priceDisplay) {
        priceDisplay.innerText = '$' + globalTotal.toFixed(2);
    }

    let wishlistModalTotalDisplay = document.getElementById('wishlist-modal-total');
    if (wishlistModalTotalDisplay) {
        wishlistModalTotalDisplay.innerHTML = '$' + wishlistTotal.toFixed(2) ;
    }

    let cartModalTotalDisplay = document.getElementById('cart-modal-total');
    if (cartModalTotalDisplay) {
        cartModalTotalDisplay.innerHTML = '$' + cartTotal.toFixed(2);
    }
}
updateCounters();


document.querySelectorAll('.add-to-wishlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
        
        let product = {
            id: this.getAttribute('data-id'),
            name: this.getAttribute('data-name'),
            price: this.getAttribute('data-price'),
            image: this.getAttribute('data-image')
        };
        let isExist = wishlist.find(item => item.id === product.id);
        if (isExist) {
            alert('Sản phẩm này đã có trong Mục Yêu Thích rồi!');
        } else {
            wishlist.push(product);
            localStorage.setItem('myWishlist', JSON.stringify(wishlist));
            updateCounters();
        }
    });
});

document.querySelectorAll('.add-to-cart').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        
        let product = {
            id: this.getAttribute('data-id'),
            name: this.getAttribute('data-name'),
            price: this.getAttribute('data-price'),
            image: this.getAttribute('data-image')
        };
        let isExist = cart.find(item => item.id === product.id);
        if (isExist) {
            alert('Sản phẩm này đã có trong Giỏ Hàng rồi!');
        } else {
            cart.push(product);
            localStorage.setItem('myCart', JSON.stringify(cart));
            updateCounters();
        }
    });
});

function renderList(listArray, containerId, storageKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 
    if (listArray.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 20px;">No products found.</p>';
        return;
    }
    listArray.forEach(function(item, index) {
        container.innerHTML += `
            <div class="modal-item">
                <img src="${item.image}" alt="">
                <div class="info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="remove-btn" data-index="${index}"><i class="fa fa-trash"></i></button>
            </div>
        `;
    });
    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let position = this.getAttribute('data-index'); 
            listArray.splice(position, 1); 
            localStorage.setItem(storageKey, JSON.stringify(listArray)); 
            updateCounters(); 
            renderList(listArray, containerId, storageKey); 
        });
    });
}

const headerWishlistBtn = document.getElementById('header-wishlist-btn');
if (headerWishlistBtn) {
    headerWishlistBtn.addEventListener('click', function(e) {
        renderList(wishlist, 'wishlist-items-container', 'myWishlist'); 
        document.getElementById('wishlist-modal').classList.remove('hide'); 
    });
}

const headerCartBtn = document.getElementById('header-cart-btn');
if (headerCartBtn) {
    headerCartBtn.addEventListener('click', function(e) {
        renderList(cart, 'cart-items-container', 'myCart');
        document.getElementById('cart-modal').classList.remove('hide');
    });
}

const closeBtns = document.querySelectorAll('.close-modal-btn');
closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.closest('.modal-overlay').classList.add('hide');
    });
});


/* ================= NAVS ================= */ 
const navItems = document.querySelectorAll('.featured-nav li');
const products = document.querySelectorAll('.s3-anh-hai .box-hai');
const noProduct = document.getElementById('no-product');


    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');

            let visibleCount = 0;
            products.forEach(product => {
                
                const productCate = product.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === productCate) {
                    product.classList.remove('hide-product'); 
                    visibleCount++;
                } else {
                    product.classList.add('hide-product'); 
                }
                
            });
            
            if (visibleCount === 0) {
                noProduct.style.display = 'block';
            } else {
                noProduct.style.display = 'none'; 
            }
        });
        
    });


