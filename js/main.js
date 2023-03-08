let getRandomNumber = function (leftEdge, rightEdge) { 
    if (leftEdge => rightEdge) { 
        return "Левая граница диапазона больше или равна правой!";
    } else {
        leftEdge = Math.ceil(leftEdge);
        rightEdge = Math.floor(rightEdge);
        return Math.floor(Math.random() * (rightEdge - leftEdge) + leftEdge);
    }
}

let checkStringLength = (checkedString, maxLength) => { return checkedString.length <= maxLength}

