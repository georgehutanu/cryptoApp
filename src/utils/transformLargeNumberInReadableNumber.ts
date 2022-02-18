export default (number: number): string =>
    Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
