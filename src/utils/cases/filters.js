export const favOrCase = (item) => {
  let data = null 
  if (item["@type"] === 'Favorite') {
    const slashIndex = item.clinicalCaseId !== undefined ? item.clinicalCaseId.lastIndexOf('/') : false
    data = slashIndex ? Number(item.clinicalCaseId.substr(slashIndex).substr(1, slashIndex.length)) : 0
  } else {
    data = item.id ? item.id : data
  }
  
  return data
}