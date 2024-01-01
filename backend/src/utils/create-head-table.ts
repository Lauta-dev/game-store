export function CreateHeadInTable(array: Array<any>) {
  const objectKeys = Object.keys(array[0])

  const head: string[] = []

  objectKeys.forEach(data => {
    if (!data.match(/([A-Z])\w+/)) return head.push(`${data.charAt(0).toUpperCase() + data.slice(1)}`)

    const cortado = data.match(/([A-Z])\w+/)[0]
    const newData = data.replace(cortado, " ")
    const primerLetraConMayus = newData.charAt(0).toUpperCase()
    const primerLetraConMinus = `${cortado.charAt(0).toLowerCase() + cortado.slice(1)}`
    const listo = `${primerLetraConMayus + newData.slice(1)}${primerLetraConMinus}`

    head.push(listo)
  })


  return head

}
