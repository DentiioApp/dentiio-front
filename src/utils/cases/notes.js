export const avgNotes = (notes) => {
    var sum = 0
    notes.map((value, index)=>(
      sum = value.note + sum
    ))

    return sum/notes.length
  }