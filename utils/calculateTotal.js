function calculateTotal(price) {
    const total = Number((price * 100).toFixed(2));

    return total;
}

export default calculateTotal;