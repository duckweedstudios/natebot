let object = {
    apple: 3,
    peach: true,
    orange: null //{ 'color': 'orange'}
}
console.log(object.orange);
object.orange = { 'juicy': 'yes', ...object.orange};
console.log(object);