
let asks = new Map();
let bids = new Map();
let prevTop24BidsPrices = [];
let prevTop24AsksPrices = [];


self.onmessage = (event) => {
  const { type, payload } = event.data;

  if (type === "processMessage" && Array.isArray(payload)) {
    processWebSocketData(payload[1]);
  }else if( type === "processMessage" && payload.event){
    if(payload.event === "unsubscribed") {
      self.postMessage({
        type: "unsubscribed",
        payload: payload,
      });
    } else if(payload.event === "subscribed"){
      self.postMessage({
        type: "subscribed",
        payload: payload,
      });
      asks = new Map();
      bids = new Map();
      prevTop24BidsPrices = [];
      prevTop24AsksPrices = [];
    }
  }
};

function updateOrderBook(orderBook, payload, maxOrderItems, isBids) {
  const [price, count, amount] = payload;

  if (count === 0) {
    orderBook.delete(price);
  } else {
    orderBook.set(price, {
      price,
      amount: isBids ? amount : Math.abs(amount),
      count,
    });
  }

  let sortedOrders = Array.from(orderBook.values()).sort((a, b) =>
    isBids ? b.price - a.price : a.price - b.price
  );

  sortedOrders = sortedOrders.slice(0, maxOrderItems);

  const top24Orders = sortedOrders.slice(0, 24);
  const top24Prices = top24Orders.map((order) => order.price);

  const prevTop24Prices = isBids ? prevTop24BidsPrices : prevTop24AsksPrices

  const hasChangesInTop24 = !arraysEqual(
    top24Prices,
    prevTop24Prices
  );

  sortedOrders = calculateTotal(top24Orders, prevTop24Prices);
  if (hasChangesInTop24) {

    if (isBids) {
      prevTop24BidsPrices = top24Prices;
    } else {
      prevTop24AsksPrices = top24Prices;
    }

  }
  self.postMessage({
      type: isBids ? "updateBids" : "updateAsks",
      payload: sortedOrders,
      top24Prices,
    });
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function formatToFourDigits(value: number): string {
  if (value >= 1000) {
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;
    let formattedValue = value;

    while (formattedValue >= 1000 && unitIndex < units.length - 1) {
      formattedValue /= 1000;
      unitIndex++;
    }

    return `${formattedValue.toPrecision(4)}${units[unitIndex]}`.toUpperCase();
  }
  
  return value < 1 ? value.toFixed(4) : value.toPrecision(4);
}

function calculateTotal(levels, prevTop24Prices) {
  let cumulative: number = 0;
  
  return levels.map((level) => {
    const amount: number = level.amount;
    const formattedAmount =  formatToFourDigits(amount);
    cumulative += amount;
    return { ...level, amountStr: formattedAmount, 
      total: cumulative,
      totalStr: formatToFourDigits(cumulative),
      isNew: !prevTop24Prices.includes(level.price)};
  });
};

function processWebSocketData(data) {

  if (!Array.isArray(data)) {
    console.error("Expected updates to be an array, but got:", data);
    return;
  }

  const updates = Array.isArray(data[0]) ? data : [data];

  updates.forEach((update) => {
    if (!Array.isArray(update) || update.length !== 3) {
      console.error("Invalid update format:", update);
      return;
    }

    const [, , amount] = update;

    if (amount > 0) {
      updateOrderBook(bids, update, 50, true);
    } else if (amount < 0) {
      updateOrderBook(asks, update, 50, false);
    }
  });
}