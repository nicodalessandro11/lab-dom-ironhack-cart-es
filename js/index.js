function addListenerRemove() {
  const deleteProductBtn = document.querySelectorAll('.btn.btn-remove');
  deleteProductBtn.forEach((btn) => {
    btn.addEventListener('click', removeProduct);
  });
}

function updateSubtotal(product) {
  const price = parseFloat(product.querySelector('.price span').innerText);
  const quantity = parseInt(product.querySelector('.quantity input').value);
  let subtotalValue = price * quantity;
  const subtotal = product.querySelector('.subtotal span');
  subtotal.textContent = subtotalValue;
  return subtotalValue;
}

function calculateAll() {
  const products = document.querySelectorAll('.product');
  const total = document.querySelector('#total-value span');
  let totalValue = 0;
  products.forEach((node) => {
    totalValue += updateSubtotal(node);
  });

  total.textContent = totalValue;
}

function removeProduct(event) {
  const target = event.currentTarget;
  toRemove = target.parentNode.parentNode;

  tbody = toRemove.parentNode;
  tbody.removeChild(toRemove);

  calculateAll();
}

function createProduct() {
  const productName = document.querySelector(
    '.create-product input[placeholder="Product Name"]'
  );
  const unitPrice = document.querySelector(
    '.create-product input[placeholder="Product Price"]'
  );

  const tableBody = document.querySelector('#cart tbody');

  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `<td class="name">
          <span>${productName.value}</span>
        </td>
        <td class="price">$<span>${parseFloat(unitPrice.value).toFixed(
          2
        )}</span></td>
        <td class="quantity">
          <input type="number" value="0" min="0" placeholder="Quantity" />
        </td>
        <td class="subtotal">$<span>0</span></td>
        <td class="action">
          <button class="btn btn-remove">Remove</button>
        </td>`;

  tableBody.appendChild(newRow);

  productName.value = '';
  unitPrice.value = '';
  addListenerRemove();
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const createProductBtn = document.querySelector('#create');
  createProductBtn.addEventListener('click', createProduct);

  addListenerRemove();
});
