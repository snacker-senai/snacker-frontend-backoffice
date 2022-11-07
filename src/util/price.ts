const formCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

export const getPriceFormat = (value: number) => formCurrency.format(value)
