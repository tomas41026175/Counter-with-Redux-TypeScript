import React, { useState, useEffect } from 'react'
import Counter from './component/Counter'
import { useSelector } from 'react-redux/es/exports'
import { RootState } from './store/index'


export const Test = () => {

  const storeState = useSelector((state: RootState) => state.myCart);
  const [nowCount, setNowCount] = useState(0);
  const [counterList, setCounterList] = useState([{ title: 'data1', tempData: { id: 1, name: 'test', count: 0 } }, { title: 'data2', tempData: { id: 2, name: 'test2', count: 0 } }]);
  // console.log(storeState)

  useEffect(() => {
    if (storeState.length > 0) {
      let total = 0
      storeState.forEach((e) => {
        total += e.count
      })
      setNowCount(total)
    }
  }, [storeState])
  const handleAddClick = () => {
    const lastEle = counterList[counterList.length - 1]
    const newEle = { ...lastEle, tempData: { ...lastEle.tempData, id: Number(lastEle.tempData.id + 1) }, title: 'data' + Number(lastEle.tempData.id + 1) }
    setCounterList([...counterList, newEle])
    console.log(counterList)
  }
  return (
    <>

      {/* <Counter tempData={data1} title={'Counter1'} />
      <Counter tempData={data2} title={'Counter2'} /> */}
      <div className='flex items-start w-1/5 mx-auto gap-10 justify-between  max-h-screen'>
        <div className='flex flex-col select-none items-start mt-8 justify-start gap-5'>
          <span>Now Total：{nowCount}</span>

          <button className='flex mx-auto select-none bg-gray-600 border-2 py-1 px-2 text-white rounded-md shadow-md hove:shadow-inner' onClick={handleAddClick}>addCounter</button>
        </div>
        <div className='flex flex-wrap gap-5 mt-8'>
          {counterList && counterList.map((e, i) => (
            <Counter tempData={e.tempData} title={e.title} key={i} />
          ))}
        </div>
      </div>

    </>
  )
}
