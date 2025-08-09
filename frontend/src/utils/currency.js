// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount, currency = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `${amount.toLocaleString()}`;
};

export const formatPrice = (price) => {
  return formatCurrency(price, 'INR');
};