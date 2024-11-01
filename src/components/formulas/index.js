// emirp => prime number on both side you read it

export const isEmirp = (n) => {
	
	if (isPrime(n)) {if (isPrime(n.split('').reverse().join(''))) {return true;}}
	return false;
}
  
// prime numbers

export const isPrime = (n) => {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    if (n == leastFactor(n)) return true;
    return false;
}

export const leastFactor = (n) => {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n == 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 == 0) return 2;
    if (n % 3 == 0) return 3;
    if (n % 5 == 0) return 5;
    var m = Math.sqrt(n);
    for (var i = 7; i <= m; i += 30) {
        if (n % i == 0) return i;
        if (n % (i + 4) == 0) return i + 4;
        if (n % (i + 6) == 0) return i + 6;
        if (n % (i + 10) == 0) return i + 10;
        if (n % (i + 12) == 0) return i + 12;
        if (n % (i + 16) == 0) return i + 16;
        if (n % (i + 22) == 0) return i + 22;
        if (n % (i + 24) == 0) return i + 24;
    }
    return n;
}

// palindrome, works with letters too - 101 or ABA

export const isPalindrome = (n) => {
  if (n.length === 1) { return false}
  const s = n.split('')
  const r = s.reverse()
  const rs = r.join(''); 
  return rs === n;
}

export const isPerfectSquare = (x) => {
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}

// star numbers: not very diffused pattern

export const isStar = (n) => {
	
	if (n.startsWith('0x')) {n = n.slice(2)}
	
for (let i = 1; i < 19999; i++) {
	var nstar = (6 * i* (i - 1) + 1);
	if (nstar > n) { return false}	
	if (nstar == n) { return true}						
	} 
} 

// numbers in the fibonacci series

export const isFibonacci = (n) => {
	if (n.startsWith('0x')) {n = n.slice(2)}
	if (parseInt(n) === 0) { return false; }
	if (isPerfectSquare(5*(n*n)-4) || isPerfectSquare(5*(n*n)+4)) { return true }
	return false;
}

// repeated 1111

export const isRepeat = (s) => {
 if (s.length === 1) { return false}
let n = s.length;
for (let i = 1; i < n; i++)
    if (s[i] != s[0])
    return false;

return true;
}

//alternate 121212

export const isAlternate = (s) => {
if (s.length < 3) { return false}

 for (var i = 0; i < s.length - 2; i++) {
        if (s.charAt(i) != s.charAt(i + 2)) {
            return false;
        }
    }
    return true;
}

// consecutive 12345

export const isConsecutive = (n) => {
if (n.length < 2) { return false}
const c = n.split('')
const l = c.length
for (var i=0; i<l; i++) {
if (i > 0) { 
if (c[1] > c[0]) {
const p = i - 1
const current = Number(c[i])
const previous = Number(c[p])
const diff = current -previous
if ( diff === 1)  { continue }
else { return false}
}
else {
const current = c[i]
const previous = c[i-1]
const diff = (previous - current)
if (diff === 1)  { continue }
else { return false}
}
}
}
return true
}

// binary numbers 10010

export const isBinary = (n) => {
	
	const l = n.length
		for (var i=0; i<l; i++) {
			const a = n[i]
			if (a === "0" || a === "1") {continue}
			else { return false }
		}
	return true
}

export const isClean = (n) => {
	
	const l = n.length
	if (l === 1) { return false}
		for (var i=1; i<l-1; i++) {
			const a = n[i]
			if (a === "0") {continue}
			else { return false }
		}
	return true
}

export const isDouble = (n) => {
if (n.length === 1) { return false}
const c = n.split('')
const l = c.length

for (var i = 0; i < l-1; i++) {
	if (c[i] === c[i+1]) {return true}
}

return false;
}

export const isDoubleDouble = (n) => {
if (n.length < 4) { return false}
const c = n.split('')
const l = c.length
for (var i = 0; i < l-3; i++) {
	if (isDouble(c[i]+c[i+1])) {
		
		const nn = n.slice(i +2)
		if (isDouble(nn)) { return true}
	}
}

return false;
}

export const isTripleDouble = (n) => {
if (n.length < 6) { return false}
const c = n.split('')
const l = c.length
if (isDouble(c[0]+c[1]) && isDouble(c[2]+c[3]) && isDouble(c[4]+c[5])) { return true }

return false;

}

export const isTriple = (n) => {
if (n.length < 3) { return false}
const c = n.split('')
const l = c.length
for (var i = 0; i < l-2; i++) {
	if (c[i] === c[i+1] && c[i] === c[i+2] ) {return true}
}

return false;
}

export const isDoubleTriple = (n) => {
if (n.length < 6) { return false}
const c = n.split('')
const l = c.length
if (isTriple(c[0]+c[1]+c[2]) && isTriple(c[3]+c[4]+c[5])) { return true }

return false;

}

export const isQuartet = (n) => {
if (n.length < 4) { return false}
const c = n.split('')
const l = c.length
for (var i = 0; i < l-3; i++) {
	if (c[i] === c[i+1] && c[i] === c[i+2] && c[i] === c[i+3] ) {return true}
}
return false;
}

