import "./style.css";

//! global state
//? static state
const mealContainerEl = document.getElementById("mealContainer");
const cartEl = document.getElementById("cart");
const orderLstEl = document.querySelector(".order_list");

const URL = "https://dummyjson.com/recipes";

const orderList = [];

//? dynamic stat
let count = 0;

//! گرفتن api
async function getMeanu() {
  const response = await fetch(URL);
  const food = await response.json();
  return food.recipes;
}
const foodList = await getMeanu();
creatList(foodList);

//! ساختن قالب اصلی صفهحمون
function creatList(foodlist) {
  foodList.forEach((meale) => {
    const foodName = meale.name;
    const foodImage = meale.image;
    const foodIngreadiant = meale.ingredients[3];
    const fooodPraice = meale.caloriesPerServing;
    mealContainerEl.innerHTML += ` <section class="flex flex-col gap-8">
          <div class="flex flex-col items-center relative">
            <img
              src="${foodImage}"
              alt=""
              class="w-60 h-60.25 rounded-2xl"
            />
            <button
              class="fbtn flex flex-row gap-2 px-6 absolute top-58 bg-color-rose-100 border border-color-rose-900 rounded-2xl"
            >
              <img src="./public/icon-add-to-cart.svg" alt="" />
              <p>Add to Cart</p>
            </button>

              <button
              class="hidden secon_btn text-color-w w-39.25 justify-between bg-color-red flex flex-row gap-2 px-6 absolute top-58 border border-color-rose-900 rounded-2xl"
            >
              <img class="min_btn" src="./public/icon-decrement-quantity.svg" alt="" />
              <span class="requst">1</span>
              <img class="plus_btn" src="./public/icon-increment-quantity.svg" alt="" />
             
            </button>
          </div>
          <div class="flex flex-col gap-0.5">
            <p class="foodName text-rose-300">${foodName}</p>

            <h4 class="mt-1.5">${foodIngreadiant}</h4>
            <span class="foodPrice text-red">$${fooodPraice}</span>
          </div>
        </section>`;
  });
}

// console.log(document.querySelectorAll(".fbtn"));

//! function های مربوط ب قسمت کیک کردن
//? ضخیره اردرمون در یک ارایه . فعلا بدون سر شماری تعداد غذا ها . و امکان تکرار ی غذا وجود دارد
const pushInList = (foodName, foodPrice, quantity) => {
  const food = {
    obName:`${foodName}`,
    obPrice:`${foodPrice}`,
    obQuantity:`${quantity}`,
  };
  console.log("foodName", "---->", food.obName);
  console.log("foodPrice", "---->", food.obPrice);
  console.log("foodQuantity", "---->", food.obQuantity);
  const existingFood = orderList.find((item) => item.name === food.obName);
  if (existingFood) {
    existingFood.obQuantity++;
  } else {
    orderList.push(food);
    orderList.obQuantity = 1;
  }
};
const creatCart = () => {
  //* در این مرحله توقع میرود که لیست اردر ها در قسمت اردر لیس نمایش داره شود. ولی کار نمیکنه
  orderLstEl.innerHTML = "";
  orderList.forEach((order) => {
    const foodNameM = order.obName;
    const foodPriceM = order?.obPrice;
    const quantityM = order?.obQuantity;

    orderLstEl.innerHTML += `<li class="flex flex-col gap-1">
            <p class="font-medium">${foodNameM}</p>

            <div class="flex gap-1.75 mb-3">
              <span class="text-color-red">x${quantityM} </span>
              <span class="text-color-red">  @${foodPriceM} $${foodPriceM * quantityM}</span>
            </div>
             <div class="h-px bg-color-rose-900 w-84"></div>
       
          </li>`;
  });
};

const addMeale = (fristButton, secondButton, foodName, foodPrice) => {
  //* هاید شدن باتن اولیه و ظاهر شدن بانت داینامیک ثانویه
  fristButton.style.display = "none";
  secondButton.classList.remove("hidden");
  //* کال کردن فانکشن برای ذخیره اسم و قیمت غذا در ارایه
  pushInList(foodName, foodPrice,1);
  creatCart();

};

function baceMode(fristButton, secondButton, foodName, foodPrice) {
  secondButton.classList.add("hidden");
  fristButton.style.display = "flex";
}

//! قسمت کلیک کردن دکمه (ایونت)
document.querySelectorAll("section").forEach((stion) => {
  const btn = stion.querySelector(".fbtn");
  const dynamicBtn = stion.querySelector(".secon_btn");

  const foodName = stion.querySelector(".foodName")?.textContent;
  // console.log(foodName);
  const foodPrice = stion
    .querySelector(".foodPrice")
    ?.textContent.replace("$", "");

  const plus_btnEl = stion.querySelector(".plus_btn");
  const requstEl = stion.querySelector(".requst");
  const min_btnEl = stion.querySelector(".min_btn");
  let quantity = 1;
  // requstEl.textContent = quantity;
  btn?.addEventListener("click", () => {
    count++;
    console.log(count);
    addMeale(btn, dynamicBtn, foodName, foodPrice);
    console.log(orderList);



  });

  plus_btnEl?.addEventListener("click", () => {



    ++quantity;
    requstEl.textContent = quantity;
    pushInList(foodName, foodPrice,quantity);
    creatCart();
  });
  min_btnEl?.addEventListener("click", () => {
    if (quantity > 1) {
      --quantity;
      requstEl.textContent = quantity;
    } else {
      baceMode(btn, dynamicBtn);
      pushInList(foodName, foodPrice);
    }
  });
});

// getMeanu();

/*const popAtList = (foodName, foodPrice) => {
  const food = {
    foodName: `${foodName}`,
    foodPrice: `${foodPrice}`,
    };
    console.log("foodName", "---->", food.foodName);
    console.log("foodPrice", "---->", food.foodPrice);
    
    orderList.pop(food);
    };*/
    



    
    console.log(orderList);
