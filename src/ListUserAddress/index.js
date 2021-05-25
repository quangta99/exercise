import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

import { Container } from '@material-ui/core'
import TableData from './Table'
import SearchBox from './SearchBox'


const ListUserAddress = () => {

  const fetchData = useStoreActions(actions => actions.dataUser.fetchDataUserAddress)

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  return (
    <div>
      <Container>
        <SearchBox />
        <TableData />
      </Container>
    </div>
  )
}
export default ListUserAddress