export const isFull = (n) => {
if (n.length < 5) { return false}
const c = n.split('')
const l = c.length
for (var i = 0; i < l-4; i++) {
	if (isRepeat(n.slice(i,i+3)) && isRepeat(n.slice(i+3,i+5)) ) {return true}
	if (isRepeat(n.slice(i,i+2)) && isRepeat(n.slice(i+2,i+5)) ) {return true}
}

return false;
}

export const isQuartetDouble = (n) => {
if (n.length < 6) { return false}
const c = n.split('')
const l = c.length
for (var i = 0; i < l-4; i++) {
	if (isRepeat(n.slice(i,i+4)) && isRepeat(n.slice(i+4,i+6)) ) {return true}
	if (isRepeat(n.slice(i,i+2)) && isRepeat(n.slice(i+2,i+6)) ) {return true}
}

return false;
}





// domain character sets 

const regAN = /^[a-z0-9]+$/;
const regNum = /^\d+$/;
const regLet = /^[a-z]+$/;

const isLetter = (n) =>{
	if (regLet.test(n)) {return true}
	return false
}
const isDigit = (n) =>{
	if (regNum.test(n)) {return true}
	return false
}
const isAlphanum = (n) =>{
	if (regAN.test(n)) {return true}
	return false
}

// check if a subdomain

export const isSubdomain = (n) =>{
	if (n.split('.').length > 1) {return true}
	return false
}

export const isType = (n) =>{
	if (isSubdomain(n)) {return "subdomain"}
	return "domain"
}

// output the charset for a given domain

export const isCharset = (n) =>{
	if (isLetter(n)) {return "letter"}
	if (isDigit(n)) { return "digit" }
	if (isAlphanum(n)) { return "alphanumeric" }
	if (n.includes("-")) {return "hyphen"}
	return null
}

// domain clubs
export const isClub = (n) =>{
	var club = ""
	const len = n.length;
	if (isCharset(n) === "digit") {
	
		if (len === 1) {club = "Single Digit"}
		if (len === 2) {club = "Double Digits"}
		if (len === 3) {club = "999 Club"}
		if (len === 4) {club = "10k Club"}
		if (len === 5) {club = "100k Club"}
	} else if (isCharset(n) === "letter") {
		if (len === 1) {club = "Alphabet"}
		if (len === 2) {club = "2 Letters"}
		if (len === 3) {club = "3 Letters"}
		if (len === 4) {club = "4 Letters"}
		if (len === 5) {club = "5 Letters"}
	}
	return club
}

// maps Club -- we can add more
export const isClubMap = (n) =>{
	n = Number(n)
	var club = ""
		if (n < 1000 ) {return club = "sub 1k"}
		if (n < 10000) {return club = "sub 10k"}
		if (n < 25000) {return club = "sub 25k"}
		if (n < 50000 ) {return club = "sub 50k"}
		if (n < 100000) {return club = "sub 100k"}

	return club
}


// output all the categories of a map id
export const mapCategories = (n) => {
	const cat = []
	if (isPalindrome(n)) {cat.push("Palindrome")}
	if (isAlternate(n)) {cat.push("Alternate")}
	if (isConsecutive(n)) {cat.push("Consecutive")}
	if (isRepeat(n)) {cat.push("Repeated")}
	if (isFibonacci(n)) {cat.push("Fibonacci")}
	if (isBinary(n)) {cat.push("Binary")}
	if (isClean(n)) {cat.push("Clean")}
	if (isEmirp(n)) {cat.push("Emirp")}
	if (isPrime(n)) {cat.push("Prime")}
	if (isStar(n)) {cat.push("Star")}
	if (isDouble(n)) {cat.push("Double")}
	if (isDoubleDouble(n)) {cat.push("DoubleDouble")}
	if (isTripleDouble(n)) {cat.push("TripleDouble")}
	if (isTriple(n)) {cat.push("Triple")}
	if (isDoubleTriple(n)) {cat.push("DoubleTriple")}
	if (isQuartet(n)) {cat.push("Quartet")}
	if (isQuartetDouble(n)) {cat.push("QuartetDouble")}
	if (isFull(n)) {cat.push("Full")}
	if (Number(n) < 1000 ) {cat.push( "sub 1k")}
	if (Number(n) < 10000) {cat.push("sub 10k")}
	if (Number(n) < 25000) {cat.push("sub 25k")}
	if (Number(n) < 50000 ) {cat.push("sub 50k")}
	if (Number(n) < 100000) {cat.push("sub 100k")}

	return cat
}


export const cleanNumber = (nr) => {
	if (nr >= 1e12) {
                nr = nr / 1e12;
                nr = nr.toFixed(1);
                if (nr[nr.length - 1] === '0') {
                    nr = nr.slice(0, -2);
                }
                return nr + 'T';
            }
            if (nr >= 1e9) {
                nr = nr / 1e9;
                nr = nr.toFixed(1);
                if (nr[nr.length - 1] === '0') {
                    nr = nr.slice(0, -2);
                }
                return nr + 'B';
            }
            if (nr >= 1e6) {
                nr = nr / 1e6;
                nr = nr.toFixed(1);
                if (nr[nr.length - 1] === '0') {
                    nr = nr.slice(0, -2);
                }
                return nr + 'M';
            }
            else if (nr >= 1e3) {
                nr = nr / 1e3;
                nr = nr.toFixed(1);
                if (nr[nr.length - 1] === '0') {
                    nr = nr.slice(0, -2);
                }
                return nr + 'K';
            }
            return String(nr);
}




