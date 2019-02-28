class DateHelper {

    textoParaData(texto) {
        return new Date(...texto // '...' Spread operator
                        .split('-')
                        .map((item, indice) => item - indice % 2)); // Arrow Function
    }

    dataParaTexto(data) {
        return data.getDate() 
                + '/' + (data.getMonth() +1) 
                + '/' + data.getFullYear();
    }
}