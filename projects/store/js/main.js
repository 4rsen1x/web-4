const userSurname = document.querySelector('input[name="surname"]');
const userName = document.querySelector('input[name="name"]');
const goodsElements = document.querySelectorAll('input[type="checkbox"]');
const countElements = document.querySelectorAll('input[type="number"]');
const btn = document.querySelector(".btn");
const resultElem = document.querySelector(".sum");

let totalSum = 0;

const countGoods = {
  expresso: 0,
  americano: 0,
  latte: 0,
  capuchino: 0,
  chocolate_muffin: 0,
  blueberry_muffin: 0,
  apple_tart: 0,
};

const choicePriceGoods = {
  expresso: 0,
  americano: 0,
  latte: 0,
  capuchino: 0,
  chocolate_muffin: 0,
  blueberry_muffin: 0,
  apple_tart: 0,
};

function calculateTotal() {
  totalSum = 0;
  for (let product in choicePriceGoods) {
    totalSum += countGoods[product] * choicePriceGoods[product];
  }
  resultElem.textContent = `${totalSum} р.`;
}

countElements.forEach((elem) => {
  elem.addEventListener("change", (e) => {
    const product = e.target.id;
    let quantity = parseInt(e.target.value, 10);

    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
      e.target.value = 0;
    }

    countGoods[product] = quantity;
    calculateTotal();
  });
});

goodsElements.forEach((product) => {
  product.addEventListener("change", (e) => {
    const productName = e.target.dataset.goods;
    const price = parseInt(e.target.value, 10);

    if (e.target.checked) {
      choicePriceGoods[productName] = price;
      const quantityInput = document.getElementById(productName);
      if (parseInt(quantityInput.value, 10) === 0) {
        quantityInput.value = 1;
        countGoods[productName] = 1;
      }
    } else {
      choicePriceGoods[productName] = 0;
      countGoods[productName] = 0;
      const quantityInput = document.getElementById(productName);
      quantityInput.value = 0;
    }

    calculateTotal();
  });
});

btn.addEventListener("click", () => {
  const surname = userSurname.value || "";
  const name = userName.value || "";

  let orderDetails = `Заказчик: ${surname} ${name}\nЗаказ:\n`;

  for (let product in countGoods) {
    if (countGoods[product] > 0) {
      orderDetails += `${product}: ${countGoods[product]} шт. на сумму ${
        countGoods[product] * choicePriceGoods[product]
      } р.\n`;
    }
  }

  orderDetails += `Итоговая сумма: ${totalSum} р.`;

  alert(orderDetails);
});
