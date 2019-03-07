class Bind {

    constructor(model, view, ...props) {

        let proxyFactory = FactoryProxy.create(model, props, model => 
            view.update(model));

        view.update(model);
        
        return proxyFactory;
    }
}