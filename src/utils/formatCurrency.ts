export default function formatCurrency(amount: number) {
  // Format the number with thousands separator and IDR symbol
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // You can change this to specify the number of decimal places
  });

  return formatter.format(amount);
}
