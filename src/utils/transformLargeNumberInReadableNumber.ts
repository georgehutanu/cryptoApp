export default (number: number) =>
    Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
