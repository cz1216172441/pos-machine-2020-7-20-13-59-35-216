function printReceipt(barcodes) {
    let items = countByBarcode(barcodes);
    items = getItemInfoByBarcode(items);
    items = calItemTotalPrice(items);
    const totalPrice = calAllItemsTotalPrice(items);
    const receiptItems = generateReceiptItems(items);
    const receipt = generateReceipt(receiptItems, totalPrice);
    console.log(receipt);
}

function getBarcodeInfoList() {
    return [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
    ]
}

function countByBarcode(barcodes) {
    let items = [];
    barcodes.forEach(barcode => {
        let item = items.find(elem => elem.barcode === barcode);
        if (!item) {
            items.push({
                barcode: barcode,
                count: 1
            });
        } else {
            item.count = item.count + 1;
        }
    })
    return items;
}

function getItemInfoByBarcode(items) {
    let barcodeInfoList = getBarcodeInfoList();
    items.forEach(item => {
        let barcodeInfo = barcodeInfoList.find(elem => elem.barcode === item.barcode);
        if (barcodeInfo) {
            item.name = barcodeInfo.name;
            item.unitPrice = barcodeInfo.price;
        }
    })
    return items;
}

function calItemTotalPrice(items) {
    items.forEach(item => {
        item.totalPrice = item.unitPrice * item.count;
    })
    return items;
}

function calAllItemsTotalPrice(items) {
    let totalPrice = 0;
    items.forEach(item => totalPrice += item.totalPrice)
    return totalPrice;
}

function generateReceiptItems(items) {
    let receiptItems = []
    items.forEach(item => {
        let receiptItem = `Name: ${item.name}, Quantity: ${item.count}, Unit price: ${item.unitPrice} (yuan), Subtotal: ${item.totalPrice} (yuan)\n`;
        receiptItems.push(receiptItem);
    })
    return receiptItems;
}

function generateReceipt(receiptItems, totalPrice) {
    let receipt = `\n***<store earning no money>Receipt ***\n`
    receiptItems.forEach(item => receipt += item)
    receipt += `----------------------\n`
    receipt += `Total: ${totalPrice} (yuan)\n`
    receipt += `**********************`
    return receipt
}

module.exports = {
    printReceipt
};
