const cartTable = document.querySelector('.cart-table');
        const discountTable = document.getElementById('discount-table');
        const totalPriceDiv = document.getElementById('total-price');
        let totalPrice = 0;

        function getDiscountPercentage(vendor, trade) {
            const discountRows = discountTable.getElementsByTagName('tr');
            for (let i = 1; i < discountRows.length; i++) {
                const row = discountRows[i];
                const cells = row.getElementsByTagName('td');
                if (cells.length > 0 && cells[0].textContent === vendor) {
                    const tradeIndex = ['Trade A', 'Trade B', 'Trade C', 'Trade D'].indexOf(trade);
                    return tradeIndex >= 0 ? cells[tradeIndex + 1].textContent : '0%';
                }
            }
            return '0%';
        }

        function addToCart(productId, name, price, vendor, trade) {
            const discountPercentage = getDiscountPercentage(vendor, trade);
            const discount = (parseFloat(discountPercentage) / 100) * price;
            const discountPrice = price - discount;

           
            const row = cartTable.insertRow(1);
            row.innerHTML = `<td>${productId}</td><td>${name}</td><td>${price}</td><td>${discountPercentage}</td><td>${discountPrice.toFixed(2)}</td><td>${vendor}</td><td bgcolor="red"><button class="shop" onclick="removeFromCart(${productId}, ${discountPrice})">Remove Cart</button></td>`;

      
            totalPrice += discountPrice;
            totalPriceDiv.textContent = `Total Price:Rs. ${totalPrice.toFixed(2)}`;

            cartTable.style.display = 'table';
        }

        function removeFromCart(productId, discountPrice) {
            const rows = cartTable.getElementsByTagName('tr');
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const cells = row.getElementsByTagName('td');
                if (cells.length > 0 && parseInt(cells[0].textContent) === productId) {
                    cartTable.deleteRow(i);
                    totalPrice -= discountPrice;
                    totalPriceDiv.textContent = `Total Price: ${totalPrice.toFixed(2)}`;
                    if (cartTable.rows.length === 1) {
                        cartTable.style.display = 'none';
                    }
                    break;
                }
            }
        }
