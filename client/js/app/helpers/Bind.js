class Bind {

    constructor(model, props, view) {

        let proxyFactory = FactoryProxy.create(model, props, model => 
            view.update(model));

        view.update(model);
        
        return proxyFactory;
    }
}