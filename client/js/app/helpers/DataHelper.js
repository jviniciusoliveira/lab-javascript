class DataHelper {

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; // Template String
    }

    static textoParaData(texto) {

        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('A data deve estar no formato aaaa-mm-dd');
            
        return new Date(...texto // '...' Spread operator
                        .split('-')
                        .map((item, indice) => item - indice % 2)); // Arrow Function
    }
}