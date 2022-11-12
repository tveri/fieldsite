import React from 'react'
import Selection from '../../../components/Selection/Selection'

export default function TestPage2() {
  return (
    <div>
        <div style={{
          width: 80,
          height: 18,
          border: "solid 1px #999"
        }}>
          <Selection
              selection={[1,2,3,4,5]}
              preselected={3}
              onSelect={(e) => {console.log(e);}}
          />
        </div>
    </div>
  )
}
