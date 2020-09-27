{
  {
    const arr = [1, 2, 3, 4]

    let result = arr.map(item => item * 2)

    let newArr = arr.reduce((acc, cur) => {
      acc.push(cur * 2)
      return acc
    }, [])

    console.log(result)
    console.log(newArr)
  }

  {
    const arr = [1, 2, 3]
    const mapArray = arr.map(value => value * 2)
    const reduceArray = arr.reduce((acc, current) => {
      acc.push(current * 2)
      return acc
    }, [])
    console.log(mapArray, reduceArray) // [2, 4, 6]
  }
}