fetch('http://localhost:3000/books/math?id=1233').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})