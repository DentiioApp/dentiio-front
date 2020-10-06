import { TextField, makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tryKeywords } from '../../../services/Home'
import { FILTERED_CASES, KEYWORDS_LIST } from '../../../store/actions'
import './Search.scss'
import CategoriesCases from '../../UI/Dawers/CategoriesCases'

const useStyles = makeStyles((theme) => ({
  barWidth: {
    minWidth: '50%',
    width: '50%'
  },

  categoryButton: {
    backgroundColor: '#82ccdd',
    margin: '41px 10px 7px 10px',
    height: '54px',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
      backgroundColor: '#03B6F0'
    }
  }
}))

const Search = (props) => {
  const classes = useStyles()
  const initValues = {
    keywords: []
  }

  const items = useSelector((state) => state.home.cases)
  const [values, setValues] = useState(initValues)
  const dispatch = useDispatch()

  const loadKeywords = async () => {
    const keywordsLoad = await tryKeywords()
    if (keywordsLoad.datas.length > 0) {
      setValues({ ...values, keywords: keywordsLoad.datas })
      dispatch({ type: KEYWORDS_LIST, keywords: values.keywords })
    }
  }
  // if no keywords in cache load keyword from api
  if (values.keywords.length < 1) {
    loadKeywords()
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

  const options = values.keywords.map((option) => {
    const firstLetter = option.name[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    }
  })

  return (
    <div className='wrap'>
      <div className='search'>
        <CategoriesCases className={classes.barWidth} />
        <Autocomplete
          className={classes.barWidth}
          id='grouped-demo'
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              onSelect={(e) => onTextChanged(e)}
              onChange={(e) => onTextChanged(e)}
              label='Rechercher un cas...'
              variant='outlined'
              id='search-input'
              className='searchTerm'
            />
          )}
        />
      </div>
    </div>
  )
}

export default Search
