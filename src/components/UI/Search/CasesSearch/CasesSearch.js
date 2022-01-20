import { TextField, makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeywords } from '../../../../services/Home'
import { CASE_FILTERED, KEYWORDS_LIST } from '../../../../store/actions'
import './CasesSearch.scss'
import CategoriesCases from '../../Dawers/CategoriesCases'

const useStyles = makeStyles((theme) => ({
  barWidth: {
    minWidth: '50%',
    width: '50%'
  },

  categoryButton: {
    margin: '41px 10px 7px 10px',
    height: '54px',
    fontWeight: 'bold'
  }
}))

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initValues = {
    keywords: []
  }

  const casesList = useSelector((state) => state.cases.casesList)
  const [values, setValues] = useState(initValues)

  const loadKeywords = async () => {
    const keywordsLoad = await fetchKeywords()

    if (keywordsLoad?.datas?.length > 1) {
      setValues({ ...values, keywords: keywordsLoad.datas })
      dispatch({ type: KEYWORDS_LIST, keywords: values.keywords })
    }
  }

  // if no keywords in cache load keyword from api
  if (values.keywords?.length < 1) {
    loadKeywords()
  }

  const onTextChanged = (e) => {
    const value = e.target.value
    var newdata = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      casesList.map((item) => {
        if (
          item.keyword?.filter((keyword) =>
            regex.test(keyword.name.toLowerCase())
          ).length > 0
        ) {
          newdata.push(item)
        }
        return true
      })
    }

    dispatch({ type: CASE_FILTERED, datas: newdata })
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
