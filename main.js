function printReceipt(barcodes) {
    const items = getBarcodeCountItems(barcodes);
    const itemsWithInfo = getBarcodeInfoItems(items);
    const itemsWithTotalPrice = calEachItemTotalPrice(itemsWithInfo);
    const totalPrice = calWholeItemTotalPrice(itemsWithTotalPrice);
    const receiptItems = generateReceiptItems(itemsWithTotalPrice);
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

function getBarcodeCountItems(barcodes) {
    let items = [];
    barcodes.forEach(barcode => {
        const item = items.find(elem => elem.barcode === barcode);
        if (!item) {
            items.push({
                barcode: barcode,
                count: 1
            });
        } else {
            ++item.count;
        }
    })
    return items;
}

function getBarcodeInfoItems(items) {
    let itemsWithInfo = []
    const barcodeInfoList = getBarcodeInfoList();
    items.forEach(item => {
        const barcodeInfo = barcodeInfoList.find(elem => elem.barcode === item.barcode);
        if (barcodeInfo) {
            itemsWithInfo.push({
                barcode: item.barcode,
                count: item.count,
                name: barcodeInfo.name,
                unitPrice: barcodeInfo.price
            })
        }
    })
    return itemsWithInfo;
}

function calEachItemTotalPrice(itemsWithInfo) {
    let itemsWithTotalPrice = []
    itemsWithInfo.forEach(item => {
        itemsWithTotalPrice.push({
            barcode: item.barcode,
            count: item.count,
            name: item.name,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.count,
        })
    })
    return itemsWithTotalPrice;
}

function calWholeItemTotalPrice(itemsWithTotalPrice) {
    let totalPrice = 0;
    itemsWithTotalPrice.forEach(item => totalPrice += item.totalPrice)
    return totalPrice;
}

function generateReceiptItems(itemsWithTotalPrice) {
    let receiptItems = []
    itemsWithTotalPrice.forEach(item => {
        const receiptItem = `Name: ${item.name}, Quantity: ${item.count}, Unit price: ${item.unitPrice} (yuan), Subtotal: ${item.totalPrice} (yuan)\n`;
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
