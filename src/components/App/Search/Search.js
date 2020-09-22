// import Icon from "../../../images/titleHeader.svg";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icon from '../../../images/logoteeth_transparent.png'
import { tryKeywords } from '../../../services/Home'
import { KEYWORDS_LIST, FILTERED_CASES } from '../../../store/actions'
import './Search.scss'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const Search = (props) => {
  const keywords = useSelector((state) => state.home.keywords)
  const items = useSelector((state) => state.home.cases)
  const keywordsLoad = tryKeywords()
  const dispatch = useDispatch()

  if (keywordsLoad.length > 0) {
    dispatch({ type: KEYWORDS_LIST, keywords: keywordsLoad })
  }

  const onTextChanged = (e) => {
    const value = e.target.value
    const newdata = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      items.map((item) => {
        if (
          item.keyword.filter((keyword) =>
            regex.test(keyword.name.toLowerCase())
          ).length > 0
        ) {
          newdata.push(item)
        }
        return true
      })
    }

    dispatch({ type: FILTERED_CASES, data: newdata })
  }

  const options = keywords.map((option) => {
    const firstLetter = option.name[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    }
  })

  return (
    <div className='wrap'>
      <div className='search'>
        <Autocomplete
          id='grouped-demo'
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} onChange={(e) => onTextChanged(e)} label='With categories' variant='outlined' />
          )}
        />
        <button className='searchButton'>
          <img alt='Search' src={icon} />
        </button>
      </div>
    </div>
  )
}

export default Search
