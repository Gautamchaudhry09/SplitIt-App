import React, { useContext } from "react";
import { AccountContext } from "../components/AppContext/AppContext";

export const calculate_total = (expenses) => {
  let total = 0;
  for (let i = 0; i < expenses?.length; i++) {
    total += Number(expenses[i].amount);
  }
  //   console.log(total);
  return total;
};

const calculate_bins_and_items = ({ expenses, friends }) => {
  const total = calculate_total(expenses);
  const total_people = friends?.length;
  console.log(total_people);

  const individual_share = total / total_people;

  let uniqueExpenses = [];
  friends.forEach((friend) => {
    let amt = 0;
    let size = expenses ? expenses.length : 0;
    for (let i = 0; i < size; i++) {
      if (expenses[i].friend.name == friend.name) {
        amt = amt + Number(expenses[i].amount);
      }
    }
    const exp = { friend: friend, amount: amt };
    uniqueExpenses.push(exp);
  });
  let bins = [];
  let items = [];

  uniqueExpenses.forEach((exp) => {
    if (exp.amount > individual_share) {
      bins.push({
        friend: exp.friend,
        amount: exp.amount - individual_share,
      });
    } else if (exp.amount < individual_share) {
      items.push({
        friend: exp.friend,
        amount: individual_share - exp.amount,
      });
    }
  });
  console.log(bins);
  console.log(items);
  return [bins, items];
};

export const SplitCalculator = (expenses) => {
  // pool: bins and items (creditors and debtors)
  // bins: creditors to whom pool(debtors) owes money to //jinko lene hai paise
  // items: debtors who owe money to the pool(creditors) //jinko dene hai paise
  //   console.log(expenses);
  let [bins, items] = calculate_bins_and_items(expenses);
  bins.sort((a, b) => a.amount - b.amount);
  items.sort((a, b) => b.amount - a.amount);
  // if there's only one debtor to be paid by the pool's creditors
  if (bins.length === 1) {
    const bin = bins[0];

    return items.map((item) => ({
      //   id: randomId(),
      from_friend: item.friend,
      to_friend: bin.friend,
      amount: item.amount.toFixed(2),
    }));
  }

  const result = [];

  items.forEach((item) => {
    let item_amount = item.amount;

    // item goes through every bin to find the best fit
    for (let i = 0, len = bins.length; i < len; i++) {
      const bin = bins[i];

      // item can fit in this bin
      if (+bin.amount.toFixed(1) >= +item_amount.toFixed(1)) {
        bin.amount -= item_amount; // decrease bin amount
        result.push({
          //   id: randomId(),
          from_friend: item.friend,
          to_friend: bin.friend,
          amount: item_amount.toFixed(2),
        });

        // we'll move to the next item
        return;
      }
    }

    // so this item couldn't fit in any bin,
    // we'll distribute it among bins
    bins.forEach((bin) => {
      if (item_amount <= 0 || bin.amount <= 0) return;

      let amount;

      // if item is bigger for this bin
      if (+item_amount.toFixed(1) >= +bin.amount.toFixed(1)) {
        item_amount -= bin.amount;
        amount = bin.amount;
      } else {
        bin.amount -= item_amount;
        amount = item_amount;
      }

      result.push({
        // id: randomId(),
        from_friend: item.friend,
        to_friend: bin.friend,
        amount: amount.toFixed(2),
      });
    });
  });

  return result;
};
