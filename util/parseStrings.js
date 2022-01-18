module.exports = {
    stripES: String.prototype.replace(/\s+/g, ' ').trim,
    capitalizeFirstChar: function capitalizeFirstLetter(str) { return str[0].toUpperCase() + str.slice(1); }

}