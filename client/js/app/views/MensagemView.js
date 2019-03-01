class MensagemView extends View {

    // O construtor na Classe Filha pode ser omitido. 

    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}