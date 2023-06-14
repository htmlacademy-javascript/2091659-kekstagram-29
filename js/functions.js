//Функция для проверки длины строки.
function comparingLength(string, length) {
  return string.length <= length;
}

comparingLength('проверяемая строка', 20);

console.log(comparingLength('проверяемая строка', 20));
console.log(comparingLength('проверяемая строка', 18));
console.log(comparingLength('проверяемая строка', 10));


//Функция для проверки, является ли строка палиндромом
function checkingЗalindrome(rawString) {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - i - 1]){
      return false;
    }
  }
  return true;
}

checkingЗalindrome('топот');

console.log(checkingЗalindrome('топот'));
console.log(checkingЗalindrome('ДовОд'));
console.log(checkingЗalindrome('Кекс'));
console.log(checkingЗalindrome('Лёша на полке клопа нашёл '));
