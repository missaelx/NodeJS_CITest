function suma (a, b, callback) {
    var suma = a + b;
    callback(suma)
}

suma(1,2, function(resultado){
    console.log(resultado);
});