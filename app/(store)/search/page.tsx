import React from 'react'

async function Search({ searchParams, }: { searchParams: { query: string } }) {
    
    
    
    const { query} = await searchParams;
    console.log({query});
  return (
    <div>
      {query}
    </div>
  )
}

export default Search;
