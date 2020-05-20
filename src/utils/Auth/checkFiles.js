export const checkFiles = (files) => {
  /** ~ 3Mo */
  if(files[0].size < 3060342)
    return true
  return false
}
