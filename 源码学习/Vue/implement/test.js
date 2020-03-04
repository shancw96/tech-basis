const {
    reactive,
} = require('./reactive')
const {
    effect
} = require('./effect')

const state = reactive({
    test: 1
})

effect(() => {
    console.log(state.test)
})

state.test++