function run(generatorFn){
    const iterator = generatorFn()

    handleNext()
    function handleNext(value){
        const next = iterator.next()
        return next.done 
            ? next.value
            : Promise.resolve(value).then(handleNext,err=>Promise.resolve(iterator.throw(err)).then(handleNext))
    }
}
