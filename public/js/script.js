fetch('/books/math?id=1233').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})